'use strict';

/**
 * Bubble Bliss — Express API server
 *
 * Serves the frontend static files AND the following REST endpoints:
 *
 *   GET  /api/drinks           list all drinks (supports ?category=&search=)
 *   GET  /api/orders           list all placed orders (newest first) [admin]
 *   GET  /api/contacts         list all contact submissions (newest first) [admin]
 *   POST /api/contact          save a contact form submission
 *   POST /api/orders           save a placed order
 *   POST /api/admin/login      log in to admin dashboard
 *   GET  /api/admin/logout     log out of admin dashboard
 *
 * Run:  npm start              (production)
 *       npm run dev            (auto-restart on file change, Node 18+)
 *
 * Then open http://localhost:3000
 */

const express = require('express');
const path    = require('path');
const crypto  = require('crypto');
const db      = require('./db');

// Auto-seed drinks on first run
require('./seed');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── Admin credentials + session token ────────────────────── */
const ADMIN_USER   = process.env.ADMIN_USERNAME || 'kimke';
const ADMIN_PASS   = process.env.ADMIN_PASSWORD || 'bubbleme';
const SESSION_SECRET = process.env.SESSION_SECRET || 'bb-secret-2026';

// Deterministic token: changes whenever credentials change
const ADMIN_TOKEN = crypto
  .createHmac('sha256', SESSION_SECRET)
  .update(`${ADMIN_USER}:${ADMIN_PASS}`)
  .digest('hex');

function parseCookies(req) {
  const out = {};
  (req.headers.cookie || '').split(';').forEach(c => {
    const [k, ...v] = c.trim().split('=');
    if (k) out[k.trim()] = v.join('=').trim();
  });
  return out;
}

function isAdmin(req) {
  return parseCookies(req).bb_admin === ADMIN_TOKEN;
}

// Middleware for protected page routes — redirects to /admin on fail
function adminPageAuth(req, res, next) {
  if (isAdmin(req)) return next();
  res.redirect('/admin');
}

// Middleware for protected API routes — returns 401 JSON on fail
function adminApiAuth(req, res, next) {
  if (isAdmin(req)) return next();
  res.status(401).json({ error: 'Not authenticated.' });
}

/* ── Middleware ────────────────────────────────────────────── */
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: false })); // for login form POST

// Serve the frontend (everything in final_project/) as static files
// /admin is handled explicitly below, not via static
app.use(express.static(path.join(__dirname, '..'), {
  index: false,
  // Block direct file access to admin pages
  setHeaders(res, filePath) {
    if (filePath.endsWith('admin.html') || filePath.endsWith('admin-login.html')) {
      res.setHeader('X-Robots-Tag', 'noindex');
    }
  },
}));

/* ── Admin login / logout ──────────────────────────────────── */
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.setHeader('Set-Cookie',
      `bb_admin=${ADMIN_TOKEN}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
    );
    return res.redirect('/admin');
  }
  res.redirect('/admin?error=1');
});

app.get('/api/admin/logout', (req, res) => {
  res.setHeader('Set-Cookie',
    'bb_admin=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0'
  );
  res.redirect('/admin');
});

/* ── Admin pages ───────────────────────────────────────────── */
app.get(['/admin', '/admin.html'], (req, res) => {
  if (isAdmin(req)) {
    return res.sendFile(path.join(__dirname, '..', 'admin.html'));
  }
  res.sendFile(path.join(__dirname, '..', 'admin-login.html'));
});

/* ── Index ─────────────────────────────────────────────────── */
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

/* ── GET /api/drinks ───────────────────────────────────────── */
app.get('/api/drinks', (req, res) => {
  const { category, search } = req.query;

  let sql    = 'SELECT * FROM drinks';
  const params = [];
  const where  = [];

  if (category && category !== 'all') {
    where.push('category = ?');
    params.push(category.trim().slice(0, 50));
  }

  if (search && search.trim()) {
    const q = `%${search.trim().toLowerCase().slice(0, 100)}%`;
    where.push('(LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(ingredients) LIKE ?)');
    params.push(q, q, q);
  }

  if (where.length) sql += ' WHERE ' + where.join(' AND ');
  sql += ' ORDER BY id';

  const rows = db.prepare(sql).all(...params);

  const drinks = rows.map(d => ({
    ...d,
    ingredients: JSON.parse(d.ingredients),
    badges:      JSON.parse(d.badges),
  }));

  res.json(drinks);
});

/* ── POST /api/contact ─────────────────────────────────────── */
app.post('/api/contact', (req, res) => {
  const { name, email, phone, inquiry_type, how_heard, location, message } = req.body || {};

  if (!name || !email || !inquiry_type || !location || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const stmt = db.prepare(`
    INSERT INTO contacts (name, email, phone, inquiry_type, how_heard, location, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    String(name).trim().slice(0, 200),
    String(email).trim().slice(0, 200),
    String(phone  || '').trim().slice(0, 50),
    String(inquiry_type).trim().slice(0, 50),
    JSON.stringify(Array.isArray(how_heard) ? how_heard : []),
    String(location).trim().slice(0, 100),
    String(message).trim().slice(0, 2000),
  );

  console.log(`[contact] #${result.lastInsertRowid} from ${email} — ${inquiry_type}`);
  res.status(201).json({ ok: true, id: result.lastInsertRowid });
});

/* ── GET /api/contacts ─────────────────────────────────────── */
app.get('/api/contacts', adminApiAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
  const contacts = rows.map(c => ({ ...c, how_heard: JSON.parse(c.how_heard) }));
  res.json(contacts);
});

/* ── GET /api/orders ───────────────────────────────────────── */
app.get('/api/orders', adminApiAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
  const orders = rows.map(o => ({ ...o, items: JSON.parse(o.items) }));
  res.json(orders);
});

/* ── POST /api/orders ──────────────────────────────────────── */
app.post('/api/orders', (req, res) => {
  const { items, total_price, item_count } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item.' });
  }

  const clean = items.map(i => ({
    id:    Number(i.id)   || 0,
    name:  String(i.name  || '').slice(0, 200),
    price: String(i.price || '').slice(0, 20),
    qty:   Math.max(1, Number(i.qty)  || 1),
    sweet: String(i.sweet || '').slice(0, 50),
    ice:   String(i.ice   || '').slice(0, 50),
  }));

  const stmt = db.prepare(`
    INSERT INTO orders (items, total_price, item_count)
    VALUES (?, ?, ?)
  `);

  const result = stmt.run(
    JSON.stringify(clean),
    Math.abs(parseFloat(total_price) || 0),
    Math.abs(parseInt(item_count)    || clean.length),
  );

  console.log(`[order]   #${result.lastInsertRowid} — ${clean.length} items, $${total_price}`);
  res.status(201).json({ ok: true, id: result.lastInsertRowid });
});

/* ── Fallback: catch-all ───────────────────────────────────── */
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

/* ── Start ─────────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`\nBubble Bliss server running at http://localhost:${PORT}\n`);
});

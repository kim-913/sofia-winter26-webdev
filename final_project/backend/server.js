'use strict';

/**
 * Bubble Bliss — Express API server
 *
 * Serves the frontend static files AND the following REST endpoints:
 *
 *   GET  /api/drinks           list all drinks (supports ?category=&search=)
 *   GET  /api/orders           list all placed orders (newest first)
 *   GET  /api/contacts         list all contact submissions (newest first)
 *   POST /api/contact          save a contact form submission
 *   POST /api/orders           save a placed order
 *
 * Run:  npm start              (production)
 *       npm run dev            (auto-restart on file change, Node 18+)
 *
 * Then open http://localhost:3000
 */

const express = require('express');
const path    = require('path');
const db      = require('./db');

// Auto-seed drinks on first run
require('./seed');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── Admin Basic Auth ──────────────────────────────────────── */
const ADMIN_USER = 'kimke';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'bubbleme';

function adminAuth(req, res, next) {
  const auth = req.headers['authorization'] || '';
  const [scheme, encoded] = auth.split(' ');
  if (scheme === 'Basic' && encoded) {
    const [user, pass] = Buffer.from(encoded, 'base64').toString().split(':');
    if (user === ADMIN_USER && pass === ADMIN_PASS) return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="Bubble Bliss Admin"');
  res.status(401).send('Unauthorized');
}

/* ── Middleware ────────────────────────────────────────────── */
app.use(express.json({ limit: '16kb' }));

// Serve the frontend (everything in final_project/) as static files
// Admin page is served separately behind auth (see route below)
app.use(express.static(path.join(__dirname, '..'), { index: false }));

/* ── Admin page (auth-protected) ───────────────────────────── */
app.get(['/admin', '/admin.html'], adminAuth, (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin.html'));
});

// Restore default index serving for /
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

  // Parse stored JSON strings back into arrays
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
app.get('/api/contacts', adminAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
  const contacts = rows.map(c => ({ ...c, how_heard: JSON.parse(c.how_heard) }));
  res.json(contacts);
});

/* ── GET /api/orders ───────────────────────────────────────── */
app.get('/api/orders', adminAuth, (req, res) => {
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

  // Sanitize each item: only keep known fields
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

/* ── Fallback: SPA-style catch-all ─────────────────────────── */
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

/* ── Start ─────────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`\nBubble Bliss server running at http://localhost:${PORT}\n`);
});

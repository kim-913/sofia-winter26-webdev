'use strict';

/**
 * db.js — SQLite connection + schema setup
 * Uses Node.js built-in `node:sqlite` (stable since Node 23.4, no native compilation needed).
 * Creates backend/bubble_bliss.db on first run.
 */

const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const db = new DatabaseSync(path.join(__dirname, 'bubble_bliss.db'));

db.exec(`PRAGMA journal_mode = WAL`);

db.exec(`
  CREATE TABLE IF NOT EXISTS drinks (
    id          INTEGER PRIMARY KEY,
    name        TEXT    NOT NULL,
    category    TEXT    NOT NULL,
    price       TEXT    NOT NULL,
    description TEXT    NOT NULL,
    ingredients TEXT    NOT NULL,
    img         TEXT    NOT NULL,
    alt         TEXT    NOT NULL,
    badges      TEXT    NOT NULL
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    name         TEXT    NOT NULL,
    email        TEXT    NOT NULL,
    phone        TEXT    DEFAULT '',
    inquiry_type TEXT    NOT NULL,
    how_heard    TEXT    DEFAULT '[]',
    location     TEXT    NOT NULL,
    message      TEXT    NOT NULL,
    created_at   TEXT    DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS orders (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    items       TEXT    NOT NULL,
    total_price REAL    NOT NULL,
    item_count  INTEGER NOT NULL,
    created_at  TEXT    DEFAULT (datetime('now'))
  );
`);

module.exports = db;

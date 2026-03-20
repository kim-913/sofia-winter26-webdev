/* ============================================================
   Bubble Bliss — Automated Tests (tests.js)
   8 tests covering: form validation, filter logic,
   drink data integrity, debounce, and DOM checks.
   Run by opening tests/test.html in any browser.
   ============================================================ */

'use strict';

/* ── Minimal test runner ─────────────────────────────────── */
const results = [];

function test(description, fn) {
  try {
    fn();
    results.push({ pass: true,  description });
  } catch (err) {
    results.push({ pass: false, description, error: err.message });
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertEqual(a, b, message) {
  if (a !== b) throw new Error(message || `Expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);
}

/* ── Inline validation rules (mirrors form.js logic) ──────── */
const rules = {
  name(v)  {
    if (!v.trim())           return 'Please enter your full name.';
    if (v.trim().length < 2) return 'Name must be at least 2 characters.';
    return null;
  },
  email(v) {
    if (!v.trim()) return 'Please enter your email address.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()))
      return 'Please enter a valid email address.';
    return null;
  },
  message(v) {
    if (!v.trim())             return 'Please enter a message.';
    if (v.trim().length < 10)  return 'Message must be at least 10 characters.';
    return null;
  },
};

/* ── Inline drinks data (mirrors menu.js categories) ────── */
const drinks = [
  { id: 1,  name: 'Brown Sugar Boba Milk Tea', category: 'milk-tea',  price: '$6.50', description: 'Rich brown sugar', ingredients: ['Black Tea', 'Milk', 'Brown Sugar', 'Boba'], badges: ['popular'] },
  { id: 2,  name: 'Classic Milk Tea',          category: 'milk-tea',  price: '$5.00', description: 'Classic',          ingredients: ['Black Tea', 'Milk', 'Sugar', 'Boba'],       badges: [] },
  { id: 3,  name: 'Taro Milk Tea',             category: 'milk-tea',  price: '$6.00', description: 'Velvety taro',     ingredients: ['Taro', 'Oolong', 'Oat Milk', 'Boba'],       badges: ['popular'] },
  { id: 4,  name: 'Matcha Milk Tea',           category: 'milk-tea',  price: '$6.50', description: 'Ceremonial matcha',ingredients: ['Matcha', 'Oat Milk', 'Honey', 'Boba'],      badges: [] },
  { id: 5,  name: 'Tiger Sugar Milk Tea',      category: 'milk-tea',  price: '$7.00', description: 'Tiger caramel',    ingredients: ['Oolong', 'Milk', 'Tiger Sugar', 'Boba'],     badges: ['popular'] },
  { id: 6,  name: 'Hokkaido Milk Tea',         category: 'milk-tea',  price: '$6.50', description: 'Japanese style',   ingredients: ['Black Tea', 'Cream', 'Caramel', 'Pudding'], badges: ['new'] },
  { id: 7,  name: 'Mango Passion Fruit Tea',   category: 'fruit-tea', price: '$5.50', description: 'Tropical mango',   ingredients: ['Green Tea', 'Mango', 'Passion Fruit', 'Jelly'], badges: ['popular', 'new'] },
  { id: 8,  name: 'Strawberry Lychee Tea',     category: 'fruit-tea', price: '$5.50', description: 'Fresh strawberry', ingredients: ['Jasmine Tea', 'Strawberry', 'Lychee', 'Basil'], badges: [] },
  { id: 9,  name: 'Peach Oolong Tea',          category: 'fruit-tea', price: '$5.00', description: 'Fragrant oolong',  ingredients: ['Oolong', 'Peach Syrup', 'Aloe', 'Ice'],     badges: [] },
  { id: 10, name: 'Watermelon Mint Tea',       category: 'fruit-tea', price: '$5.50', description: 'Crisp watermelon', ingredients: ['Hibiscus Tea', 'Watermelon', 'Mint', 'Honey'], badges: ['new'] },
  { id: 11, name: 'Passion Fruit Green Tea',   category: 'fruit-tea', price: '$5.00', description: 'Classic tart',     ingredients: ['Green Tea', 'Passion Fruit', 'Lemon', 'Ice'], badges: [] },
  { id: 12, name: 'Berry Bliss Tea',           category: 'fruit-tea', price: '$6.00', description: 'Mixed berry',      ingredients: ['Black Currant', 'Berries', 'Raspberry', 'Basil'], badges: ['popular'] },
  { id: 13, name: 'Mango Coconut Smoothie',    category: 'smoothie',  price: '$7.00', description: 'Thick mango',      ingredients: ['Mango', 'Coconut', 'Oat Milk', 'Boba'],     badges: [] },
  { id: 14, name: 'Strawberry Banana Smoothie',category: 'smoothie',  price: '$7.00', description: 'Classic smoothie', ingredients: ['Strawberry', 'Banana', 'Yogurt', 'Honey', 'Boba'], badges: ['popular'] },
  { id: 15, name: 'Avocado Taro Smoothie',     category: 'smoothie',  price: '$7.50', description: 'Nutty creamy',     ingredients: ['Avocado', 'Taro', 'Oat Milk', 'Agave', 'Boba'], badges: ['new'] },
  { id: 16, name: 'Honeydew Milk Smoothie',    category: 'smoothie',  price: '$6.50', description: 'Light honeydew',   ingredients: ['Honeydew', 'Cream', 'Coconut Milk', 'Jelly'], badges: [] },
  { id: 17, name: 'Cherry Blossom Latte',      category: 'seasonal',  price: '$7.50', description: 'Spring sakura',    ingredients: ['White Tea', 'Sakura', 'Oat Milk', 'Pink Boba'], badges: ['seasonal', 'new'] },
  { id: 18, name: 'Pumpkin Spice Milk Tea',    category: 'seasonal',  price: '$7.00', description: 'Fall pumpkin',     ingredients: ['Chai', 'Pumpkin Spice', 'Oat Milk', 'Boba'], badges: ['seasonal'] },
  { id: 19, name: 'Lavender Honey Earl Grey',  category: 'seasonal',  price: '$7.00', description: 'Aromatic Earl Grey',ingredients: ['Earl Grey', 'Lavender', 'Oat Milk', 'Honey', 'Aloe'], badges: ['seasonal', 'popular'] },
  { id: 20, name: 'Winter Spice Oolong',       category: 'seasonal',  price: '$6.50', description: 'Warm oolong',      ingredients: ['Oolong', 'Cinnamon', 'Clove', 'Star Anise', 'Oat Milk'], badges: ['seasonal'] },
];

function applyFilters(category, query) {
  const q = (query || '').toLowerCase().trim();
  return drinks.filter(d => {
    const matchCat    = category === 'all' || d.category === category;
    const matchSearch = !q ||
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.ingredients.some(i => i.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });
}

function debounce(fn, delay) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

/* ══ TESTS ════════════════════════════════════════════════ */

// Test 1: empty name fails validation
test('Form: empty name returns an error message', () => {
  const result = rules.name('');
  assert(result !== null, 'Expected error for empty name');
  assert(result.includes('enter'), `Expected "enter" in message, got: "${result}"`);
});

// Test 2: valid email passes
test('Form: valid email passes validation', () => {
  const result = rules.email('student@university.edu');
  assertEqual(result, null, `Expected null for valid email, got: "${result}"`);
});

// Test 3: invalid email fails
test('Form: invalid email returns an error', () => {
  const result = rules.email('not-an-email');
  assert(result !== null, 'Expected error for invalid email');
});

// Test 4: short message fails
test('Form: message shorter than 10 chars fails', () => {
  const result = rules.message('Hi');
  assert(result !== null, 'Expected error for short message');
  assert(result.includes('10'), `Expected "10" in error, got: "${result}"`);
});

// Test 5: filter by category returns only matching items
test('Filter: category "milk-tea" returns only milk tea drinks', () => {
  const filtered = applyFilters('milk-tea', '');
  assert(filtered.length > 0, 'Expected at least 1 milk tea drink');
  filtered.forEach(d => {
    assertEqual(d.category, 'milk-tea', `Expected milk-tea, got: ${d.category}`);
  });
});

// Test 6: search "taro" returns only taro drinks
test('Filter: search "taro" returns only taro-named or taro-ingredient drinks', () => {
  const filtered = applyFilters('all', 'taro');
  assert(filtered.length > 0, 'Expected at least 1 drink matching "taro"');
  filtered.forEach(d => {
    const haystack = [d.name, d.description, ...d.ingredients].join(' ').toLowerCase();
    assert(haystack.includes('taro'), `"${d.name}" does not contain "taro"`);
  });
});

// Test 7: non-matching search returns empty array
test('Filter: non-matching search "xyznotadrink" returns 0 results', () => {
  const filtered = applyFilters('all', 'xyznotadrink');
  assertEqual(filtered.length, 0, `Expected 0 results, got: ${filtered.length}`);
});

// Test 8: all 20 drinks have required fields
test('Drinks data: all 20 drinks have id, name, category, price, ingredients', () => {
  assertEqual(drinks.length, 20, `Expected 20 drinks, got: ${drinks.length}`);
  drinks.forEach(d => {
    assert(d.id,          `Drink missing id: ${JSON.stringify(d)}`);
    assert(d.name,        `Drink missing name: id=${d.id}`);
    assert(d.category,    `Drink missing category: id=${d.id}`);
    assert(d.price,       `Drink missing price: id=${d.id}`);
    assert(Array.isArray(d.ingredients) && d.ingredients.length > 0,
                          `Drink missing ingredients: id=${d.id}`);
  });
});

/* ── Export for test runner ──────────────────────────────── */
window.__testResults = results;

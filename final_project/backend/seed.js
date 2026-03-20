'use strict';

/**
 * seed.js — Populate the drinks table from the menu data.
 * Safe to run multiple times: only inserts if the table is empty.
 */

const db = require('./db');

const drinks = [
  /* ── Milk Tea ── */
  { id: 1,  name: 'Brown Sugar Boba Milk Tea', category: 'milk-tea', price: '$6.50',
    description: 'Our signature drink — rich brown sugar syrup swirled into fresh whole milk with hand-cooked tapioca pearls.',
    ingredients: ['Black Tea', 'Whole Milk', 'Brown Sugar', 'Tapioca Pearls'],
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    alt: 'Brown sugar boba milk tea with caramel swirls in a clear cup',
    badges: ['popular'] },

  { id: 2,  name: 'Classic Milk Tea', category: 'milk-tea', price: '$5.00',
    description: 'Smooth black tea blended with creamy milk — simple, timeless, and endlessly satisfying.',
    ingredients: ['Black Tea', 'Whole Milk', 'Cane Sugar', 'Tapioca Pearls'],
    img: 'https://images.unsplash.com/photo-1607703703520-bb638e84caf2?w=600&q=80',
    alt: 'Classic milk tea in a plastic cup with a wide straw',
    badges: [] },

  { id: 3,  name: 'Taro Milk Tea', category: 'milk-tea', price: '$6.00',
    description: 'Velvety taro root blended with creamy milk tea and a hint of vanilla. Beautifully purple.',
    ingredients: ['Taro Powder', 'Oolong Tea', 'Oat Milk', 'Tapioca Pearls'],
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
    alt: 'Purple taro milk tea with tapioca pearls in a plastic cup',
    badges: ['popular'] },

  { id: 4,  name: 'Matcha Milk Tea', category: 'milk-tea', price: '$6.50',
    description: 'Ceremonial grade matcha whisked smooth and blended with oat milk — earthy, creamy perfection.',
    ingredients: ['Ceremonial Matcha', 'Oat Milk', 'Honey', 'Tapioca Pearls'],
    img: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=600&q=80',
    alt: 'Green matcha latte with foam in a ceramic cup',
    badges: [] },

  { id: 5,  name: 'Tiger Sugar Milk Tea', category: 'milk-tea', price: '$7.00',
    description: 'House-made brown sugar caramel striped dramatically through silky oolong milk tea. Instagram-worthy.',
    ingredients: ['Oolong Tea', 'Whole Milk', 'Tiger Sugar Syrup', 'Tapioca Pearls'],
    img: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=600&q=80',
    alt: 'Tiger sugar milk tea with dramatic brown sugar stripes on the cup wall',
    badges: ['popular'] },

  { id: 6,  name: 'Hokkaido Milk Tea', category: 'milk-tea', price: '$6.50',
    description: 'Japanese Hokkaido-style milk tea made with premium black tea and rich heavy cream.',
    ingredients: ['Black Tea', 'Heavy Cream', 'Caramel Syrup', 'Pudding'],
    img: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80',
    alt: 'Creamy Hokkaido milk tea in a tall glass cup',
    badges: ['new'] },

  /* ── Fruit Tea ── */
  { id: 7,  name: 'Mango Passion Fruit Tea', category: 'fruit-tea', price: '$5.50',
    description: 'Bright tropical mango with tart passion fruit over sparkling green tea and lychee jelly.',
    ingredients: ['Green Tea', 'Mango Purée', 'Passion Fruit', 'Lychee Jelly'],
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    alt: 'Bright yellow-orange mango passion fruit tea with colorful jelly in a glass',
    badges: ['popular', 'new'] },

  { id: 8,  name: 'Strawberry Lychee Tea', category: 'fruit-tea', price: '$5.50',
    description: 'Fresh strawberry purée with fragrant lychee jelly over jasmine tea — light and summer-perfect.',
    ingredients: ['Jasmine Tea', 'Strawberry Purée', 'Lychee Jelly', 'Basil Seeds'],
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
    alt: 'Pink strawberry lychee fruit tea in a clear plastic cup',
    badges: [] },

  { id: 9,  name: 'Peach Oolong Tea', category: 'fruit-tea', price: '$5.00',
    description: 'Fragrant oolong tea gently sweetened with ripe peach syrup and aloe vera for a refreshing finish.',
    ingredients: ['Oolong Tea', 'Peach Syrup', 'Aloe Vera', 'Ice'],
    img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
    alt: 'Amber peach oolong bubble tea with boba pearls and peach slices, red striped straws',
    badges: [] },

  { id: 10, name: 'Watermelon Mint Tea', category: 'fruit-tea', price: '$5.50',
    description: 'Crisp watermelon juice blended with fresh mint leaves over chilled hibiscus tea.',
    ingredients: ['Hibiscus Tea', 'Watermelon Juice', 'Fresh Mint', 'Honey'],
    img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80',
    alt: 'Red watermelon mint tea with fresh mint garnish in a mason jar',
    badges: ['new'] },

  { id: 11, name: 'Passion Fruit Green Tea', category: 'fruit-tea', price: '$5.00',
    description: 'Classic tart passion fruit syrup shaken with high-mountain green tea over crushed ice.',
    ingredients: ['Green Tea', 'Passion Fruit Syrup', 'Lemon', 'Ice'],
    img: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600&q=80',
    alt: 'Golden passion fruit iced tea in a rounded glass with ice cubes and halved passion fruit',
    badges: [] },

  { id: 12, name: 'Berry Bliss Tea', category: 'fruit-tea', price: '$6.00',
    description: 'Mixed berry compote with black currant tea — antioxidant-rich and deeply fruity.',
    ingredients: ['Black Currant Tea', 'Mixed Berries', 'Raspberry Syrup', 'Basil Seeds'],
    img: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&q=80',
    alt: 'Deep purple berry bliss tea with floating mixed berries',
    badges: ['popular'] },

  /* ── Smoothies ── */
  { id: 13, name: 'Mango Coconut Smoothie', category: 'smoothie', price: '$7.00',
    description: 'Thick mango sorbet blended with coconut cream — tropical, creamy, and impossibly smooth.',
    ingredients: ['Mango Sorbet', 'Coconut Cream', 'Oat Milk', 'Tapioca Pearls'],
    img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80',
    alt: 'Orange mango coconut smoothie with whipped cream on top',
    badges: [] },

  { id: 14, name: 'Strawberry Banana Smoothie', category: 'smoothie', price: '$7.00',
    description: 'Classic strawberry and banana blended with Greek yogurt for a protein-rich, creamy treat.',
    ingredients: ['Strawberry', 'Banana', 'Greek Yogurt', 'Honey', 'Boba'],
    img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80',
    alt: 'Pink strawberry banana smoothie in a glass cup with a paper straw',
    badges: ['popular'] },

  { id: 15, name: 'Avocado Taro Smoothie', category: 'smoothie', price: '$7.50',
    description: 'Ripe avocado blended with taro and oat milk — nutty, creamy, and surprisingly addictive.',
    ingredients: ['Avocado', 'Taro Powder', 'Oat Milk', 'Agave', 'Tapioca Pearls'],
    img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80',
    alt: 'Green-purple avocado taro smoothie with boba pearls',
    badges: ['new'] },

  { id: 16, name: 'Honeydew Milk Smoothie', category: 'smoothie', price: '$6.50',
    description: 'Chilled honeydew melon blended with sweet cream — light green, refreshing, and subtly sweet.',
    ingredients: ['Honeydew Melon', 'Heavy Cream', 'Coconut Milk', 'Lychee Jelly'],
    img: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&q=80',
    alt: 'Pale green honeydew milk smoothie in a tall glass',
    badges: [] },

  /* ── Seasonal ── */
  { id: 17, name: 'Cherry Blossom Latte', category: 'seasonal', price: '$7.50',
    description: 'Spring seasonal — delicate sakura syrup blended with creamy white tea latte and pink boba.',
    ingredients: ['White Tea', 'Sakura Syrup', 'Oat Milk', 'Pink Tapioca Pearls'],
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    alt: 'Pale pink cherry blossom latte with cherry blossom garnish',
    badges: ['seasonal', 'new'] },

  { id: 18, name: 'Pumpkin Spice Milk Tea', category: 'seasonal', price: '$7.00',
    description: 'Fall seasonal — house pumpkin spice syrup, cinnamon, and chai tea with creamy oat milk.',
    ingredients: ['Chai Tea', 'Pumpkin Spice Syrup', 'Oat Milk', 'Cinnamon', 'Boba'],
    img: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80',
    alt: 'Warm orange pumpkin spice milk tea with cinnamon dusting',
    badges: ['seasonal'] },

  { id: 19, name: 'Lavender Honey Earl Grey', category: 'seasonal', price: '$7.00',
    description: 'Limited edition — aromatic Earl Grey with house lavender syrup, honey, and lemon verbena.',
    ingredients: ['Earl Grey Tea', 'Lavender Syrup', 'Oat Milk', 'Honey', 'Aloe Vera'],
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
    alt: 'Purple lavender honey Earl Grey tea in a glass',
    badges: ['seasonal', 'popular'] },

  { id: 20, name: 'Winter Spice Oolong', category: 'seasonal', price: '$6.50',
    description: 'Winter seasonal — warm oolong with cinnamon, clove, and star anise. Holiday in a cup.',
    ingredients: ['Oolong Tea', 'Cinnamon', 'Clove', 'Star Anise', 'Oat Milk'],
    img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80',
    alt: 'Amber winter spice oolong tea with star anise garnish',
    badges: ['seasonal'] },
];

const existing = db.prepare('SELECT COUNT(*) as count FROM drinks').get();
if (existing.count === 0) {
  const insert = db.prepare(`
    INSERT INTO drinks (id, name, category, price, description, ingredients, img, alt, badges)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  db.exec('BEGIN');
  try {
    for (const d of drinks) {
      insert.run(
        d.id, d.name, d.category, d.price, d.description,
        JSON.stringify(d.ingredients), d.img, d.alt, JSON.stringify(d.badges)
      );
    }
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
  console.log(`Seeded ${drinks.length} drinks into SQLite.`);
} else {
  console.log(`Drinks table already has ${existing.count} rows — skipping seed.`);
}

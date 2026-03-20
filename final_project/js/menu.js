/* ============================================================
   Bubble Bliss — menu.js
   Drink data · Filter tabs · Debounced search ·
   Card rendering · Modal · Customization builder
   ============================================================ */

'use strict';

/* ── Drink Data ─────────────────────────────────────────── */
let drinks = [
  /* ── Milk Tea ── */
  { id: 1, name: 'Brown Sugar Boba Milk Tea', category: 'milk-tea', price: '$6.50',
    description: 'Our signature drink — rich brown sugar syrup swirled into fresh whole milk with hand-cooked tapioca pearls.',
    ingredients: ['Black Tea', 'Whole Milk', 'Brown Sugar', 'Tapioca Pearls'],
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    alt: 'Brown sugar boba milk tea with caramel swirls in a clear cup',
    badges: ['popular'] },

  { id: 2, name: 'Classic Milk Tea', category: 'milk-tea', price: '$5.00',
    description: 'Smooth black tea blended with creamy milk — simple, timeless, and endlessly satisfying.',
    ingredients: ['Black Tea', 'Whole Milk', 'Cane Sugar', 'Tapioca Pearls'],
    img: 'https://images.unsplash.com/photo-1607703703520-bb638e84caf2?w=600&q=80',
    alt: 'Classic milk tea in a plastic cup with a wide straw',
    badges: [] },

  { id: 3, name: 'Taro Milk Tea', category: 'milk-tea', price: '$6.00',
    description: 'Velvety taro root blended with creamy milk tea and a hint of vanilla. Beautifully purple.',
    ingredients: ['Taro Powder', 'Oolong Tea', 'Oat Milk', 'Tapioca Pearls'],
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
    alt: 'Purple taro milk tea with tapioca pearls in a plastic cup',
    badges: ['popular'] },

  { id: 4, name: 'Matcha Milk Tea', category: 'milk-tea', price: '$6.50',
    description: 'Ceremonial grade matcha whisked smooth and blended with oat milk — earthy, creamy perfection.',
    ingredients: ['Ceremonial Matcha', 'Oat Milk', 'Honey', 'Tapioca Pearls'],
    img: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=600&q=80',
    alt: 'Green matcha latte with foam in a ceramic cup',
    badges: [] },

  { id: 5, name: 'Tiger Sugar Milk Tea', category: 'milk-tea', price: '$7.00',
    description: 'House-made brown sugar caramel striped dramatically through silky oolong milk tea. Instagram-worthy.',
    ingredients: ['Oolong Tea', 'Whole Milk', 'Tiger Sugar Syrup', 'Tapioca Pearls'],
    img: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=600&q=80',
    alt: 'Tiger sugar milk tea with dramatic brown sugar stripes on the cup wall',
    badges: ['popular'] },

  { id: 6, name: 'Hokkaido Milk Tea', category: 'milk-tea', price: '$6.50',
    description: 'Japanese Hokkaido-style milk tea made with premium black tea and rich heavy cream.',
    ingredients: ['Black Tea', 'Heavy Cream', 'Caramel Syrup', 'Pudding'],
    img: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80',
    alt: 'Creamy Hokkaido milk tea in a tall glass cup',
    badges: ['new'] },

  /* ── Fruit Tea ── */
  { id: 7, name: 'Mango Passion Fruit Tea', category: 'fruit-tea', price: '$5.50',
    description: 'Bright tropical mango with tart passion fruit over sparkling green tea and lychee jelly.',
    ingredients: ['Green Tea', 'Mango Purée', 'Passion Fruit', 'Lychee Jelly'],
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    alt: 'Bright yellow-orange mango passion fruit tea with colorful jelly in a glass',
    badges: ['popular', 'new'] },

  { id: 8, name: 'Strawberry Lychee Tea', category: 'fruit-tea', price: '$5.50',
    description: 'Fresh strawberry purée with fragrant lychee jelly over jasmine tea — light and summer-perfect.',
    ingredients: ['Jasmine Tea', 'Strawberry Purée', 'Lychee Jelly', 'Basil Seeds'],
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
    alt: 'Pink strawberry lychee fruit tea in a clear plastic cup',
    badges: [] },

  { id: 9, name: 'Peach Oolong Tea', category: 'fruit-tea', price: '$5.00',
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

/* ── State ───────────────────────────────────────────────── */
let activeCategory = 'all';
let searchQuery    = '';
let currentDrinkId = null;

/* ── Favorites (localStorage) ───────────────────────────── */
function getFavId() { return localStorage.getItem('bb-fav-id'); }

function toggleFavorite(id, name, btn) {
  const current = getFavId();
  if (current === String(id)) {
    // Un-favorite
    localStorage.removeItem('bb-fav-id');
    localStorage.removeItem('bb-fav-name');
    if (btn) { btn.textContent = '🤍'; btn.classList.remove('active'); }
    window.showToast && window.showToast('Removed from favorites');
  } else {
    // Set as favorite (only one at a time)
    localStorage.setItem('bb-fav-id',   String(id));
    localStorage.setItem('bb-fav-name', name);
    // Reset all other heart buttons
    document.querySelectorAll('.heart-btn').forEach(b => {
      b.textContent = '🤍'; b.classList.remove('active');
    });
    if (btn) { btn.textContent = '❤️'; btn.classList.add('active'); }
    window.showToast && window.showToast(`${name} saved as your favorite ❤️`);
  }
  updateFaveGreeting();
}

function updateFaveGreeting() {
  const el   = document.getElementById('fave-greeting');
  const name = localStorage.getItem('bb-fav-name');
  if (!el) return;
  if (name) {
    el.textContent = `❤️ Your go-to: ${name} — we remember.`;
    el.classList.add('visible');
  } else {
    el.classList.remove('visible');
  }
}

/* ── Utilities ───────────────────────────────────────────── */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/* ── Filter & Render ─────────────────────────────────────── */
function applyFilters() {
  const q = searchQuery.toLowerCase().trim();
  const filtered = drinks.filter(d => {
    const matchCat    = activeCategory === 'all' || d.category === activeCategory;
    const matchSearch = !q ||
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.ingredients.some(i => i.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });
  renderCards(filtered);
}

function renderCards(list) {
  const grid     = document.getElementById('drinks-grid');
  const noResult = document.getElementById('no-results');
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = '';
    noResult.classList.add('visible');
    return;
  }
  noResult.classList.remove('visible');

  const favId = getFavId();
  grid.innerHTML = list.map(d => {
    const isFav = favId === String(d.id);
    const speakScript = `event.stopPropagation();window.speakText&&window.speakText('${
      (d.name + '. ' + d.price + '. ' + d.description).replace(/'/g, '\u2019')
    }',this)`;
    const heartScript = `event.stopPropagation();toggleFavorite(${d.id},'${d.name.replace(/'/g, '\u2019')}',this)`;
    return `
    <article class="card" tabindex="0"
             data-id="${d.id}"
             role="button"
             aria-label="View details for ${d.name}, ${d.price}">
      <div class="card__img-wrap">
        <img src="${d.img}" alt="${d.alt}" loading="lazy" width="600" height="400">
        <div class="card__badges">
          ${d.badges.map(b => `<span class="badge badge--${b}">${b}</span>`).join('')}
          <span class="badge badge--${d.category}">${d.category.replace('-', ' ')}</span>
        </div>
        <button class="listen-btn" tabindex="-1" aria-hidden="true"
                data-default-label="Listen to description"
                title="Listen to description"
                onclick="${speakScript}">🔊</button>
        <button class="heart-btn ${isFav ? 'active' : ''}" tabindex="-1" aria-hidden="true"
                title="${isFav ? 'Remove from favorites' : 'Save as favorite'}"
                onclick="${heartScript}">${isFav ? '❤️' : '🤍'}</button>
      </div>
      <div class="card__body">
        <p class="card__category">${d.category.replace('-', ' ')}</p>
        <h3 class="card__name">${d.name}</h3>
        <p class="card__desc">${d.description}</p>
        <div class="card__footer">
          <span class="card__price">${d.price}</span>
          <span class="card__action">Customize →</span>
        </div>
      </div>
    </article>`; }).join('');

  updateFaveGreeting();

  // Observe new cards for scroll animation
  grid.querySelectorAll('.card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 40}ms`;
    requestAnimationFrame(() => {
      setTimeout(() => card.classList.add('visible'), 20);
    });
  });
}

/* ── Filter Tabs ─────────────────────────────────────────── */
const tabs = document.querySelectorAll('.filter-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => {
      t.setAttribute('aria-selected', 'false');
      t.classList.remove('active');
    });
    tab.setAttribute('aria-selected', 'true');
    tab.classList.add('active');
    activeCategory = tab.dataset.category;
    applyFilters();
  });

  // Arrow key navigation for tabs (ARIA tablist pattern)
  tab.addEventListener('keydown', (e) => {
    const all = [...tabs];
    const idx = all.indexOf(e.target);
    if (e.key === 'ArrowRight') {
      all[(idx + 1) % all.length].focus();
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      all[(idx - 1 + all.length) % all.length].focus();
      e.preventDefault();
    }
  });
});

/* ── Search ──────────────────────────────────────────────── */
const searchInput = document.getElementById('search-input');
if (searchInput) {
  const handleSearch = debounce((e) => {
    searchQuery = e.target.value;
    applyFilters();
  }, 300);
  searchInput.addEventListener('input', handleSearch);
}

/* ── Modal ───────────────────────────────────────────────── */
const overlay    = document.getElementById('modal-overlay');
const closeBtn   = document.getElementById('modal-close');
const addOrderBtn= document.getElementById('add-to-order');

// Open modal on card click or Enter/Space
const grid = document.getElementById('drinks-grid');
if (grid) {
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) openModal(parseInt(card.dataset.id, 10));
  });
  grid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.card');
      if (card) { e.preventDefault(); openModal(parseInt(card.dataset.id, 10)); }
    }
  });
}

function openModal(id) {
  const drink = drinks.find(d => d.id === id);
  if (!drink) return;
  currentDrinkId = id;

  document.getElementById('modal-title').textContent       = drink.name;
  document.getElementById('modal-price').textContent       = drink.price;
  document.getElementById('modal-desc').textContent        = drink.description;
  document.getElementById('modal-img').src                 = drink.img;
  document.getElementById('modal-img').alt                 = drink.alt;

  // Badges
  document.getElementById('modal-badges').innerHTML =
    drink.badges.map(b => `<span class="badge badge--${b}">${b}</span>`).join(' ') +
    `<span class="badge badge--${drink.category}">${drink.category.replace('-', ' ')}</span>`;

  // Ingredients
  document.getElementById('modal-ingredients').innerHTML =
    drink.ingredients.map(i => `<span class="ingredient-tag">${i}</span>`).join('');

  // Listen button (Web Speech API)
  const listenWrap = document.getElementById('modal-listen-wrap');
  if (listenWrap && window.speechSynthesis) {
    const fullText = `${drink.name}. ${drink.price}. ${drink.description}. Ingredients: ${drink.ingredients.join(', ')}.`;
    listenWrap.innerHTML = `<button class="listen-inline-btn" id="modal-listen-btn"
        data-default-label="Listen to description"
        aria-label="Listen to description"
        onclick="window.speakText&&window.speakText(${JSON.stringify(fullText)},this)">
      🔊 Listen
    </button>`;
  } else if (listenWrap) {
    listenWrap.innerHTML = '';
  }

  // Reset customizer
  resetCustomizer();

  // Show overlay
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Focus close button
  setTimeout(() => closeBtn.focus(), 50);
}

function closeModal() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (window.speechSynthesis) window.speechSynthesis.cancel();

  // Return focus to the card that opened the modal
  if (currentDrinkId !== null) {
    const card = document.querySelector(`.card[data-id="${currentDrinkId}"]`);
    if (card) card.focus();
    currentDrinkId = null;
  }
}

// Close on ✕ button
if (closeBtn) closeBtn.addEventListener('click', closeModal);

// Close on backdrop click
if (overlay) {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) {
    closeModal();
  }
});

// Focus trap inside modal
const modalBox = document.getElementById('modal-box');
if (modalBox) {
  modalBox.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = modalBox.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });
}

/* ── Customization Builder ───────────────────────────────── */
function resetCustomizer() {
  // Sweetness — default 50%
  document.querySelectorAll('#sweetness-options .custom-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.value === '50');
  });
  // Ice — default regular
  document.querySelectorAll('#ice-options .custom-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.value === 'regular');
  });
  updateCupViz(50);
}

function updateCupViz(sweetness) {
  const fill  = document.getElementById('cup-fill');
  const label = document.getElementById('cup-label');
  if (!fill || !label) return;
  // Map 0–100% sweetness to 20–90% cup fill height
  const height = 20 + (sweetness / 100) * 70;
  fill.style.height = height + '%';
  label.textContent = sweetness + '% Sweet';
}

// Sweetness buttons
const sweetnessOptions = document.getElementById('sweetness-options');
if (sweetnessOptions) {
  sweetnessOptions.addEventListener('click', (e) => {
    const btn = e.target.closest('.custom-btn');
    if (!btn) return;
    sweetnessOptions.querySelectorAll('.custom-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateCupViz(parseInt(btn.dataset.value, 10));
  });
}

// Ice buttons
const iceOptions = document.getElementById('ice-options');
if (iceOptions) {
  iceOptions.addEventListener('click', (e) => {
    const btn = e.target.closest('.custom-btn');
    if (!btn) return;
    iceOptions.querySelectorAll('.custom-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
}

// Add to Order → cart
if (addOrderBtn) {
  addOrderBtn.addEventListener('click', () => {
    const drink = drinks.find(d => d.id === currentDrinkId);
    if (!drink) return;
    const sweetBtn = sweetnessOptions && sweetnessOptions.querySelector('.custom-btn.active');
    const iceBtn   = iceOptions && iceOptions.querySelector('.custom-btn.active');
    const sweet = sweetBtn ? sweetBtn.dataset.value + '% sweet' : '50% sweet';
    const ice   = iceBtn   ? iceBtn.dataset.value + ' ice'      : 'regular ice';

    if (typeof window.addToCart === 'function') {
      window.addToCart({
        id: drink.id,
        name: drink.name,
        price: drink.price,
        img: drink.img,
        sweet,
        ice,
      });
    } else {
      window.showToast(`Added: ${drink.name} — ${sweet}, ${ice} 🧋`);
    }
    closeModal();
  });
}

/* ── Initial render ──────────────────────────────────────── */
// Try to load drinks from the backend API; fall back to the hardcoded array
// if the server is not running (progressive enhancement).
(async function init() {
  try {
    const res = await fetch('/api/drinks');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        drinks = data;
      }
    }
  } catch (_) {
    // Server not running — use hardcoded drinks above
  }
  applyFilters();
})();

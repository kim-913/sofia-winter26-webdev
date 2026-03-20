/* ============================================================
   Bubble Bliss — main.js
   Sticky nav · Hamburger menu · Scroll animations ·
   Today's Special · Featured drinks · Today's table row
   ============================================================ */

'use strict';

/* ── Sticky nav shadow on scroll ─────────────────────────── */
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

/* ── Scroll progress bar ─────────────────────────────────── */
(function () {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
  }, { passive: true });
})();

/* ── Hamburger menu ──────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('main-nav');

if (hamburger && mainNav) {
  hamburger.addEventListener('click', toggleNav);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      closeNav();
      hamburger.focus();
    }
  });

  // Close when a nav link is clicked (mobile)
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('nav-open')) closeNav();
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (document.body.classList.contains('nav-open') &&
        !header.contains(e.target)) {
      closeNav();
    }
  });
}

function toggleNav() {
  const isOpen = document.body.classList.toggle('nav-open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
}
function closeNav() {
  document.body.classList.remove('nav-open');
  hamburger.setAttribute('aria-expanded', 'false');
}

/* ── Intersection Observer — scroll-in animations ─────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in, .card').forEach(el => observer.observe(el));

/* ── Apple-like experience enhancements ─────────────────── */
(function () {

  /* 1. Smooth page entrance fade */
  const html = document.documentElement;
  html.style.opacity = '0';
  html.style.transition = 'opacity 0.45s ease';
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () =>
      requestAnimationFrame(() => { html.style.opacity = '1'; })
    );
  } else {
    requestAnimationFrame(() => { html.style.opacity = '1'; });
  }

  /* 2. Hero word reveal — split heading text into per-word spans */
  document.querySelectorAll('.hero__title, .page-hero__title').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w, i) =>
      `<span class="wr" style="--i:${i}">${w}</span>`
    ).join(' ');
    el.classList.add('wr-ready');
  });

  /* 3. Hero parallax — content drifts and fades as you scroll away */
  const heroContent = document.querySelector('.hero__content, .page-hero .container');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < 650) {
        heroContent.style.transform = `translateY(${y * 0.22}px)`;
        heroContent.style.opacity   = String(Math.max(0, 1 - y * 0.0018));
      }
    }, { passive: true });
  }

  /* 4. Mouse-parallax glow orbs — each orb floats at a different depth */
  const hero = document.querySelector('.hero');
  const orbs = document.querySelectorAll('.hero__orb');
  if (hero && orbs.length) {
    const depths = [50, 32, 20]; // px of movement at full mouse offset
    hero.addEventListener('mousemove', (e) => {
      const r  = hero.getBoundingClientRect();
      const cx = (e.clientX - r.left)  / r.width  - 0.5; // -0.5 → +0.5
      const cy = (e.clientY - r.top)   / r.height - 0.5;
      orbs.forEach((orb, i) => {
        const d = depths[i] || 20;
        orb.style.transform = `translate(${cx * d}px, ${cy * d}px)`;
      });
    });
    hero.addEventListener('mouseleave', () => {
      orbs.forEach(orb => { orb.style.transform = ''; });
    });
  }

  /* 5. 3-D card tilt on mouse hover */
  let activeCard = null;
  function resetTiltCard(c) {
    if (!c) return;
    c.style.transition = 'transform 0.45s cubic-bezier(0.23,1,0.32,1), box-shadow 0.45s ease';
    c.style.transform  = '';
    c.style.boxShadow  = '';
  }
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.card');
    if (card !== activeCard) { resetTiltCard(activeCard); activeCard = card; }
    if (!card) return;
    card.style.transition = 'transform 0.08s ease, box-shadow 0.08s ease';
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5; // -0.5 → 0.5
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateY(-5px) scale(1.02)`;
    card.style.boxShadow = `${-x * 20}px ${-y * 20}px 40px rgba(139,123,181,0.22)`;
  });
  document.addEventListener('mouseleave', () => resetTiltCard(activeCard));

  /* 5. Count-up animation for stat numbers (about page) */
  function countUp(el) {
    const raw    = el.textContent.trim();
    const suffix = raw.replace(/^[\d.]+/, '');
    const target = parseFloat(raw);
    if (isNaN(target)) return;
    const dur = 1400;
    const t0  = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3); // cubic ease-out
      el.textContent = Math.round(target * ease) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }
  const cntObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        cntObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-item__number').forEach(el => cntObs.observe(el));

  /* 6. Staggered entrance — inject --stagger-i custom property on grid children */
  document.querySelectorAll('.grid-auto, .featured-grid, .values-grid, .team-grid, .stat-grid').forEach(grid => {
    [...grid.children].forEach((child, i) => child.style.setProperty('--stagger-i', i));
  });

  /* 7. Apple clip-reveal: section headings slide up through an invisible floor */
  document.querySelectorAll('.section-title').forEach(el => {
    // Don't double-wrap if already processed
    if (el.querySelector('.cr-inner')) return;
    el.innerHTML = `<span class="cr-inner">${el.innerHTML}</span>`;
    el.classList.add('clip-reveal');
    observer.observe(el);
  });

  /* 8. Auto-apply fade-in + stagger to grid children & section subtitles
        so EVERY content block scrolls in with the Apple spring effect */
  document.querySelectorAll(
    '.section-subtitle,' +
    '.grid-auto > *,' +
    '.values-grid > *,' +
    '.team-grid > *,' +
    '.stat-grid > *,' +
    '.featured-grid > *,' +
    '.location-cards > *'
  ).forEach(el => {
    if (el.classList.contains('fade-in') || el.classList.contains('clip-reveal')) return;
    el.classList.add('fade-in');
    observer.observe(el);
  });

})();

/* ── Today's Special (index.html) ───────────────────────── */
const specials = [
  { name: 'Brown Sugar Boba Milk Tea',  desc: 'Rich brown sugar syrup swirled with fresh milk and chewy tapioca pearls.' },
  { name: 'Taro Milk Tea',              desc: 'Velvety taro root blended with creamy milk tea and a hint of vanilla.' },
  { name: 'Mango Passion Fruit Tea',    desc: 'Bright tropical mango with tart passion fruit over sparkling ice tea.' },
  { name: 'Matcha Latte with Boba',     desc: 'Ceremonial grade matcha, oat milk, and a generous scoop of tapioca.' },
  { name: 'Strawberry Lychee Fruit Tea',desc: 'Fresh strawberry purée with fragrant lychee jelly — light and refreshing.' },
  { name: 'Tiger Sugar Milk Tea',       desc: 'House-made brown sugar caramel striped through silky oolong milk tea.' },
  { name: 'Honeydew Smoothie',          desc: 'Chilled honeydew blended to perfection with cream and boba pearls.' },
];

const specialName = document.getElementById('special-name');
const specialDesc = document.getElementById('special-desc');
if (specialName && specialDesc) {
  const today = new Date().getDay(); // 0=Sun … 6=Sat
  specialName.textContent = specials[today].name;
  specialDesc.textContent = specials[today].desc;
}

/* ── Featured drinks on Home page ───────────────────────── */
const featuredGrid = document.getElementById('featured-grid');
if (featuredGrid) {
  const featured = [
    { name: 'Brown Sugar Boba',    category: 'milk-tea',  price: '$6.50',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      alt: 'Brown sugar boba milk tea with caramel swirls in a clear cup',
      badges: ['popular'] },
    { name: 'Taro Milk Tea',       category: 'milk-tea',  price: '$6.00',
      img: 'https://images.unsplash.com/photo-1607703703520-bb638e84caf2?w=600&q=80',
      alt: 'Purple taro milk tea in a plastic cup with a wide black straw',
      badges: ['popular'] },
    { name: 'Mango Fruit Tea',     category: 'fruit-tea', price: '$5.50',
      img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
      alt: 'Bright orange mango fruit tea with lychee jelly in a glass',
      badges: ['new'] },
    { name: 'Matcha Latte',        category: 'milk-tea',  price: '$6.50',
      img: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=600&q=80',
      alt: 'Green matcha latte with foam art on top in a ceramic cup',
      badges: [] },
    { name: 'Strawberry Smoothie', category: 'smoothie',  price: '$7.00',
      img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80',
      alt: 'Pink strawberry smoothie with whipped cream and a paper straw',
      badges: ['new'] },
    { name: 'Tiger Sugar Tea',     category: 'seasonal',  price: '$7.00',
      img: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=600&q=80',
      alt: 'Tiger sugar milk tea with dramatic brown sugar stripes on the cup wall',
      badges: ['seasonal'] },
  ];

  featuredGrid.innerHTML = featured.map(d => `
    <article class="card" tabindex="0"
             aria-label="${d.name} — ${d.price}">
      <div class="card__img-wrap">
        <img src="${d.img}" alt="${d.alt}" loading="lazy" width="600" height="400">
        <div class="card__badges">
          ${d.badges.map(b => `<span class="badge badge--${b}">${b}</span>`).join('')}
          <span class="badge badge--${d.category}">${d.category.replace('-', ' ')}</span>
        </div>
      </div>
      <div class="card__body">
        <p class="card__category">${d.category.replace('-', ' ')}</p>
        <h3 class="card__name">${d.name}</h3>
        <div class="card__footer">
          <span class="card__price">${d.price}</span>
          <span class="card__action">View Menu →</span>
        </div>
      </div>
    </article>
  `).join('');

  // Re-observe newly created cards
  featuredGrid.querySelectorAll('.card').forEach(el => observer.observe(el));

  // Clicking a featured card goes to menu
  featuredGrid.addEventListener('click', () => {
    window.location.href = 'menu.html';
  });
  featuredGrid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') window.location.href = 'menu.html';
  });
}

/* ── Highlight today's row in hours table ────────────────── */
const hoursTable = document.getElementById('hours-table');
if (hoursTable) {
  const today = new Date().getDay();
  const row = hoursTable.querySelector(`tr[data-day="${today}"]`);
  if (row) row.classList.add('today');
}

/* ── Web Speech API — accessible audio descriptions ─────── */
(function setupSpeech() {
  if (!('speechSynthesis' in window)) return; // graceful degradation

  let currentUtterance = null;
  let currentBtn       = null;

  // Pick the nicest available voice (prefer natural-sounding en-US)
  function pickVoice() {
    const voices = speechSynthesis.getVoices();
    const preferred = [
      'Samantha', 'Karen', 'Moira', 'Tessa',   // macOS
      'Google US English', 'Microsoft Aria',      // Chrome / Edge
      'Alex',                                      // older macOS
    ];
    for (const name of preferred) {
      const v = voices.find(v => v.name === name);
      if (v) return v;
    }
    return voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
  }

  window.speakText = function(text, btn) {
    // Stop any current speech
    speechSynthesis.cancel();
    if (currentBtn) {
      currentBtn.classList.remove('speaking');
      currentBtn.setAttribute('aria-label', currentBtn.dataset.defaultLabel || 'Listen');
    }

    // Toggle off if same button
    if (currentBtn === btn && currentBtn) {
      currentBtn = null;
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate  = 0.92;   // slightly slower — clear and pleasant
    utterance.pitch = 1.05;
    utterance.volume = 1;

    // Voice might not be loaded yet on first call
    const setVoice = () => { const v = pickVoice(); if (v) utterance.voice = v; };
    setVoice();
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = setVoice;
    }

    utterance.onstart = () => {
      if (btn) {
        btn.classList.add('speaking');
        btn.setAttribute('aria-label', 'Stop audio (playing)');
        currentBtn = btn;
      }
    };
    utterance.onend = utterance.onerror = () => {
      if (btn) {
        btn.classList.remove('speaking');
        btn.setAttribute('aria-label', btn.dataset.defaultLabel || 'Listen');
      }
      currentBtn = null;
    };

    currentUtterance = utterance;
    speechSynthesis.speak(utterance);
  };

  // Stop speech when page unloads or user navigates
  window.addEventListener('beforeunload', () => speechSynthesis.cancel());
})();

/* ── Toast utility (shared across pages) ────────────────── */
window.showToast = function(msg, duration = 2500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
};

/* ── Cart System ─────────────────────────────────────────── */

// Inject cart HTML into every page
(function injectCart() {
  // Cart overlay + sidebar
  const cartHTML = `
    <div id="cart-overlay" class="cart-overlay" aria-hidden="true">
      <div class="cart-sidebar" role="dialog" aria-label="Your cart" id="cart-sidebar">
        <div class="cart-header">
          <h2>Your Order 🧋</h2>
          <button class="cart-close-btn" id="cart-close" aria-label="Close cart">✕</button>
        </div>
        <div class="cart-items" id="cart-items" aria-live="polite">
          <div class="cart-empty">
            <span class="cart-empty__icon">🧋</span>
            <p><strong>Your cart is empty</strong></p>
            <p>Browse the menu and add some drinks!</p>
          </div>
        </div>
        <div class="cart-footer">
          <div class="cart-total">
            <span>Total</span>
            <span class="cart-total__amount" id="cart-total">$0.00</span>
          </div>
          <button class="btn btn--purple cart-checkout-btn" id="cart-checkout" disabled>
            Place Order 🧋
          </button>
        </div>
      </div>
    </div>

    <div id="order-confirm" class="order-confirm" aria-hidden="true" role="dialog" aria-labelledby="order-confirm-title">
      <div class="order-confirm__box">
        <span class="order-confirm__icon" id="order-confirm-icon">🎉</span>
        <h2 id="order-confirm-title">Order Placed!</h2>
        <p id="order-confirm-msg">Your boba is being crafted with love...</p>
        <div class="order-confirm__eta" id="order-confirm-eta">Estimated wait: 8–12 minutes</div>
        <ul class="order-confirm__items" id="order-confirm-items" aria-label="Your order items"></ul>
        <button class="btn btn--purple" id="order-confirm-close">Keep Sipping 🧋</button>
      </div>
    </div>

    <button class="cart-fab" id="cart-fab" aria-label="View cart (0 items)">
      🧋
      <span class="cart-badge" id="cart-badge" aria-hidden="true">0</span>
    </button>`;

  document.body.insertAdjacentHTML('beforeend', cartHTML);
})();

// Cart state
let cartItems = JSON.parse(sessionStorage.getItem('bb-cart') || '[]');

function saveCart() {
  sessionStorage.setItem('bb-cart', JSON.stringify(cartItems));
}

function parsePrice(priceStr) {
  return parseFloat(priceStr.replace('$', '')) || 0;
}

function getCartTotal() {
  return cartItems.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);
}

function renderCart() {
  const itemsEl   = document.getElementById('cart-items');
  const totalEl   = document.getElementById('cart-total');
  const badgeEl   = document.getElementById('cart-badge');
  const fabEl     = document.getElementById('cart-fab');
  const checkoutBtn = document.getElementById('cart-checkout');
  if (!itemsEl) return;

  const totalCount = cartItems.reduce((n, i) => n + i.qty, 0);
  const total      = getCartTotal();

  // Update badge
  if (badgeEl) {
    badgeEl.textContent = totalCount;
    badgeEl.classList.toggle('visible', totalCount > 0);
  }
  if (fabEl) fabEl.setAttribute('aria-label', `View cart (${totalCount} item${totalCount !== 1 ? 's' : ''})`);
  if (totalEl) totalEl.textContent = '$' + total.toFixed(2);
  if (checkoutBtn) checkoutBtn.disabled = cartItems.length === 0;

  if (cartItems.length === 0) {
    itemsEl.innerHTML = `<div class="cart-empty">
      <span class="cart-empty__icon">🧋</span>
      <p><strong>Your cart is empty</strong></p>
      <p>Browse the menu and add some drinks!</p>
    </div>`;
    return;
  }

  itemsEl.innerHTML = cartItems.map((item, idx) => `
    <div class="cart-item" data-idx="${idx}">
      <img class="cart-item__img" src="${item.img}" alt="${item.name}" loading="lazy">
      <div>
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__mods">${item.sweet}, ${item.ice}</div>
        <div class="cart-item__controls">
          <button class="cart-item__qty-btn" data-action="dec" data-idx="${idx}" aria-label="Decrease quantity">−</button>
          <span class="cart-item__qty">${item.qty}</span>
          <button class="cart-item__qty-btn" data-action="inc" data-idx="${idx}" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="cart-item__price">$${(parsePrice(item.price) * item.qty).toFixed(2)}</div>
    </div>`).join('');
}

// Add to cart (called from menu.js)
window.addToCart = function(item) {
  // item = { id, name, price, img, sweet, ice }
  const existing = cartItems.find(
    c => c.id === item.id && c.sweet === item.sweet && c.ice === item.ice
  );
  if (existing) {
    existing.qty++;
  } else {
    cartItems.push({ ...item, qty: 1 });
  }
  saveCart();
  renderCart();
  window.showToast(`Added: ${item.name} 🧋`);
};

// Open / close cart
function openCart() {
  const overlay = document.getElementById('cart-overlay');
  if (!overlay) return;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('cart-close').focus();
}
function closeCart() {
  const overlay = document.getElementById('cart-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  document.getElementById('cart-fab').focus();
}

// Wire up cart events (after DOM is built)
document.addEventListener('DOMContentLoaded', function() {
  renderCart(); // Restore from sessionStorage on page load

  document.getElementById('cart-fab').addEventListener('click', openCart);
  document.getElementById('cart-close').addEventListener('click', closeCart);

  // Close on backdrop click
  document.getElementById('cart-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeCart();
  });

  // Qty +/− and remove
  document.getElementById('cart-items').addEventListener('click', function(e) {
    const btn = e.target.closest('.cart-item__qty-btn');
    if (!btn) return;
    const idx = parseInt(btn.dataset.idx, 10);
    const action = btn.dataset.action;
    if (action === 'inc') {
      cartItems[idx].qty++;
    } else if (action === 'dec') {
      cartItems[idx].qty--;
      if (cartItems[idx].qty <= 0) cartItems.splice(idx, 1);
    }
    saveCart();
    renderCart();
  });

  // Checkout
  document.getElementById('cart-checkout').addEventListener('click', placeOrder);

  // Order confirm close
  document.getElementById('order-confirm-close').addEventListener('click', function() {
    document.getElementById('order-confirm').classList.remove('open');
    document.getElementById('order-confirm').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.getElementById('cart-fab').focus();
  });
});

// Escape key closes cart
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('cart-overlay');
    if (overlay && overlay.classList.contains('open')) closeCart();
  }
});

// Fun order placement with personalized messages
const orderMessages = [
  { icon: '🧋', title: 'Order placed!',       msg: 'Your boba is being crafted with extra love. See you in a few!' },
  { icon: '🎉', title: 'Yes! Order received!', msg: 'We\'re on it. Your drinks will be ready before you can say "tapioca."' },
  { icon: '✨', title: 'On its way!',           msg: 'Our barista just did a happy dance. Your order is being made!' },
  { icon: '🫧', title: 'Bubbles incoming!',     msg: 'Hand-cooked pearls, house-made syrups — your patience is about to pay off.' },
];

function placeOrder() {
  if (cartItems.length === 0) return;

  const msg = orderMessages[Math.floor(Math.random() * orderMessages.length)];
  const confirmEl  = document.getElementById('order-confirm');
  const itemsListEl = document.getElementById('order-confirm-items');
  const etaEl      = document.getElementById('order-confirm-eta');

  document.getElementById('order-confirm-icon').textContent = msg.icon;
  document.getElementById('order-confirm-title').textContent = msg.title;
  document.getElementById('order-confirm-msg').textContent = msg.msg;

  const totalDrinks = cartItems.reduce((n, i) => n + i.qty, 0);
  etaEl.textContent = `Estimated wait: ${Math.max(5, totalDrinks * 3)}–${Math.max(8, totalDrinks * 4)} minutes`;

  itemsListEl.innerHTML = cartItems.map(i =>
    `<li>× ${i.qty} ${i.name} <span style="color:var(--color-gray)">(${i.sweet}, ${i.ice})</span> — $${(parsePrice(i.price)*i.qty).toFixed(2)}</li>`
  ).join('');

  // Persist order to backend (fire-and-forget; UI works without a server)
  fetch('/api/orders', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items:       cartItems.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty, sweet: i.sweet, ice: i.ice })),
      total_price: getCartTotal(),
      item_count:  totalDrinks,
    }),
  }).catch(() => {});

  closeCart();
  confirmEl.classList.add('open');
  confirmEl.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('order-confirm-close').focus();

  // Clear cart after order
  cartItems = [];
  saveCart();
  renderCart();
}

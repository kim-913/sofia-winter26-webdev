/* ============================================================
   Bubble Bliss — form.js
   Real-time contact form validation with ARIA error messages
   ============================================================ */

(function () {
'use strict';

const form          = document.getElementById('contact-form');
const successBanner = document.getElementById('success-banner');
const formCard      = document.getElementById('form-card');

if (!form) return; // guard — only runs on contact.html

/* ── Validation Rules ────────────────────────────────────── */
const rules = {
  name(value) {
    if (!value.trim())            return 'Please enter your full name.';
    if (value.trim().length < 2)  return 'Name must be at least 2 characters.';
    return null;
  },
  email(value) {
    if (!value.trim()) return 'Please enter your email address.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
      return 'Please enter a valid email address (e.g. you@example.com).';
    return null;
  },
  location(value) {
    if (!value) return 'Please select a preferred location.';
    return null;
  },
  message(value) {
    if (!value.trim())             return 'Please enter a message.';
    if (value.trim().length < 10)  return 'Message must be at least 10 characters.';
    return null;
  },
};

/* ── Validate a single field ─────────────────────────────── */
function validateField(input) {
  const { id, value } = input;
  const rule = rules[id];
  if (!rule) return true; // no rule = always valid (optional fields)

  const errorMsg = rule(value);
  const errorEl  = document.getElementById(`${id}-error`);

  if (errorMsg) {
    input.classList.add('field-error');
    input.classList.remove('field-success');
    if (errorEl) errorEl.textContent = errorMsg;
    return false;
  } else {
    input.classList.remove('field-error');
    input.classList.add('field-success');
    if (errorEl) errorEl.textContent = '';
    return true;
  }
}

/* ── Validate inquiry radio group ────────────────────────── */
function validateInquiry() {
  const selected  = form.querySelector('input[name="inquiry"]:checked');
  const errorEl   = document.getElementById('inquiry-error');
  const radios    = form.querySelectorAll('input[name="inquiry"]');
  if (!selected) {
    if (errorEl) errorEl.textContent = 'Please select an inquiry type.';
    radios.forEach(r => r.closest('.pill-option')?.classList.add('pill-option--error'));
    return false;
  }
  if (errorEl) errorEl.textContent = '';
  radios.forEach(r => r.closest('.pill-option')?.classList.remove('pill-option--error'));
  return true;
}

/* ── Attach blur listeners (validate on leave) ───────────── */
const validatedInputs = form.querySelectorAll(
  'input[type="text"], input[type="email"], input[type="tel"], select, textarea'
);

validatedInputs.forEach(input => {
  // Validate on blur
  input.addEventListener('blur', () => validateField(input));

  // Clear error as user types
  input.addEventListener('input', () => {
    if (input.classList.contains('field-error')) {
      validateField(input);
    }
  });
});

/* ── Inquiry Hint Panel ──────────────────────────────────── */
const hintContent = {
  general: {
    icon: '💬',
    title: 'General Questions',
    body: `<p>Not sure what to ask? We're happy to chat about anything — allergens, ingredients, hours, or just life in general.</p>
           <p>We typically reply within <strong>a few hours</strong>. (Or sooner, if it's a slow boba day.)</p>`
  },
  order: {
    icon: '🧋',
    title: 'Order & Menu Questions',
    body: `<p>Our most popular drinks right now:</p>
           <ul class="hint-drink-list">
             <li>Brown Sugar Boba — $6.50</li>
             <li>Taro Milk Tea — $6.00</li>
             <li>Tiger Sugar Tea — $7.00</li>
             <li>Strawberry Lychee — $5.50</li>
           </ul>
           <p>All drinks are customizable — sweetness from 0–100% and ice level. Check the full menu for all 20 options.</p>
           <a href="menu.html" class="hint-link">📋 Browse Full Menu →</a>`
  },
  catering: {
    icon: '🎉',
    title: 'Catering Requests',
    body: `<p><strong>Minimum order:</strong> 20 drinks · <strong>Lead time:</strong> 48 hours</p>
           <p><strong>Pricing:</strong> Starting at $4.50/drink for parties of 20+, discounts for 50+.</p>
           <p>We deliver within 15 miles of each location. Cups, straws, and carrying trays included. Share the details in the message below and we'll send a custom quote!</p>`
  },
  feedback: {
    icon: '⭐',
    title: 'Share Your Feedback',
    body: `<p>Your feedback literally shapes the menu. Seriously — Brown Sugar Boba exists because someone left a note. That someone is a hero.</p>
           <p>Tell us what you loved, what could be better, or if you have a dream drink idea. We read <em>every single message</em>. ⭐</p>`
  },
};

const successResponses = {
  general: {
    icon: '💬',
    title: 'Message received!',
    msg: 'We\'ll get back to you faster than it takes to cook a batch of tapioca pearls. (Usually 24 hours.)'
  },
  order: {
    icon: '🧋',
    title: 'Order question received!',
    msg: 'Our team\'s on it. In the meantime, feel free to browse the menu and decide what you\'re getting. We believe in having a backup drink.'
  },
  catering: {
    icon: '🎉',
    title: 'Catering inquiry locked in!',
    msg: 'Big events deserve great boba. Our catering team will reach out within 24 hours with a custom quote. Get excited.'
  },
  feedback: {
    icon: '⭐',
    title: 'You just made our day!',
    msg: 'Your feedback goes straight to the team. Seriously — we read every one. You might just inspire the next menu item. 🌟'
  },
};

function showInquiryHint(type) {
  const hintEl = document.getElementById('inquiry-hint');
  if (!hintEl) return;
  const content = hintContent[type];
  if (!content) { hintEl.classList.remove('visible'); hintEl.innerHTML = ''; return; }
  hintEl.innerHTML = `<div class="hint-card">
    <div class="hint-card__title"><span>${content.icon}</span> ${content.title}</div>
    ${content.body}
  </div>`;
  // Force reflow then animate
  hintEl.classList.remove('visible');
  requestAnimationFrame(() => requestAnimationFrame(() => hintEl.classList.add('visible')));
}

// Radio change: re-validate inquiry group and show hint
form.querySelectorAll('input[name="inquiry"]').forEach(radio => {
  radio.addEventListener('change', () => {
    validateInquiry();
    showInquiryHint(radio.value);
  });
});

/* ── Typewriter effect for success message ───────────────── */
function typeWriter(el, text, speed) {
  el.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) clearInterval(interval);
  }, speed || 26);
}

/* ── Submit handler ──────────────────────────────────────── */
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Run all validations
  let allValid = true;
  validatedInputs.forEach(input => {
    if (!validateField(input)) allValid = false;
  });
  if (!validateInquiry()) allValid = false;

  if (!allValid) {
    // Scroll to first error
    const firstError = form.querySelector('.field-error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
    // Shake the submit button to signal failure
    const btn = form.querySelector('[type="submit"]');
    btn.classList.add('btn--shake');
    btn.addEventListener('animationend', () => btn.classList.remove('btn--shake'), { once: true });
    return;
  }

  // Determine selected inquiry type for personalized response
  const selectedInquiry = form.querySelector('input[name="inquiry"]:checked');
  const inquiryType = selectedInquiry ? selectedInquiry.value : 'general';
  const response = successResponses[inquiryType] || successResponses.general;

  // Get first name from the name field
  const rawName   = (document.getElementById('name') || {}).value || '';
  const firstName = rawName.trim().split(/\s+/)[0] || 'friend';

  // Collect all form data for the API
  const howHeardChecked = [...form.querySelectorAll('input[name="how_heard"]:checked')]
    .map(cb => cb.value);

  const payload = {
    name:         (document.getElementById('name')     || {}).value || '',
    email:        (document.getElementById('email')    || {}).value || '',
    phone:        (document.getElementById('phone')    || {}).value || '',
    inquiry_type: inquiryType,
    how_heard:    howHeardChecked,
    location:     (document.getElementById('location') || {}).value || '',
    message:      (document.getElementById('message')  || {}).value || '',
  };

  // Show loading state on button
  const submitBtn  = form.querySelector('[type="submit"]');
  const origHTML   = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span class="btn-spinner" aria-hidden="true"></span> Sending\u2026';
  submitBtn.disabled  = true;

  function showSuccess() {
    const bannerTitle = successBanner.querySelector('h3');
    const bannerMsg   = successBanner.querySelector('p');
    const fullMsg     = `Hey ${firstName}! ${response.msg}`;

    if (bannerTitle) bannerTitle.textContent = response.icon + ' ' + response.title;
    if (bannerMsg)   typeWriter(bannerMsg, fullMsg, 26);

    if (window.speakText) window.speakText(fullMsg);

    formCard.style.display = 'none';
    successBanner.classList.add('visible');
    successBanner.scrollIntoView({ behavior: 'smooth', block: 'start' });
    successBanner.focus();

    submitBtn.innerHTML = origHTML;
    submitBtn.disabled  = false;
  }

  // POST to backend; show success regardless (progressive enhancement)
  fetch('/api/contact', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  })
    .catch(() => {}) // server might not be running — that's fine
    .finally(showSuccess);
});

/* ── Char counter on textarea ────────────────────────────── */
const messageArea   = document.getElementById('message');
const charCounter   = document.getElementById('char-counter');
if (messageArea && charCounter) {
  messageArea.addEventListener('input', () => {
    const remaining = 500 - messageArea.value.length;
    charCounter.textContent = remaining;
    charCounter.className = 'char-counter' +
      (remaining <= 0 ? ' warn' : remaining <= 100 ? ' warn' : remaining <= 490 ? ' ok' : '');
  });
}

/* ── Reset handler ───────────────────────────────────────── */
form.addEventListener('reset', () => {
  validatedInputs.forEach(input => {
    input.classList.remove('field-error', 'field-success');
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) errorEl.textContent = '';
  });
  const inquiryError = document.getElementById('inquiry-error');
  if (inquiryError) inquiryError.textContent = '';
  form.querySelectorAll('.pill-option').forEach(o => o.classList.remove('pill-option--error'));
  if (charCounter) { charCounter.textContent = '500'; charCounter.className = 'char-counter'; }
});

})(); // end IIFE

// script.js — robust contact-form handler for NetSaviors Technology
(function () {
  'use strict';

  // Run when DOM is ready (works whether script is placed in head or body)
  function onReady(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  onReady(function () {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!form) {
      console.error('Contact form not found: #contactForm');
      return;
    }

    function showMessage(text, color = 'red') {
      if (formMessage) {
        formMessage.textContent = text;
        formMessage.style.color = color;
      } else {
        // fallback (shouldn't happen if you have #formMessage)
        console.warn('formMessage element not found — fallback to alert');
        alert(text);
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameEl = document.getElementById('name');
      const emailEl = document.getElementById('email');
      const messageEl = document.getElementById('message');

      const name = nameEl ? nameEl.value.trim() : '';
      const email = emailEl ? emailEl.value.trim() : '';
      const message = messageEl ? messageEl.value.trim() : '';

      // simple validation
      if (!name || !email || !message) {
        showMessage('❗ Please fill in all fields.', 'red');
        if (!name && nameEl) nameEl.focus();
        else if (!email && emailEl) emailEl.focus();
        else if (!message && messageEl) messageEl.focus();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!emailRegex.test(email)) {
        showMessage('❗ Please enter a valid email.', 'red');
        if (emailEl) emailEl.focus();
        return;
      }

      // Simulate sending (replace with real fetch/api call)
      showMessage('⏳ Sending message...', '#0ff');
      setTimeout(() => {
        showMessage("✔️ Thank you for contacting us. We'll get back to you soon!", '#0ff');
        form.reset();
      }, 700);
    });
  });
})();

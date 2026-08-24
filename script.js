// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Sticky nav shadow on scroll
const nav = document.getElementById('nav');
const backToTop = document.getElementById('back-to-top');
function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 12);
  backToTop.classList.toggle('visible', window.scrollY > 500);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('menu-open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});
document.getElementById('nav-links').addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('menu-open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// Scroll-reveal animations
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => revealObserver.observe(el));

// Back to top button
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Order form -> mailto
const ORDER_EMAIL = 'hareemzahid147@gmail.com';

const orderForm = document.getElementById('order-form');
const formNote = document.getElementById('form-note');

orderForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const type = document.getElementById('f-type').value.trim();
  const message = document.getElementById('f-message').value.trim();

  if (!name || !email || !type || !message) {
    formNote.textContent = 'Please fill in every field so I have what I need to get back to you.';
    return;
  }

  const subject = `Order request from ${name} — ${type}`;
  const body =
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `What they're picturing: ${type}\n\n` +
    `Message:\n${message}`;

  const mailtoUrl =
    `mailto:${ORDER_EMAIL}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoUrl;

  formNote.textContent = 'Opening your email app with your order details filled in…';
});

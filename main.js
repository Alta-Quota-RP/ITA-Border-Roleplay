/* =============================================
   NY ITA RP — MAIN JS
   ============================================= */

// ===== TICKER DUPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
  const tickerInner = document.querySelector('.ticker-inner');
  if (tickerInner) {
    const clone = tickerInner.innerHTML;
    tickerInner.innerHTML += clone; // duplicate for seamless loop
  }
});

// ===== ANIMATED COUNTER =====
function animateCounter(el, target, duration = 1500) {
  const start = 0;
  const startTime = performance.now();
  const isFloat = target.toString().includes('.');

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    if (isFloat) {
      el.textContent = (eased * target).toLocaleString('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    } else {
      el.textContent = current.toLocaleString('it-IT');
    }

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// ===== INTERSECTION OBSERVER FOR COUNTERS =====
const counterEls = document.querySelectorAll('.big-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      const text = entry.target.textContent;
      const num = parseFloat(text.replace(/\./g, '').replace(',', '.'));
      if (!isNaN(num) && num > 10) {
        animateCounter(entry.target, num);
      }
    }
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));

// ===== SCROLL ANIMATIONS =====
const animateEls = document.querySelectorAll(
  '.step-card, .faction-card, .timeline-item, .shop-card, .rule-item'
);

const animObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animateEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ${i * 0.05}s ease, transform 0.5s ${i * 0.05}s ease`;
  animObserver.observe(el);
});

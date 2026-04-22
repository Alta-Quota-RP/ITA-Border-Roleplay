// chi-sono.js
document.addEventListener('DOMContentLoaded', () => {
  // Animate skill bars on scroll
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pct = entry.target.dataset.pct;
        entry.target.style.width = pct + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(el => skillObserver.observe(el));
});

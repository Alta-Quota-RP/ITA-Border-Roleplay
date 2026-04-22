// home.js — home page specific
document.addEventListener('DOMContentLoaded', () => {
  // hero cards tilt effect on mouse move
  const heroCards = document.querySelectorAll('.hcard');
  const heroVisual = document.querySelector('.hero-visual');

  if (heroVisual) {
    document.addEventListener('mousemove', e => {
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
      heroCards.forEach((card, i) => {
        const factor = (i + 1) * 2;
        card.style.transform = card.style.transform.replace(/translate\(.*?\)/, '')
          + ` translate(${xRatio * factor}px, ${yRatio * factor}px)`;
      });
    });
  }
});

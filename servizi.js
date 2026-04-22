// servizi.js — filter & FAQ logic
document.addEventListener('DOMContentLoaded', () => {

  // ── FILTER
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInCard 0.4s ease both';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ── FAQ ACCORDION
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
});

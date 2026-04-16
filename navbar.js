/* =============================================
   NY ITA RP — NAVBAR JS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close on link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // Active link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.querySelectorAll('a').forEach(a => {
          a.style.color = '';
        });
        const activeLink = navLinks.querySelector(`a[href="#${id}"]`);
        if (activeLink) activeLink.style.color = 'var(--blue-glow)';
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
});

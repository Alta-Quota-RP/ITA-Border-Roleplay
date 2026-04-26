/* ============================================
   GRAFICA STUDIO - JAVASCRIPT PRINCIPALE
   Modifica qui comportamenti e interazioni
   ============================================ */

// ============================================
// CONFIGURAZIONE (modifica qui!)
// ============================================
const CONFIG = {
  siteOwner: 'Lorenzo Ricci',           // Il tuo nome
  siteEmail: 'ciao@graficaStudio.it',   // La tua email
  sitePhone: '+39 340 123 4567',         // Il tuo telefono
  siteLocation: 'Milano, Italia',        // La tua città
  availability: 'Disponibile per nuovi progetti',
  instagram: '@graficaStudio',
  linkedin: 'Lorenzo Ricci Design',
  behance: 'behance.net/graficaStudio',
};

// ============================================
// ROUTER PAGINE
// ============================================
const Router = {
  currentPage: 'home',

  navigate(page) {
    // Nascondi pagina corrente
    const current = document.querySelector('.page.active');
    if (current) {
      current.classList.remove('active');
      setTimeout(() => { current.style.display = 'none'; }, 300);
    }

    // Mostra nuova pagina
    const next = document.getElementById(`page-${page}`);
    if (next) {
      setTimeout(() => {
        next.style.display = 'block';
        requestAnimationFrame(() => {
          next.classList.add('active');
        });
      }, 200);
    }

    // Aggiorna nav links
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.remove('active');
      if (a.dataset.page === page) a.classList.add('active');
    });

    // Aggiorna titolo pagina
    const titles = {
      home: 'Grafica Studio — Design che comunica',
      servizi: 'Servizi — Grafica Studio',
      chi: 'Chi Sono — Grafica Studio',
      contatti: 'Contattami — Grafica Studio'
    };
    document.title = titles[page] || 'Grafica Studio';

    // Scroll top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Aggiorna URL hash
    window.location.hash = page === 'home' ? '' : page;

    this.currentPage = page;

    // Init specifici per pagina
    setTimeout(() => {
      this.onPageLoad(page);
    }, 400);
  },

  onPageLoad(page) {
    initRevealAnimations();
    if (page === 'chi') initSkillBars();
    if (page === 'contatti') initContactForm();
  },

  init() {
    // Leggi hash iniziale
    const hash = window.location.hash.replace('#', '') || 'home';
    const validPages = ['home', 'servizi', 'chi', 'contatti'];
    const page = validPages.includes(hash) ? hash : 'home';
    this.navigate(page);
  }
};

// ============================================
// CURSORE PERSONALIZZATO
// ============================================
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Ring con lag
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effects
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, .card, .portfolio-item, .service-card');
    if (target) {
      cursor.classList.add('expanded');
      ring.classList.add('expanded');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, .card, .portfolio-item, .service-card');
    if (target) {
      cursor.classList.remove('expanded');
      ring.classList.remove('expanded');
    }
  });

  // Nascondi su mobile
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    ring.style.display = 'none';
    document.body.style.cursor = 'auto';
  }
}

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Hamburger mobile
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
  }

  // Click sui link
  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      Router.navigate(page);

      // Chiudi mobile menu
      if (hamburger) hamburger.classList.remove('active');
      if (navLinks) navLinks.classList.remove('open');
    });
  });
}

// ============================================
// SCROLL REVEAL
// ============================================
function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.remove('visible');
    observer.observe(el);
  });
}

// ============================================
// COUNTER ANIMATO (stats hero)
// ============================================
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  });
}

// ============================================
// SKILL BARS (Chi Sono)
// ============================================
function initSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.dataset.width;
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 200);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.skill-bar-fill').forEach(fill => {
    fill.style.width = '0%';
    observer.observe(fill);
  });
}

// ============================================
// FAQ ACCORDION (Servizi)
// ============================================
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Chiudi tutti
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      // Apri questo se era chiuso
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ============================================
// FORM CONTATTO
// ============================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validazione base
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();
    const privacy = form.querySelector('#privacy').checked;

    if (!name || !email || !message) {
      showToast('⚠️ Compila tutti i campi obbligatori');
      return;
    }

    if (!isValidEmail(email)) {
      showToast('⚠️ Inserisci un email valida');
      return;
    }

    if (!privacy) {
      showToast('⚠️ Accetta la privacy policy per continuare');
      return;
    }

    // Simula invio
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Invio in corso...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✓ Messaggio inviato!';
      form.reset();
      showToast('✨ Messaggio inviato con successo! Ti rispondo entro 24h.');
      setTimeout(() => {
        btn.textContent = 'Invia Richiesta';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ============================================
// PORTFOLIO FILTER (Homepage)
// ============================================
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.opacity = '1';
          item.style.transform = '';
          item.style.pointerEvents = 'auto';
        } else {
          item.style.opacity = '0.2';
          item.style.transform = 'scale(0.97)';
          item.style.pointerEvents = 'none';
        }
      });
    });
  });
}

// ============================================
// POPOLA DATI CONFIGURAZIONE
// ============================================
function populateConfig() {
  document.querySelectorAll('[data-config]').forEach(el => {
    const key = el.dataset.config;
    if (CONFIG[key]) el.textContent = CONFIG[key];
  });
}

// ============================================
// INIT GLOBALE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNavbar();
  populateConfig();
  Router.init();
  initFAQ();
  initPortfolioFilter();

  // Counter con delay
  setTimeout(animateCounters, 800);

  // Reveal iniziale
  setTimeout(initRevealAnimations, 600);
});

// Aggiorna info contatti dinamicamente
window.addEventListener('load', () => {
  document.querySelectorAll('.email-link').forEach(el => {
    el.href = 'mailto:' + CONFIG.siteEmail;
    el.textContent = CONFIG.siteEmail;
  });
});

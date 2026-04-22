// contatti.js — multi-step form
document.addEventListener('DOMContentLoaded', () => {

  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const nextBtn = document.getElementById('nextStep');
  const prevBtn = document.getElementById('prevStep');
  const submitBtn = document.getElementById('submitForm');
  const progressSteps = document.querySelectorAll('.fp-step');
  const progressLines = document.querySelectorAll('.fp-line');
  const formProgress = document.getElementById('formProgress');

  // Budget slider
  const budgetSlider = document.getElementById('budget');
  const budgetVal = document.getElementById('budgetVal');
  if (budgetSlider) {
    budgetSlider.addEventListener('input', () => {
      const v = parseInt(budgetSlider.value);
      budgetVal.textContent = v >= 1000 ? `€ ${(v/1000).toFixed(1)}k` : `€ ${v}`;
    });
  }

  function goToStep(n) {
    [step1, step2, step3].forEach(s => s.classList.add('hidden'));
    [step1, step2, step3][n - 1].classList.remove('hidden');

    progressSteps.forEach((s, i) => {
      s.classList.remove('fp-active', 'fp-done');
      if (i + 1 < n) s.classList.add('fp-done');
      if (i + 1 === n) s.classList.add('fp-active');
    });
    progressLines.forEach((l, i) => {
      if (i + 1 < n) l.classList.add('fp-done');
      else l.classList.remove('fp-done');
    });

    if (n === 3) formProgress.style.display = 'none';
    else formProgress.style.display = 'flex';
  }

  // Step 1 → 2
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      if (!name) { showToast('Inserisci il tuo nome 👋'); return; }
      if (!email || !email.includes('@')) { showToast('Inserisci un\'email valida 📧'); return; }
      goToStep(2);
    });
  }

  // Step 2 → 1
  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToStep(1));
  }

  // Submit
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const msg = document.getElementById('message').value.trim();
      const privacy = document.getElementById('privacy').checked;
      if (!msg) { showToast('Descrivi il tuo progetto 💬'); return; }
      if (!privacy) { showToast('Accetta la privacy policy per continuare'); return; }

      submitBtn.textContent = 'Invio in corso...';
      submitBtn.disabled = true;

      setTimeout(() => {
        goToStep(3);
        showToast('Messaggio inviato con successo! ✓');
      }, 1200);
    });
  }
});

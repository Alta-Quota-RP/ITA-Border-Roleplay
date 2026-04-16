/* =============================================
   NY ITA RP — REGOLAMENTO JS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const regNavs = document.querySelectorAll('.reg-nav');
  const regPanels = document.querySelectorAll('.reg-panel');

  regNavs.forEach(nav => {
    nav.addEventListener('click', () => {
      const target = nav.dataset.reg;

      regNavs.forEach(n => n.classList.remove('active'));
      regPanels.forEach(p => p.classList.remove('active'));

      nav.classList.add('active');
      const panel = document.getElementById(`reg-${target}`);
      if (panel) panel.classList.add('active');
    });
  });
});

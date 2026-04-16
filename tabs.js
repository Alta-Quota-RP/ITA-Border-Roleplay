/* =============================================
   NY ITA RP — TABS JS (Fazioni)
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      // Remove active from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // Add active to clicked
      btn.classList.add('active');
      const targetContent = document.getElementById(`tab-${target}`);
      if (targetContent) targetContent.classList.add('active');
    });
  });
});

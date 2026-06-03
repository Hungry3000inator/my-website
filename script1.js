/**
 * script1.js
 * Anchor-навігація між двома якорями.
 *
 * Клік на будь-який anchor-link → плавний скрол до відповідної секції.
 * IntersectionObserver → при скролі підсвічує потрібний якір.
 * Неактивний anchor-box (лівої колонки) — повністю прихований.
 */

(function () {
  'use strict';

  const upworkSection = document.getElementById('job-upwork');
  const twSection     = document.getElementById('job-techwave');

  /* Anchor-boxes у лівих колонках */
  const anchorUpwork   = document.getElementById('anchor-upwork');
  const anchorTechwave = document.getElementById('anchor-techwave');

  /* Всі anchor-link на сторінці */
  const allLinks = document.querySelectorAll('.anchor-link');

  /* ── Клік по будь-якому посиланню → скрол ── */
  allLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const job    = this.dataset.job;
      const target = job === 'upwork' ? upworkSection : twSection;
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── IntersectionObserver: скрол → оновлює стан якорів ── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const activeJob = entry.target === upworkSection ? 'upwork' : 'techwave';
      updateAnchors(activeJob);
    });
  }, { threshold: 0.4 });

  if (upworkSection) observer.observe(upworkSection);
  if (twSection)     observer.observe(twSection);

  /**
   * updateAnchors(activeJob)
   * — активний anchor-link підсвічено
   * — anchor-box поточної лівої колонки видимий, протилежний — прихований
   */
  function updateAnchors(activeJob) {
    /* Оновлюємо класи посилань */
    allLinks.forEach(link => {
      const isActive = link.dataset.job === activeJob;
      link.classList.toggle('active',   isActive);
      link.classList.toggle('inactive', !isActive);
    });

    /* Показуємо тільки той anchor-box, що відповідає поточній секції:
       anchor-upwork   — видимий коли activeJob === 'upwork'
       anchor-techwave — видимий коли activeJob === 'techwave' */
    if (anchorUpwork)   anchorUpwork.style.display   = activeJob === 'upwork'    ? '' : 'none';
    if (anchorTechwave) anchorTechwave.style.display  = activeJob === 'techwave'  ? '' : 'none';
  }

  /* Встановлюємо початковий стан одразу при завантаженні */
  updateAnchors('upwork');

})();
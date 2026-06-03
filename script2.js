/**
 * script2.js
 * Кожен .proj-anchor-box видимий лише тоді,
 * коли його батьківська секція (.proj-section) перетинається з вікном перегляду.
 */

(function () {
  'use strict';

  // Порогове значення: секція вважається «видимою», якщо хоча б 15% її площі у viewport
  const THRESHOLD = 0.15;

  function initAnchorVisibility() {
    const sections = document.querySelectorAll('.proj-section');

    if (!sections.length) return;

    // IntersectionObserver — найефективніший спосіб відстежувати видимість
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          const anchorBox = entry.target.querySelector('.proj-anchor-box');
          if (!anchorBox) return;

          if (entry.isIntersecting) {
            anchorBox.classList.remove('anchor-box--hidden');
            anchorBox.classList.add('anchor-box--visible');
          } else {
            anchorBox.classList.remove('anchor-box--visible');
            anchorBox.classList.add('anchor-box--hidden');
          }
        });
      },
      { threshold: THRESHOLD }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // Запускаємо після завантаження DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnchorVisibility);
  } else {
    initAnchorVisibility();
  }
})();
/* Navegació pública reduïda: Inici + sessions 1–4.
   Les sessions 5–8, dossier, avaluació i guia docent es conserven
   en la branca borradors-no-publicats però no formen part del web públic. */
window.exeSearchData = {};

(function () {
  'use strict';

  const hiddenPages = [
    '5-contrastar-i-contextualitzar.html',
    '6-de-les-proves-a-lexplicacio.html',
    '7-clinica-de-dossiers.html',
    '8-conclusions-provisionals.html',
    'dossier-dinvestigacio.html',
    'avaluacio.html',
    'guia-docent.html'
  ];

  function isHiddenHref(href) {
    if (!href) return false;
    return hiddenPages.some(file => href.split('#')[0].split('?')[0].endsWith(file));
  }

  function cleanPublicNavigation() {
    /* Elimina del menú lateral qualsevol pàgina no publicada. */
    document.querySelectorAll('#siteNav a[href]').forEach(link => {
      if (isHiddenHref(link.getAttribute('href'))) {
        const li = link.closest('li');
        if (li) li.remove();
        else link.remove();
      }
    });

    /* Elimina la línia inicial de metadades de cada sessió:
       “Sessió X · ... · 55 minuts”.
       La meta de la portada es conserva perquè està dins de .hero. */
    document.querySelectorAll('.sa > .meta:first-child').forEach(meta => meta.remove());

    /* Evita que el botó Següent de la sessió 4 porte a la sessió 5. */
    document.querySelectorAll('.nav-buttons a[href]').forEach(link => {
      if (isHiddenHref(link.getAttribute('href'))) {
        const replacement = document.createElement('span');
        replacement.className = link.className;
        replacement.setAttribute('aria-hidden', 'true');
        replacement.innerHTML = '<span>Següent</span>';
        link.replaceWith(replacement);
      }
    });

    /* Comptador coherent amb les cinc pàgines públiques. */
    const total = document.querySelector('.page-counter-total');
    const current = document.querySelector('.page-counter-current-page');
    if (total) total.textContent = '5';

    if (current) {
      const path = decodeURIComponent(window.location.pathname);
      let page = '1';
      if (path.endsWith('1-un-mateix-passat-dos-relats.html')) page = '2';
      else if (path.endsWith('2-el-laboratori-de-fonts.html')) page = '3';
      else if (path.endsWith('3-verificar-abans-de-compartir.html')) page = '4';
      else if (path.endsWith('4-del-tema-a-la-pregunta.html')) page = '5';
      current.textContent = page;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanPublicNavigation);
  } else {
    cleanPublicNavigation();
  }
})();

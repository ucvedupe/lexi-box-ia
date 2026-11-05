/* =========================================================
   ARCHIVO: site-search.js
   FUNCIÓN: buscador dentro de la página y alternativa con Google
   BLOQUES: 1) Crear buscador  2) Buscar coincidencias  3) Redirigir a Google
   ========================================================= */
(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const form = document.createElement('form');
  form.className = 'site-search';
  form.setAttribute('role', 'search');
  form.innerHTML = '<input type="search" name="q" placeholder="Buscar en esta página…" aria-label="Buscar en esta página" required><button type="submit" aria-label="Buscar">⌕</button><div class="search-feedback" aria-live="polite"></div>';
  header.appendChild(form);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const input = form.querySelector('input');
    const query = input.value.trim();
    if (!query) return;
    const norm = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const needle = norm(query);
    const candidates = [...document.querySelectorAll('main h1, main h2, main h3, main p, main li, main .vocab-card, main .feature-card, main .step-card, main article, main section')]
      .filter(el => !el.closest('.site-search') && norm(el.innerText || '').includes(needle));
    const feedback = form.querySelector('.search-feedback');
    if (candidates.length) {
      const target = candidates.sort((a,b) => (a.innerText || '').length - (b.innerText || '').length)[0];
      document.querySelectorAll('.search-match').forEach(el => el.classList.remove('search-match'));
      target.classList.add('search-match');
      target.scrollIntoView({behavior:'smooth', block:'center'});
      feedback.textContent = `Encontrado en esta página (${candidates.length} coincidencia${candidates.length === 1 ? '' : 's'}).`;
    } else {
      feedback.textContent = 'No se encontró aquí. Abriendo resultados de Google…';
      window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank', 'noopener');
    }
  });
})();

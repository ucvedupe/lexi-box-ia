/* =========================================================
   ARCHIVO: cards.js
   FUNCIÓN: creación y visualización de tarjetas de vocabulario
   BLOQUES: 1) Obtener tarjetas  2) Crear tarjeta  3) Insertar en la página
   ========================================================= */

/* BLOQUE 1: INICIALIZAR CUANDO EL DOCUMENTO ESTÉ LISTO */
document.addEventListener('DOMContentLoaded', () => {
    const cards = window.LEXIBOX_CARDS || [];
    const grid = document.getElementById('card-deck-grid');

    if (!grid) {
        return;
    }

    /* BLOQUE 2: RECORRER Y CONSTRUIR CADA TARJETA */
    cards.forEach((card, index) => {
        const article = document.createElement('article');
        article.className = 'vocab-card';

        article.innerHTML = `
            <div class="vocab-card-top">
                <span>${String(index + 1).padStart(2, '0')}</span>
                <span>${card.category}</span>
            </div>
            <div class="vocab-emoji">${card.emoji}</div>
            <h3>${card.word}</h3>
            <p>${card.meaning}</p>
            <div class="vocab-details">
                <b>Sinónimos:</b> ${card.synonyms.join(', ')}<br>
                <b>Antónimos:</b> ${card.antonyms.join(', ')}
            </div>
            <p class="vocab-example">“${card.example}”</p>
            <a class="btn btn-small btn-primary" href="juegos.html?card=${encodeURIComponent(card.id)}">
                Practicar esta palabra →
            </a>
        `;

        /* BLOQUE 3: AGREGAR LA TARJETA A LA PÁGINA */
        grid.appendChild(article);
    });
});

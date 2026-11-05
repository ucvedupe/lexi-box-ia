/* =========================================================
   ARCHIVO: main.js
   FUNCIÓN: navegación, menú móvil y comportamiento general
   BLOQUES: 1) Menú responsive  2) Navegación  3) Interacciones generales
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? '×' : '☰';
    });
  }

  /* GRUPO 2: SLIDER AUTOMÁTICO DE LA PÁGINA DE INICIO */
  const slides = [...document.querySelectorAll('.slide')];
  const dots = [...document.querySelectorAll('.dot')];
  if (slides.length) {
    let currentSlide = 0;
    let sliderTimer;
    const showSlide = (index) => {
      currentSlide = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('slide-active', i === currentSlide));
      dots.forEach((dot, i) => dot.classList.toggle('dot-active', i === currentSlide));
    };
    const restartTimer = () => {
      clearInterval(sliderTimer);
      sliderTimer = setInterval(() => showSlide(currentSlide + 1), 5500);
    };
    dots.forEach(dot => dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.slide)); restartTimer();
    }));
    document.querySelector('[data-slide-prev]')?.addEventListener('click', () => {
      showSlide(currentSlide - 1); restartTimer();
    });
    document.querySelector('[data-slide-next]')?.addEventListener('click', () => {
      showSlide(currentSlide + 1); restartTimer();
    });
    restartTimer();
  }

  /* GRUPO 3: CHATBOT BÁSICO DE PREGUNTAS FRECUENTES
     Nota: este asistente funciona con respuestas predefinidas.
     Para IA real se necesita conectar una API y proteger su clave en servidor. */
  const launcher = document.querySelector('.chat-launcher');
  const widget = document.querySelector('.chat-widget');
  const closeChat = document.querySelector('.chat-close');
  const chatForm = document.querySelector('.chat-form');
  const messages = document.querySelector('.chat-messages');
  if (launcher && widget) {
    launcher.addEventListener('click', () => { widget.hidden = !widget.hidden; });
    closeChat?.addEventListener('click', () => { widget.hidden = true; });
    chatForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = chatForm.querySelector('input');
      const question = input.value.trim();
      if (!question) return;
      addMessage(question, 'user-message');
      input.value = '';
      window.setTimeout(() => addMessage(getLexiAnswer(question), 'bot-message'), 350);
    });
  }
  function addMessage(text, className) {
    const bubble = document.createElement('div');
    bubble.className = className;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }
  function getLexiAnswer(question) {
    const q = question.toLowerCase();
    if (q.includes('precio') || q.includes('cuesta')) return 'LexiBox IA es un prototipo educativo. El precio dependerá de los materiales y la elaboración.';
    if (q.includes('juego') || q.includes('puntos') || q.includes('jugar')) return 'Entra a la sección Juegos, escribe tu nombre y responde las 10 preguntas. ¡Cada acierto suma 10 puntos!';
    if (q.includes('qr') || q.includes('código')) return 'No necesitas códigos QR. Entra a la página web, abre Tarjetas o Juegos y selecciona la palabra que deseas practicar.';
    if (q.includes('sinónimo')) return 'Un sinónimo es una palabra con significado parecido. Por ejemplo: feliz y alegre.';
    if (q.includes('antónimo')) return 'Un antónimo expresa lo contrario. Por ejemplo: feliz y triste.';
    if (q.includes('equipo') || q.includes('integrante')) return 'Nuestro equipo está formado por Jhanira Pomacaja, Pedro Anglas, Ariana Quispe, Gisely Reyna y Daysi Samaren.';
    if (q.includes('hola') || q.includes('buenas')) return '¡Hola! 😊 Soy Lexi. Puedo ayudarte con el producto, los juegos, las tarjetas o el vocabulario.';
    return '¡Buena pregunta! LexiBox IA combina tarjetas físicas y actividades digitales para aprender vocabulario jugando. Puedes explorar las secciones Producto y Juegos.';
  }
});

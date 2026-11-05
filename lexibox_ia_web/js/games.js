/* =========================================================
   LEXIBOX IA — JUEGO DE VOCABULARIO
   GRUPO 1: BANCO DE PREGUNTAS
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const questions = [
    {q:'¿Cuál es el sinónimo de FELIZ?', options:['Alegre','Triste','Enojado','Nervioso'], answer:'Alegre', explain:'¡Correcto! Feliz y alegre expresan alegría.'},
    {q:'¿Cuál es el antónimo de GIGANTE?', options:['Enorme','Grande','Pequeño','Inmenso'], answer:'Pequeño', explain:'¡Muy bien! Pequeño expresa lo contrario de gigante.'},
    {q:'¿Qué significa GENEROSO?', options:['Que siempre se enoja','Que comparte con los demás','Que tiene mucho miedo','Que habla muy rápido'], answer:'Que comparte con los demás', explain:'¡Exacto! Una persona generosa comparte y ayuda.'},
    {q:'¿Cuál es el sinónimo de VELOZ?', options:['Lento','Pesado','Rápido','Débil'], answer:'Rápido', explain:'¡Correcto! Veloz significa que se mueve rápidamente.'},
    {q:'¿Cuál es el antónimo de HONESTO?', options:['Sincero','Mentiroso','Justo','Amable'], answer:'Mentiroso', explain:'¡Bien hecho! Honesto y mentiroso expresan ideas opuestas.'},
    {q:'¿Qué significa OBSERVAR?', options:['Mirar con atención','Correr rápidamente','Construir una casa','Dejar de escuchar'], answer:'Mirar con atención', explain:'¡Así es! Observar es mirar o examinar con atención.'},
    {q:'¿Cuál es el sinónimo de COMENZAR?', options:['Terminar','Olvidar','Empezar','Destruir'], answer:'Empezar', explain:'¡Correcto! Comenzar y empezar significan dar inicio.'},
    {q:'¿Cuál es el antónimo de LIMPIO?', options:['Aseado','Ordenado','Brillante','Sucio'], answer:'Sucio', explain:'¡Muy bien! Sucio es lo contrario de limpio.'},
    {q:'¿Qué significa PROTEGER?', options:['Cuidar de un peligro','Romper un objeto','Ignorar a alguien','Perder algo'], answer:'Cuidar de un peligro', explain:'¡Exacto! Proteger es cuidar o defender.'},
    {q:'¿Cuál es el sinónimo de AMABLE?', options:['Grosero','Cordial','Egoísta','Enojado'], answer:'Cordial', explain:'¡Excelente! Amable y cordial describen un trato agradable.'}
  ];

  /* GRUPO 2: ELEMENTOS Y ESTADO DEL JUEGO */
  const entry = document.getElementById('player-entry');
  if (!entry) return;
  const quiz = document.getElementById('quiz-area');
  const result = document.getElementById('game-result');
  const nameInput = document.getElementById('player-name');
  const startButton = document.getElementById('start-game');
  const questionText = document.getElementById('question-text');
  const optionsBox = document.getElementById('answer-options');
  const feedback = document.getElementById('answer-feedback');
  const nextButton = document.getElementById('next-question');
  const scoreLabel = document.getElementById('live-score');
  const countLabel = document.getElementById('question-count');
  const progressBar = document.getElementById('progress-bar');
  const honorList = document.getElementById('honor-list');
  let player = '';
  let current = 0;
  let score = 0;
  let hasAnswered = false;
  let roundQuestions = [];

  /* GRUPO 3: INICIAR Y MOSTRAR PREGUNTAS */
  startButton.addEventListener('click', startGame);
  nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') startGame(); });
  function startGame() {
    player = nameInput.value.trim();
    if (!player) { nameInput.focus(); nameInput.placeholder = 'Primero escribe tu nombre'; return; }
    current = 0; score = 0; hasAnswered = false;
    roundQuestions = [...questions].sort(() => Math.random() - 0.5);
    entry.hidden = true; result.hidden = true; quiz.hidden = false;
    renderQuestion();
  }
  function renderQuestion() {
    const item = roundQuestions[current];
    hasAnswered = false;
    countLabel.textContent = `Pregunta ${current + 1} de ${roundQuestions.length}`;
    scoreLabel.textContent = `${score} puntos`;
    progressBar.style.width = `${(current / roundQuestions.length) * 100}%`;
    questionText.textContent = item.q;
    feedback.textContent = '';
    feedback.className = 'answer-feedback';
    nextButton.hidden = true;
    optionsBox.innerHTML = '';
    item.options.forEach(option => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'answer-option';
      button.textContent = option;
      button.addEventListener('click', () => chooseAnswer(button, option, item));
      optionsBox.appendChild(button);
    });
  }

  /* GRUPO 4: VALIDAR RESPUESTA Y SUMAR PUNTOS */
  function chooseAnswer(button, option, item) {
    if (hasAnswered) return;
    hasAnswered = true;
    const correct = option === item.answer;
    if (correct) {
      score += 10;
      button.classList.add('correct');
      feedback.textContent = item.explain;
      feedback.classList.add('good');
    } else {
      button.classList.add('wrong');
      feedback.textContent = `La respuesta correcta es: ${item.answer}. ¡Sigue practicando!`;
      feedback.classList.add('bad');
      [...optionsBox.children].forEach(btn => {
        if (btn.textContent === item.answer) btn.classList.add('correct');
      });
    }
    [...optionsBox.children].forEach(btn => { btn.disabled = true; });
    scoreLabel.textContent = `${score} puntos`;
    nextButton.textContent = current === roundQuestions.length - 1 ? 'Ver mi resultado →' : 'Siguiente pregunta →';
    nextButton.hidden = false;
  }
  nextButton.addEventListener('click', () => {
    current++;
    if (current < roundQuestions.length) renderQuestion();
    else finishGame();
  });

  /* GRUPO 5: RESULTADO Y CUADRO DE HONOR LOCAL */
  function finishGame() {
    quiz.hidden = true; result.hidden = false;
    progressBar.style.width = '100%';
    document.getElementById('result-title').textContent = score >= 80 ? '¡Excelente trabajo!' : score >= 50 ? '¡Vas por buen camino!' : '¡Sigue practicando!';
    document.getElementById('result-summary').textContent = `${player}, obtuviste ${score} de 100 puntos.`;
    const scores = getScores();
    scores.push({name: player, score, date: new Date().toISOString()});
    scores.sort((a,b) => b.score - a.score || new Date(a.date) - new Date(b.date));
    localStorage.setItem('lexiboxScores', JSON.stringify(scores.slice(0,10)));
    renderHonor();
  }
  function getScores() {
    try { return JSON.parse(localStorage.getItem('lexiboxScores') || '[]'); }
    catch { return []; }
  }
  function renderHonor() {
    const scores = getScores();
    honorList.innerHTML = '';
    if (!scores.length) {
      honorList.innerHTML = '<li class="empty-honor">¡Sé el primero en participar!</li>';
      return;
    }
    scores.forEach((item, index) => {
      const li = document.createElement('li');
      const name = document.createElement('span');
      name.textContent = `${item.score} pts`;
      li.append(document.createTextNode(`${index + 1}. ${item.name} `), name);
      honorList.appendChild(li);
    });
  }
  document.getElementById('play-again').addEventListener('click', () => {
    result.hidden = true; entry.hidden = false; quiz.hidden = true; nameInput.value = player; nameInput.focus();
  });
  document.getElementById('clear-scores').addEventListener('click', () => {
    if (confirm('¿Seguro que quieres borrar los puntajes guardados en este navegador?')) {
      localStorage.removeItem('lexiboxScores'); renderHonor();
    }
  });
  renderHonor();
});

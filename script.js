const startLoveTime = {
  days: 685,
  hours: 16,
  minutes: 27,
  seconds: 0
};
const loveStorageKey = 'loveCounterData';

function getInitialLoveSeconds() {
  return startLoveTime.seconds + startLoveTime.minutes * 60 + startLoveTime.hours * 3600 + startLoveTime.days * 86400;
}

function getPersistedLoveSeconds() {
  try {
    const raw = localStorage.getItem(loveStorageKey);
    if (raw) {
      const data = JSON.parse(raw);
      if (typeof data.seconds === 'number' && typeof data.updatedAt === 'number') {
        const elapsed = Math.floor((Date.now() - data.updatedAt) / 1000);
        return data.seconds + elapsed;
      }
    }
  } catch (error) {
    console.warn('Não foi possível ler o contador persistido:', error);
  }
  const initialSeconds = getInitialLoveSeconds();
  localStorage.setItem(loveStorageKey, JSON.stringify({ seconds: initialSeconds, updatedAt: Date.now() }));
  return initialSeconds;
}

function persistLoveSeconds() {
  try {
    localStorage.setItem(loveStorageKey, JSON.stringify({ seconds: currentLoveSeconds, updatedAt: Date.now() }));
  } catch (error) {
    console.warn('Não foi possível gravar o contador persistido:', error);
  }
}

const timelineEvents = [
  {
    date: '15 Agosto 2024',
    title: 'O Nosso Primeiro Encontro',
    description: 'Conhecemo-nos no litmach e foi uma experiencia anormal, mas eu senti algo que nos ia unir.'
  },
  {
    date: '27 Setembro 2024',
    title: 'A Primeira Viagem',
    description: 'Explorámos um lugar novo, descobrimos segredos e criámos memórias que guardamos com carinho.'
  },
  {
    date: '08 Dezembro 2024',
    title: 'O Nossos Abraços Eternos',
    description: 'Momentos tranquilos ao teu lado, conversas profundas e um amor que cresce em cada dia.'
  }
];
const reasonsList = [
  { title: 'A tua leveza', description: 'Trazes alegria para os dias mais comuns com o teu riso contagiante.' },
  { title: 'O teu carinho', description: 'Recebo-te sempre com amor e sinto-me mais forte contigo ao lado.' },
  { title: 'As tuas palavras', description: 'Cada mensagem tua aquece o meu coração como um abraço ternurento.' },
  { title: 'A tua cumplicidade', description: 'Somos melhores quando somos nós mesmos em conjunto.' },
  { title: 'O teu apoio', description: 'Acreditas em mim mesmo quando eu duvido de mim próprio.' },
  { title: 'O nosso futuro', description: 'Sonhar contigo torna cada dia mais belo e cheio de esperança.' }
];
const statsItems = [
  { number: '685', label: 'Dias juntos' },
  { number: '∞', label: 'Viagens' },
  { number: '∞', label: 'Fotos' },
  { number: '∞', label: 'Presentes surpresa' }
];
const quizQuestions = [
  {
    question: 'Onde nos conhecemos pela primeira vez?',
    options: ['Num café acolhedor', 'Num festival de música', 'Na praia', 'Numa aplicação'],
    answer: 3
  },
  {
    question: 'Qual é o teu sorriso favorito?',
    options: ['Todas as opções abaixo', 'Quando estamos juntos no sofá', 'Depois de uma surpresa', 'Num jantar romântico'],
    answer: 0
  },
  {
    question: 'O que mais gostas de fazer comigo?',
    options: ['Viajar por novos lugares', 'Cozinhar à dois', 'Ver filmes abraçados', 'Caminhar de mãos dadas'],
    answer: -1
  }
];
const capsuleMessageText = 'Em alguns anos, quando abrirmos esta cápsula, quero lembrar-me de cada riso, cada abraço e a promessa de continuar a construir uma vida cheia de ternura. Que o nosso amor continue a ser a nossa melhor aventura.';

const startBtn = document.getElementById('startBtn');
const topBtn = document.getElementById('topBtn');
const timelineList = document.getElementById('timelineList');
const reasonsGrid = document.getElementById('reasonsGrid');
const statsGrid = document.getElementById('statsGrid');
const quizContainer = document.getElementById('quizContainer');
const capsuleMessage = document.getElementById('capsuleMessage');

function pad(value) {
  return String(value).padStart(2, '0');
}

let currentLoveSeconds = getPersistedLoveSeconds();

function updateCountdown() {
  const days = Math.floor(currentLoveSeconds / 86400);
  const hours = Math.floor((currentLoveSeconds % 86400) / 3600);
  const minutes = Math.floor((currentLoveSeconds % 3600) / 60);
  const seconds = currentLoveSeconds % 60;

  document.getElementById('days').textContent = pad(days);
  document.getElementById('hours').textContent = pad(hours);
  document.getElementById('minutes').textContent = pad(minutes);
  document.getElementById('seconds').textContent = pad(seconds);

  currentLoveSeconds += 1;
  if (currentLoveSeconds % 5 === 0) {
    persistLoveSeconds();
  }
}

function createTimeline() {
  timelineEvents.forEach(item => {
    const card = document.createElement('article');
    card.className = 'timeline-card fade-in';
    card.innerHTML = `
      <time>${item.date}</time>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    `;
    timelineList.appendChild(card);
  });
}

function createReasons() {
  reasonsList.forEach(item => {
    const card = document.createElement('article');
    card.className = 'reason-card fade-in';
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    `;
    reasonsGrid.appendChild(card);
  });
}

function createStats() {
  statsItems.forEach(item => {
    const card = document.createElement('article');
    card.className = 'stat-card fade-in';
    card.innerHTML = `
      <strong>${item.number}</strong>
      <span>${item.label}</span>
    `;
    statsGrid.appendChild(card);
  });
}

function createQuiz() {
  const form = document.createElement('form');
  quizQuestions.forEach((item, index) => {
    const question = document.createElement('div');
    question.className = 'question';
    question.innerHTML = `<h3>${index + 1}. ${item.question}</h3>`;
    item.options.forEach((option, optionIndex) => {
      const label = document.createElement('label');
      label.className = 'option';
      label.dataset.questionIndex = index;
      label.dataset.optionIndex = optionIndex;
      const isCorrect = item.answer < 0 || optionIndex === item.answer;
      label.dataset.correct = isCorrect ? 'true' : 'false';
      label.innerHTML = `
        <input type="radio" name="quiz-${index}" value="${optionIndex}">
        ${option}
      `;
      question.appendChild(label);
    });
    const feedback = document.createElement('p');
    feedback.className = 'answer-feedback';
    question.appendChild(feedback);
    form.appendChild(question);
  });

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'hero-button';
  submit.textContent = 'Ver resultado';
  form.appendChild(submit);

  const status = document.createElement('div');
  status.className = 'quiz-status';
  status.id = 'quizStatus';
  status.textContent = 'Escolhe as respostas e descobre o quanto conheces o nosso amor.';
  form.appendChild(status);

  form.addEventListener('submit', event => {
    event.preventDefault();
    let score = 0;
    quizQuestions.forEach((item, questionIndex) => {
      const answer = form.querySelector(`input[name="quiz-${questionIndex}"]:checked`);
      const feedback = form.querySelector(`.question:nth-child(${questionIndex + 1}) .answer-feedback`);
      const isCorrectAnswer = answer && (item.answer < 0 || parseInt(answer.value, 10) === item.answer);
      if (isCorrectAnswer) {
        score += 1;
      }
      const labels = Array.from(form.querySelectorAll(`.question:nth-child(${questionIndex + 1}) .option`));
      labels.forEach(label => {
        const labelCorrect = label.dataset.correct === 'true';
        label.classList.toggle('correct', labelCorrect);
        label.classList.toggle('incorrect', !labelCorrect && label.querySelector('input').checked);
      });
      if (!answer) {
        feedback.textContent = 'Escolhe uma resposta para ver se está certa.';
        feedback.className = 'answer-feedback incorrect';
      } else if (isCorrectAnswer) {
        feedback.textContent = 'Resposta certa!';
        feedback.className = 'answer-feedback correct';
      } else {
        feedback.textContent = 'Resposta errada. A opção correta está destacada.';
        feedback.className = 'answer-feedback incorrect';
      }
    });
    const total = quizQuestions.length;
    status.textContent = `Acertaste ${score} de ${total} perguntas.`;
    if (score === total) {
      status.textContent = 'Perfeito! Conheces cada detalhe do nosso amor como ninguém. 🥰';
    }
    status.classList.add('animate');
  });

  quizContainer.appendChild(form);
}

function initCapsule() {
  capsuleMessage.textContent = capsuleMessageText;
}

function handleSectionScroll(targetId) {
  const section = document.getElementById(targetId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function setupObservers() {
  const elements = document.querySelectorAll('.fade-in, .slide-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
}

startBtn.addEventListener('click', () => handleSectionScroll('countdown'));
topBtn.addEventListener('click', () => handleSectionScroll('top'));

createTimeline();
createReasons();
createStats();
createQuiz();
initCapsule();
setupObservers();
updateCountdown();
setInterval(updateCountdown, 1000);
window.addEventListener('beforeunload', persistLoveSeconds);

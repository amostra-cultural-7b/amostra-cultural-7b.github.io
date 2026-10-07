const qrGrid = document.querySelector('#qr-grid');
if (qrGrid) {
  const qrEntries = [
    ['História do Egito', 'linha-do-tempo.html', 'Uma viagem por muitas épocas', 'history'],
    ['Como foram feitas as pirâmides', 'monumentos.html#piramides', 'Monumentos de Gizé', 'pyramids'],
    ['Tour 3D da Pirâmide de Quéops', 'https://giza.fas.harvard.edu/giza3d/?itemID=bwZfJsv1_', 'Modelo interativo do Giza Project, Harvard', 'tour'],
    ['Mapa do Egito e do Nilo', 'nilo.html#mapa', 'Mapa esquemático e rota do rio', 'map'],
    ['Hieróglifos e Pedra de Roseta', 'escrita.html#rosetta', 'Escrita e crenças', 'writing'],
    ['Quiz interativo', '#quiz', 'Teste seus conhecimentos', 'quiz']
  ];
  qrGrid.innerHTML = qrEntries.map(([title, route, description, imageName]) => {
    const destination = new URL(route, location.href).href;
    return `<a class="qr" href="${destination}"><img width="88" height="88" alt="QR Code para ${title}" src="assets/qr-${imageName}.png"><span><strong>${title}</strong><small>${description} ↗</small><small class="qr-url">${destination}</small></span></a>`;
  }).join('');
}

document.querySelectorAll('.filterbar button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filterbar button').forEach(filterButton => {
      const selected = filterButton === button;
      filterButton.classList.toggle('active', selected);
      filterButton.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('.event').forEach(event => {
      event.hidden = button.dataset.filter !== 'todos' && event.dataset.period !== button.dataset.filter;
    });
  });
});

const questions = [
  {q:'Qual rio foi essencial para a vida no Egito Antigo?',a:['Rio Nilo','Rio Eufrates','Rio Jordão'],ok:0,why:'O Nilo fornecia água, transporte e terras férteis.'},
  {q:'Em qual período foram construídas as pirâmides de Gizé?',a:['Império Antigo','Novo Império','Período Ptolemaico'],ok:0,why:'As pirâmides de Gizé foram erguidas durante o Império Antigo.'},
  {q:'Onde foi encontrada a tumba de Tutancâmon?',a:['Vale dos Reis','Gizé','Alexandria'],ok:0,why:'A tumba foi encontrada no Vale dos Reis, em 1922.'},
  {q:'O que aparece na Pedra de Roseta?',a:['Um decreto em três escritas','Um mapa do Nilo','Uma lista de faraós'],ok:0,why:'O decreto aparece em hieróglifos, demótico e grego antigo.'},
  {q:'Que canal reabriu para navegação em 1975?',a:['Canal de Suez','Canal do Nilo','Canal do Cairo'],ok:0,why:'O Canal de Suez reabriu após anos fechado desde 1967.'}
];
const questionNode = document.querySelector('#question');
if (questionNode) {
  let questionIndex = 0;
  let score = 0;
  let answered = false;
  const nextButton = document.querySelector('#next');
  function showQuestion() {
    answered = false;
    const item = questions[questionIndex];
    document.querySelector('#q-count').textContent = `Pergunta ${questionIndex + 1} de ${questions.length}`;
    questionNode.textContent = item.q;
    document.querySelector('#feedback').textContent = '';
    nextButton.classList.remove('show');
    nextButton.textContent = questionIndex === questions.length - 1 ? 'Ver resultado →' : 'Próxima pergunta →';
    document.querySelector('#answers').innerHTML = item.a.map((answer, index) => `<button data-i="${index}">${answer}</button>`).join('');
    document.querySelectorAll('#answers button').forEach(button => button.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const isCorrect = Number(button.dataset.i) === item.ok;
      if (isCorrect) score++;
      button.classList.add(isCorrect ? 'correct' : 'wrong');
      document.querySelectorAll('#answers button')[item.ok].classList.add('correct');
      document.querySelector('#feedback').textContent = `${isCorrect ? 'Isso mesmo! ' : 'Quase! '}${item.why}`;
      nextButton.classList.add('show');
    }));
  }
  showQuestion();
  nextButton.addEventListener('click', () => {
    if (questionIndex < questions.length - 1) {
      questionIndex++;
      showQuestion();
      return;
    }
    document.querySelector('#q-count').textContent = 'Jornada concluída';
    questionNode.textContent = `Você acertou ${score} de ${questions.length}!`;
    document.querySelector('#answers').innerHTML = '';
    document.querySelector('#feedback').textContent = score === questions.length ? 'Você já é um explorador do Egito!' : 'Obrigado por explorar — volte às estações para descobrir mais.';
    nextButton.textContent = 'Refazer quiz';
    nextButton.onclick = () => { questionIndex = 0; score = 0; showQuestion(); };
  });
}

const glyphs = ['𓄿','𓃀','𓎡','𓂧','𓇌','𓆑','𓎼','𓉔','𓇋','𓆓','𓎡','𓃭','𓅓','𓈖','𓍯','𓊪','𓈎','𓂋','𓋴','𓏏','𓅱','𓆑','𓇋','𓎡','𓇌','𓊃'];
document.querySelector('#make-name')?.addEventListener('click', () => {
  const name = document.querySelector('#visitor-name').value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z]/g, '');
  document.querySelector('#glyph-output').textContent = name ? [...name].map(letter => glyphs[letter.charCodeAt(0) - 97]).join(' ') : 'Digite seu nome para começar';
});

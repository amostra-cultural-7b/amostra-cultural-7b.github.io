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
    return `<a class="qr" href="${destination}"><img width="88" height="88" alt="QR Code para ${title}" src="assets/qr-${imageName}.svg"><span><strong>${title}</strong><small>${description} ↗</small><small class="qr-url">${destination}</small></span></a>`;
  }).join('');
}

const timelineFilters = document.querySelectorAll('.filterbar button');
const timelineEvents = [...document.querySelectorAll('.timeline-era .event')];
const timelineEras = [...document.querySelectorAll('.timeline-era')];
const timelineCount = document.querySelector('#timeline-count');

function filterTimeline(filter) {
  let visibleCount = 0;
  timelineEvents.forEach(event => {
    const visible = filter === 'todos' || event.dataset.period === filter;
    event.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  timelineEras.forEach(era => {
    era.hidden = !era.querySelector('.event:not([hidden])');
  });
  if (timelineCount) {
    timelineCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'marco histórico' : 'marcos históricos'}`;
  }
}

timelineFilters.forEach(button => {
  button.addEventListener('click', () => {
    timelineFilters.forEach(filterButton => {
      const selected = filterButton === button;
      filterButton.classList.toggle('active', selected);
      filterButton.setAttribute('aria-pressed', String(selected));
    });
    filterTimeline(button.dataset.filter);
  });
});

const deityCards = [...document.querySelectorAll('.deity-card')];
const deityDialog = document.querySelector('#deity-dialog');
if (deityCards.length && deityDialog) {
  const deities = [
    {name:'Rá', role:'Sol e renovação', image:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/553249/1653054/main-image', imageAlt:'Estela votiva com uma cena de oferenda a Re-Harakhty, forma associada a Rá', source:'https://www.metmuseum.org/art/collection/search/553249', description:'O sol estava ligado à criação e ao renascimento a cada manhã. Em algumas narrativas, Rá cruzava o céu em sua barca e atravessava o mundo noturno antes de voltar a nascer.', highlight:'A barca solar representa movimento e renovação; esta estela mostra Re-Harakhty, uma forma que combina Rá e Hórus.'},
    {name:'Amon (Amun)', role:'Proteção e poder', image:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/570680/1216580/main-image', imageAlt:'Estatueta de bronze da divindade Amon', source:'https://www.metmuseum.org/art/collection/search/570680', description:'Divindade associada a Tebas, Amon ganhou destaque no Novo Império. A união com Rá formou Amon-Rá, uma expressão de poder divino importante em templos e inscrições.', highlight:'Amon também podia ser chamado de “o oculto”. Sua iconografia inclui a coroa com plumas altas.'},
    {name:'Ísis', role:'Magia e proteção', image:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/552064/1212451/main-image', imageAlt:'Estatueta de Ísis amamentando o filho Hórus', source:'https://www.metmuseum.org/art/collection/search/552064', description:'Ísis era conhecida por sua magia e por proteger crianças e famílias. Nos mitos de Osíris, ela o procura e ajuda a proteger o filho Hórus.', highlight:'Esta estatueta mostra Ísis com Hórus criança; o sinal de trono também aparece em muitas representações da deusa.'},
    {name:'Osíris', role:'Renovação e além', image:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/570657/1226764/main-image', imageAlt:'Estatueta de Osíris, divindade mumificada que segura símbolos de poder', source:'https://www.metmuseum.org/art/collection/search/570657', description:'Ligado à realeza, à regeneração e à vida após a morte, Osíris aparece como governante do mundo dos mortos e juiz em cenas funerárias.', highlight:'A figura mumificada e a coroa Atef são marcas frequentes nas representações de Osíris.'},
    {name:'Hórus', role:'Céu e realeza', image:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/553060/1221220/main-image', imageAlt:'Estatueta de bronze de Hórus, senhor de Sekhem', source:'https://www.metmuseum.org/art/collection/search/553060', description:'Hórus era associado ao céu e representado de muitas formas, inclusive como falcão. A realeza egípcia relacionava o faraó vivo a Hórus.', highlight:'Observe o falcão em estátuas e relevos: ele pode proteger ou acompanhar a figura do rei.'},
    {name:'Anúbis', role:'Ritos funerários', image:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/570223/1942572/main-image', imageAlt:'Estatueta de bronze de Anúbis, com cabeça de canídeo', source:'https://www.metmuseum.org/art/collection/search/570223', description:'Anúbis estava ligado ao embalsamamento e à proteção dos mortos. Em cenas do julgamento, ele acompanha a pesagem do coração diante da pena de Maat.', highlight:'Sua forma mais conhecida combina corpo humano e cabeça de canídeo, animal associado às necrópoles.'},
    {name:'Tot (Thoth)', role:'Escrita e saber', image:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/570260/1999162/main-image', imageAlt:'Estatueta de divindade com cabeça de íbis, identificada como Tot', source:'https://www.metmuseum.org/art/collection/search/570260', description:'Tot era relacionado à escrita, ao conhecimento e ao cálculo. Em imagens funerárias, aparece registrando o resultado da pesagem do coração.', highlight:'As representações mais conhecidas mostram Tot como íbis ou babuíno; ambas são formas simbólicas.'},
    {name:'Hathor', role:'Música e alegria', image:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/554615/1210688/main-image', imageAlt:'Cabeça da deusa Hathor esculpida no cabo de um sistro', source:'https://www.metmuseum.org/art/collection/search/554615', description:'Hathor estava ligada à música, à celebração, ao cuidado e à maternidade. Seus cultos atravessaram muitos períodos e lugares do Egito.', highlight:'Seus chifres envolvendo o disco solar ajudam a reconhecer uma de suas formas mais comuns.'},
    {name:'Bastet', role:'Proteção e cuidado', image:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/552468/1214431/main-image', imageAlt:'Estatueta de Bastet, deusa representada em forma felina', source:'https://www.metmuseum.org/art/collection/search/552468', description:'Bastet era uma divindade protetora associada a gatos, festividades e ao cuidado da casa. Sua representação e seus atributos variaram ao longo do tempo.', highlight:'Ela aparece como gata ou como figura humana com cabeça de gato; Bubástis foi um importante centro de culto.'},
    {name:'Seth', role:'Deserto e tempestades', image:'https://collectionapi.metmuseum.org/api/collection/v1/iiif/557847/1749447/main-image', imageAlt:'Fac-símile de cena mural em que Seth combate uma serpente', source:'https://www.metmuseum.org/art/collection/search/557847', description:'Seth era associado ao deserto, às tempestades e a forças difíceis de controlar. Em outras narrativas, também defendia a barca solar contra ameaças.', highlight:'A imagem é um fac-símile de uma cena de templo. O “animal de Seth” não corresponde com certeza a uma espécie conhecida.'}
  ];
  const dialogTitle = deityDialog.querySelector('#deity-dialog-title');
  const dialogRole = deityDialog.querySelector('.deity-dialog-role');
  const dialogDescription = deityDialog.querySelector('#deity-dialog-description');
  const dialogHighlight = deityDialog.querySelector('.deity-dialog-highlight');
  const dialogImage = deityDialog.querySelector('.deity-dialog-image');
  const dialogSource = deityDialog.querySelector('.deity-dialog-source');
  const dialogIndex = deityDialog.querySelector('.deity-dialog-index');
  const navCount = deityDialog.querySelector('.deity-dialog-nav-count');
  const closeButton = deityDialog.querySelector('.deity-dialog-close');
  let deityIndex = 0;
  let returnFocusTo = null;
  const formatDeityIndex = index => `${String(index + 1).padStart(2, '0')} / ${String(deities.length).padStart(2, '0')}`;
  const renderDeity = index => {
    deityIndex = (index + deities.length) % deities.length;
    const deity = deities[deityIndex];
    const currentPosition = formatDeityIndex(deityIndex);
    dialogTitle.textContent = deity.name;
    dialogRole.textContent = deity.role;
    dialogDescription.textContent = deity.description;
    dialogHighlight.textContent = deity.highlight;
    dialogImage.src = deity.image;
    dialogImage.alt = deity.imageAlt;
    dialogSource.href = deity.source;
    dialogIndex.textContent = `${currentPosition} · DIVINDADE EGÍPCIA`;
    navCount.textContent = currentPosition;
    closeButton.setAttribute('aria-label', `Fechar detalhes de ${deity.name}`);
  };
  const openDeity = (index, trigger) => {
    returnFocusTo = trigger;
    renderDeity(index);
    deityDialog.showModal();
    closeButton.focus();
  };
  deityCards.forEach(card => card.addEventListener('click', () => openDeity(Number(card.dataset.deity), card)));
  closeButton.addEventListener('click', () => deityDialog.close());
  deityDialog.querySelector('.deity-dialog-prev').addEventListener('click', () => renderDeity(deityIndex - 1));
  deityDialog.querySelector('.deity-dialog-next').addEventListener('click', () => renderDeity(deityIndex + 1));
  deityDialog.addEventListener('click', event => {
    if (event.target === deityDialog) deityDialog.close();
  });
  deityDialog.addEventListener('close', () => {
    if (returnFocusTo?.isConnected) returnFocusTo.focus();
  });
}

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

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.navlinks');
if (menuToggle && siteNav) {
  document.body.classList.add('nav-ready');
  const setMenuOpen = open => {
    menuToggle.setAttribute('aria-expanded', String(open));
    siteNav.classList.toggle('is-open', open);
  };
  menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });
  siteNav.addEventListener('click', event => {
    if (event.target.closest('a')) setMenuOpen(false);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav')) setMenuOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) setMenuOpen(false);
  });
}

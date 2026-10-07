import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { deities, hieroglyphs, navigation, qrEntries, quizQuestions, type PageKey } from './data';

const subscribeToTheme = (notify: () => void) => {
  window.addEventListener('egypt-theme-change', notify);
  return () => window.removeEventListener('egypt-theme-change', notify);
};
const getThemeSnapshot = () => document.documentElement.dataset.theme || 'light';
const getServerThemeSnapshot = () => 'light';

export function SiteHeader({ page }: { page: PageKey }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);

  useEffect(() => {
    document.body.classList.add('nav-ready');
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const closeOnDesktop = () => { if (window.innerWidth > 860) setMenuOpen(false); };
    document.addEventListener('click', closeOnOutsideClick);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', closeOnDesktop);
    return () => {
      document.body.classList.remove('nav-ready');
      document.removeEventListener('click', closeOnOutsideClick);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', closeOnDesktop);
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    const nextTheme = getThemeSnapshot() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeColor) themeColor.content = nextTheme === 'dark' ? '#172327' : '#f6f3ec';
    window.dispatchEvent(new Event('egypt-theme-change'));
    try { localStorage.setItem('egypt-theme', nextTheme); } catch { /* A preferência continua ativa nesta visita. */ }
  };

  return (
    <header>
      <nav className="nav wrap" aria-label="Navegação principal" ref={navRef}>
        <a className="brand" href="/index.html" aria-current={page === 'home' ? 'page' : undefined}>
          <b aria-hidden="true">𓂀</b><span>Museu do Egito</span>
        </a>
        <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="nav-links" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="menu-icon" aria-hidden="true"><i /><i /></span><span>Explorar</span>
        </button>
        <div className={`navlinks${menuOpen ? ' is-open' : ''}`} id="nav-links">
          {navigation.map((item) => <a key={item.key} href={item.href} aria-current={page === item.key ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        </div>
        <button className="theme-toggle" type="button" aria-label={`Ativar modo ${theme === 'dark' ? 'claro' : 'escuro'}`} title={`Ativar modo ${theme === 'dark' ? 'claro' : 'escuro'}`} aria-pressed={theme === 'dark'} onClick={toggleTheme}>
          <span className="theme-toggle-icon" aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span><span className="theme-toggle-label">Modo {theme === 'dark' ? 'claro' : 'escuro'}</span>
        </button>
      </nav>
    </header>
  );
}

export function SiteFooter({ children, home = false }: { children?: ReactNode; home?: boolean }) {
  return <footer className="sources"><div className="wrap sources-inner"><div>{children ?? <><p>Conteúdo educativo. Datas antigas são aproximadas.</p><p>Imagens de acervo: The Metropolitan Museum of Art Open Access (CC0); veja os créditos individuais.</p><p>Fontes: <a href="https://www.metmuseum.org/essays/egypt-in-the-old-kingdom-ca-2649-2150-b-c" target="_blank" rel="noreferrer">The Met</a> · <a href="https://whc.unesco.org/en/list/86/" target="_blank" rel="noreferrer">UNESCO</a></p></>}</div><a className="top" href={home ? '#inicio' : '/index.html'}>Voltar ao início ↑</a></div></footer>;
}

export function SiteLayout({ page, children, footer }: { page: PageKey; children: ReactNode; footer?: ReactNode }) {
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><SiteHeader page={page} />{children}<SiteFooter home={page === 'home'}>{footer}</SiteFooter></>;
}

export function PageHero({ page, eyebrow, title, children }: { page: PageKey; eyebrow: string; title: string; children: ReactNode }) {
  const breadcrumbLabels: Record<PageKey, string> = { home: 'Início', nile: 'O Nilo e a vida cotidiana', monuments: 'Pirâmides e monumentos', writing: 'Escrita e crenças', timeline: 'Linha do tempo', modern: 'Egito hoje' };
  return <section className="page-hero"><div className="wrap"><p className="breadcrumbs"><a href="/index.html">Início</a> / {breadcrumbLabels[page]}</p><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{children}</p></div></section>;
}

export function PageNext({ previous, next }: { previous: { text: string; href: string }; next: { text: string; href: string } }) {
  return <nav className="page-next" aria-label="Próximos destinos"><a href={previous.href}>← {previous.text}</a><a href={next.href}>{next.text} →</a></nav>;
}

export function FactGrid({ facts }: { facts: Array<{ title: string; text: string }> }) {
  return <div className="fact-grid">{facts.map(({ title, text }) => <article className="fact" key={title}><strong>{title}</strong><span>{text}</span></article>)}</div>;
}

export function ObjectCard({ image, alt, title, text, credit, href }: { image: string; alt: string; title: string; text: string; credit: string; href: string }) {
  return <figure className="object-card"><img src={image} alt={alt} loading="lazy" /><div><h3>{title}</h3><p>{text}</p><p className="photo-credit"><a href={href} target="_blank" rel="noreferrer">{credit}</a> · imagem CC0</p></div></figure>;
}

export function QrGrid() {
  return <div className="qr-grid">{qrEntries.map((entry) => {
    const external = entry.href.startsWith('http');
    const destination = external ? entry.href : new URL(entry.href, 'https://amostra-cultural-7b.github.io').href;
    return <a className="qr" key={entry.key} href={entry.href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
      <img width="88" height="88" alt={`QR Code para ${entry.title}`} src={`/assets/qr-${entry.key}.png`} />
      <span><strong>{entry.title}</strong><small>{entry.description} ↗</small><small className="qr-url">{destination}</small></span>
    </a>;
  })}</div>;
}

export function NameActivity() {
  const [name, setName] = useState('');
  const [output, setOutput] = useState('');
  const makeName = () => {
    const normalized = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z]/g, '');
    setOutput(normalized ? [...normalized].map((letter) => hieroglyphs[letter.charCodeAt(0) - 97]).join(' ') : 'Digite seu nome para começar');
  };
  return <section className="experience" id="experiencia" aria-labelledby="name-title"><div className="wrap"><div className="section-kicker">Comece por você · Atividade interativa</div><h2 className="section-title" id="name-title">Veja seu nome em hieróglifos</h2><p className="intro">Digite seu nome e descubra uma sequência de sinais para começar a viagem. A atividade é uma brincadeira visual, não uma tradução histórica.</p><div className="name-maker"><input value={name} onChange={(event) => setName(event.target.value)} maxLength={24} placeholder="Digite seu nome" aria-label="Digite seu nome" onKeyDown={(event) => { if (event.key === 'Enter') makeName(); }} /><button type="button" onClick={makeName}>Transformar meu nome</button></div><div className="glyph-output" role="status" aria-live="polite">{output}</div><p className="fineprint">Cada letra é substituída por um sinal do conjunto de hieróglifos; isso não mostra como um escriba egípcio escreveria ou traduziria o nome.</p><a className="cta" href="#explorar">Continuar viagem →</a></div></section>;
}

export function DeityGallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const deity = deities[activeIndex]!;
  const openDeity = (index: number, trigger: HTMLElement) => {
    returnFocus.current = trigger;
    setActiveIndex(index);
    dialogRef.current?.showModal();
  };
  const closeDialog = () => dialogRef.current?.close();
  const move = (step: number) => setActiveIndex((index) => (index + step + deities.length) % deities.length);

  return <>
    <div className="deity-grid" aria-label="Galeria de divindades egípcias">
      {deities.map((item, index) => <button className="deity-card" type="button" key={item.name} aria-haspopup="dialog" aria-controls="deity-dialog" onClick={(event) => openDeity(index, event.currentTarget)}>
        <span className="deity-art"><img className="deity-art-image" src={item.image} alt="" loading="lazy" /><span className="deity-art-mark" aria-hidden="true">{item.glyph}</span></span>
        <span className="deity-card-copy"><strong>{item.cardName ?? item.name}</strong><small>{item.role}</small></span><span className="deity-card-arrow" aria-hidden="true">↗</span>
      </button>)}
    </div>
    <dialog className="deity-dialog" id="deity-dialog" ref={dialogRef} aria-labelledby="deity-dialog-title" aria-describedby="deity-dialog-description" onClose={() => { if (returnFocus.current?.isConnected) returnFocus.current.focus(); }} onClick={(event) => { if (event.target === event.currentTarget) closeDialog(); }}>
      <div className="deity-dialog-shell">
        <button className="deity-dialog-close" type="button" aria-label={`Fechar detalhes de ${deity.name}`} onClick={closeDialog}>×</button>
        <figure className="deity-dialog-art"><img className="deity-dialog-image" src={deity.image} alt={deity.imageAlt} /><figcaption className="deity-dialog-art-caption"><span>ACERVO THE MET</span><a className="deity-dialog-source" href={deity.source} target="_blank" rel="noreferrer">Ver ficha do objeto ↗</a></figcaption></figure>
        <div className="deity-dialog-content"><p className="deity-dialog-index">{String(activeIndex + 1).padStart(2, '0')} / {String(deities.length).padStart(2, '0')} · DIVINDADE EGÍPCIA</p><h3 id="deity-dialog-title">{deity.name}</h3><p className="deity-dialog-role">{deity.role}</p><p className="deity-dialog-description" id="deity-dialog-description">{deity.description}</p><div className="deity-dialog-note"><span>OBSERVE NA PEÇA</span><p>{deity.highlight}</p></div></div>
        <nav className="deity-dialog-nav" aria-label="Navegação entre divindades"><button className="deity-dialog-prev" type="button" onClick={() => move(-1)}><span aria-hidden="true">←</span><span>Anterior</span></button><span className="deity-dialog-nav-count">{String(activeIndex + 1).padStart(2, '0')} / {String(deities.length).padStart(2, '0')}</span><button className="deity-dialog-next" type="button" onClick={() => move(1)}><span>Próxima</span><span aria-hidden="true">→</span></button></nav>
      </div>
    </dialog>
  </>;
}

export function Quiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const question = quizQuestions[index]!;
  const selectAnswer = (answerIndex: number) => {
    if (answer !== null) return;
    setAnswer(answerIndex);
    if (answerIndex === question.correct) setScore((current) => current + 1);
  };
  const next = () => {
    if (finished) {
      setIndex(0); setScore(0); setAnswer(null); setFinished(false); return;
    }
    if (index === quizQuestions.length - 1) { setFinished(true); return; }
    setIndex((current) => current + 1); setAnswer(null);
  };
  return <section className="quiz" id="quiz" aria-labelledby="quiz-title"><div className="wrap quizbox"><div><div className="section-kicker">Desafio do explorador</div><h2 className="section-title" id="quiz-title">Hora do quiz!</h2><p className="intro">Responda às perguntas e descubra quantas pistas da viagem você guardou.</p></div><div className="quizpanel">
    <div className="q-count">{finished ? 'Jornada concluída' : `Pergunta ${index + 1} de ${quizQuestions.length}`}</div>
    <div className="question">{finished ? `Você acertou ${score} de ${quizQuestions.length}!` : question.question}</div>
    <div className="answers">{!finished && question.answers.map((item, answerIndex) => <button type="button" key={item} disabled={answer !== null} className={answer !== null && answerIndex === question.correct ? 'correct' : answer === answerIndex ? 'wrong' : undefined} onClick={() => selectAnswer(answerIndex)}>{item}</button>)}</div>
    <div className="feedback" aria-live="polite">{finished ? (score === quizQuestions.length ? 'Você já é um explorador do Egito!' : 'Obrigado por explorar — volte às estações para descobrir mais.') : answer === null ? '' : `${answer === question.correct ? 'Isso mesmo! ' : 'Quase! '}${question.explanation}`}</div>
    <button className={`next${answer !== null || finished ? ' show' : ''}`} type="button" onClick={next}>{finished ? 'Refazer quiz' : index === quizQuestions.length - 1 ? 'Ver resultado →' : 'Próxima pergunta →'}</button>
  </div></div></section>;
}

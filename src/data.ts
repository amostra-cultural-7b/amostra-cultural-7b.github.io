export type PageKey = 'home' | 'nile' | 'monuments' | 'writing' | 'timeline' | 'modern';

export const navigation = [
  { label: 'Nilo & vida', href: '/nilo.html', key: 'nile' },
  { label: 'Monumentos', href: '/monumentos.html', key: 'monuments' },
  { label: 'Escrita & crenças', href: '/escrita.html', key: 'writing' },
  { label: 'Linha do tempo', href: '/linha-do-tempo.html', key: 'timeline' },
  { label: 'Egito hoje', href: '/egito-hoje.html', key: 'modern' },
] as const;

export const qrEntries = [
  { title: 'História do Egito', href: '/linha-do-tempo.html', description: 'Uma viagem por muitas épocas', key: 'history' },
  { title: 'Como foram feitas as pirâmides', href: '/monumentos.html#piramides', description: 'Monumentos de Gizé', key: 'pyramids' },
  { title: 'Tour 3D da Pirâmide de Quéops', href: 'https://giza.fas.harvard.edu/giza3d/?itemID=bwZfJsv1_', description: 'Modelo interativo do Giza Project, Harvard', key: 'tour' },
  { title: 'Mapa do Egito e do Nilo', href: '/nilo.html#mapa', description: 'Mapa esquemático e rota do rio', key: 'map' },
  { title: 'Hieróglifos e Pedra de Roseta', href: '/escrita.html#rosetta', description: 'Escrita e crenças', key: 'writing' },
  { title: 'Quiz interativo', href: '/index.html#quiz', description: 'Teste seus conhecimentos', key: 'quiz' },
] as const;

export interface Deity {
  name: string;
  cardName?: string;
  role: string;
  glyph: string;
  image: string;
  imageAlt: string;
  source: string;
  description: string;
  highlight: string;
}

export const deities: Deity[] = [
  { name: 'Rá', role: 'Sol e renovação', glyph: '𓇳', image: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/553249/1653054/main-image', imageAlt: 'Estela votiva com uma cena de oferenda a Re-Harakhty, forma associada a Rá', source: 'https://www.metmuseum.org/art/collection/search/553249', description: 'O sol estava ligado à criação e ao renascimento a cada manhã. Em algumas narrativas, Rá cruzava o céu em sua barca e atravessava o mundo noturno antes de voltar a nascer.', highlight: 'A barca solar representa movimento e renovação; esta estela mostra Re-Harakhty, uma forma que combina Rá e Hórus.' },
  { name: 'Amon (Amun)', cardName: 'Amon', role: 'Proteção e poder', glyph: '𓃝', image: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/570680/1216580/main-image', imageAlt: 'Estatueta de bronze da divindade Amon', source: 'https://www.metmuseum.org/art/collection/search/570680', description: 'Divindade associada a Tebas, Amon ganhou destaque no Novo Império. A união com Rá formou Amon-Rá, uma expressão de poder divino importante em templos e inscrições.', highlight: 'Amon também podia ser chamado de “o oculto”. Sua iconografia inclui a coroa com plumas altas.' },
  { name: 'Ísis', role: 'Magia e proteção', glyph: '𓊨', image: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/552064/1212451/main-image', imageAlt: 'Estatueta de Ísis amamentando o filho Hórus', source: 'https://www.metmuseum.org/art/collection/search/552064', description: 'Ísis era conhecida por sua magia e por proteger crianças e famílias. Nos mitos de Osíris, ela o procura e ajuda a proteger o filho Hórus.', highlight: 'Esta estatueta mostra Ísis com Hórus criança; o sinal de trono também aparece em muitas representações da deusa.' },
  { name: 'Osíris', role: 'Renovação e além', glyph: '𓁹', image: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/570657/1226764/main-image', imageAlt: 'Estatueta de Osíris, divindade mumificada que segura símbolos de poder', source: 'https://www.metmuseum.org/art/collection/search/570657', description: 'Ligado à realeza, à regeneração e à vida após a morte, Osíris aparece como governante do mundo dos mortos e juiz em cenas funerárias.', highlight: 'A figura mumificada e a coroa Atef são marcas frequentes nas representações de Osíris.' },
  { name: 'Hórus', role: 'Céu e realeza', glyph: '𓅃', image: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/553060/1221220/main-image', imageAlt: 'Estatueta de bronze de Hórus, senhor de Sekhem', source: 'https://www.metmuseum.org/art/collection/search/553060', description: 'Hórus era associado ao céu e representado de muitas formas, inclusive como falcão. A realeza egípcia relacionava o faraó vivo a Hórus.', highlight: 'Observe o falcão em estátuas e relevos: ele pode proteger ou acompanhar a figura do rei.' },
  { name: 'Anúbis', role: 'Ritos funerários', glyph: '𓃣', image: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/570223/1942572/main-image', imageAlt: 'Estatueta de bronze de Anúbis, com cabeça de canídeo', source: 'https://www.metmuseum.org/art/collection/search/570223', description: 'Anúbis estava ligado ao embalsamamento e à proteção dos mortos. Em cenas do julgamento, ele acompanha a pesagem do coração diante da pena de Maat.', highlight: 'Sua forma mais conhecida combina corpo humano e cabeça de canídeo, animal associado às necrópoles.' },
  { name: 'Tot', role: 'Escrita e saber', glyph: '𓅝', image: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/570260/1999162/main-image', imageAlt: 'Estatueta de divindade com cabeça de íbis, identificada como Tot', source: 'https://www.metmuseum.org/art/collection/search/570260', description: 'Tot era relacionado à escrita, ao conhecimento e ao cálculo. Em imagens funerárias, aparece registrando o resultado da pesagem do coração.', highlight: 'As representações mais conhecidas mostram Tot como íbis ou babuíno; ambas são formas simbólicas.' },
  { name: 'Hathor', role: 'Música e alegria', glyph: '𓉡', image: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/554615/1210688/main-image', imageAlt: 'Cabeça da deusa Hathor esculpida no cabo de um sistro', source: 'https://www.metmuseum.org/art/collection/search/554615', description: 'Hathor estava ligada à música, à celebração, ao cuidado e à maternidade. Seus cultos atravessaram muitos períodos e lugares do Egito.', highlight: 'Seus chifres envolvendo o disco solar ajudam a reconhecer uma de suas formas mais comuns.' },
  { name: 'Bastet', role: 'Proteção e cuidado', glyph: '𓃠', image: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/552468/1214431/main-image', imageAlt: 'Estatueta de Bastet, deusa representada em forma felina', source: 'https://www.metmuseum.org/art/collection/search/552468', description: 'Bastet era uma divindade protetora associada a gatos, festividades e ao cuidado da casa. Sua representação e seus atributos variaram ao longo do tempo.', highlight: 'Ela aparece como gata ou como figura humana com cabeça de gato; Bubástis foi um importante centro de culto.' },
  { name: 'Seth', role: 'Deserto e tempestades', glyph: '𓃩', image: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/557847/1749447/main-image', imageAlt: 'Fac-símile de cena mural em que Seth combate uma serpente', source: 'https://www.metmuseum.org/art/collection/search/557847', description: 'Seth era associado ao deserto, às tempestades e a forças difíceis de controlar. Em outras narrativas, também defendia a barca solar contra ameaças.', highlight: 'A imagem é um fac-símile de uma cena de templo. O “animal de Seth” não corresponde com certeza a uma espécie conhecida.' },
];

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  label: string;
  period: string;
  key?: boolean;
}

export interface TimelineEra {
  id: string;
  headingId: string;
  chapter: string;
  title: string;
  description: string;
  events: TimelineEvent[];
}

export const timelineEras: TimelineEra[] = [
  { id: 'faraonico', headingId: 'era-faraonica', chapter: 'Capítulo 01', title: 'Reinos faraônicos', description: 'Da unificação do vale do Nilo às grandes épocas de construção e expansão.', events: [
    { date: 'c. 3100 a.C.', title: 'Unificação política', description: 'O Alto e o Baixo Egito são unidos. Comunidades humanas já viviam no vale muito antes dessa data.', label: 'Período Arcaico', period: 'faraonico' },
    { date: 'c. 2686–2181 a.C.', title: 'O tempo das pirâmides', description: 'Durante o Império Antigo, foram erguidas as grandes pirâmides de Gizé e outros complexos funerários monumentais.', label: 'Império Antigo', period: 'faraonico', key: true },
    { date: 'c. 2055–1650 a.C.', title: 'Império Médio', description: 'Um período de reunificação, novas obras e transformações na literatura e na administração.', label: 'Datas aproximadas · variam por fonte', period: 'faraonico' },
    { date: 'c. 1550–1070 a.C.', title: 'Novo Império', description: 'Época de grande expansão e construção de templos. Tutancâmon reinou no século XIV a.C.', label: 'Novo Império', period: 'faraonico', key: true },
  ] },
  { id: 'ptolomaico', headingId: 'era-ptolomaica', chapter: 'Capítulo 02', title: 'Macedônio e ptolemaico', description: 'Novos governantes chegam ao Egito; a cultura local continua a se transformar.', events: [
    { date: '332 a.C.', title: 'Alexandre conquista o Egito', description: 'Começa o período macedônio. Após sua morte, a dinastia ptolemaica passa a governar o país.', label: 'Período Macedônio', period: 'ptolomaico' },
    { date: '51–30 a.C.', title: 'Cleópatra VII', description: 'Uma das últimas governantes ptolemaicas. Após sua morte, em 30 a.C., Roma incorpora o Egito ao seu domínio.', label: 'Período Ptolemaico', period: 'ptolomaico', key: true },
  ] },
  { id: 'romano', headingId: 'era-romana', chapter: 'Capítulo 03', title: 'Roma e Bizâncio', description: 'Por séculos, o Egito integra sucessivamente dois grandes impérios mediterrâneos.', events: [
    { date: '30 a.C.–641 d.C.', title: 'Egito romano e bizantino', description: 'Roma transforma o Egito em província; a partir do século IV, o território passa ao domínio do Império Bizantino.', label: 'Datas de referência', period: 'romano' },
  ] },
  { id: 'medieval', headingId: 'era-medieval', chapter: 'Capítulo 04', title: 'Período medieval', description: 'Uma nova fase política e cultural começa, com mudanças que acontecem ao longo de gerações.', events: [
    { date: 'c. 639–642 d.C.', title: 'Conquista árabe do Egito', description: 'O domínio árabe se estabelece ao longo de uma campanha. A língua árabe e o islã se difundem gradualmente nos séculos seguintes.', label: 'Período medieval', period: 'medieval' },
  ] },
  { id: 'moderno', headingId: 'era-moderna', chapter: 'Capítulo 05', title: 'Egito moderno e atual', description: 'Independência, mudanças políticas e a vida de um país conectado ao mundo.', events: [
    { date: '1882', title: 'Ocupação britânica', description: 'Forças britânicas ocupam o Egito. A influência britânica continua marcante nas décadas seguintes.', label: 'Egito moderno', period: 'moderno' },
    { date: '1922', title: 'Independência declarada', description: 'O Reino Unido reconhece formalmente a independência, mas mantém reservas e influência em algumas áreas.', label: 'Reino do Egito', period: 'moderno' },
    { date: '1952–1953', title: 'Revolução e república', description: 'A revolução de 1952 derruba a monarquia; a república é proclamada em 1953.', label: 'República do Egito', period: 'moderno', key: true },
    { date: '1975', title: 'Canal de Suez reabre', description: 'O canal volta à navegação internacional após permanecer fechado desde a guerra de 1967.', label: 'Egito contemporâneo', period: 'moderno' },
    { date: 'Hoje', title: 'Uma história em curso', description: 'O Egito continua a transformar cidades, proteger patrimônio e lidar com desafios presentes. Conheça a página sobre o país atual.', label: 'Século XXI', period: 'moderno' },
  ] },
];

export const quizQuestions = [
  { question: 'Qual rio foi essencial para a vida no Egito Antigo?', answers: ['Rio Nilo', 'Rio Eufrates', 'Rio Jordão'], correct: 0, explanation: 'O Nilo fornecia água, transporte e terras férteis.' },
  { question: 'Em qual período foram construídas as pirâmides de Gizé?', answers: ['Império Antigo', 'Novo Império', 'Período Ptolemaico'], correct: 0, explanation: 'As pirâmides de Gizé foram erguidas durante o Império Antigo.' },
  { question: 'Onde foi encontrada a tumba de Tutancâmon?', answers: ['Vale dos Reis', 'Gizé', 'Alexandria'], correct: 0, explanation: 'A tumba foi encontrada no Vale dos Reis, em 1922.' },
  { question: 'O que aparece na Pedra de Roseta?', answers: ['Um decreto em três escritas', 'Um mapa do Nilo', 'Uma lista de faraós'], correct: 0, explanation: 'O decreto aparece em hieróglifos, demótico e grego antigo.' },
  { question: 'Que canal reabriu para navegação em 1975?', answers: ['Canal de Suez', 'Canal do Nilo', 'Canal do Cairo'], correct: 0, explanation: 'O Canal de Suez reabriu após anos fechado desde 1967.' },
];

export const hieroglyphs = ['𓄿', '𓃀', '𓎡', '𓂧', '𓇌', '𓆑', '𓎼', '𓉔', '𓇋', '𓆓', '𓎡', '𓃭', '𓅓', '𓈖', '𓍯', '𓊪', '𓈎', '𓂋', '𓋴', '𓏏', '𓅱', '𓆑', '𓇋', '𓎡', '𓇌', '𓊃'];

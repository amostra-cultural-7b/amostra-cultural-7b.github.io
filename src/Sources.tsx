import type { ReactNode } from 'react';
import type { PageKey } from './data';

const sources: Partial<Record<PageKey, ReactNode>> = {
  nile: <p>Fontes para saber mais: <a href="https://resources.metmuseum.org/resources/metpublications/pdf/An_Egyptian_Bestiary_The_Metropolitan_Museum_of_Art_Bulletin_v_52_no_4_Spring_1995.pdf" target="_blank" rel="noreferrer">The Met — vida ao longo do Nilo</a> · <a href="https://whc.unesco.org/en/activities/172/" target="_blank" rel="noreferrer">UNESCO — salvamento de monumentos da Núbia</a>.</p>,
  monuments: <p>Fontes: <a href="https://whc.unesco.org/en/list/86/" target="_blank" rel="noreferrer">UNESCO — Memphis, Gizé e Dahshur</a> · <a href="https://whc.unesco.org/en/list/88/" target="_blank" rel="noreferrer">UNESCO — monumentos núbios</a> · <a href="https://www.metmuseum.org/essays/egypt-in-the-old-kingdom-ca-2649-2150-b-c" target="_blank" rel="noreferrer">The Met — Império Antigo</a> · <a href="https://egymonuments.gov.eg/monuments/workers-town-and-cemetery/" target="_blank" rel="noreferrer">Ministério egípcio — assentamento dos trabalhadores de Gizé</a> · <a href="https://giza.fas.harvard.edu/giza3d/" target="_blank" rel="noreferrer">Giza Project 3D, Harvard</a>.</p>,
  writing: <p>Fontes: <a href="https://www.britishmuseum.org/blog/everything-you-ever-wanted-know-about-rosetta-stone" target="_blank" rel="noreferrer">British Museum — Pedra de Roseta</a> · <a href="https://www.britishmuseum.org/learn/schools/ages-7-11/ancient-egypt/ancient-egyptian-gods-and-goddesses" target="_blank" rel="noreferrer">British Museum — deuses e deusas</a> · <a href="https://www.ucl.ac.uk/museums-static/digitalegypt/religion/deitiesplaces.html" target="_blank" rel="noreferrer">UCL Digital Egypt — divindades</a> · <a href="https://www.metmuseum.org/-/media/files/about-the-met/curatorial-departments/egyptian/facsimiles/2014_transformingthedead_web.pdf" target="_blank" rel="noreferrer">The Met — rituais funerários</a>.</p>,
  timeline: <p>Fontes: <a href="https://egymonuments.gov.eg/historical-periods/" target="_blank" rel="noreferrer">Ministério do Turismo e Antiguidades do Egito — períodos históricos</a> · <a href="https://www.britishmuseum.org/learn/schools/ages-7-11/ancient-egypt/timeline-ancient-egypt" target="_blank" rel="noreferrer">British Museum — linha do tempo</a> · <a href="https://www.metmuseum.org/toah/ht/05/afe" target="_blank" rel="noreferrer">The Metropolitan Museum of Art — Egito romano e bizantino</a> · <a href="https://history.state.gov/countries/egypt" target="_blank" rel="noreferrer">U.S. Department of State — Egito</a>.</p>,
  modern: <p>Fontes: <a href="https://sis.gov.eg/en/egypt/history/egypts-history/modern-era/" target="_blank" rel="noreferrer">Egypt State Information Service — era moderna</a> · <a href="https://www.presidency.eg/EN/%D8%A7%D9%84%D8%B1%D8%A6%D8%A7%D8%B3%D8%A9/%D9%85%D8%AA%D8%AD%D9%81-%D9%85%D8%AC%D9%84%D8%B3-%D9%82%D9%8A%D8%A7%D8%AF%D8%A9-%D8%A7%D9%84%D8%AB%D9%88%D8%B1%D8%A9/" target="_blank" rel="noreferrer">Presidência do Egito — revolução e proclamação da república</a> · <a href="https://www.suezcanal.gov.eg/English/About/SuezCanal/Pages/CanalHistory.aspx" target="_blank" rel="noreferrer">Autoridade do Canal de Suez — reabertura em 1975</a>.</p>,
};

export function Sources({ pageKey }: { pageKey: PageKey }) {
  return sources[pageKey] ?? (
    <>
      <p>Conteúdo educativo. Datas antigas são aproximadas.</p>
      <p>Imagens de acervo: The Metropolitan Museum of Art Open Access (CC0); veja os créditos individuais.</p>
      <p>Fontes: <a href="https://www.metmuseum.org/essays/egypt-in-the-old-kingdom-ca-2649-2150-b-c" target="_blank" rel="noreferrer">The Met</a> · <a href="https://whc.unesco.org/en/list/86/" target="_blank" rel="noreferrer">UNESCO</a></p>
    </>
  );
}

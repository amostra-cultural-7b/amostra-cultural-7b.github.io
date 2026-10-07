import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { getBodyClass, renderPage } from './render';
import type { PageKey } from './data';
import { Sources } from './Sources';
import '../styles.css';

const rootElement = document.querySelector<HTMLDivElement>('#root');
if (!rootElement) throw new Error('O ponto de montagem #root não foi encontrado.');

const candidate = rootElement.dataset.page as PageKey;
const page: PageKey = ['home', 'nile', 'monuments', 'writing', 'timeline', 'modern'].includes(candidate) ? candidate : 'home';
document.body.className = getBodyClass(page);

hydrateRoot(rootElement, <StrictMode>{renderPage(page, Sources)}</StrictMode>);

import type { ComponentType } from 'react';
import { SiteLayout } from './components';
import { type PageKey } from './data';
import { HomePage, ModernPage, MonumentsPage, NilePage, TimelinePage, WritingPage } from './pages';

const pages: Record<PageKey, ComponentType> = {
  home: HomePage,
  nile: NilePage,
  monuments: MonumentsPage,
  writing: WritingPage,
  timeline: TimelinePage,
  modern: ModernPage,
};

const bodyClasses: Record<PageKey, string> = {
  home: 'home', nile: 'page-nile', monuments: 'page-monuments', writing: 'page-writing', timeline: 'page-timeline', modern: 'page-modern',
};

export function renderPage(page: PageKey, Sources: ComponentType<{ pageKey: PageKey }>) {
  const Page = pages[page];
  return <SiteLayout page={page} footer={<Sources pageKey={page} />}><Page /></SiteLayout>;
}

export function getBodyClass(page: PageKey) {
  return bodyClasses[page];
}

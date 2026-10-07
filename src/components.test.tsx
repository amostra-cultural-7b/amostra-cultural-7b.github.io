import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { DeityGallery, NameActivity, Quiz } from './components';
import { TimelinePage, WritingPage } from './pages';

afterEach(cleanup);

describe('NameActivity', () => {
  it('converte letras acentuadas em sinais e informa quando o nome está vazio', () => {
    render(<NameActivity />);
    fireEvent.click(screen.getByRole('button', { name: 'Transformar meu nome' }));
    expect(screen.getByRole('status')).toHaveTextContent('Digite seu nome para começar');
    fireEvent.change(screen.getByRole('textbox', { name: 'Digite seu nome' }), { target: { value: 'Ána' } });
    fireEvent.click(screen.getByRole('button', { name: 'Transformar meu nome' }));
    expect(screen.getByRole('status')).toHaveTextContent('𓄿 𓈖 𓄿');
  });
});

describe('TimelinePage', () => {
  it('filtra por capítulo, atualiza a contagem e restaura a jornada completa', () => {
    render(<TimelinePage />);
    expect(screen.getByText('13 marcos históricos')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Período medieval' }));
    expect(screen.getByText('1 marco histórico')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Conquista árabe do Egito' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Jornada completa' }));
    expect(screen.getByText('13 marcos históricos')).toBeInTheDocument();
    expect(document.querySelector('#era-faraonica')).toBeInTheDocument();
    expect(document.querySelector('#era-ptolomaica')).toBeInTheDocument();
    expect(document.querySelector('#era-romana')).toBeInTheDocument();
    expect(document.querySelector('#era-medieval')).toBeInTheDocument();
    expect(document.querySelector('#era-moderna')).toBeInTheDocument();
  });
});

describe('WritingPage', () => {
  it('preserva os detalhes didáticos dos rituais funerários', () => {
    render(<WritingPage />);
    expect(screen.getByText(/Abertura da Boca/)).toBeInTheDocument();
    expect(screen.getByText(/Livro dos Mortos/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Osíris e a renovação' })).toBeInTheDocument();
  });
});

describe('Quiz', () => {
  it('aceita uma resposta por pergunta e permite refazer depois do resultado', () => {
    render(<Quiz />);
    fireEvent.click(screen.getByRole('button', { name: 'Rio Nilo' }));
    expect(screen.getByText(/O Nilo fornecia água/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Rio Nilo' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Próxima pergunta →' }));
    expect(screen.getByText('Pergunta 2 de 5')).toBeInTheDocument();
  });
});

describe('DeityGallery', () => {
  it('abre a ficha, navega pelas divindades e fecha pelo botão', () => {
    const { container } = render(<DeityGallery />);
    fireEvent.click(screen.getAllByRole('button', { name: /Rá/ })[0]!);
    expect(screen.getByRole('dialog')).toHaveAttribute('open');
    expect(screen.getByRole('heading', { name: 'Rá' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Próxima/ }));
    expect(screen.getByRole('heading', { name: 'Amon (Amun)' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Fechar detalhes de Amon/ }));
    expect(container.querySelector('dialog')).not.toHaveAttribute('open');
  });
});

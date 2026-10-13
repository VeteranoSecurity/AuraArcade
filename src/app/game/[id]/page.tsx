import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { GAMES } from '@/data/games';
import { GameDetailsView } from '@/components/GameDetailsView';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

interface GamePageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return GAMES.map((game) => ({
    id: game.id,
  }));
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const game = GAMES.find((g) => g.id === params.id);
  if (!game) {
    return {
      title: 'Jogo Não Encontrado — TabGames',
    };
  }

  return {
    metadataBase: new URL('https://tabgames.vercel.app'),
    title: `${game.title} — Sinopse, Plataformas e Jogar Online | TabGames`,
    description: `${game.synopsis.substring(0, 155)}... Jogue diretamente no navegador sem instalação.`,
    openGraph: {
      title: `${game.title} — TabGames HUB`,
      description: game.description,
      images: [
        {
          url: game.coverImage,
          alt: game.title,
        },
      ],
    },
  };
}

export default function GamePage({ params }: GamePageProps) {
  const game = GAMES.find((g) => g.id === params.id);

  if (!game) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-100">
      <Navbar totalGames={GAMES.length} />

      <main className="flex-1">
        <GameDetailsView game={game} />
      </main>

      <Footer />
    </div>
  );
}

import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { GAMES } from '@/data/games';
import { GamePlayerView } from '@/components/GamePlayerView';

interface PlayPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return GAMES.map((game) => ({
    id: game.id,
  }));
}

export async function generateMetadata({ params }: PlayPageProps): Promise<Metadata> {
  const game = GAMES.find((g) => g.id === params.id);
  if (!game) {
    return {
      title: 'Jogo Não Encontrado — AuraArcade',
    };
  }

  return {
    metadataBase: new URL('https://auraarcade.vercel.app'),
    title: `Jogar ${game.title} em Tela Cheia — AuraArcade`,
    description: `Jogue ${game.title} diretamente no navegador sem barras ou modais de terceiros. ${game.description}`,
    openGraph: {
      title: `Jogando ${game.title} em Tela Cheia — AuraArcade`,
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

export default function PlayPage({ params }: PlayPageProps) {
  const game = GAMES.find((g) => g.id === params.id);

  if (!game) {
    notFound();
  }

  return <GamePlayerView game={game} />;
}

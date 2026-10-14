'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/types/game';
import {
  Gamepad2,
  Bookmark,
  Calendar,
  Layers,
  Play,
  Info,
  Monitor,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface GameCardProps {
  game: Game;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  FPS: 'from-emerald-950/80 via-slate-900 to-[#090d0b]',
  'Ação & Mundo Aberto': 'from-green-950/80 via-slate-900 to-[#090d0b]',
  Clássicos: 'from-teal-950/80 via-slate-900 to-[#090d0b]',
  Esportes: 'from-lime-950/80 via-slate-900 to-[#090d0b]',
  'RPG & Estratégia': 'from-emerald-950/80 via-slate-900 to-[#090d0b]',
  Sandbox: 'from-green-950/80 via-slate-900 to-[#090d0b]',
};

const CATEGORY_ACCENT_COLORS: Record<string, string> = {
  FPS: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  'Ação & Mundo Aberto': 'text-green-400 bg-green-500/10 border-green-500/20',
  Clássicos: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
  Esportes: 'text-lime-400 bg-lime-500/10 border-lime-500/20',
  'RPG & Estratégia': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Sandbox: 'text-green-400 bg-green-500/10 border-green-500/20',
};

export const GameCard: React.FC<GameCardProps> = ({
  game,
  isFavorite,
  onToggleFavorite,
}) => {
  const { t } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const gradientFallback =
    CATEGORY_GRADIENTS[game.primaryCategory] ||
    'from-emerald-950/80 via-slate-900 to-[#090d0b]';

  const categoryStyle =
    CATEGORY_ACCENT_COLORS[game.primaryCategory] ||
    'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';

  return (
    <div className="group relative flex flex-col rounded-2xl bg-[#0e1310]/95 border border-white/[0.08] hover:border-emerald-500/60 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/25 overflow-hidden select-none">
      {/* Top Banner / Cover Area (Clickable to view synopsis) */}
      <Link
        href={`/game/${game.id}`}
        className="relative w-full aspect-[16/10] overflow-hidden bg-[#0a0f0c] block cursor-pointer"
        title={`Ver sinopse de ${game.title}`}
      >
        {/* Themed Cyber/Poster Placeholder */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradientFallback} flex flex-col items-center justify-center p-5 text-center overflow-hidden`}
        >
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(34,197,94,0.1)_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />

          {/* Glowing ambient ring */}
          <div className="relative w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-md flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 group-hover:border-emerald-400/50 transition-all duration-300">
            <Gamepad2 className="w-6 h-6 text-emerald-400 group-hover:text-lime-300 transition-colors" />
          </div>

          <span className="text-sm sm:text-base font-bold text-white tracking-wide drop-shadow-md line-clamp-1 px-2">
            {game.title}
          </span>
          <span className="text-[11px] text-emerald-400/80 font-mono mt-0.5">
            {game.category}
          </span>
        </div>

        {/* Real image if available */}
        {!imageError && (
          <Image
            src={game.coverImage}
            alt={game.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-all duration-500 ease-out group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        {/* Ambient bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1310] via-[#0e1310]/30 to-transparent pointer-events-none" />

        {/* Badges / Pill Tags on Top Corner */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            {game.badge && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500 text-black backdrop-blur-md shadow-md border border-lime-300/40">
                {game.badge}
              </span>
            )}
            {game.releaseYear && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/70 text-slate-300 backdrop-blur-md border border-white/10">
                <Calendar className="w-3 h-3 text-emerald-400" />
                {game.releaseYear}
              </span>
            )}
          </div>

          {/* Favorite Toggle Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(game.id);
            }}
            className="pointer-events-auto p-2 rounded-xl bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-all active:scale-90"
            title={isFavorite ? t.removeFavorite : t.saveFavorite}
          >
            <Bookmark
              className={`w-4 h-4 transition-colors ${
                isFavorite
                  ? 'fill-emerald-400 text-emerald-400'
                  : 'text-slate-300 hover:text-emerald-400'
              }`}
            />
          </button>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between gap-1.5 mb-1.5">
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border flex items-center gap-1 ${categoryStyle}`}
            >
              <Layers className="w-3 h-3" />
              {game.category}
            </span>

            {/* Platforms preview */}
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Monitor className="w-3 h-3" />
              {game.platforms[0] || 'Web'}
            </span>
          </div>

          <Link href={`/game/${game.id}`}>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight hover:text-emerald-300 transition-colors line-clamp-1 cursor-pointer">
              {game.title}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
            {game.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {game.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.04] text-slate-300 border border-white/[0.06]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Dual Actions: [Ver Sinopse] and [Jogar] (Balanced 50/50 split with equal height) */}
        <div className="pt-3 mt-auto border-t border-white/[0.06] grid grid-cols-2 gap-2">
          {/* Button 1: Ver Sinopse */}
          <Link
            href={`/game/${game.id}`}
            className="h-10 min-w-0 flex items-center justify-center gap-1.5 px-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 hover:text-white border border-emerald-500/25 hover:border-emerald-400/50 shadow-sm transition-all duration-200 active:scale-95 text-center group/info"
            title={t.viewSynopsis}
          >
            <Info className="w-3.5 h-3.5 shrink-0 text-emerald-400 group-hover/info:text-emerald-300 transition-colors" />
            <span className="truncate whitespace-nowrap">{t.viewSynopsis}</span>
          </Link>

          {/* Button 2: Jogar */}
          {game.embedMode === 'injected' || game.embedMode === 'direct' ? (
            <Link
              href={`/play/${game.id}`}
              className="h-10 min-w-0 flex items-center justify-center gap-1.5 px-2 rounded-xl text-xs font-bold whitespace-nowrap bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-black shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200 active:scale-95 group/play text-center"
              title={`${t.playNow} ${game.title}`}
            >
              <Play className="w-3.5 h-3.5 shrink-0 fill-black" />
              <span className="truncate whitespace-nowrap">{t.playNow}</span>
            </Link>
          ) : (
            <a
              href={game.gameUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 min-w-0 flex items-center justify-center gap-1.5 px-2 rounded-xl text-xs font-bold whitespace-nowrap bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-black shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200 active:scale-95 group/play text-center"
              title={`${t.playNow} ${game.title}`}
            >
              <Play className="w-3.5 h-3.5 shrink-0 fill-black" />
              <span className="truncate whitespace-nowrap">{t.playNow}</span>
              <ExternalLink className="w-3 h-3 shrink-0 opacity-75 group-hover/play:translate-x-0.5 transition-transform" />
            </a>
          )}
        </div>

      </div>
    </div>
  );
};

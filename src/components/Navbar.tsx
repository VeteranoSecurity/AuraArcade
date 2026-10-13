'use client';

import React from 'react';
import Link from 'next/link';
import { Gamepad2, Shuffle, BookmarkCheck } from 'lucide-react';

interface NavbarProps {
  totalGames: number;
  favoritesCount?: number;
  showFavoritesOnly?: boolean;
  onToggleFavoritesOnly?: () => void;
  onRandomGame?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalGames,
  favoritesCount = 0,
  showFavoritesOnly = false,
  onToggleFavoritesOnly,
  onRandomGame,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#070908]/85 border-b border-emerald-500/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group cursor-pointer focus:outline-none"
        >
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-green-500 to-lime-400 p-[1px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#0a0f0c] rounded-[11px] flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-emerald-400 group-hover:text-lime-300 transition-colors" />
            </div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-500 -z-10" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-white font-sans">
                Tab<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-lime-400">Games</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                HUB
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
              Jogos de Navegador Instantâneos
            </span>
          </div>
        </Link>

        {/* Center / Stats Badge */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/20 text-xs text-slate-300 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-white">{totalGames}</span>
            <span>jogos prontos para jogar</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Random Game Picker */}
          {onRandomGame && (
            <button
              onClick={onRandomGame}
              title="Escolher um jogo aleatório para jogar agora"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-emerald-500/50 hover:text-emerald-300 transition-all duration-200 active:scale-95 shadow-sm"
            >
              <Shuffle className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Aleatório</span>
            </button>
          )}

          {/* Favorites Filter Toggle */}
          {onToggleFavoritesOnly && (
            <button
              onClick={onToggleFavoritesOnly}
              title={showFavoritesOnly ? 'Ver todos os jogos' : 'Ver apenas favoritados'}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-200 active:scale-95 ${
                showFavoritesOnly
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-lg shadow-rose-500/10'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-white/10 hover:border-slate-700'
              }`}
            >
              <BookmarkCheck
                className={`w-4 h-4 ${showFavoritesOnly ? 'text-rose-400' : 'text-slate-400'}`}
              />
              <span className="hidden sm:inline">Salvos</span>
              {favoritesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[11px] font-bold bg-rose-500/30 text-rose-200">
                  {favoritesCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

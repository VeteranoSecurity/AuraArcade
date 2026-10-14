'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shuffle,
  BookmarkCheck,
  Heart,
  Coffee,
  Globe,
  ChevronDown,
  Check,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

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
  const { lang, setLang, t, openDonate } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleSupportClick = () => {
    if (lang === 'pt') {
      openDonate();
    } else {
      window.open('https://buymeacoffee.com/trilharede', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#070908]/85 border-b border-emerald-500/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group cursor-pointer focus:outline-none shrink-0"
        >
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden p-[1px] shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/60 transition-all duration-300 group-hover:scale-105">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-black flex items-center justify-center border border-emerald-500/30 group-hover:border-lime-400/60 transition-colors">
              <Image
                src="/logo.png"
                alt="AuraArcade Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-green-400 to-lime-400 rounded-xl blur-sm opacity-40 group-hover:opacity-80 transition duration-500 -z-10" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
                Aura<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-lime-400">Arcade</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                HUB
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
              {t.brandSubtitle}
            </span>
          </div>
        </Link>

        {/* Center / Stats Badge */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/20 text-xs text-slate-300 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-white">{totalGames}</span>
            <span>{lang === 'pt' ? 'jogos prontos para jogar' : 'games ready to play'}</span>
          </div>
        </div>

        {/* Action Controls: Random + Saved + Rainbow Support Button + Language Selector */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Random Game Picker */}
          {onRandomGame && (
            <button
              onClick={onRandomGame}
              title={t.randomTitle}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-emerald-500/50 hover:text-emerald-300 transition-all duration-200 active:scale-95 shadow-sm"
            >
              <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span className="hidden md:inline">{t.randomBtn}</span>
            </button>
          )}

          {/* Favorites Filter Toggle */}
          {onToggleFavoritesOnly && (
            <button
              onClick={onToggleFavoritesOnly}
              title={t.savedTitle(showFavoritesOnly)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-200 active:scale-95 ${
                showFavoritesOnly
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-lg shadow-rose-500/10'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-white/10 hover:border-slate-700'
              }`}
            >
              <BookmarkCheck
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${showFavoritesOnly ? 'text-rose-400' : 'text-slate-400'}`}
              />
              <span className="hidden md:inline">{t.savedBtn}</span>
              {favoritesCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] sm:text-[11px] font-bold bg-rose-500/30 text-rose-200">
                  {favoritesCount}
                </span>
              )}
            </button>
          )}

          {/* Animated Rainbow Support Button (identical behavior to PuroMagnet) */}
          <div className="relative group">
            {/* Outer Glowing Rainbow Aura */}
            <div className="absolute -inset-0.5 rounded-xl rainbow-glow-bg opacity-75 group-hover:opacity-100 blur-sm transition-all duration-500" />

            {/* Inner Rainbow Button */}
            <button
              onClick={handleSupportClick}
              className="relative flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-black text-white rainbow-glow-bg rounded-xl shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
              title={t.supportBtnTitle}
            >
              {lang === 'pt' ? (
                <>
                  <Heart className="w-3.5 h-3.5 fill-white text-pink-200 animate-pulse" />
                  <span className="drop-shadow-md whitespace-nowrap">Apoiar (PIX)</span>
                </>
              ) : (
                <>
                  <Coffee className="w-3.5 h-3.5 text-white animate-bounce" />
                  <span className="drop-shadow-md whitespace-nowrap">Buy Me a Coffee</span>
                </>
              )}
            </button>
          </div>

          {/* Language Dropdown Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/20 hover:border-emerald-500/50 rounded-xl backdrop-blur-md transition-all duration-200"
              title={lang === 'pt' ? 'Mudar idioma / Change language' : 'Change language / Mudar idioma'}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-xs">{lang === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}</span>
              <ChevronDown
                className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                  isLangOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isLangOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsLangOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-36 bg-[#0c120e] border border-emerald-500/30 rounded-xl shadow-2xl p-1 z-50 backdrop-blur-xl">
                  <button
                    onClick={() => {
                      setLang('pt');
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                      lang === 'pt'
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🇧🇷</span>
                      <span>Português</span>
                    </span>
                    {lang === 'pt' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                  <button
                    onClick={() => {
                      setLang('en');
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                      lang === 'en'
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🇺🇸</span>
                      <span>English</span>
                    </span>
                    {lang === 'en' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

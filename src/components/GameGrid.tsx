'use client';

import React, { useState, useMemo } from 'react';
import { Game } from '@/types/game';
import { GameCard } from './GameCard';
import { Ghost, ArrowDownAZ, FilterX } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface GameGridProps {
  games: Game[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onResetFilters: () => void;
  isFiltered: boolean;
}

type SortOption = 'default' | 'name-asc' | 'name-desc' | 'year-desc';

export const GameGrid: React.FC<GameGridProps> = ({
  games,
  favorites,
  onToggleFavorite,
  onResetFilters,
  isFiltered,
}) => {
  const { lang, t } = useLanguage();
  const [sortOption, setSortOption] = useState<SortOption>('default');

  // Sorted list based on chosen option
  const sortedGames = useMemo(() => {
    const list = [...games];
    switch (sortOption) {
      case 'name-asc':
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return list.sort((a, b) => b.title.localeCompare(a.title));
      case 'year-desc':
        return list.sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0));
      default:
        // Featured first, then original order
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [games, sortOption]);

  return (
    <div className="w-full">
      {/* Subheader Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-300">
            {lang === 'pt'
              ? games.length === 1
                ? '1 jogo encontrado'
                : `${games.length} jogos disponíveis`
              : games.length === 1
              ? '1 game found'
              : `${games.length} games available`}
          </span>
          {isFiltered && (
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
              {lang === 'pt' ? 'Filtro ativo' : 'Active filter'}
            </span>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <ArrowDownAZ className="w-3.5 h-3.5" />
            {lang === 'pt' ? 'Ordenar:' : 'Sort:'}
          </span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="text-xs bg-[#0e1410] text-slate-200 border border-white/10 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="default">
              {lang === 'pt' ? 'Destaques e Populares' : 'Featured & Popular'}
            </option>
            <option value="name-asc">
              {lang === 'pt' ? 'Nome (A - Z)' : 'Name (A - Z)'}
            </option>
            <option value="name-desc">
              {lang === 'pt' ? 'Nome (Z - A)' : 'Name (Z - A)'}
            </option>
            <option value="year-desc">
              {lang === 'pt' ? 'Ano de Lançamento' : 'Release Year'}
            </option>
          </select>
        </div>
      </div>

      {/* Main Grid or Empty State */}
      {sortedGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isFavorite={favorites.includes(game.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-3xl bg-[#0c120e]/60 border border-white/[0.06] backdrop-blur-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400">
            <Ghost className="w-8 h-8 animate-bounce" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            {t.noGamesFound}
          </h3>
          <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
            {t.noGamesFoundDesc}
          </p>
          <button
            onClick={onResetFilters}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-emerald-400/40 transition-all active:scale-95"
          >
            <FilterX className="w-4 h-4 text-emerald-400" />
            <span>{t.clearFilters}</span>
          </button>
        </div>
      )}
    </div>
  );
};

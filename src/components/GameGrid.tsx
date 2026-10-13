'use client';

import React, { useState, useMemo } from 'react';
import { Game } from '@/types/game';
import { GameCard } from './GameCard';
import { Ghost, ArrowDownAZ, FilterX } from 'lucide-react';

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
            {games.length === 1 ? '1 jogo encontrado' : `${games.length} jogos disponíveis`}
          </span>
          {isFiltered && (
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
              Filtro ativo
            </span>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <ArrowDownAZ className="w-3.5 h-3.5" />
            Ordenar:
          </span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="text-xs bg-[#0e1410] text-slate-200 border border-white/10 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="default">Destaques e Populares</option>
            <option value="name-asc">Nome (A - Z)</option>
            <option value="name-desc">Nome (Z - A)</option>
            <option value="year-desc">Ano de Lançamento</option>
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
            Nenhum jogo encontrado
          </h3>
          <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
            Não encontramos nenhum resultado para os termos ou filtros aplicados. Tente buscar por outro nome ou explore todas as categorias.
          </p>
          <button
            onClick={onResetFilters}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-emerald-400/40 transition-all active:scale-95"
          >
            <FilterX className="w-4 h-4 text-emerald-400" />
            <span>Limpar filtros de busca</span>
          </button>
        </div>
      )}
    </div>
  );
};

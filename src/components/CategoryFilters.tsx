'use client';

import React from 'react';
import { GameCategory } from '@/types/game';
import { Flame, Crosshair, Compass, Trophy, Sword, Box, Layers } from 'lucide-react';

interface CategoryFiltersProps {
  categories: GameCategory[];
  activeCategory: GameCategory;
  onSelectCategory: (category: GameCategory) => void;
  categoryCounts: Record<GameCategory, number>;
}

const CATEGORY_ICONS: Record<GameCategory, React.ReactNode> = {
  Todos: <Layers className="w-4 h-4" />,
  FPS: <Crosshair className="w-4 h-4" />,
  'Ação & Mundo Aberto': <Compass className="w-4 h-4" />,
  Clássicos: <Flame className="w-4 h-4" />,
  Esportes: <Trophy className="w-4 h-4" />,
  'RPG & Estratégia': <Sword className="w-4 h-4" />,
  Sandbox: <Box className="w-4 h-4" />,
};

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="w-full relative my-4">
      {/* Scrollable Pills container with custom padding */}
      <div className="flex items-center gap-2.5 overflow-x-auto py-2 px-1 scrollbar-none no-scrollbar justify-start md:justify-center">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const count = categoryCounts[category] || 0;

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 text-black shadow-lg shadow-emerald-500/25 border border-lime-300/50'
                  : 'bg-[#0f1411]/80 hover:bg-[#141b16] text-slate-300 hover:text-white border border-white/[0.08] hover:border-emerald-500/40'
              }`}
            >
              {/* Category Icon */}
              <span
                className={`transition-colors ${
                  isActive ? 'text-black' : 'text-slate-400 group-hover:text-emerald-400'
                }`}
              >
                {CATEGORY_ICONS[category]}
              </span>

              {/* Title */}
              <span>{category}</span>

              {/* Pill Count */}
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                  isActive
                    ? 'bg-black/25 text-black'
                    : 'bg-white/5 text-slate-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-300'
                }`}
              >
                {count}
              </span>

              {/* Subtle top specular glow when active */}
              {isActive && (
                <span className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

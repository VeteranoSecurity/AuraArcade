'use client';

import React from 'react';
import { GameCategory } from '@/types/game';
import { Flame, Crosshair, Compass, Trophy, Sword, Box, Layers } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface CategoryFiltersProps {
  categories: GameCategory[];
  activeCategory: GameCategory;
  onSelectCategory: (category: GameCategory) => void;
  categoryCounts: Record<GameCategory, number>;
}

const CATEGORY_ICONS: Record<GameCategory, React.ReactNode> = {
  Todos: <Layers className="w-4 h-4 shrink-0" />,
  FPS: <Crosshair className="w-4 h-4 shrink-0" />,
  'Ação & Mundo Aberto': <Compass className="w-4 h-4 shrink-0" />,
  Clássicos: <Flame className="w-4 h-4 shrink-0" />,
  Esportes: <Trophy className="w-4 h-4 shrink-0" />,
  'RPG & Estratégia': <Sword className="w-4 h-4 shrink-0" />,
  Sandbox: <Box className="w-4 h-4 shrink-0" />,
};

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const { t } = useLanguage();

  return (
    <div className="w-full relative my-5">
      {/* Pills container: wraps on desktop, cleanly scrolls on mobile without clipping the first item */}
      <div className="flex items-center justify-start md:justify-center flex-nowrap md:flex-wrap gap-2 sm:gap-2.5 overflow-x-auto md:overflow-visible py-2.5 px-3 sm:px-4 no-scrollbar scrollbar-none select-none">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const count = categoryCounts[category] || 0;

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`group relative flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-300 active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 text-black shadow-lg shadow-emerald-500/25 border border-lime-300/50'
                  : 'bg-[#0e1411]/90 hover:bg-[#151d18] text-slate-300 hover:text-white border border-white/[0.08] hover:border-emerald-500/40'
              }`}
            >
              {/* Category Icon */}
              <span
                className={`transition-colors shrink-0 ${
                  isActive ? 'text-black' : 'text-slate-400 group-hover:text-emerald-400'
                }`}
              >
                {CATEGORY_ICONS[category]}
              </span>

              {/* Title */}
              <span>{t.categories[category] || category}</span>

              {/* Pill Count */}
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors shrink-0 ${
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

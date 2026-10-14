'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { GAMES, CATEGORIES } from '@/data/games';
import { Game, GameCategory } from '@/types/game';
import { Navbar } from '@/components/Navbar';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilters } from '@/components/CategoryFilters';
import { GameGrid } from '@/components/GameGrid';
import { Footer } from '@/components/Footer';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('Todos');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load favorites from localStorage on client mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved =
        localStorage.getItem('auraarcade_favorites') ||
        localStorage.getItem('tabgames_favorites');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch {
      // Fallback
    }
  }, []);

  // Save favorites to localStorage
  const handleToggleFavorite = (gameId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(gameId);
      const updated = exists ? prev.filter((id) => id !== gameId) : [...prev, gameId];
      try {
        localStorage.setItem('auraarcade_favorites', JSON.stringify(updated));
      } catch {
        // Fallback
      }
      return updated;
    });
  };

  // Launch a random game or navigate to its page
  const handleRandomGame = () => {
    const pool = filteredGames.length > 0 ? filteredGames : GAMES;
    const randomIndex = Math.floor(Math.random() * pool.length);
    const chosen = pool[randomIndex];
    if (chosen) {
      window.location.href = `/game/${chosen.id}`;
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
    setShowFavoritesOnly(false);
  };

  // Calculate game count for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Todos: GAMES.length,
    };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'Todos') {
        counts[cat] = GAMES.filter((g) => g.primaryCategory === cat).length;
      }
    });
    return counts as Record<GameCategory, number>;
  }, []);

  // Filtered games based on search, category and favorites
  const filteredGames = useMemo(() => {
    return GAMES.filter((game) => {
      // Favorites filter
      if (showFavoritesOnly && !favorites.includes(game.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'Todos' && game.primaryCategory !== selectedCategory) {
        return false;
      }

      // Search term filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = game.title.toLowerCase().includes(query);
        const matchesCategory = game.category.toLowerCase().includes(query);
        const matchesDescription = game.description.toLowerCase().includes(query);
        const matchesSynopsis = game.synopsis?.toLowerCase().includes(query);
        const matchesTags = game.tags.some((tag) => tag.toLowerCase().includes(query));

        if (!matchesTitle && !matchesCategory && !matchesDescription && !matchesSynopsis && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, showFavoritesOnly, favorites]);

  const isFiltered =
    Boolean(searchQuery.trim()) || selectedCategory !== 'Todos' || showFavoritesOnly;

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-100">
      {/* Sticky Navigation Bar */}
      <Navbar
        totalGames={GAMES.length}
        favoritesCount={mounted ? favorites.length : 0}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly((prev) => !prev)}
        onRandomGame={handleRandomGame}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Search & Discover Header */}
        <section className="mb-8 space-y-6">
          <div className="relative text-center max-w-3xl mx-auto space-y-3 px-6 py-6 sm:py-7 rounded-3xl bg-[#090f0c]/90 border border-emerald-500/25 backdrop-blur-2xl shadow-2xl shadow-black/90">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Aura Gaming HUB</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center justify-center gap-2">
              <span className="drop-shadow-lg">{t.libraryTitle}</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-xl mx-auto drop-shadow-sm">
              {t.librarySubtitle}
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder={t.searchPlaceholder} />

          {/* Category Filter Pills */}
          <CategoryFilters
            categories={CATEGORIES}
            activeCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              if (showFavoritesOnly) setShowFavoritesOnly(false);
            }}
            categoryCounts={categoryCounts}
          />
        </section>

        {/* Game Grid with Sorting and Empty State */}
        <GameGrid
          games={filteredGames}
          favorites={mounted ? favorites : []}
          onToggleFavorite={handleToggleFavorite}
          onResetFilters={handleResetFilters}
          isFiltered={isFiltered}
        />
      </main>

      {/* Modern Footer */}
      <Footer />
    </div>
  );
}

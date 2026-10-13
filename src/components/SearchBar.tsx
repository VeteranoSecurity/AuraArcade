'use client';

import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar por título, franquia, tag (ex: zombies, wasm, gta)...',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener (/ or Ctrl+K to focus search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) &&
        document.activeElement !== inputRef.current
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      {/* Ambient neon gradient glow on focus/hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-lime-500/20 rounded-2xl blur-md opacity-40 group-focus-within:opacity-100 transition duration-300 -z-10" />

      <div className="relative flex items-center bg-[#0d120f]/90 border border-white/[0.1] group-focus-within:border-emerald-400/60 rounded-2xl shadow-xl shadow-black/50 backdrop-blur-md transition-all duration-300">
        <div className="pl-4 pr-2 text-slate-400 group-focus-within:text-emerald-400 transition-colors">
          <Search className="w-5 h-5" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full py-3.5 pr-10 text-sm sm:text-base bg-transparent text-white placeholder-slate-400 focus:outline-none"
        />

        {value ? (
          <button
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            className="p-1.5 mr-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Limpar busca"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-1 mr-3 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-400 select-none">
            <span>/</span>
          </div>
        )}
      </div>
    </div>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import { Gamepad2, Heart, Shield, Cpu, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const fullText = 'Desenvolvido por TrilhaRede';
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter animation in infinite loop
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && text.length < fullText.length) {
      // Typing forward
      timer = setTimeout(() => {
        setText(fullText.substring(0, text.length + 1));
      }, 110);
    } else if (!isDeleting && text.length === fullText.length) {
      // Pause at full text
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && text.length > 0) {
      // Deleting backwards
      timer = setTimeout(() => {
        setText(fullText.substring(0, text.length - 1));
      }, 55);
    } else if (isDeleting && text.length === 0) {
      // Pause before retyping
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, 600);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  return (
    <footer className="w-full border-t border-emerald-500/10 bg-[#060807] mt-24 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-lime-500 p-[1px] flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-[#0a0f0c] rounded-[11px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Aura<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400">Arcade</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              O ecossistema definitivo para reviver e jogar obras-primas dos videogames diretamente na web, potencializado pela tecnologia WebAssembly e emuladores modernos.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1 text-slate-400">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" /> WebAssembly & Cloud
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <Shield className="w-3.5 h-3.5 text-lime-400" /> Zero Instalação
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Categorias Populares
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#fps" className="hover:text-emerald-400 transition-colors">
                  Tiro & FPS Clássico
                </a>
              </li>
              <li>
                <a href="#open-world" className="hover:text-emerald-400 transition-colors">
                  Mundo Aberto & Ação
                </a>
              </li>
              <li>
                <a href="#retro" className="hover:text-emerald-400 transition-colors">
                  Retro & Nostalgia
                </a>
              </li>
              <li>
                <a href="#sports" className="hover:text-emerald-400 transition-colors">
                  Esportes & Simulação
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Note */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Sobre a Plataforma
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Todos os jogos apresentados são projetos abertos, ports comunitários ou demonstrações de WebAssembly hospedados publicamente pelos seus respectivos autores. AuraArcade atua como um catálogo de curadoria.
            </p>
          </div>
        </div>

        {/* Animated Developer Banner */}
        <div className="py-4 px-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm text-emerald-400">
            <Code2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold text-white">
              {text}
              <span className="animate-pulse text-emerald-400 font-black ml-0.5">|</span>
            </span>
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            Tech & Gaming Studio
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} AuraArcade HUB. Criado com</span>
            <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 inline" />
            <span>para a comunidade gamer.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500">Desenvolvido com Next.js & Tailwind</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium">
              Vercel Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

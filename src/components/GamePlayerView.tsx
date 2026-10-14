'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/types/game';
import {
  ArrowLeft,
  Maximize,
  Minimize,
  ExternalLink,
  Gamepad2,
  RotateCcw,
  AlertTriangle,
  Loader2,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

interface GamePlayerViewProps {
  game: Game;
}

export const GamePlayerView: React.FC<GamePlayerViewProps> = ({ game }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('Inicializando player de jogo...');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBarVisible, setIsBarVisible] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  // Sync fullscreen state with browser changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Fullscreen toggle handler
  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        const root = document.documentElement as HTMLElement & {
          webkitRequestFullscreen?: () => Promise<void>;
          mozRequestFullScreen?: () => Promise<void>;
          msRequestFullscreen?: () => Promise<void>;
        };

        if (root.requestFullscreen) {
          await root.requestFullscreen();
        } else if (root.webkitRequestFullscreen) {
          await root.webkitRequestFullscreen();
        } else if (root.mozRequestFullScreen) {
          await root.mozRequestFullScreen();
        } else if (root.msRequestFullscreen) {
          await root.msRequestFullscreen();
        }
      } else {
        const doc = document as Document & {
          webkitExitFullscreen?: () => Promise<void>;
          mozCancelFullScreen?: () => Promise<void>;
          msExitFullscreen?: () => Promise<void>;
        };

        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          await doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Erro ao alternar tela cheia:', err);
    }
  }, []);

  // Main game loading / injection effect
  useEffect(() => {
    let isCancelled = false;

    // Mode: INJECTED
    if (game.embedMode === 'injected') {
      if (!game.embedConfig?.gameFileUrl || !game.embedConfig?.baseHref) {
        setError('Configuração de injeção incompleta para este jogo.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setStatusMessage('Buscando binários e código-fonte do motor...');

      fetch(game.embedConfig.gameFileUrl)
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`Falha ao obter arquivos do jogo (HTTP ${response.status})`);
          }
          return response.text();
        })
        .then((rawHtml) => {
          if (isCancelled) return;
          setStatusMessage('Configurando base WebGL & carregando dependências...');

          const baseHref = game.embedConfig!.baseHref;
          let cleanHtml = rawHtml;

          // Replace or insert <base href="...">
          if (/<base[^>]*>/i.test(cleanHtml)) {
            cleanHtml = cleanHtml.replace(/<base[^>]*>/i, `<base href="${baseHref}">`);
          } else if (/<head[^>]*>/i.test(cleanHtml)) {
            cleanHtml = cleanHtml.replace(/<head[^>]*>/i, `$&<base href="${baseHref}">`);
          } else {
            cleanHtml = `<base href="${baseHref}">` + cleanHtml;
          }

          // Ensure any root-relative references to /s/ resolve to the gn-math server
          cleanHtml = cleanHtml.replace(/(["'])\/s\//g, '$1https://gn-math.dev/s/');

          const iframe = iframeRef.current;
          if (!iframe) {
            throw new Error('Elemento iframe indisponível para injeção.');
          }

          const doc = iframe.contentDocument || iframe.contentWindow?.document;
          if (!doc) {
            throw new Error('Acesso ao documento do iframe indisponível.');
          }

          doc.open();
          doc.write(cleanHtml);
          doc.close();

          // Wait a short moment for internal WebGL loader scripts to start
          setTimeout(() => {
            if (!isCancelled) {
              setIsLoading(false);
            }
          }, 800);
        })
        .catch((err) => {
          if (isCancelled) return;
          console.error('Erro na injeção do jogo:', err);
          setError(err?.message || 'Falha ao processar os arquivos do jogo.');
          setIsLoading(false);
        });

      return () => {
        isCancelled = true;
      };
    }

    // Mode: DIRECT
    if (game.embedMode === 'direct') {
      setIsLoading(true);
      setError(null);
      setStatusMessage('Carregando servidor do jogo...');
      return;
    }

    // Mode: EXTERNAL (fallback / redirect)
    if (game.embedMode === 'external' || !game.embedMode) {
      setIsLoading(false);
      setStatusMessage('Redirecionando para o servidor externo...');
      const timer = setTimeout(() => {
        if (!isCancelled) {
          window.location.href = game.gameUrl;
        }
      }, 1200);

      return () => {
        isCancelled = true;
        clearTimeout(timer);
      };
    }
  }, [game, reloadKey]);

  const handleManualReload = () => {
    setIsLoading(true);
    setError(null);
    setReloadKey((prev) => prev + 1);
  };

  return (
    <div className="w-screen h-screen bg-black overflow-hidden flex flex-col relative select-none">
      {/* Discreet Floating Top Bar (Dark Glassmorphism) */}
      <header
        className={`absolute top-0 left-0 right-0 z-30 transition-all duration-300 transform ${
          isBarVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between px-3 sm:px-6 py-2 bg-[#080d0a]/80 hover:bg-[#080d0a]/95 backdrop-blur-md border-b border-white/[0.08] shadow-lg">
          {/* Left: Voltar Button */}
          <div className="flex items-center gap-3">
            <Link
              href={`/game/${game.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/10 hover:border-emerald-400/50 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 shadow-sm"
              title="Voltar para a biblioteca ou sinopse"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span className="hidden xs:inline">Voltar</span>
            </Link>

            {/* Reload button */}
            <button
              onClick={handleManualReload}
              className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 hover:border-emerald-500/40 transition-all active:scale-90"
              title="Recarregar jogo"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>

          {/* Center: Game Title & Badges */}
          <div className="flex items-center gap-2 max-w-[45%] sm:max-w-md mx-2">
            <div className="w-6 h-6 rounded-lg overflow-hidden border border-emerald-500/30 flex items-center justify-center shrink-0 hidden sm:flex bg-black">
              <Image
                src="/logo.png"
                alt="AuraArcade"
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate drop-shadow-sm">
              {game.title}
            </h1>

            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap hidden md:inline-block">
              {game.category}
            </span>

            {game.badge && (
              <span className="hidden lg:inline-block px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-lime-400 text-black">
                {game.badge}
              </span>
            )}
          </div>

          {/* Right: Fullscreen Toggle & Abrir Externamente */}
          <div className="flex items-center gap-2">
            {/* Native Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/10 hover:border-emerald-400/50 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 shadow-sm"
              title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia nativa'}
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4 text-emerald-400" />
              ) : (
                <Maximize className="w-4 h-4 text-emerald-400" />
              )}
              <span className="hidden sm:inline">
                {isFullscreen ? 'Sair' : 'Tela Cheia'}
              </span>
            </button>

            {/* Abrir Externamente Button */}
            <a
              href={game.gameUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-white border border-emerald-500/30 hover:border-emerald-400/60 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 shadow-sm"
              title="Abrir o jogo diretamente na página externa original"
            >
              <ExternalLink className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Abrir Externamente</span>
            </a>

            {/* Collapse/Hide Bar Button */}
            <button
              onClick={() => setIsBarVisible(false)}
              className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10 transition-all"
              title="Ocultar barra superior para visão 100% limpa"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating reveal tab when top bar is collapsed */}
      {!isBarVisible && (
        <button
          onClick={() => setIsBarVisible(true)}
          className="absolute top-2 right-4 z-30 p-2 rounded-xl bg-black/80 hover:bg-black text-emerald-400 border border-emerald-500/30 hover:border-emerald-400 backdrop-blur-md shadow-xl transition-all duration-200 active:scale-95"
          title="Exibir barra de controle"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-6 text-center animate-in fade-in duration-200">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg shadow-emerald-500/40 border border-emerald-400/50 animate-pulse">
                <Image
                  src="/logo.png"
                  alt="AuraArcade Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 drop-shadow-md">
            {game.title}
          </h2>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs mb-3">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>{statusMessage}</span>
          </div>

          <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
            Injeção limpa de HTML/WASM sem barras de terceiros, sem modais e sem about:blank.
          </p>
        </div>
      )}

      {/* Error Fallback Overlay */}
      {error && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/95 p-6 text-center animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4 text-red-400">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            Não foi possível carregar o jogo
          </h3>

          <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
            {error}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleManualReload}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/25 transition-all active:scale-95 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tentar Novamente</span>
            </button>

            <a
              href={game.gameUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-all flex items-center gap-2"
            >
              <span>Abrir Servidor Original</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <Link
              href={`/game/${game.id}`}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white transition-all"
            >
              Voltar aos detalhes
            </Link>
          </div>
        </div>
      )}

      {/* External Redirecting Card */}
      {(game.embedMode === 'external' || !game.embedMode) && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/95 p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400">
            <ExternalLink className="w-8 h-8 animate-pulse" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Redirecionando para {game.title}...
          </h2>
          <p className="text-sm text-slate-400 max-w-md mb-6">
            Este jogo é executado exclusivamente no servidor oficial externo.
          </p>
          <a
            href={game.gameUrl}
            className="px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-lime-500 text-black shadow-lg shadow-emerald-500/30"
          >
            Clique aqui se não abrir automaticamente
          </a>
        </div>
      )}

      {/* 100% Responsive Game Area with Iframe */}
      <div className="flex-1 w-full h-full relative bg-black">
        <iframe
          ref={iframeRef}
          id="game-player-frame"
          key={reloadKey}
          title={game.title}
          className="w-full h-full border-0 block bg-black"
          allow="autoplay; fullscreen; gamepad; focus-without-user-activation; pointer-lock"
          allowFullScreen
          onLoad={() => {
            if (game.embedMode === 'direct') {
              setIsLoading(false);
            }
          }}
          {...(game.embedMode === 'direct' ? { src: game.gameUrl } : {})}
        />
      </div>
    </div>
  );
};

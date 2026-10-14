'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Game, GameComment } from '@/types/game';
import { GAMES } from '@/data/games';
import {
  ArrowLeft,
  Play,
  ExternalLink,
  Calendar,
  Layers,
  Monitor,
  MessageSquare,
  Send,
  Bookmark,
  Share2,
  Gamepad2,
  Check,
  User,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface GameDetailsViewProps {
  game: Game;
}

const DEFAULT_COMMENTS: Record<string, GameComment[]> = {
  'hollow-knight': [
    {
      id: 'c-hk1',
      nick: 'HallownestKnight',
      text: 'Simplesmente incrível rodando no navegador liso desse jeito! Trilha sonora e jogabilidade intactas.',
      createdAt: 'Hoje às 15:40',
    },
    {
      id: 'c-hk2',
      nick: 'Hornet_Shaw',
      text: 'Derrotei o Falso Cavaleiro de primeira! Muito bom poder jogar sem barras de anúncios ou modais chatos.',
      createdAt: 'Hoje às 18:22',
    },
  ],
  'cuphead': [
    {
      id: 'c-cup1',
      nick: 'Mugman_Bro',
      text: 'A animação estilo anos 30 é uma obra-prima. Rodando em WebAssembly sem input lag nenhum!',
      createdAt: 'Hoje às 16:10',
    },
    {
      id: 'c-cup2',
      nick: 'RetroGamer90',
      text: 'Jogo difícil pra caramba, mas a trilha sonora de Jazz compensa cada morte kkk.',
      createdAt: 'Hoje às 17:45',
    },
  ],
  'buckshot-roulette': [
    {
      id: 'c-bs1',
      nick: 'ShotgunGambler',
      text: 'A tensão nesse jogo é surreal! Usar a serra e a cerveja na hora certa salva a run.',
      createdAt: 'Hoje às 14:30',
    },
    {
      id: 'c-bs2',
      nick: 'DealerCrusher',
      text: 'Dobrei as apostas no round 3 e zerei! Experiência de terror psicológico de primeira.',
      createdAt: 'Hoje às 19:02',
    },
  ],
  'hollow-knight-silksong': [
    {
      id: 'c-silk1',
      nick: 'NeedleMaster',
      text: 'A jogabilidade com a Hornet é incrivelmente mais rápida e acrobática. Que jogo maravilhoso!',
      createdAt: 'Hoje às 13:15',
    },
  ],
  'untitled-goose-game': [
    {
      id: 'c-goose1',
      nick: 'HonkMaster',
      text: 'Grasnar na cara do jardineiro e roubar as chaves dele nunca perde a graça kkkk!',
      createdAt: 'Hoje às 12:50',
    },
  ],
  'binding-of-isaac': [
    {
      id: 'c-isaac1',
      nick: 'BrimstoneLover',
      text: 'O clássico absoluto de Edmund McMillen! A emulação Ruffle carregou instantaneamente.',
      createdAt: 'Hoje às 11:20',
    },
  ],
  'stardew-valley': [
    {
      id: 'c-sdv1',
      nick: 'FarmerAbigail',
      text: 'Tão relaxante poder cuidar da fazenda direto no navegador sem precisar instalar nada!',
      createdAt: 'Hoje às 16:30',
    },
    {
      id: 'c-sdv2',
      nick: 'JunimoFriend',
      text: 'Trilha sonora impecável e salvamento funcionando redondinho no cache local.',
      createdAt: 'Hoje às 18:05',
    },
  ],
  'meatboy': [
    {
      id: 'c-mb1',
      nick: 'RetroJumper',
      text: 'O Meatboy original em Flash! O salto na parede é super preciso e nostálgico demais.',
      createdAt: 'Hoje às 15:10',
    },
  ],
  'peak': [
    {
      id: 'c-peak1',
      nick: 'ClimberPro',
      text: 'A física desse jogo de escalada é viciante! O suor frio a cada salto na montanha.',
      createdAt: 'Hoje às 17:22',
    },
  ],
  'papers-please': [
    {
      id: 'c-pp1',
      nick: 'InspectorArstotzka',
      text: 'Glória a Arstotzka! Carimbo verde aprovado, carimbo vermelho negado. Jogaço atemporal!',
      createdAt: 'Hoje às 14:15',
    },
    {
      id: 'c-pp2',
      nick: 'GrestinGuard',
      text: 'Cuidado com os passaportes falsificados da Kolechia kkk. Trilha sonora sinistra e marcante.',
      createdAt: 'Hoje às 19:40',
    },
  ],
  'bo1-zombies': [
    {
      id: 'c-1',
      nick: 'KinoMaster',
      text: 'O modo Zombies de BO1 é lendário! Rodando no navegador ficou perfeito demais, sem travamento.',
      createdAt: '12/10/2026 às 19:42',
    },
    {
      id: 'c-2',
      nick: 'RayGunLucky',
      text: 'Alguém topa fechar squad até o round 30?',
      createdAt: '13/10/2026 às 11:15',
    },
  ],
  'pes-6': [
    {
      id: 'c-3',
      nick: 'Imperador99',
      text: 'Adriano com chute 99 chutando do meio de campo não tinha goleiro que pegasse kkkk. Nostalgia pura!',
      createdAt: '11/10/2026 às 21:05',
    },
  ],
  'cs-16': [
    {
      id: 'c-4',
      nick: 'LanHousePlayer',
      text: 'Bateu até o cheiro do salgadinho da Lan House em 2005. Servidor clássico rodando em WebAssembly!',
      createdAt: '13/10/2026 às 08:30',
    },
  ],
  'gta-vice-city': [
    {
      id: 'c-5',
      nick: 'Tommy_80s',
      text: 'A trilha sonora da Flash FM nesse jogo é uma obra-prima atemporal.',
      createdAt: '10/10/2026 às 14:20',
    },
  ],
};

export const GameDetailsView: React.FC<GameDetailsViewProps> = ({ game }) => {
  const { lang, t } = useLanguage();
  const [nick, setNick] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<GameComment[]>([]);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Load comments & favorites from localStorage
  useEffect(() => {
    try {
      // Favorites check
      const savedFavs =
        localStorage.getItem('auraarcade_favorites') ||
        localStorage.getItem('tabgames_favorites');
      if (savedFavs) {
        const favList: string[] = JSON.parse(savedFavs);
        setIsFavorite(favList.includes(game.id));
      }

      // Comments
      const storageKey = `auraarcade_comments_${game.id}`;
      const savedComments =
        localStorage.getItem(storageKey) ||
        localStorage.getItem(`tabgames_comments_${game.id}`);
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      } else {
        const initial = DEFAULT_COMMENTS[game.id] || [
          {
            id: 'c-init',
            nick: 'NostalgicGamer',
            text: 'Esse jogo marcou uma geração! Muito bom poder jogar direto no navegador.',
            createdAt: 'Ontem às 16:20',
          },
        ];
        setComments(initial);
      }
    } catch {
      // Fallback
    }
  }, [game.id]);

  const toggleFavorite = () => {
    try {
      const savedFavs =
        localStorage.getItem('auraarcade_favorites') ||
        localStorage.getItem('tabgames_favorites');
      let favList: string[] = savedFavs ? JSON.parse(savedFavs) : [];
      if (favList.includes(game.id)) {
        favList = favList.filter((id) => id !== game.id);
        setIsFavorite(false);
      } else {
        favList.push(game.id);
        setIsFavorite(true);
      }
      localStorage.setItem('auraarcade_favorites', JSON.stringify(favList));
    } catch {
      // Fallback
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nick.trim() || !commentText.trim()) return;

    const now = new Date();
    const formattedDate = `Hoje às ${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    const newComment: GameComment = {
      id: `comment-${Date.now()}`,
      nick: nick.trim(),
      text: commentText.trim(),
      createdAt: formattedDate,
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    setCommentText('');

    try {
      localStorage.setItem(`auraarcade_comments_${game.id}`, JSON.stringify(updated));
    } catch {
      // Fallback
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find related games in same category
  const relatedGames = GAMES.filter(
    (g) => g.id !== game.id && g.primaryCategory === game.primaryCategory
  ).slice(0, 3);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Back button to Home */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 hover:text-white border border-white/10 hover:border-emerald-400/50 text-sm font-semibold transition-all duration-200 group active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400 group-hover:-translate-x-1 transition-transform" />
          <span>{t.backToLibrary}</span>
        </Link>

        {/* Quick Share / Favorite */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFavorite}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
              isFavorite
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border-white/10 hover:border-emerald-500/40'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-emerald-400 text-emerald-400' : ''}`} />
            <span className="hidden sm:inline">
              {isFavorite ? (lang === 'pt' ? 'Salvo' : 'Saved') : (lang === 'pt' ? 'Salvar' : 'Save')}
            </span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10 hover:border-emerald-500/40 transition-all"
            title={t.shareTitle}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">
              {copied ? (lang === 'pt' ? 'Copiado!' : 'Copied!') : (lang === 'pt' ? 'Compartilhar' : 'Share')}
            </span>
          </button>
        </div>
      </div>

      {/* Main Game Showcase Hero */}
      <section className="relative rounded-3xl overflow-hidden border border-emerald-500/20 bg-[#0a0f0c] shadow-2xl">
        {/* Cover / Backdrop Graphic */}
        <div className="relative w-full h-72 sm:h-96 bg-slate-900 overflow-hidden">
          {!imageError ? (
            <Image
              src={game.coverImage}
              alt={game.title}
              fill
              priority
              className="object-cover object-center filter blur-[1px] brightness-[0.7] scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-[#0f1812] to-[#070a08] flex items-center justify-center">
              <Gamepad2 className="w-28 h-28 text-emerald-400/20" />
            </div>
          )}

          {/* Vignette gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0c] via-[#0a0f0c]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0c]/90 via-transparent to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            {game.badge && (
              <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-emerald-500 text-black shadow-lg border border-lime-300/40">
                {game.badge}
              </span>
            )}
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-white/10 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
              {t.categories[game.primaryCategory] || game.primaryCategory}
            </span>
          </div>

          {/* Title & Primary Play CTA */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-xl mb-1">
                {game.title}
              </h1>
              <p className="text-sm sm:text-base text-emerald-400 font-semibold">
                {game.category}
              </p>
            </div>

            {game.embedMode === 'injected' || game.embedMode === 'direct' ? (
              <Link
                href={`/play/${game.id}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-base bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-black shadow-xl shadow-emerald-500/35 hover:shadow-emerald-500/55 transition-all duration-300 active:scale-95 shrink-0 group/play"
              >
                <Play className="w-5 h-5 fill-black" />
                <span>{t.playNow}</span>
              </Link>
            ) : (
              <a
                href={game.gameUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-base bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-black shadow-xl shadow-emerald-500/35 hover:shadow-emerald-500/55 transition-all duration-300 active:scale-95 shrink-0 group/play"
              >
                <Play className="w-5 h-5 fill-black" />
                <span>{t.playNow}</span>
                <ExternalLink className="w-4 h-4 opacity-80 group-hover/play:translate-x-0.5 transition-transform" />
              </a>
            )}
          </div>
        </div>

        {/* Specs Grid */}
        <div className="p-6 sm:p-8 bg-[#0a0f0c] border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Release Year */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">
                {t.releaseYearLabel}
              </span>
              <span className="text-base font-bold text-white">
                {game.releaseYear || (lang === 'pt' ? 'Clássico' : 'Classic')}
              </span>
            </div>
          </div>

          {/* Category */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">
                {t.categoryLabel}
              </span>
              <span className="text-base font-bold text-white truncate max-w-[150px] block">
                {t.categories[game.primaryCategory] || game.category}
              </span>
            </div>
          </div>

          {/* Technology / Execution */}
          <div className="col-span-2 md:col-span-1 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">
                {lang === 'pt' ? 'Execução' : 'Runtime'}
              </span>
              <span className="text-base font-bold text-white">
                {game.embedMode === 'injected'
                  ? 'WASM / Nativo'
                  : game.embedMode === 'direct'
                  ? 'Iframe Web'
                  : 'Web / Emulador'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms & Synopsis Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left 2 Cols: Synopsis */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c120e] border border-white/[0.08] shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>{t.synopsisTitle}</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {game.synopsis || game.description}
            </p>
          </div>

          {/* Comments Section (No login required) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c120e] border border-white/[0.08] shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span>{t.communityComments}</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {comments.length}
                </span>
              </h2>
              <span className="text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                {lang === 'pt' ? 'Sem login necessário' : 'No login required'}
              </span>
            </div>

            {/* Comment Form */}
            <form
              onSubmit={handleAddComment}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-4"
            >
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                  {lang === 'pt' ? 'Seu Nick ou Apelido:' : 'Your Nickname:'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={30}
                    placeholder={t.yourNickPlaceholder}
                    value={nick}
                    onChange={(e) => setNick(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                  {lang === 'pt' ? 'Comentário ou Memória:' : 'Comment or Memory:'}
                </label>
                <textarea
                  required
                  rows={3}
                  maxLength={500}
                  placeholder={t.commentPlaceholder}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full p-3.5 text-sm bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!nick.trim() || !commentText.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 disabled:opacity-40 disabled:cursor-not-allowed text-black shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4 fill-black" />
                  <span>{t.postCommentBtn}</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3 pt-2">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-500 flex items-center justify-center text-xs font-black text-black uppercase shadow-sm">
                          {comment.nick.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-white">
                          {comment.nick}
                        </span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Gamer
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-400/80" />
                        {comment.createdAt}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 pl-10 leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">
                  {lang === 'pt'
                    ? 'Nenhum comentário publicado ainda. Seja o primeiro a opinar!'
                    : 'No comments published yet. Be the first to share your thoughts!'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Platforms & Tags & Related Games */}
        <div className="space-y-6">
          {/* Platforms widget */}
          <div className="p-6 rounded-3xl bg-[#0c120e] border border-white/[0.08] shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Monitor className="w-4 h-4 text-emerald-400" />
              <span>{t.platformsLabel}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {game.platforms.map((platform) => (
                <span
                  key={platform}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-200 border border-emerald-500/25 flex items-center gap-1.5"
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />
                  {platform}
                </span>
              ))}
            </div>
          </div>

          {/* Tags widget */}
          <div className="p-6 rounded-3xl bg-[#0c120e] border border-white/[0.08] shadow-lg space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {t.tagsLabel}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {game.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.04] text-slate-400 border border-white/[0.06]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Games */}
          {relatedGames.length > 0 && (
            <div className="p-6 rounded-3xl bg-[#0c120e] border border-white/[0.08] shadow-lg space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {lang === 'pt' ? 'Jogos Recomendados' : 'Recommended Games'}
              </h3>
              <div className="space-y-3">
                {relatedGames.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/game/${rel.id}`}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] hover:border-emerald-400/40 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
                      <Gamepad2 className="w-5 h-5 group-hover:scale-110 transition-transform text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-emerald-300 transition-colors">
                        {rel.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 truncate block">
                        {rel.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

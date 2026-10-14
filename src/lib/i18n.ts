export type Language = 'pt' | 'en';

export interface Translations {
  // Navigation & Brand
  brandSubtitle: string;
  gamesReadyCount: (count: number) => string;
  randomBtn: string;
  randomTitle: string;
  savedBtn: string;
  savedTitle: (showOnly: boolean) => string;
  supportBtnPix: string;
  supportBtnCoffee: string;
  supportBtnTitle: string;
  langName: string;
  langFlag: string;

  // Home
  libraryTitle: string;
  librarySubtitle: string;
  searchPlaceholder: string;
  clearSearch: string;
  allCategories: string;
  categories: Record<string, string>;

  // Game Grid & Cards
  playNow: string;
  viewSynopsis: string;
  saveFavorite: string;
  removeFavorite: string;
  noGamesFound: string;
  noGamesFoundDesc: string;
  clearFilters: string;
  emptyFavoritesTitle: string;
  emptyFavoritesDesc: string;
  exploreAllGames: string;

  // Game Details Page
  backToLibrary: string;
  playFullscreen: string;
  openExternalTab: string;
  synopsisTitle: string;
  categoryLabel: string;
  releaseYearLabel: string;
  platformsLabel: string;
  tagsLabel: string;
  shareTitle: string;
  shareSuccess: string;
  communityComments: string;
  commentCount: (count: number) => string;
  yourNickPlaceholder: string;
  commentPlaceholder: string;
  postCommentBtn: string;
  postingComment: string;
  commentSuccessToast: string;
  fillFieldsWarning: string;

  // Player Page (/play/[id])
  exitGame: string;
  fullscreen: string;
  exitFullscreen: string;
  reloadGame: string;
  externalTab: string;
  loadingTitle: string;
  loadingSubtitle: string;
  hideControls: string;
  showControls: string;

  // Donate / Support Modal
  donateTitle: string;
  donateSub: string;
  pixQrTitle: string;
  pixCopyLabel: string;
  pixCopyBtn: string;
  pixCopiedToast: string;
  pixCopiedButton: string;
  orBuyMeACoffee: string;
  buyMeCoffeeBtn: string;
  closeBtn: string;

  // Footer
  footerAboutText: string;
  footerAboutBadge1: string;
  footerAboutBadge2: string;
  footerCategoriesTitle: string;
  footerPlatformTitle: string;
  footerPlatformText: string;
  footerDevBanner: string;
  footerRights: string;
  footerBuiltWith: string;
}

export const translations: Record<Language, Translations> = {
  pt: {
    brandSubtitle: 'Jogos de Navegador Instantâneos',
    gamesReadyCount: (count: number) => `${count} jogos prontos para jogar`,
    randomBtn: 'Aleatório',
    randomTitle: 'Escolher um jogo aleatório para jogar agora',
    savedBtn: 'Salvos',
    savedTitle: (showOnly: boolean) => (showOnly ? 'Ver todos os jogos' : 'Ver apenas favoritados'),
    supportBtnPix: 'Apoiar (PIX)',
    supportBtnCoffee: 'Buy Me a Coffee',
    supportBtnTitle: 'Apoiar o projeto AuraArcade',
    langName: 'Português',
    langFlag: '🇧🇷',

    libraryTitle: 'Biblioteca de Jogos',
    librarySubtitle: 'Clique em qualquer card para ver a sinopse, plataformas, comentários da comunidade e jogar.',
    searchPlaceholder: 'Buscar por título, franquia, tag (ex: zombies, wasm, gta)...',
    clearSearch: 'Limpar busca',
    allCategories: 'Todos',
    categories: {
      Todos: 'Todos',
      FPS: 'FPS & Tiro',
      'Ação & Mundo Aberto': 'Ação & Mundo Aberto',
      Clássicos: 'Retro & Clássicos',
      Esportes: 'Esportes & Corrida',
      'RPG & Estratégia': 'RPG & Estratégia',
      Sandbox: 'Sandbox & Criação',
    },

    playNow: 'Jogar',
    viewSynopsis: 'Ver Sinopse',
    saveFavorite: 'Salvar nos favoritos',
    removeFavorite: 'Remover dos favoritos',
    noGamesFound: 'Nenhum jogo encontrado',
    noGamesFoundDesc: 'Tente ajustar sua busca ou selecionar outra categoria para descobrir mais títulos.',
    clearFilters: 'Limpar todos os filtros',
    emptyFavoritesTitle: 'Nenhum jogo salvo ainda',
    emptyFavoritesDesc: 'Clique no ícone de marcador em qualquer jogo para salvá-lo aqui e acessá-lo rapidamente.',
    exploreAllGames: 'Explorar todos os jogos',

    backToLibrary: 'Voltar para a biblioteca',
    playFullscreen: 'Jogar em Tela Cheia',
    openExternalTab: 'Aba Externa',
    synopsisTitle: 'Sinopse & Visão Geral',
    categoryLabel: 'Categoria',
    releaseYearLabel: 'Ano de Lançamento',
    platformsLabel: 'Plataformas & Tecnologias',
    tagsLabel: 'Tags & Gêneros',
    shareTitle: 'Compartilhar jogo',
    shareSuccess: 'Link copiado para a área de transferência!',
    communityComments: 'Comentários da Comunidade',
    commentCount: (count: number) => `${count} comentários`,
    yourNickPlaceholder: 'Seu nick ou apelido (ex: ShadowGamer)',
    commentPlaceholder: 'O que achou deste jogo? Deixe sua dica, recorde ou opinião...',
    postCommentBtn: 'Publicar Comentário',
    postingComment: 'Publicando...',
    commentSuccessToast: 'Comentário publicado com sucesso!',
    fillFieldsWarning: 'Por favor, preencha seu nick e comentário!',

    exitGame: 'Sair do Jogo',
    fullscreen: 'Tela Cheia',
    exitFullscreen: 'Sair da Tela Cheia',
    reloadGame: 'Recarregar',
    externalTab: 'Aba Externa',
    loadingTitle: 'Carregando Ambiente do Jogo...',
    loadingSubtitle: 'Inicializando WebAssembly / WebGL sem anúncios...',
    hideControls: 'Ocultar barra',
    showControls: 'Mostrar barra',

    donateTitle: 'Apoiar o AuraArcade ❤️',
    donateSub: 'Se você se diverte jogando no AuraArcade e quer manter a infraestrutura rápida, limpa e sem anúncios, apoie nosso projeto independente!',
    pixQrTitle: 'QRCode PIX (Qualquer Valor)',
    pixCopyLabel: 'Código PIX Copia e Cola:',
    pixCopyBtn: 'Copiar Código PIX',
    pixCopiedToast: 'Código PIX copiado para a área de transferência!',
    pixCopiedButton: 'Código PIX Copiado!',
    orBuyMeACoffee: 'Ou apoie via Buy Me a Coffee',
    buyMeCoffeeBtn: 'Buy Me a Coffee (buymeacoffee.com/trilharede)',
    closeBtn: 'Fechar',

    footerAboutText: 'O ecossistema definitivo para reviver e jogar obras-primas dos videogames diretamente na web, potencializado pela tecnologia WebAssembly e emuladores modernos.',
    footerAboutBadge1: 'WebAssembly & Cloud',
    footerAboutBadge2: 'Zero Instalação',
    footerCategoriesTitle: 'Categorias Populares',
    footerPlatformTitle: 'Sobre a Plataforma',
    footerPlatformText: 'Todos os jogos apresentados são projetos abertos, ports comunitários ou demonstrações WebAssembly hospedados publicamente pelos seus respectivos autores. AuraArcade atua como um catálogo de curadoria.',
    footerDevBanner: 'Desenvolvido por TrilhaRede',
    footerRights: 'AuraArcade HUB. Criado com',
    footerBuiltWith: 'para a comunidade gamer.',
  },
  en: {
    brandSubtitle: 'Instant In-Browser Games',
    gamesReadyCount: (count: number) => `${count} games ready to play`,
    randomBtn: 'Random',
    randomTitle: 'Pick a random game to play now',
    savedBtn: 'Saved',
    savedTitle: (showOnly: boolean) => (showOnly ? 'View all games' : 'View favorites only'),
    supportBtnPix: 'Support (PIX)',
    supportBtnCoffee: 'Buy Me a Coffee',
    supportBtnTitle: 'Support the AuraArcade project',
    langName: 'English',
    langFlag: '🇺🇸',

    libraryTitle: 'Game Library',
    librarySubtitle: 'Click any card to read the synopsis, platforms, community comments, and play instantly.',
    searchPlaceholder: 'Search by title, franchise, tag (e.g., zombies, wasm, gta)...',
    clearSearch: 'Clear search',
    allCategories: 'All',
    categories: {
      Todos: 'All',
      FPS: 'FPS & Shooters',
      'Ação & Mundo Aberto': 'Action & Open World',
      Clássicos: 'Retro & Classics',
      Esportes: 'Sports & Racing',
      'RPG & Estratégia': 'RPG & Strategy',
      Sandbox: 'Sandbox & Creation',
    },

    playNow: 'Play',
    viewSynopsis: 'Synopsis',
    saveFavorite: 'Save to favorites',
    removeFavorite: 'Remove from favorites',
    noGamesFound: 'No games found',
    noGamesFoundDesc: 'Try adjusting your search terms or picking another category to discover more titles.',
    clearFilters: 'Clear all filters',
    emptyFavoritesTitle: 'No saved games yet',
    emptyFavoritesDesc: 'Click the bookmark icon on any game card to pin it here for quick access.',
    exploreAllGames: 'Explore all games',

    backToLibrary: 'Back to library',
    playFullscreen: 'Play Fullscreen',
    openExternalTab: 'External Tab',
    synopsisTitle: 'Synopsis & Overview',
    categoryLabel: 'Category',
    releaseYearLabel: 'Release Year',
    platformsLabel: 'Platforms & Engines',
    tagsLabel: 'Tags & Genres',
    shareTitle: 'Share game',
    shareSuccess: 'Link copied to clipboard!',
    communityComments: 'Community Comments',
    commentCount: (count: number) => `${count} comments`,
    yourNickPlaceholder: 'Your nickname (e.g. ShadowGamer)',
    commentPlaceholder: 'What did you think of this game? Leave your tips, high score or thoughts...',
    postCommentBtn: 'Post Comment',
    postingComment: 'Posting...',
    commentSuccessToast: 'Comment posted successfully!',
    fillFieldsWarning: 'Please provide both your nickname and comment!',

    exitGame: 'Exit Game',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit Fullscreen',
    reloadGame: 'Reload',
    externalTab: 'External Tab',
    loadingTitle: 'Loading Game Environment...',
    loadingSubtitle: 'Initializing WebAssembly / WebGL without ads...',
    hideControls: 'Hide bar',
    showControls: 'Show bar',

    donateTitle: 'Support AuraArcade ❤️',
    donateSub: 'If you enjoy playing on AuraArcade and want to keep our infrastructure fast, clean, and ad-free, please consider supporting our independent project!',
    pixQrTitle: 'PIX QRCode (Any Amount)',
    pixCopyLabel: 'PIX Copy & Paste Code:',
    pixCopyBtn: 'Copy PIX Code',
    pixCopiedToast: 'PIX code copied to clipboard!',
    pixCopiedButton: 'PIX Code Copied!',
    orBuyMeACoffee: 'Or support via Buy Me a Coffee',
    buyMeCoffeeBtn: 'Buy Me a Coffee (buymeacoffee.com/trilharede)',
    closeBtn: 'Close',

    footerAboutText: 'The definitive ecosystem to relive and play videogame masterpieces directly in your browser, powered by WebAssembly and modern web emulators.',
    footerAboutBadge1: 'WebAssembly & Cloud',
    footerAboutBadge2: 'Zero Installation',
    footerCategoriesTitle: 'Popular Categories',
    footerPlatformTitle: 'About the Platform',
    footerPlatformText: 'All showcased games are open projects, community ports, or public WebAssembly demonstrations hosted by their respective authors. AuraArcade serves as a curated library.',
    footerDevBanner: 'Developed by TrilhaRede',
    footerRights: 'AuraArcade HUB. Crafted with',
    footerBuiltWith: 'for the gaming community.',
  },
};

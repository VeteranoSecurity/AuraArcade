export type GameCategory =
  | 'Todos'
  | 'FPS'
  | 'Ação & Mundo Aberto'
  | 'Clássicos'
  | 'Esportes'
  | 'RPG & Estratégia'
  | 'Sandbox';

export interface GameComment {
  id: string;
  nick: string;
  text: string;
  createdAt: string;
}

export interface Game {
  id: string;
  title: string;
  category: string;
  primaryCategory: GameCategory;
  gameUrl: string;
  coverImage: string;
  tags: string[];
  description: string;
  synopsis: string;
  platforms: string[];
  featured?: boolean;
  badge?: string;
  releaseYear?: number;
  embedMode?: 'injected' | 'direct' | 'external';
  embedConfig?: {
    gameFileUrl: string;
    baseHref: string;
  };
}

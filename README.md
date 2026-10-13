# 🎮 TabGames — HUB de Jogos de Navegador

Um catálogo e launcher gamer moderno, responsivo e de alta performance inspirado na interface escura da **Steam**, catálogo da **Netflix** e na sofisticação visual das diretrizes **Apple HIG**, com tema cibernético em **Verde Neon** e plano de fundo interativo em **Metal Líquido (WebGL)**.

Desenvolvido para que os usuários possam explorar, filtrar, buscar, ler sinopses com plataformas originais, deixar comentários e jogar instantaneamente títulos clássicos e modernos que rodam 100% no navegador.

---

## ⚡ Tecnologias Utilizadas

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Shader Interativo**: WebGL `LiquidMetalShader` animado em background com tracking de ponteiro
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) (Tema Verde Neon, Glassmorphism e Sombras Esmeralda/Lime)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Processamento de Imagens**: `sharp` & `next/image` com capas 100% padronizadas em JPEG HD
- **Persistência Local**: `localStorage` para lista de jogos favoritos e comentários da comunidade
- **Pronto para Deploy**: Otimizado para build estático e hospedagem na [Vercel](https://vercel.com/)

---

## 🚀 Funcionalidades Principais

1. **Biblioteca de 22 Jogos Pré-Cadastrados**:
   - Call of Duty: BO1 Zombies, Black Ops 2, Modern Warfare 2
   - GTA Vice City (WASM), The Simpsons: Hit & Run (WASM), GTA 5
   - Counter-Strike 1.6 & CS Surf, Half-Life
   - Halo CE e Halo CE Mobile
   - Quake I, II e III Arena, Return to Castle Wolfenstein, Unreal Tournament
   - PES 6 Nostalgia, Diablo I, Minecraft Web, Hedgewars e Skate 3
2. **Cards com Ação Dupla**:
   - Botão **"Jogar"**: Abre a partida diretamente em nova aba de forma rápida e segura (`target="_blank"`, `rel="noopener noreferrer"`).
   - Botão **"Ver Sinopse"**: Abre a página dedicada do game com sinopse, plataformas, ano e comentários.
3. **Páginas Dedicadas de Detalhes (`/game/[id]`)**:
   - Seta **"← Voltar para a biblioteca"** para retorno instantâneo.
   - Sinopse completa, especificações de ano e plataformas originais.
   - Botão de ação "Jogar Agora" em destaque.
   - **💬 Seção de comentários comunitários (sem login)** com persistência em `localStorage`.
4. **Fundo Dinâmico Liquid Metal (WebGL)**:
   - Superfície metálica fluida interativa com distorção matemática (FBM), ondulações líquidas e iluminação especular verde esmeralda.
5. **Rodapé com Animação de Máquina de Escrever**:
   - Exibição de *"Desenvolvido por TrilhaRede"* com efeito de digitação e exclusão contínua em loop.
6. **Busca e Filtros em Tempo Real**:
   - Barra de busca instantânea (atalho `/`) e filtros deslizáveis em pills com contadores exatos.

---

## 💻 Como Rodar Localmente

```bash
npm run dev
```

Acesse no navegador: **[http://localhost:3000](http://localhost:3000)**

---

## ☁️ Deploy na Vercel

```bash
git add .
git commit -m "feat: liquid metal shader background, dual card buttons and typewriter footer"
git push
```

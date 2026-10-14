import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import LiquidMetalShader from '@/components/ui/liquid-metal-shader';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://auraarcade.vercel.app'),
  title: 'AuraArcade — Hub Definitivo de Jogos de Navegador',
  description:
    'Explore e jogue instantaneamente os melhores clássicos, shooters, RPGs e mundos abertos que rodam direto no seu navegador com zero instalação.',
  keywords: [
    'jogos de navegador',
    'browser games',
    'jogos online gratis',
    'call of duty browser',
    'halo browser',
    'cs 1.6 browser',
    'gta vice city wasm',
    'quake online',
    'minecraft web',
    'auraarcade',
    'aura arcade',
  ],
  authors: [{ name: 'AuraArcade Team' }],
  openGraph: {
    title: 'AuraArcade — HUB de Jogos de Navegador em Alta Performance',
    description:
      'Catálogo completo com mais de 20 clássicos lendários prontos para jogar em 1 clique.',
    url: 'https://auraarcade.vercel.app',
    siteName: 'AuraArcade',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/logo-full.png',
        width: 1024,
        height: 1024,
        alt: 'AuraArcade Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuraArcade — HUB de Jogos de Navegador',
    description: 'Jogos lendários direto no navegador sem instalação.',
    images: ['/logo-full.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#070908',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`dark ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#060a08] text-slate-100 selection:bg-emerald-400 selection:text-black relative overflow-x-hidden">
        {/* Dynamic Liquid Metal WebGL Shader Background at z-0 (guaranteed visible) */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <LiquidMetalShader
            className="w-full h-full"
            baseColor="#072213"
            metalColor="#22c55e"
            highlightColor="#86efac"
            distortion={0.88}
            speed={0.65}
            scale={1.05}
          />
          {/* Suave vinheta atmosférica nas bordas para destacar o conteúdo sem esconder as ondas */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#060a08]/25 to-[#060a08]/65 pointer-events-none" />
        </div>

        {/* Page Content Layer directly above background */}
        <div className="relative z-10 flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}

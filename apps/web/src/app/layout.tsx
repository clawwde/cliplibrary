import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Clip Library',
  description: 'A library of Remotion animation clips with a deep, schema-driven editor.',
};

const themeBootstrap = `(function(){try{var t=localStorage.getItem('cliplibrary-theme');var d=t==='dark'||((t===null||t==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');}}catch(e){}})();`;

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" className={inter.variable} suppressHydrationWarning>
    <head>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, inline theme bootstrap to avoid a flash of the wrong theme */}
      <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
    </head>
    <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      <ThemeProvider>
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 bg-background/70 px-5 backdrop-blur-md">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="size-4 rounded-[5px] bg-foreground" />
            clip library
          </Link>
          <nav className="flex items-center gap-3 text-sm text-muted-foreground">
            <ThemeToggle />
          </nav>
        </header>
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;

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

const themeBootstrap = `(function(){try{var t=localStorage.getItem('cliplibrary-theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" className={inter.variable} suppressHydrationWarning>
    <head>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, inline theme bootstrap to avoid a flash of the wrong theme */}
      <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
    </head>
    <body>
      <ThemeProvider>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            padding: '16px 24px',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            background: 'color-mix(in srgb, var(--bg) 88%, transparent)',
            backdropFilter: 'blur(8px)',
            zIndex: 10,
          }}
        >
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600 }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 7,
                background: 'var(--accent)',
                display: 'inline-block',
              }}
            />
            clip library
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 16, color: 'var(--muted)' }}>
            <Link href="/settings">Settings</Link>
            <ThemeToggle />
          </nav>
        </header>
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 80px' }}>
          {children}
        </main>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;

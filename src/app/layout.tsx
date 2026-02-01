import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'TypeHit',
  description: 'The professional-grade platform to develop your typing skills.',
  manifest: '/manifest.json',
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(210, 40%, 98%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(215, 30%, 12%)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider defaultTheme="system" storageKey="typehit-theme">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

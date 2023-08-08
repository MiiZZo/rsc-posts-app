import { Inter } from 'next/font/google';
import Head from 'next/head';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';

export const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <Head>
        <ColorSchemeScript />
      </Head>
      <body>
        <MantineProvider theme={{ primaryColor: 'dark' }}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}

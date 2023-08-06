import './global.css';
import { Inter } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        null
      </body>
    </html>
  );
}

import { Playfair_Display, Caveat, Great_Vibes } from 'next/font/google';
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-handwritten',
});

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-premium-script',
});

export const metadata = {
  title: "A Letter For You ♥",
  description: "A special Valentine's message just for you",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: "A Letter For You"
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#fdfaf3',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${caveat.variable} ${greatVibes.variable}`}>
      <body className="antialiased font-serif">
        {children}
      </body>
    </html>
  );
}

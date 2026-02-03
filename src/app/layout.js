import "./globals.css";
import { Playfair_Display, Caveat } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
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
    <html lang="en" className={`${playfair.variable} ${caveat.variable}`}>
      <body className={`${playfair.className} ${caveat.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

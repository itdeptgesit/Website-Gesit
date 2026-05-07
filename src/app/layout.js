import './globals.css';
import { Source_Sans_3, Lora } from 'next/font/google';
import localFont from 'next/font/local';
import { createClient } from '@/lib/supabase-server';
import JsonLd from '@/components/JsonLd';
import { Suspense } from 'react';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans',
  weight: ['400', '600', '700', '900']
});

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

const georgia = localFont({
  src: [
    {
      path: '../../public/wp-content/themes/thetrial/fonts/Georgia.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/wp-content/themes/thetrial/fonts/Georgia-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-georgia',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://gesit.co.id'),
  title: {
    default: 'The Gesit Companies',
    template: '%s | The Gesit Companies',
  },
  description: 'The Gesit Companies are business leaders in the fields of Property, Trading & Service, Manufacturing, and Natural Resources in Indonesia.',
  alternates: {
    canonical: 'https://gesit.co.id',
  },
  icons: {
    icon: '/logo-gesit.png',
  },
  other: {
    'Content-Security-Policy': 'upgrade-insecure-requests',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US" className={`${sourceSans.variable} ${lora.variable} ${georgia.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Suspense fallback={null}>
          <JsonLd />
        </Suspense>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const displayFont = Cormorant_Garamond({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BOB Hair Helsinki — Revolutionary Hairdressing',
  description: 'Vidal Sassoon partner salon in the heart of Kamppi, Helsinki. Precision cuts, editorial colour, and bridal styling by Kristel Tamm and Saara Vuorela.',
};

import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <head>
        <script src="https://web3forms.com/client/script.js" async defer></script>
      </head>
      <body className="antialiased bg-[#F4F4F4] text-[#1A1A1A]">
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
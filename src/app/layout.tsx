import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
 
const inter = Inter({ subsets: ['latin'] });
 
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className={cn('text-base antialiased isolate', inter.className)}>{children}</body>
    </html>
  );
}
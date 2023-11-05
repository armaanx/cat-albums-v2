import type { Metadata } from 'next';
import { Inter } from 'next/font/google'
import './globals.css'
import clsx from 'clsx'
import { Providers } from '@/components/Providers';
import { constructMetadata } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='' suppressHydrationWarning>
      <body className={clsx('h-screen w-screen antialiased bg-grainy dark:bg-none bg-background', inter.className)}>
      <Providers attribute="class" defaultTheme='system' enableSystem disableTransitionOnChange>
        {children}
      </Providers>
      </body>
    </html>
  )
}

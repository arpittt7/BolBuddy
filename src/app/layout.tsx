import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'AutoTune',
  description: 'The Ultimate Vocal Production Suite',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className="antialiased">
        <div className="wavy-background">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
          <div className="wave wave4"></div>
          <div className="wave-bottom wave1-bottom"></div>
          <div className="wave-bottom wave2-bottom"></div>
          <div className="wave-bottom wave3-bottom"></div>
          <div className="wave-bottom wave4-bottom"></div>
        </div>
        <div className="relative z-10">
            {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}

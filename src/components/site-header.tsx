'use client';
import { Mic, Menu } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export function SiteHeader() {
  const navLinks = [
    'Features', 'About', 'Contact'
  ];

  return (
    <header className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Mic className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">BolBuddy</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a key={link} href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                  {link}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-4">
                <Link href="/auth">
                  <Button>
                      Sign In
                  </Button>
                </Link>
             </div>
            <Button variant="ghost" size="icon" className="md:hidden text-foreground/80 hover:text-foreground">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

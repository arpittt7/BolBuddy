'use client';
import { Music, Menu, ShoppingCart, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

export function SiteHeader() {
  const navLinks = [
    'AutoTune Unlimited', 'Products', 'Merch', 'Learning', 'Support', 'Special Offers'
  ];

  return (
    <header className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Music className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">AutoTune</span>
            </div>
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
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full">Free Trial</Button>
                <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
                    ENG <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
                <Button variant="secondary" className="bg-white/10 hover:bg-white/20 rounded-full">Sign In</Button>
                <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground">
                    <ShoppingCart className="h-5 w-5" />
                </Button>
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

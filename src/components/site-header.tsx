
'use client';
import { Mic, Menu, LogOut, UserPlus, Globe, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { auth } from '@/lib/firebase';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from '@/hooks/use-language';

export function SiteHeader() {
  const { user } = useAuth();
  const { t, setLanguage, language } = useLanguage();

  const handleSignOut = async () => {
    await auth.signOut();
  }

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
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                    <Globe className="h-4 w-4 mr-2" />
                    {t('nav.language')}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => setLanguage('en')}>English</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage('hi')}>हिन्दी</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage('te')}>తెలుగు</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLanguage('ta')}>தமிழ்</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
          <div className="flex items-center gap-2">
             <div className="hidden md:flex items-center gap-2">
                 <Link href="/join-mentor">
                    <Button variant="ghost">
                        <UserPlus className="h-4 w-4 mr-2" />
                        {t('nav.joinAsMentor')}
                    </Button>
                 </Link>
                {user ? (
                    <>
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? ""} data-ai-hint="profile picture" />
                            <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <Button variant="ghost" onClick={handleSignOut}>
                            <LogOut className="mr-2 h-4 w-4" />
                            {t('nav.signOut')}
                        </Button>
                    </>
                ) : (
                    <Link href="/auth">
                      <Button>
                          {t('nav.signIn')}
                      </Button>
                    </Link>
                )}
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

    
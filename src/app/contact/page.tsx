
'use client';

import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

const team = [
  {
    name: 'Arpit Shekhawat',
    email: 'shekhawatarpit98@gmail.com',
    initials: 'AS',
    role: 'Founder & Tech Lead',
    avatarOptions: 'top=shortHair&mouth=smile'
  },
  {
    name: 'Priya Wandhekar',
    email: 'wandhekarpriya.2020@gmail.com',
    initials: 'PW',
    role: 'Co-founder & AI Specialist',
    avatarOptions: 'top=longHair&mouth=smile'
  },
];

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-3xl shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-headline">{t('contact.title')}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
             {t('contact.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 mt-6">
            {team.map((member) => (
              <div key={member.email} className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${member.email}&${member.avatarOptions}`} alt={member.name} />
                  <AvatarFallback className="text-3xl">{member.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-grow text-center sm:text-left">
                  <p className="text-2xl font-bold font-headline">{member.name}</p>
                  <p className="text-primary font-semibold">{t(member.role)}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
                    <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="h-5 w-5" />
                      <span>{t('contact.email')}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

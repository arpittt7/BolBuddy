import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail } from 'lucide-react';

const contacts = [
  {
    name: 'Arpit Shekhawat',
    email: 'shekhawatarpit98@gmail.com',
    initials: 'AS',
  },
  {
    name: 'Priya Wandhekar',
    email: 'wandhekarpriya.2020@gmail.com',
    initials: 'PW',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-headline text-center">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {contacts.map((contact) => (
              <div key={contact.email} className="flex items-center gap-4 p-4 rounded-lg border">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`https://placehold.co/128x128.png`} alt={contact.name} data-ai-hint="profile picture" />
                  <AvatarFallback className="text-xl">{contact.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="text-xl font-semibold">{contact.name}</p>
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" />
                    <span>{contact.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

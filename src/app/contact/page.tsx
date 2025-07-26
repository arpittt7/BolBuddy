
import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone } from 'lucide-react';

const team = [
  {
    name: 'Arpit Shekhawat',
    email: 'shekhawatarpit98@gmail.com',
    initials: 'AS',
    role: 'Founder & Tech Lead'
  },
  {
    name: 'Priya Wandhekar',
    email: 'wandhekarpriya.2020@gmail.com',
    initials: 'PW',
    role: 'Co-founder & AI Specialist'
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-3xl shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-headline">Get In Touch</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              We're here to help. Contact us with any questions or feedback.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 mt-6">
            {team.map((member) => (
              <div key={member.email} className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${member.email}`} alt={member.name} />
                  <AvatarFallback className="text-3xl">{member.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-grow text-center sm:text-left">
                  <p className="text-2xl font-bold font-headline">{member.name}</p>
                  <p className="text-primary font-semibold">{member.role}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
                    <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="h-5 w-5" />
                      <span>Email</span>
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

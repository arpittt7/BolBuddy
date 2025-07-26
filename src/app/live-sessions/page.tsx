
'use client';

import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Tag, Video } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { useToast } from '@/hooks/use-toast';

const sessions = [
    {
        topic: 'liveSessions.sessions.session1.topic',
        mentor: 'Priya Wandhekar',
        date: '2024-08-15',
        time: '4:00 PM',
        tags: ['liveSessions.sessions.session1.tags.0', 'liveSessions.sessions.session1.tags.1']
    },
    {
        topic: 'liveSessions.sessions.session2.topic',
        mentor: 'Rohan Sharma',
        date: '2024-08-18',
        time: '6:00 PM',
        tags: ['liveSessions.sessions.session2.tags.0', 'liveSessions.sessions.session2.tags.1']
    },
    {
        topic: 'liveSessions.sessions.session3.topic',
        mentor: 'Anjali Verma',
        date: '2024-08-22',
        time: '5:00 PM',
        tags: ['liveSessions.sessions.session3.tags.0', 'liveSessions.sessions.session3.tags.1']
    },
];

export default function LiveSessionsPage() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleRegister = (topic: string) => {
    toast({
        title: t('liveSessions.toast.title'),
        description: t('liveSessions.toast.description', { topic: t(topic) }),
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center p-4">
        <div className="w-full container mx-auto">
            <Card className="w-full text-center bg-transparent border-0 shadow-none py-8 md:py-12">
                <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground">
                    {t('liveSessions.title')}
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-foreground/80">
                    {t('liveSessions.description')}
                </p>
            </Card>

            <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sessions.map((session, index) => (
                    <Card key={index} className="w-full shadow-xl flex flex-col">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-primary">
                                <Video className="h-5 w-5" />
                                <span className="font-semibold">{t('liveSessions.card.live')}</span>
                            </div>
                            <CardTitle className="text-2xl font-headline mt-2">{t(session.topic)}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <User className="h-4 w-4" />
                                <span>{session.mentor}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{session.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{session.time}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {session.tags.map(tag => (
                                    <div key={tag} className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                        <Tag className="h-3 w-3" />
                                        <span>{t(tag)}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => handleRegister(session.topic)}>
                                {t('liveSessions.card.register')}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
}

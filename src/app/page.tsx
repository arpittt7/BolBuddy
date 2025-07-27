
'use client';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { BolBuddy } from '@/components/voice-mentor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Users, Download, Award, HelpCircle, Video, Rocket, Mic } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Briefcase } from 'lucide-react';
import { CounsellingChat } from '@/components/counselling-chat';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center justify-center p-4 space-y-12">
        <Card className="w-full container mx-auto text-center bg-transparent border-2 border-amber-200/80 shadow-amber-200/20 shadow-2xl py-8 md:py-12">
            <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground">
                {t('home.hero.title')}
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-foreground/80">
                {t('home.hero.subtitle')}
            </p>
        </Card>
        <div className="w-full container mx-auto">
            <CounsellingChat />
        </div>
        <div className="w-full container mx-auto">
            <BolBuddy />
        </div>
        <div className="w-full container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
             <Card className="w-full shadow-xl flex flex-col">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                        <Users className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl font-headline mt-4">{t('home.features.gupshup.title')}</CardTitle>
                    <CardDescription className="text-lg">
                        {t('home.features.gupshup.subtitle')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center flex-grow">
                     <p className="text-muted-foreground">
                        {t('home.features.gupshup.description')}
                    </p>
                </CardContent>
                 <CardFooter className="justify-center">
                    <Link href="/gupshup">
                        <Button>{t('home.features.gupshup.button')}</Button>
                    </Link>
                </CardFooter>
            </Card>
            <Card className="w-full shadow-xl flex flex-col">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                        <HelpCircle className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl font-headline mt-4">{t('home.features.whisper.title')}</CardTitle>
                    <CardDescription className="text-lg">
                        {t('home.features.whisper.subtitle')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center flex-grow">
                     <p className="text-muted-foreground">
                        {t('home.features.whisper.description')}
                    </p>
                </CardContent>
                <CardFooter className="justify-center">
                    <Link href="/whisper-ask">
                        <Button>{t('home.features.whisper.button')}</Button>
                    </Link>
                </CardFooter>
            </Card>
            <Card className="w-full shadow-xl flex flex-col">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                        <Download className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl font-headline mt-4">{t('home.features.shruti.title')}</CardTitle>
                    <CardDescription className="text-lg">
                        {t('home.features.shruti.subtitle')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center flex-grow">
                     <p className="text-muted-foreground">
                        {t('home.features.shruti.description')}
                    </p>
                </CardContent>
                <CardFooter className="justify-center">
                    <Link href="/gaatha?tab=shruti">
                        <Button>{t('home.features.shruti.button')}</Button>
                    </Link>
                </CardFooter>
            </Card>
             <Card className="w-full shadow-xl flex flex-col">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                        <Video className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl font-headline mt-4">{t('home.features.live.title')}</CardTitle>
                    <CardDescription className="text-lg">
                        {t('home.features.live.subtitle')}
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center flex-grow">
                     <p className="text-muted-foreground">
                        {t('home.features.live.description')}
                    </p>
                </CardContent>
                <CardFooter className="justify-center">
                    <Link href="/live-sessions">
                        <Button>{t('home.features.live.button')}</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
        <div className="w-full container mx-auto">
            <Card className="w-full shadow-xl flex flex-col md:flex-row items-center">
                <CardHeader className="flex flex-row items-center gap-4 p-6">
                    <div className="mx-auto md:mx-0 bg-primary/10 text-primary p-3 rounded-full w-fit">
                        <Award className="h-8 w-8" />
                    </div>
                </CardHeader>
                <CardContent className="text-center md:text-left flex-grow p-6">
                    <CardTitle className="text-3xl font-headline">{t('home.features.gaatha.title')}</CardTitle>
                    <CardDescription className="text-lg mt-2">
                        {t('home.features.gaatha.subtitle')}
                    </CardDescription>
                    <p className="text-muted-foreground mt-2">
                        {t('home.features.gaatha.description')}
                    </p>
                </CardContent>
                <CardFooter className="p-6 justify-center md:justify-end">
                    <Link href="/gaatha">
                        <Button>{t('home.features.gaatha.button')}</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
         <div className="w-full container mx-auto">
                <Card className="w-full shadow-xl">
                    <CardHeader className="flex flex-row items-center gap-4 p-6">
                        <div className="bg-primary/10 text-primary p-3 rounded-full w-fit">
                            <Briefcase className="h-8 w-8" />
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-3xl font-headline">Scholarship / Internship Alerts</CardTitle>
                            <CardDescription className="text-lg mt-1">
                                Stay updated on the latest opportunities.
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                       <Alert>
                            <Award className="h-4 w-4"/>
                            <AlertTitle>No Active Alerts</AlertTitle>
                            <AlertDescription>
                                There are no active scholarships or internships at this time. Please check back later!
                            </AlertDescription>
                       </Alert>
                    </CardContent>
                </Card>
            </div>
        <div className="w-full container mx-auto">
             <Card className="w-full shadow-xl text-center p-8 md:p-12 bg-muted/50">
                <CardTitle className="text-4xl font-headline">{t('home.about.title')}</CardTitle>
                <CardDescription className="max-w-3xl mx-auto text-lg mt-4 text-foreground/80">
                    {t('home.about.description')}
                </CardDescription>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <div className="bg-primary/10 text-primary p-4 rounded-full">
                            <Rocket className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-semibold">{t('home.about.features.growth.title')}</h3>
                        <p className="text-muted-foreground">{t('home.about.features.growth.description')}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="bg-primary/10 text-primary p-4 rounded-full">
                            <Award className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-semibold">{t('home.about.features.opportunities.title')}</h3>
                        <p className="text-muted-foreground">{t('home.about.features.opportunities.description')}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="bg-primary/10 text-primary p-4 rounded-full">
                            <Mic className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-semibold">{t('home.about.features.mentorship.title')}</h3>
                        <p className="text-muted-foreground">{t('home.about.features.mentorship.description')}</p>
                    </div>
                </div>
                 <p className="mt-10 text-xl font-medium text-foreground">
                    {t('home.about.mission')}
                </p>
            </Card>
        </div>
      </main>
    </div>
  );
}

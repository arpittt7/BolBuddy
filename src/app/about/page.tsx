
'use client';

import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import Image from 'next/image';

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-12 text-primary font-headline tracking-wider">
            {t('about.title')}
          </h1>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Image 
                src="https://placehold.co/800x600.png" 
                alt={t('about.imageAlt')}
                width={800} 
                height={600} 
                className="rounded-xl shadow-2xl"
                data-ai-hint="team collaboration puzzle" 
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-headline border-b-4 border-primary pb-2 inline-block">BolBuddy</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  {t('about.description')}
                </p>
              </div>
              <Card className="shadow-lg border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="font-headline text-center text-2xl">{t('about.visionTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground text-base">
                    {t('about.visionText')}
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="font-headline text-center text-2xl">{t('about.missionTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-center text-muted-foreground text-base">
                    {t('about.missionText')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


'use client';

import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/hooks/use-language';
import { Headphones, BookOpen } from 'lucide-react';

const courses = [
    {
        title: 'Guvi (by IIT Madras)',
        description: 'Free courses in vernacular languages (Tamil, Hindi, Telugu). Teaches coding, AI/ML, Python, Web Dev.',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'IIT Madras',
        href: 'https://www.guvi.in/'
    },
    {
        title: 'Mentor India (by NITI Aayog)',
        description: 'Government initiative to connect industry experts with young students. Especially targets underserved areas.',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'government building',
        href: 'https://aim.gov.in/mentor-india.php'
    },
    {
        title: 'Unschool & Internshala',
        description: 'Some free basic mentorship via webinars and trial courses. Good for career skills, resumes, etc.',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'online course'
    },
    {
        title: 'FreeCodeCamp',
        description: 'Structured learning paths with community support. Many learners become mentors in forums.',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'people coding',
        href: 'https://www.freecodecamp.org/'
    },
    {
        title: 'Code.org',
        description: 'Ideal for beginners, especially school kids learning programming basics. Available in multiple languages.',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'children coding',
        href: 'https://code.org/'
    },
    {
        title: 'Think-Digital (by NavGurukul)',
        description: 'Teaches underprivileged youth coding + helps them get jobs. Sometimes offers offline residential programs too.',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'students learning',
        href: 'https://www.thinknavgurukul.org/'
    }
]

export default function GaathaPage() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'gaatha';
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center p-4">
        <div className="w-full container mx-auto">
            <Card className="w-full text-center bg-transparent border-0 shadow-none py-8 md:py-12">
                <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground">
                   {t('gaatha.title')}
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-foreground/80">
                    {t('gaatha.subtitle')}
                </p>
            </Card>

            <div className="mt-8 w-full flex justify-center">
                 <Tabs defaultValue={defaultTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="gaatha">{t('gaatha.tabs.gaatha.title')}</TabsTrigger>
                        <TabsTrigger value="shruti">{t('gaatha.tabs.shruti.title')}</TabsTrigger>
                        <TabsTrigger value="resources">{t('gaatha.tabs.resources.title')}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="gaatha">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('gaatha.tabs.gaatha.cardTitle')}</CardTitle>
                                <CardDescription>
                                    {t('gaatha.tabs.gaatha.cardDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2 flex flex-col items-center justify-center min-h-[200px]">
                                <Headphones className="h-16 w-16 text-primary/50" />
                                <p className="text-muted-foreground">{t('gaatha.tabs.gaatha.comingSoon')}</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="shruti">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('gaatha.tabs.shruti.cardTitle')}</CardTitle>
                                <CardDescription>
                                    {t('gaatha.tabs.shruti.cardDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2 flex flex-col items-center justify-center min-h-[200px]">
                                <BookOpen className="h-16 w-16 text-primary/50" />
                                <p className="text-muted-foreground">{t('gaatha.tabs.shruti.comingSoon')}</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="resources">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('gaatha.tabs.resources.cardTitle')}</CardTitle>
                                <CardDescription>
                                   {t('gaatha.tabs.resources.cardDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {courses.map(course => (
                                    <Card key={course.title} className="w-full shadow-xl flex flex-col">
                                        <CardHeader className="p-0">
                                            <Image src={course.image} alt={course.title} width={600} height={400} className="rounded-t-lg" data-ai-hint={course.dataAiHint} />
                                        </CardHeader>
                                        <CardContent className="p-6 flex-grow flex flex-col">
                                            <CardTitle className="text-2xl font-headline mt-4">{course.title}</CardTitle>
                                            <p className="text-muted-foreground mt-2 flex-grow">
                                                {course.description}
                                            </p>
                                        </CardContent>
                                        <CardFooter>
                                            {course.href ? (
                                                <Link href={course.href} target="_blank" rel="noopener noreferrer" className="w-full">
                                                    <Button className="w-full">Visit Site</Button>
                                                </Link>
                                            ) : (
                                                <Button className="w-full">Explore</Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
      </main>
    </div>
  );
}

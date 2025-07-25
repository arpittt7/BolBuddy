
import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const courses = [
    {
        title: 'Communication',
        description: 'Master the art of effective communication.',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'communication skills'
    },
    {
        title: 'Work Life Balance',
        description: 'Achieve harmony between your professional and personal life.',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'work-life balance'
    },
    {
        title: 'Spiritual',
        description: 'Embark on a journey of inner peace and spiritual growth.',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'spiritual meditation'
    }
]

export default function GaathaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center p-4">
        <div className="w-full container mx-auto">
            <Card className="w-full text-center bg-transparent border-2 border-amber-400/60 shadow-amber-400/20 shadow-2xl py-8 md:py-12">
                <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground">
                    Audio Badges + Gaatha
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-foreground/80">
                    Motivational progress stories in audio form
                </p>
            </Card>

            <div className="mt-8 w-full flex justify-center">
                 <Tabs defaultValue="gaatha" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="audio">Audio</TabsTrigger>
                        <TabsTrigger value="gaatha">Gaatha</TabsTrigger>
                    </TabsList>
                    <TabsContent value="audio">
                        <Card>
                            <CardHeader>
                                <CardTitle>Audio Badges</CardTitle>
                                <CardDescription>
                                    Listen to your earned audio badges. Coming soon!
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p>This feature is under development.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="gaatha">
                        <Card>
                            <CardHeader>
                                <CardTitle>Free Gaatha Courses</CardTitle>
                                <CardDescription>
                                   Explore our collection of free courses to help you grow.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                                            <Button className="w-full">Start Now</Button>
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

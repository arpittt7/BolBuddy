
import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const courses = [
    {
        title: 'Guvi (by IIT Madras)',
        description: 'Free courses in vernacular languages (Tamil, Hindi, Telugu). Teaches coding, AI/ML, Python, Web Dev.',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'online learning',
        href: 'https://www.guvi.in/'
    },
    {
        title: 'Mentor India (by NITI Aayog)',
        description: 'Government initiative to connect industry experts with young students. Especially targets underserved areas.',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'mentorship community',
        href: 'https://aim.gov.in/mentor-india.php'
    },
    {
        title: 'Unschool & Internshala',
        description: 'Some free basic mentorship via webinars and trial courses. Good for career skills, resumes, etc.',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'career skills'
    },
    {
        title: 'FreeCodeCamp',
        description: 'Structured learning paths with community support. Many learners become mentors in forums.',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'coding community',
        href: 'https://www.freecodecamp.org/'
    },
    {
        title: 'Code.org',
        description: 'Ideal for beginners, especially school kids learning programming basics. Available in multiple languages.',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'learning programming',
        href: 'https://code.org/'
    },
    {
        title: 'Think-Digital (by NavGurukul)',
        description: 'Teaches underprivileged youth coding + helps them get jobs. Sometimes offers offline residential programs too.',
        image: 'https://placehold.co/600x400.png',
        dataAiHint: 'underprivileged education',
        href: 'https://www.thinknavgurukul.org/'
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
                                <CardTitle>Free Mentorship Platforms</CardTitle>
                                <CardDescription>
                                   Explore our collection of free courses and mentorship platforms to help you grow.
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

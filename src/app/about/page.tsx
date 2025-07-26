
import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-12 text-primary font-headline tracking-wider">
            ABOUT US
          </h1>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Image 
                src="https://placehold.co/800x600.png" 
                alt="About BolBuddy" 
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
                  BolBuddy is an AI-powered mentorship platform designed to bridge the gap between aspirations and achievements for students across India. We connect learners with experienced mentors, provide peer-to-peer support through 'Gupshup' groups, and offer a safe space to ask questions anonymously with 'WhisperAsk'. Our goal is to make quality guidance accessible to everyone, everywhere.
                </p>
              </div>
              <Card className="shadow-lg border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="font-headline text-center text-2xl">VISION</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground text-base">
                    To empower every student with the guidance, skills, and confidence they need to realize their full potential and succeed in their chosen career path.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="font-headline text-center text-2xl">MISSION</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-center text-muted-foreground text-base">
                    To build a collaborative and inclusive learning community where students are inspired to learn, create, and solve real-world problems through AI-driven mentorship and peer support.
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

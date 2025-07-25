
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { BolBuddy } from '@/components/voice-mentor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquareQuote } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <Card className="w-full container mx-auto text-center bg-transparent border-2 border-amber-400/60 shadow-amber-400/20 shadow-2xl py-8 md:py-12">
            <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground">
                Find Your Perfect Mentor
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-foreground/80">
                Use the power of AI to connect with mentors who can help you achieve your goals.
                Describe what you want to learn, and we'll find the right match for you.
            </p>
        </Card>
        <div className="mt-12 w-full flex justify-center">
            <BolBuddy />
        </div>
        <div className="mt-12 w-full container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
             <Card className="w-full shadow-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                        <Users className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl font-headline mt-4">Gupshup Gurukul</CardTitle>
                    <CardDescription className="text-lg">
                        Peer voice groups for learning and motivation
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                     <p className="text-muted-foreground mb-6">
                        Connect with fellow learners in voice-based groups. Share your progress, ask questions, and stay motivated together on your journey.
                    </p>
                    <Button>Join a Group</Button>
                </CardContent>
            </Card>
            <Card className="w-full shadow-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                        <MessageSquareQuote className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl font-headline mt-4">WhisperAsk</CardTitle>
                    <CardDescription className="text-lg">
                        Ask anonymous questions via voice
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                     <p className="text-muted-foreground mb-6">
                        Have a question you're hesitant to ask? Use your voice to ask it anonymously and get the answers you need without revealing your identity.
                    </p>
                    <Button>Ask Anonymously</Button>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}

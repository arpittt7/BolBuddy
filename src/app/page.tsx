import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { BolBuddy } from '@/components/voice-mentor';
import { Card } from '@/components/ui/card';

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
      </main>
    </div>
  );
}

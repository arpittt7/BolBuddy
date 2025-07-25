import { VoiceMentor } from '@/components/voice-mentor';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-primary">VoiceMentor</h1>
          <p className="text-muted-foreground mt-2 text-lg">Your personal guide to success, one voice at a time.</p>
        </header>
        <VoiceMentor />
      </div>
    </main>
  );
}

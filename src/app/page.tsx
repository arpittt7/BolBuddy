import { BolBuddy } from '@/components/bol-buddy';
import { MentorsList } from '@/components/mentors-list';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 space-y-16">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl font-bold text-glow text-primary">BolBuddy</h1>
          <p className="text-muted-foreground mt-4 text-lg">Your personal guide to success, one voice at a time.</p>
        </header>
        <BolBuddy />
      </div>
      <div className="w-full max-w-5xl mx-auto">
        <MentorsList />
      </div>
    </main>
  );
}

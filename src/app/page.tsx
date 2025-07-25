import { BolBuddy } from '@/components/bol-buddy';
import { MentorsList } from '@/components/mentors-list';

export default function Home() {
  return (
    <main className="container mx-auto p-4 sm:p-8">
      <header className="text-center w-full max-w-5xl mx-auto mb-12">
        <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl font-bold text-glow text-primary">BolBuddy</h1>
        <p className="text-muted-foreground mt-4 text-lg">Your personal guide to success, one voice at a time.</p>
      </header>
      
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12 items-start">
        <div className="flex justify-center">
          <BolBuddy />
        </div>
        
        <aside>
          <MentorsList />
        </aside>
      </div>
    </main>
  );
}

import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { CookieConsent } from '@/components/cookie-consent';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-lg sm:text-xl font-semibold text-primary">
            AutoTune Unlimited
          </h2>
          <h1 className="mt-2 text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-foreground">
            The Ultimate Vocal Production Suite
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-foreground/80">
            The complete set of vocal tools you need, including the industry standard AutoTune Pro 11.
            Take your music to the next level and start producing vocals without limits.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 rounded-full">
              Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/40 hover:bg-white/10 text-white font-bold text-lg px-8 py-6 rounded-full">
              Learn More
            </Button>
          </div>
        </div>
      </main>
      <CookieConsent />
    </div>
  );
}

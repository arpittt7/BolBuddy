'use client';
import { useState } from 'react';
import { Button } from './ui/button';

export function CookieConsent() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-background/80 backdrop-blur-sm border border-border p-4 rounded-lg max-w-md shadow-lg">
        <div className="flex items-start gap-4">
            <div>
                 <p className="text-sm text-foreground/80 mb-4">
                    Our website uses <a href="#" className="underline hover:text-foreground">cookies</a> to deliver the best possible user experience. By clicking "Accept Cookies", you allow the use of cookies.
                 </p>
                 <Button onClick={() => setVisible(false)} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto rounded-full font-bold">
                    Accept Cookies
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}

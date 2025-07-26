
'use client'

import { useState, useEffect } from 'react';
import { SiteHeader } from '@/components/site-header';
import { MentorConnect } from '@/components/mentor-connect';
import { getAllMentors } from '@/ai/flows/match-mentor-to-user';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Mentor {
  mentorId: string;
  name: string;
  expertise: string;
  bio: string;
}

export default function MentorPage({ params }: { params: { mentorId: string } }) {
    const [mentor, setMentor] = useState<Mentor | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMentor = async () => {
            try {
                const allMentors = await getAllMentors({});
                const foundMentor = allMentors.find(m => m.mentorId === params.mentorId);
                if (foundMentor) {
                    setMentor(foundMentor);
                } else {
                    setError("Mentor not found.");
                }
            } catch (err) {
                setError("Failed to load mentor details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMentor();
    }, [params.mentorId]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <SiteHeader />
                <main className="flex-grow flex items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </main>
            </div>
        )
    }
    
    if (error) {
        return (
            <div className="min-h-screen flex flex-col">
                <SiteHeader />
                <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
                    <Card className="w-full max-w-md p-8">
                        <CardTitle className="text-2xl font-headline">Error</CardTitle>
                        <CardDescription className="mt-2">
                           {error}
                        </CardDescription>
                    </Card>
                </main>
            </div>
        )
    }

    if (!mentor) {
        return null; // Should be handled by error state
    }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <MentorConnect mentor={mentor} />
      </main>
    </div>
  );
}

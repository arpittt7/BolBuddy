"use client";

import { useEffect, useState } from 'react';
import { getAllMentors } from '@/ai/flows/match-mentor-to-user';
import type { MatchMentorOutput } from '@/ai/flows/match-mentor-to-user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

type Mentor = MatchMentorOutput['mentor'];

function MentorListItem({ mentor }: { mentor: Mentor }) {
    return (
        <Card className="bg-card/80 backdrop-blur-sm border-white/20 shadow-xl transform transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center gap-4 p-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://placehold.co/128x128.png`} alt={mentor.name} data-ai-hint="profile picture" />
                    <AvatarFallback>
                        <User className="h-6 w-6 text-muted-foreground" />
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <CardTitle className="font-headline text-xl">{mentor.name}</CardTitle>
                    <CardDescription className="text-sm">{mentor.expertise}</CardDescription>
                </div>
            </CardHeader>
        </Card>
    )
}


export function MentorsList() {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMentors = async () => {
            setIsLoading(true);
            try {
                const result = await getAllMentors({});
                setMentors(result);
            } catch (e) {
                const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMentors();
    }, []);

    return (
        <section className="h-full">
            <div className="sticky top-8">
                <h2 className="font-headline text-3xl text-center mb-4 text-glow">Meet Our Mentors</h2>
                {isLoading && (
                    <div className="space-y-4">
                        <Skeleton className="h-20 rounded-xl" />
                        <Skeleton className="h-20 rounded-xl" />
                        <Skeleton className="h-20 rounded-xl" />
                        <Skeleton className="h-20 rounded-xl" />
                    </div>
                )}
                {error && <p className="text-destructive text-center">{error}</p>}
                {!isLoading && !error && (
                    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                        {mentors.map(mentor => (
                            <MentorListItem key={mentor.mentorId} mentor={mentor} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

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
        <Card className="border-none shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={`https://placehold.co/128x128.png`} alt={mentor.name} data-ai-hint="profile picture" />
                    <AvatarFallback>
                        <User className="h-8 w-8 text-muted-foreground" />
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <CardTitle className="font-headline text-2xl">{mentor.name}</CardTitle>
                    <CardDescription className="text-base">{mentor.expertise}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{mentor.bio}</p>
            </CardContent>
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
        <section>
            <h2 className="font-headline text-3xl text-center mb-8">Meet Our Mentors</h2>
            {isLoading && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton className="h-48" />
                    <Skeleton className="h-48" />
                    <Skeleton className="h-48" />
                    <Skeleton className="h-48" />
                </div>
            )}
            {error && <p className="text-destructive text-center">{error}</p>}
            {!isLoading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mentors.map(mentor => (
                        <MentorListItem key={mentor.mentorId} mentor={mentor} />
                    ))}
                </div>
            )}
        </section>
    );
}

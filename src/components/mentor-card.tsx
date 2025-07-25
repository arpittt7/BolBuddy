import type { MatchMentorOutput } from "@/ai/flows/match-mentor-to-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, User } from "lucide-react";

type Mentor = MatchMentorOutput['mentor'];

interface MentorCardProps {
  mentor: Mentor;
  reason: string;
}

export function MentorCard({ mentor, reason }: MentorCardProps) {
  return (
    <Card className="w-full transform transition-all duration-300 ease-in-out hover:shadow-xl">
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
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-1 font-headline">About {mentor.name}</h3>
          <p className="text-muted-foreground">{mentor.bio}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1 font-headline">Why we matched you</h3>
          <p className="text-muted-foreground">{reason}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline" disabled>
          <PlayCircle className="mr-2 h-5 w-5" />
          Listen to Intro (Coming Soon)
        </Button>
      </CardFooter>
    </Card>
  );
}

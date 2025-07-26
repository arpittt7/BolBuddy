"use client"
import { useState } from "react";
import type { MatchMentorOutput } from "@/ai/flows/match-mentor-to-user";
import { mentorIntroductionTts } from "@/ai/flows/mentor-introduction-tts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PlayCircle, User, Mail, Phone } from "lucide-react";
import Link from "next/link";

type Mentor = MatchMentorOutput['mentors'][number]['mentor'];

interface MentorCardProps {
  mentor: Mentor;
  reason: string;
  language?: string;
}

const femaleNames = ["Priya", "Anjali", "Sonia", "Neha", "Isha", "Meera", "Pooja", "Divya", "Sunita", "Deepa", "Reena", "Geeta", "Shreya", "Tanvi", "Zara", "Kavita", "Natasha", "Aisha", "Ishita", "Tanya", "Anushka"];

export function MentorCard({ mentor, reason, language }: MentorCardProps) {
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const { toast } = useToast();

  const handleListenToBio = async () => {
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play();
      return;
    }

    setIsGeneratingAudio(true);
    try {
      const result = await mentorIntroductionTts({
        name: mentor.name,
        bio: mentor.bio,
        language: language,
      });
      setAudioSrc(result.audioDataUri);
      const audio = new Audio(result.audioDataUri);
      audio.play();
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      toast({
        variant: "destructive",
        title: "Failed to generate audio",
        description: errorMessage,
      });
    } finally {
      setIsGeneratingAudio(false);
    }
  };
  
  const isFemale = femaleNames.some(name => mentor.name.includes(name));
  const avatarOptions = `mouth=smile&top=${isFemale ? 'longHair' : 'shortHair'}`;

  return (
    <Card className="w-full h-full flex flex-col transform transition-all duration-300 ease-in-out hover:shadow-2xl shadow-xl">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${mentor.mentorId}&${avatarOptions}`} alt={mentor.name} />
          <AvatarFallback>
            <User className="h-8 w-8 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="font-headline text-2xl">{mentor.name}</CardTitle>
          <CardDescription className="text-base">{mentor.expertise}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <div>
          <h3 className="font-semibold text-lg mb-1 font-headline">About {mentor.name}</h3>
          <p className="text-muted-foreground">{mentor.bio}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1 font-headline">Why we matched you</h3>
          <p className="text-muted-foreground">{reason}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button className="w-full" variant="outline" onClick={handleListenToBio} disabled={isGeneratingAudio}>
           {isGeneratingAudio ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <PlayCircle className="mr-2 h-5 w-5" />
              Listen to Intro
            </>
          )}
        </Button>
        <Link href={`/mentor/${mentor.mentorId}`} className="w-full">
            <Button className="w-full">
                <Mail className="mr-2 h-5 w-5" />
                Connect
            </Button>
        </Link>
        <Link href={`/mentor/${mentor.mentorId}?action=book-call`} className="w-full">
            <Button className="w-full" variant="secondary">
                <Phone className="mr-2 h-5 w-5" />
                Book a Voice Call
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

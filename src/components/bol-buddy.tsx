"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mic, MicOff, Send, Loader2, Volume2 } from 'lucide-react';

import { matchMentor, type MatchMentorOutput } from '@/ai/flows/match-mentor-to-user';
import { announcementTts } from '@/ai/flows/announcement-tts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MentorCard } from './mentor-card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const FormSchema = z.object({
  userGoals: z.string().min(10, {
    message: "Please tell us a bit more about your goals (at least 10 characters).",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

// Extend window type for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function BolBuddy() {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnnouncing, setIsAnnouncing] = useState(false);
  const [result, setResult] = useState<MatchMentorOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userGoals: "",
    },
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          const currentGoals = form.getValues("userGoals");
          form.setValue("userGoals", currentGoals ? `${currentGoals} ${transcript}`.trim() : transcript);
          setIsRecording(false);
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          toast({
            variant: "destructive",
            title: "Voice Error",
            description: `Could not recognize speech: ${event.error}`,
          });
          setIsRecording(false);
        };
        
        recognition.onend = () => {
            if (isRecording) {
                setIsRecording(false);
            }
        };

        recognitionRef.current = recognition;
      }
    }
  }, [form, toast, isRecording]);

  const handleToggleRecording = () => {
    if (!recognitionRef.current) {
      toast({
        variant: "destructive",
        title: "Unsupported Browser",
        description: "Your browser does not support voice recording.",
      });
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setResult(null);
      setError(null);
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await matchMentor({ userGoals: data.userGoals });
      
      setIsAnnouncing(true);
      const announcementText = `I found a match for you. ${response.reason}`;
      const audioResult = await announcementTts(announcementText);
      
      const audio = new Audio(audioResult.audioDataUri);
      audioRef.current = audio;
      audio.play();

      audio.onended = () => {
        setIsAnnouncing(false);
        setResult(response);
        setIsLoading(false);
      };

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Failed to find a mentor",
        description: errorMessage,
      });
      setIsLoading(false);
      setIsAnnouncing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-8">
      <audio ref={audioRef} />
      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Hello! I'm BolBot.</CardTitle>
          <CardDescription>
            Just speak your goals, and I'll connect you with the right mentor. You can also type if you prefer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Your Goals</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          placeholder="e.g., 'Mujhe coding seekhna hai.' or 'I want to start my own business...'"
                          className="min-h-[120px] resize-none pr-12 text-base"
                          {...field}
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant={isRecording ? "destructive" : "ghost"}
                          onClick={handleToggleRecording}
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          aria-label={isRecording ? "Stop recording" : "Start recording"}
                        >
                          {isRecording ? <MicOff /> : <Mic />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && !isAnnouncing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Matching...
                  </>
                ) : isAnnouncing ? (
                   <>
                    <Volume2 className="mr-2 h-4 w-4 animate-pulse" />
                    Announcing match...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Find My Mentor
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && !isAnnouncing && (
         <Card className="border-none">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-4 min-h-[200px]">
                <Loader2 className="h-12 w-12 animate-spin text-primary"/>
                <p className="text-muted-foreground">Finding the perfect mentor for you...</p>
            </CardContent>
         </Card>
      )}

      {error && !isLoading && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && !isLoading && !isAnnouncing && (
        <div className="animate-in fade-in-50 duration-500">
            <h2 className="font-headline text-3xl text-center mb-4">I found a match!</h2>
            <MentorCard mentor={result.mentor} reason={result.reason} />
        </div>
      )}
    </div>
  );
}


"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mic, MicOff, Send, Loader2 } from 'lucide-react';

import { matchMentor, type MatchMentorOutput } from '@/ai/flows/match-mentor-to-user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MentorCard } from './mentor-card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useLanguage } from '@/hooks/use-language';

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
  const [result, setResult] = useState<MatchMentorOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any | null>(null);
  const { toast } = useToast();
  const { t, language, tError } = useLanguage();

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
        recognition.lang = language === 'en' ? 'en-US' : 'hi-IN';

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
            title: t('voice.error.title'),
            description: `${t('voice.error.description')}: ${event.error}`,
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
  }, [form, toast, isRecording, language, t]);

  const handleToggleRecording = () => {
    if (!recognitionRef.current) {
      toast({
        variant: "destructive",
        title: t('voice.unsupported.title'),
        description: t('voice.unsupported.description'),
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
      const response = await matchMentor({ userGoals: data.userGoals, language: language === 'en' ? 'en-US' : 'hi-IN' });
      setResult(response);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: t('bolbuddy.toast.error.title'),
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">{t('bolbuddy.title')}</CardTitle>
          <CardDescription>
            {t('bolbuddy.description')}
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
                    <FormLabel className="sr-only">{t('bolbuddy.form.label')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          placeholder={t('bolbuddy.form.placeholder')}
                          className="min-h-[120px] resize-none pr-12 text-base"
                          {...field}
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant={isRecording ? "destructive" : "ghost"}
                          onClick={handleToggleRecording}
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          aria-label={isRecording ? t('bolbuddy.form.stopRecording') : t('bolbuddy.form.startRecording')}
                        >
                          {isRecording ? <MicOff /> : <Mic />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage>{form.formState.errors.userGoals && tError(form.formState.errors.userGoals.message)}</FormMessage>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('bolbuddy.form.button.loading')}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {t('bolbuddy.form.button.default')}
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
         <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-4 min-h-[200px]">
                <Loader2 className="h-12 w-12 animate-spin text-primary"/>
                <p className="text-muted-foreground">{t('bolbuddy.loading')}</p>
            </CardContent>
         </Card>
      )}

      {error && !isLoading && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && !isLoading && (
        <div className="animate-in fade-in-50 duration-500">
            <h2 className="font-headline text-3xl text-center mb-4">{result.announcement}</h2>
            <Carousel className="w-full max-w-xl mx-auto" opts={{
                align: "start",
                loop: true,
            }}>
                <CarouselContent>
                    {result.mentors.map(({ mentor, reason }, index) => (
                    <CarouselItem key={index} className="md:basis-1/1 p-4">
                       <MentorCard mentor={mentor} reason={reason} language={language === 'en' ? 'en-US' : 'hi-IN'} />
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
      )}
    </div>
  );
}

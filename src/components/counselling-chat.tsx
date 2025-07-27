
'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Loader2, User, Bot, Mic, MicOff, Search, RefreshCcw } from 'lucide-react';

import { chatWithBolBot } from '@/ai/flows/bolbot-chat';
import { matchMentor, type MatchMentorOutput } from '@/ai/flows/match-mentor-to-user';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { MentorCard } from './mentor-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';


const FormSchema = z.object({
  message: z.string(),
});

type FormValues = z.infer<typeof FormSchema>;

interface ChatMessage {
    role: 'user' | 'model';
    content: { text: string }[];
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function CounsellingChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [matchResult, setMatchResult] = useState<MatchMentorOutput | null>(null);
  const [matchError, setMatchError] = useState<string | null>(null);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const { t, language } = useLanguage();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { message: "" },
  });
  
  const formMessage = form.watch('message');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language === 'en' ? 'en-US' : 'hi-IN';

        recognition.onresult = (event: any) => {
          form.setValue("message", event.results[0][0].transcript);
          setIsRecording(false);
        };
        recognition.onerror = (event: any) => {
          toast({ variant: "destructive", title: t('voice.error.title'), description: `${t('voice.error.description')}: ${event.error}` });
          setIsRecording(false);
        };
        recognition.onend = () => setIsRecording(false);
        recognitionRef.current = recognition;
      }
    }
  }, [form, toast, language, t]);

  const handleToggleRecording = () => {
    if (!recognitionRef.current) {
      toast({ variant: "destructive", title: t('voice.unsupported.title'), description: t('voice.unsupported.description') });
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      form.setValue('message', '');
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleSendMessage = async (message: string, matchRequest: boolean = false) => {
      if (message.trim().length === 0) return;
      
      const userMessage: ChatMessage = { role: 'user', content: [{ text: message }] };
      const newHistory = [...history, userMessage];
      setHistory(newHistory);
      form.reset();

      if (matchRequest) {
        setIsMatching(true);
        setMatchResult(null);
        setMatchError(null);
        try {
            const conversationText = newHistory.map(h => `${h.role}: ${h.content[0].text}`).join('\n');
            const response = await matchMentor({ userGoals: conversationText, language: language === 'en' ? 'en-US' : 'hi-IN' });
            setMatchResult(response);
        } catch(e) {
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
            setMatchError(errorMessage);
            toast({ variant: "destructive", title: "Match Error", description: errorMessage });
        } finally {
            setIsMatching(false);
        }
        return;
      }

      setIsLoading(true);
      try {
        const response = await chatWithBolBot({ message, history: newHistory });
        const botMessage: ChatMessage = { role: 'model', content: [{ text: response.response }]};
        setHistory(prev => [...prev, botMessage]);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        toast({ variant: "destructive", title: "Chat Error", description: errorMessage });
        setHistory(prev => prev.slice(0, -1));
      } finally {
        setIsLoading(false);
      }
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    handleSendMessage(data.message);
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [history]);
  
  const handleReset = () => {
    setHistory([]);
    setMatchResult(null);
    setMatchError(null);
    form.reset();
  }

  if (isMatching) {
    return (
        <Card className="shadow-lg relative overflow-hidden min-h-[70vh]">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-4 min-h-[70vh]">
                <Loader2 className="h-12 w-12 animate-spin text-primary"/>
                <p className="text-muted-foreground">{t('bolbuddy.loading')}</p>
            </CardContent>
        </Card>
    );
  }

  if (matchResult) {
    return (
        <Card className="shadow-lg relative overflow-hidden">
            <CardHeader>
                <h2 className="font-headline text-3xl text-center mb-2">{matchResult.announcement}</h2>
            </CardHeader>
            <CardContent>
                <Carousel className="w-full max-w-xl mx-auto" opts={{ align: "start", loop: true }}>
                    <CarouselContent>
                        {matchResult.mentors.map(({ mentor, reason }, index) => (
                        <CarouselItem key={index} className="p-4">
                           <MentorCard mentor={mentor} reason={reason} language={language === 'en' ? 'en-US' : 'hi-IN'} />
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </CardContent>
            <CardFooter className="justify-center">
                 <Button onClick={handleReset} variant="outline">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    {t('counselling.startOver')}
                </Button>
            </CardFooter>
        </Card>
    )
  }

   if (matchError) {
    return (
        <Card className="shadow-lg relative overflow-hidden">
            <CardContent className="p-6">
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{matchError}</AlertDescription>
                </Alert>
                <div className="mt-4 flex justify-center">
                    <Button onClick={handleReset} variant="outline">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                         {t('counselling.startOver')}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
   }

  return (
    <Card className="shadow-lg relative overflow-hidden">
        <CardHeader>
            <CardTitle className="font-headline text-3xl">{t('counselling.title')}</CardTitle>
            <CardDescription>{t('counselling.description')}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col h-[60vh] border rounded-lg p-4">
                <ScrollArea className="flex-grow" ref={scrollAreaRef}>
                    <div className="space-y-4">
                        {history.length === 0 && (
                             <div className="flex justify-center items-center h-full">
                                <p className="text-muted-foreground">{t('counselling.startConversation')}</p>
                            </div>
                        )}
                        {history.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback>
                                        {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    </AvatarFallback>
                                </Avatar>
                                <div className={`p-3 rounded-lg max-w-xs ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                    <p>{msg.content[0].text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-3">
                                <Avatar className="w-8 h-8"><AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback></Avatar>
                                <div className="p-3 rounded-lg max-w-xs bg-muted flex items-center">
                                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <div className="mt-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder={t('counselling.placeholder')}
                                            {...field}
                                            disabled={isLoading || isRecording}
                                        />
                                        <Button
                                            type="button"
                                            size="icon"
                                            variant={isRecording ? "destructive" : "ghost"}
                                            onClick={handleToggleRecording}
                                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                                            disabled={isLoading}
                                            aria-label={isRecording ? "Stop recording" : "Start recording"}
                                        >
                                            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </FormControl>
                            </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading || isRecording || !formMessage} size="icon">
                           <Send className="h-5 w-5" />
                        </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full" disabled={isLoading} onClick={() => handleSendMessage(form.getValues('message') || t('counselling.matchMeButtonPrompt'), true)}>
                <Search className="mr-2 h-4 w-4" />
                {t('counselling.matchMeButton')}
            </Button>
        </CardFooter>
    </Card>
  );
}

    
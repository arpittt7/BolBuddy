
'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Loader2, User, Bot, Mic, MicOff, Search } from 'lucide-react';

import { chatWithBolBot } from '@/ai/flows/bolbot-chat';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

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
  const [history, setHistory] = useState<ChatMessage[]>([]);
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

  const handleSendMessage = async (message: string) => {
      if (message.trim().length === 0) return;
      setIsLoading(true);
      
      const userMessage: ChatMessage = { role: 'user', content: [{ text: message }] };
      const newHistory = [...history, userMessage];
      setHistory(newHistory);
      form.reset();

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
            <Button className="w-full" disabled={isLoading} onClick={() => handleSendMessage(form.getValues('message') || t('counselling.matchMeButtonPrompt'))}>
                <Search className="mr-2 h-4 w-4" />
                {t('counselling.matchMeButton')}
            </Button>
        </CardFooter>
    </Card>
  );
}


'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Loader2, User, Bot, Mic, MicOff, Volume2 } from 'lucide-react';

import { chatWithBolBot } from '@/ai/flows/bolbot-chat';
import { announcementTts } from '@/ai/flows/announcement-tts';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';

const FormSchema = z.object({
  message: z.string().min(1, {
    message: "Message cannot be empty.",
  }),
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

export function BolBotChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'hi-IN'; // Set to Hinglish/Indian languages

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          form.setValue("message", transcript);
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
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        })
    }
  }, [history]);

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
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const playAudio = (audioDataUri: string) => {
    const audio = new Audio(audioDataUri);
    audioRef.current = audio;
    audio.play();
    setIsBotSpeaking(true);
    audio.onended = () => {
        setIsBotSpeaking(false);
    };
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.message.trim().length === 0) return;
    setIsLoading(true);
    
    const userMessage: ChatMessage = { role: 'user', content: [{ text: data.message }] };
    const newHistory = [...history, userMessage];
    setHistory(newHistory);
    form.reset();

    try {
      const response = await chatWithBolBot({ message: data.message, history: newHistory });
      const botMessage: ChatMessage = { role: 'model', content: [{ text: response.response }]};
      setHistory(prev => [...prev, botMessage]);

      const ttsResponse = await announcementTts({ text: response.response, language: 'hi-IN' });
      playAudio(ttsResponse.audioDataUri);

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      toast({
        variant: "destructive",
        title: "Chat Error",
        description: errorMessage,
      });
      setHistory(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[60vh]">
        <ScrollArea className="flex-grow p-4 border rounded-md" ref={scrollAreaRef}>
             <div className="space-y-4">
                {history.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <Avatar>
                            <AvatarFallback>
                                {msg.role === 'user' ? <User /> : <Bot />}
                            </AvatarFallback>
                        </Avatar>
                        <div className={`p-3 rounded-lg max-w-xs ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            <p>{msg.content[0].text}</p>
                        </div>
                    </div>
                ))}
                 {isLoading && !isBotSpeaking && (
                    <div className="flex items-start gap-3">
                        <Avatar>
                            <AvatarFallback><Bot /></AvatarFallback>
                        </Avatar>
                        <div className="p-3 rounded-lg max-w-xs bg-muted flex items-center">
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                    </div>
                )}
                 {isBotSpeaking && (
                     <div className="flex items-start gap-3">
                        <Avatar>
                            <AvatarFallback><Bot /></AvatarFallback>
                        </Avatar>
                        <div className="p-3 rounded-lg max-w-xs bg-muted flex items-center space-x-2">
                           <Volume2 className="h-5 w-5 text-muted-foreground animate-pulse" />
                           <span className="text-sm text-muted-foreground">BolBot is speaking...</span>
                        </div>
                    </div>
                )}
            </div>
        </ScrollArea>
        <div className="mt-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                    <FormItem className="flex-grow">
                        <FormLabel className="sr-only">Your Message</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Input
                                    placeholder="Aapka sawaal yahan likhein ya bolein..."
                                    {...field}
                                    disabled={isLoading || isRecording || isBotSpeaking}
                                />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant={isRecording ? "destructive" : "ghost"}
                                    onClick={handleToggleRecording}
                                    className="absolute right-10 top-1/2 -translate-y-1/2"
                                    disabled={isLoading || isBotSpeaking}
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
                <Button type="submit" disabled={isLoading || isRecording || isBotSpeaking} size="icon">
                    {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Send className="h-5 w-5" />
                    )}
                </Button>
                </form>
            </Form>
        </div>
    </div>
  );
}

  
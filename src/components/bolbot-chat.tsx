'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Loader2, User, Bot } from 'lucide-react';

import { chatWithBolBot } from '@/ai/flows/bolbot-chat';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

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

export function BolBotChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        })
    }
  }, [history]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    
    const userMessage: ChatMessage = { role: 'user', content: [{ text: data.message }] };
    const newHistory = [...history, userMessage];
    setHistory(newHistory);
    form.reset();

    try {
      const response = await chatWithBolBot({ message: data.message, history: newHistory });
      const botMessage: ChatMessage = { role: 'model', content: [{ text: response.response }]};
      setHistory(prev => [...prev, botMessage]);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      toast({
        variant: "destructive",
        title: "Chat Error",
        description: errorMessage,
      });
      // remove the user message if the API call fails
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
                 {isLoading && (
                    <div className="flex items-start gap-3">
                        <Avatar>
                            <AvatarFallback><Bot /></AvatarFallback>
                        </Avatar>
                        <div className="p-3 rounded-lg max-w-xs bg-muted flex items-center">
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
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
                            <Input
                                placeholder="Aapka sawaal yahan likhein..."
                                {...field}
                                disabled={isLoading}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading} size="icon">
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

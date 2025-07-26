
"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mic, MicOff, Send, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const FormSchema = z.object({
  question: z.string().min(10, {
    message: "Please ask a question with at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function WhisperAskForm() {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const recognitionRef = useRef<any | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: "",
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
          const currentQuestion = form.getValues("question");
          form.setValue("question", currentQuestion ? `${currentQuestion} ${transcript}`.trim() : transcript);
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
      setSubmitted(false);
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    
    // Simulate API call to submit question
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Anonymous question submitted:", data.question);

    setIsLoading(false);
    setSubmitted(true);
    form.reset();
    toast({
        title: "Question Submitted!",
        description: "Your question has been sent to our mentors anonymously.",
    })
  };

  return (
    <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Ask Anonymously</CardTitle>
          <CardDescription>
            Your identity will be kept completely private. Type your question or use your voice.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {submitted ? (
              <Alert variant="default" className="bg-green-100/50 border-green-400 text-green-800">
                <AlertTitle className="font-headline">Success!</AlertTitle>
                <AlertDescription>Your question has been submitted anonymously. You will be notified when a mentor responds.</AlertDescription>
              </Alert>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="question"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="sr-only">Your Question</FormLabel>
                            <FormControl>
                            <div className="relative">
                                <Textarea
                                placeholder="Type your anonymous question here..."
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
                        {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                        ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" />
                            Ask My Question
                        </>
                        )}
                    </Button>
                    </form>
                </Form>
             )}
        </CardContent>
      </Card>
  );
}

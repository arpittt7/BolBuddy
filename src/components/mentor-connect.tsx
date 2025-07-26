
'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, Mic, MicOff, Send, Calendar, Headphones, Download, PlayCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { announcementTts } from '@/ai/flows/announcement-tts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Mentor {
  mentorId: string;
  name: string;
  expertise: string;
  bio: string;
}

const BookingSchema = z.object({
    name: z.string().min(2, "Name is required"),
    date: z.string().min(1, "Please select a date"),
    notes: z.string().optional(),
})
type BookingFormValues = z.infer<typeof BookingSchema>;

const femaleNames = ["Priya", "Anjali", "Sonia", "Neha", "Isha", "Meera", "Pooja", "Divya", "Sunita", "Deepa", "Reena", "Geeta", "Shreya", "Tanvi", "Zara", "Kavita", "Natasha", "Aisha", "Ishita", "Tanya", "Anushka"];

export function MentorConnect({ mentor }: { mentor: Mentor }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [callBooked, setCallBooked] = useState(false);
  const recognitionRef = useRef<any | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const bookingForm = useForm<BookingFormValues>({
    resolver: zodResolver(BookingSchema),
    defaultValues: { name: "", date: "", notes: "" }
  });

  useEffect(() => {
    const playIntro = async () => {
      try {
        const ttsResponse = await announcementTts({ text: "Shabash! Aapka mentor ab aapke sath hai.", language: 'hi-IN' });
        const audio = new Audio(ttsResponse.audioDataUri);
        audioRef.current = audio;
        audio.play();
      } catch (error) {
        console.error("Failed to play confirmation message", error)
      }
    };
    playIntro();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'hi-IN';

        recognition.onresult = (event: any) => {
          setVoiceMessage(event.results[0][0].transcript);
          setIsRecording(false);
        };
        recognition.onerror = (event: any) => {
          toast({ variant: "destructive", title: "Voice Error", description: `Could not recognize speech: ${event.error}` });
          setIsRecording(false);
        };
        recognition.onend = () => setIsRecording(false);
        recognitionRef.current = recognition;
      }
    }
  }, [toast]);

  const handleToggleRecording = () => {
    if (!recognitionRef.current) {
      toast({ variant: "destructive", title: "Unsupported Browser", description: "Browser doesn't support voice recording." });
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setVoiceMessage('');
      setMessageSent(false);
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };
  
  const handleSendVoiceMessage = async () => {
    if (!voiceMessage) return;
    setIsSending(true);
    await new Promise(res => setTimeout(res, 1500)); // Simulate API call
    console.log("Sending voice message to mentor:", voiceMessage);
    setIsSending(false);
    setMessageSent(true);
    setVoiceMessage('');
    toast({ title: "Message Sent!", description: "Your voice message has been sent to your mentor." });
  }

  const onBookCallSubmit: SubmitHandler<BookingFormValues> = async (data) => {
    setIsBooking(true);
    await new Promise(res => setTimeout(res, 1500)); // Simulate API call
    console.log("Booking a call with mentor:", data);
    setIsBooking(false);
    setCallBooked(true);
    bookingForm.reset();
    toast({ title: "Call Booked!", description: `Your call with ${mentor.name} has been scheduled.` });
  }

  const defaultTab = searchParams.get('action') === 'book-call' ? 'book-call' : 'send-message';
  
  const isFemale = femaleNames.some(name => mentor.name.includes(name));
  const avatarOptions = `mouth=smile&top=${isFemale ? 'longHair' : 'shortHair'}`;

  return (
    <Card className="w-full max-w-4xl shadow-2xl">
      <CardHeader className="text-center">
        <Alert variant="default" className="bg-green-100/50 border-green-400 text-green-800">
          <PlayCircle className="h-4 w-4" />
          <AlertTitle className="font-headline">Shabash! Aapka mentor ab aapke sath hai.</AlertTitle>
        </Alert>
        <Avatar className="h-24 w-24 mx-auto mt-6">
          <AvatarImage src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${mentor.mentorId}&${avatarOptions}`} alt={mentor.name} />
          <AvatarFallback className="text-3xl">
            <User />
          </AvatarFallback>
        </Avatar>
        <CardTitle className="font-headline text-4xl mt-4">{mentor.name}</CardTitle>
        <CardDescription className="text-lg">{mentor.expertise}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="send-message"><Send className="mr-2 h-4 w-4"/>Send Voice Message</TabsTrigger>
            <TabsTrigger value="book-call"><Calendar className="mr-2 h-4 w-4"/>Book Weekly Call</TabsTrigger>
            <TabsTrigger value="lessons"><Headphones className="mr-2 h-4 w-4"/>Audio Lessons</TabsTrigger>
          </TabsList>
          
          <TabsContent value="send-message" className="mt-6">
             <Card>
                <CardHeader>
                    <CardTitle>Send a Voice Message</CardTitle>
                    <CardDescription>Record a message for your mentor. Ask a question or share an update.</CardDescription>
                </CardHeader>
                <CardContent>
                    {messageSent ? (
                        <Alert>
                            <AlertTitle>Message Sent!</AlertTitle>
                            <AlertDescription>Your mentor will receive your message and respond soon.</AlertDescription>
                        </Alert>
                    ) : (
                        <div className="space-y-4">
                             <div className="relative">
                                <Textarea 
                                    placeholder="Your recorded message will appear here..."
                                    value={voiceMessage}
                                    readOnly
                                    className="min-h-[100px]"
                                />
                                <Button
                                  type="button"
                                  size="icon"
                                  variant={isRecording ? "destructive" : "ghost"}
                                  onClick={handleToggleRecording}
                                  className="absolute right-2 top-1/2 -translate-y-1/2"
                                >
                                  {isRecording ? <MicOff /> : <Mic />}
                                </Button>
                            </div>
                            <Button className="w-full" onClick={handleSendVoiceMessage} disabled={!voiceMessage || isSending}>
                                {isSending ? <Loader2 className="animate-spin mr-2"/> : <Send className="mr-2"/>}
                                Send Message
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="book-call" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Book a Weekly Voice Call</CardTitle>
                    <CardDescription>Schedule a one-on-one call with {mentor.name}.</CardDescription>
                </CardHeader>
                <CardContent>
                {callBooked ? (
                     <Alert>
                        <AlertTitle>Call Scheduled!</AlertTitle>
                        <AlertDescription>Your weekly call has been booked. You will receive a confirmation email shortly.</AlertDescription>
                    </Alert>
                ) : (
                    <form onSubmit={bookingForm.handleSubmit(onBookCallSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input id="name" {...bookingForm.register("name")} />
                             {bookingForm.formState.errors.name && <p className="text-sm text-destructive">{bookingForm.formState.errors.name.message}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="date">Preferred Date</Label>
                            <Input id="date" type="date" {...bookingForm.register("date")} />
                            {bookingForm.formState.errors.date && <p className="text-sm text-destructive">{bookingForm.formState.errors.date.message}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="notes">Notes (Optional)</Label>
                            <Textarea id="notes" placeholder="Anything specific you want to discuss?" {...bookingForm.register("notes")} />
                        </div>
                        <Button type="submit" className="w-full" disabled={isBooking}>
                            {isBooking ? <Loader2 className="animate-spin mr-2"/> : <Calendar className="mr-2"/>}
                            Book Call
                        </Button>
                    </form>
                )}
                </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="lessons" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Pre-recorded Audio Lessons</CardTitle>
                    <CardDescription>Listen to lessons from {mentor.name}. Available online and offline.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                            <p className="font-semibold">Lesson 1: Introduction to {mentor.expertise.split(',')[0]}</p>
                            <p className="text-sm text-muted-foreground">5:30 min</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost"><PlayCircle/></Button>
                            <Button size="icon" variant="ghost"><Download/></Button>
                        </div>
                    </div>
                     <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                            <p className="font-semibold">Lesson 2: Core Concepts</p>
                            <p className="text-sm text-muted-foreground">12:15 min</p>
                        </div>
                         <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost"><PlayCircle/></Button>
                            <Button size="icon" variant="ghost"><Download/></Button>
                        </div>
                    </div>
                    <Alert>
                        <Download className="h-4 w-4" />
                        <AlertTitle>Offline Access</AlertTitle>
                        <AlertDescription>
                            Download lessons to listen anywhere, even without an internet connection.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

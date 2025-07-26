
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
import { useLanguage } from '@/hooks/use-language';

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
  const { t, language, tError } = useLanguage();

  const bookingForm = useForm<BookingFormValues>({
    resolver: zodResolver(BookingSchema),
    defaultValues: { name: "", date: "", notes: "" }
  });

  useEffect(() => {
    const playIntro = async () => {
      try {
        const ttsResponse = await announcementTts({ text: t('mentorConnect.greeting'), language: 'hi-IN' });
        const audio = new Audio(ttsResponse.audioDataUri);
        audioRef.current = audio;
        audio.play();
      } catch (error) {
        console.error("Failed to play confirmation message", error)
      }
    };
    playIntro();
  }, [t]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language === 'en' ? 'en-US' : 'hi-IN';

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
  }, [toast, language]);

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
    toast({ title: t('mentorConnect.messageSent.title'), description: t('mentorConnect.messageSent.description') });
  }

  const onBookCallSubmit: SubmitHandler<BookingFormValues> = async (data) => {
    setIsBooking(true);
    await new Promise(res => setTimeout(res, 1500)); // Simulate API call
    console.log("Booking a call with mentor:", data);
    setIsBooking(false);
    setCallBooked(true);
    bookingForm.reset();
    toast({ title: t('mentorConnect.callBooked.title'), description: t('mentorConnect.callBooked.description', { name: mentor.name }) });
  }

  const defaultTab = searchParams.get('action') === 'book-call' ? 'book-call' : 'send-message';
  
  const isFemale = femaleNames.some(name => mentor.name.includes(name));
  const avatarOptions = `mouth=smile&top=${isFemale ? 'longHair' : 'shortHair'}`;

  return (
    <Card className="w-full max-w-4xl shadow-2xl">
      <CardHeader className="text-center">
        <Alert variant="default" className="bg-green-100/50 border-green-400 text-green-800">
          <PlayCircle className="h-4 w-4" />
          <AlertTitle className="font-headline">{t('mentorConnect.greeting')}</AlertTitle>
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
            <TabsTrigger value="send-message"><Send className="mr-2 h-4 w-4"/>{t('mentorConnect.tabs.voiceMessage.title')}</TabsTrigger>
            <TabsTrigger value="book-call"><Calendar className="mr-2 h-4 w-4"/>{t('mentorConnect.tabs.bookCall.title')}</TabsTrigger>
            <TabsTrigger value="lessons"><Headphones className="mr-2 h-4 w-4"/>{t('mentorConnect.tabs.lessons.title')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="send-message" className="mt-6">
             <Card>
                <CardHeader>
                    <CardTitle>{t('mentorConnect.tabs.voiceMessage.title')}</CardTitle>
                    <CardDescription>{t('mentorConnect.tabs.voiceMessage.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    {messageSent ? (
                        <Alert>
                            <AlertTitle>{t('mentorConnect.messageSent.title')}</AlertTitle>
                            <AlertDescription>{t('mentorConnect.messageSent.alertDescription')}</AlertDescription>
                        </Alert>
                    ) : (
                        <div className="space-y-4">
                             <div className="relative">
                                <Textarea 
                                    placeholder={t('mentorConnect.tabs.voiceMessage.placeholder')}
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
                                {t('mentorConnect.tabs.voiceMessage.button')}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="book-call" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>{t('mentorConnect.tabs.bookCall.title')}</CardTitle>
                    <CardDescription>{t('mentorConnect.tabs.bookCall.description', { name: mentor.name })}</CardDescription>
                </CardHeader>
                <CardContent>
                {callBooked ? (
                     <Alert>
                        <AlertTitle>{t('mentorConnect.callBooked.alertTitle')}</AlertTitle>
                        <AlertDescription>{t('mentorConnect.callBooked.alertDescription')}</AlertDescription>
                    </Alert>
                ) : (
                    <form onSubmit={bookingForm.handleSubmit(onBookCallSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">{t('mentorConnect.tabs.bookCall.form.name.label')}</Label>
                            <Input id="name" {...bookingForm.register("name")} />
                             {bookingForm.formState.errors.name && <p className="text-sm text-destructive">{tError(bookingForm.formState.errors.name.message)}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="date">{t('mentorConnect.tabs.bookCall.form.date.label')}</Label>
                            <Input id="date" type="date" {...bookingForm.register("date")} />
                            {bookingForm.formState.errors.date && <p className="text-sm text-destructive">{tError(bookingForm.formState.errors.date.message)}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="notes">{t('mentorConnect.tabs.bookCall.form.notes.label')}</Label>
                            <Textarea id="notes" placeholder={t('mentorConnect.tabs.bookCall.form.notes.placeholder')} {...bookingForm.register("notes")} />
                        </div>
                        <Button type="submit" className="w-full" disabled={isBooking}>
                            {isBooking ? <Loader2 className="animate-spin mr-2"/> : <Calendar className="mr-2"/>}
                            {t('mentorConnect.tabs.bookCall.form.button')}
                        </Button>
                    </form>
                )}
                </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="lessons" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>{t('mentorConnect.tabs.lessons.title')}</CardTitle>
                    <CardDescription>{t('mentorConnect.tabs.lessons.description', { name: mentor.name })}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                            <p className="font-semibold">{t('mentorConnect.tabs.lessons.lesson1.title', { expertise: mentor.expertise.split(',')[0] })}</p>
                            <p className="text-sm text-muted-foreground">5:30 min</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost"><PlayCircle/></Button>
                            <Button size="icon" variant="ghost"><Download/></Button>
                        </div>
                    </div>
                     <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                            <p className="font-semibold">{t('mentorConnect.tabs.lessons.lesson2.title')}</p>
                            <p className="text-sm text-muted-foreground">12:15 min</p>
                        </div>
                         <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost"><PlayCircle/></Button>
                            <Button size="icon" variant="ghost"><Download/></Button>
                        </div>
                    </div>
                    <Alert>
                        <Download className="h-4 w-4" />
                        <AlertTitle>{t('mentorConnect.tabs.lessons.offline.title')}</AlertTitle>
                        <AlertDescription>
                            {t('mentorConnect.tabs.lessons.offline.description')}
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

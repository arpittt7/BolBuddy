
import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WhisperAskForm } from '@/components/whisper-ask-form';
import { BolBotChat } from '@/components/bolbot-chat';

export default function WhisperAskPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center p-4">
        <div className="w-full container mx-auto">
            <Card className="w-full text-center bg-transparent border-0 shadow-none py-8 md:py-12">
                <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground">
                    WhisperAsk
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-foreground/80">
                    Your space to ask questions anonymously or chat with BolBot, your friendly AI mentor.
                </p>
            </Card>

            <div className="mt-8 w-full flex justify-center">
                 <Tabs defaultValue="whisper" className="w-full max-w-3xl">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="whisper">WhisperAsk</TabsTrigger>
                        <TabsTrigger value="bolbot">Chat with BolBot</TabsTrigger>
                    </TabsList>
                    <TabsContent value="whisper">
                        <WhisperAskForm />
                    </TabsContent>
                    <TabsContent value="bolbot">
                         <Card className="shadow-xl">
                            <CardHeader>
                                <CardTitle className="font-headline text-3xl">Chat with BolBot</CardTitle>
                                <CardDescription>
                                    Your AI-powered friend to help you with your doubts.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <BolBotChat />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
      </main>
    </div>
  );
}


import { SiteHeader } from '@/components/site-header';
import { WhisperAskForm } from '@/components/whisper-ask-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BolBotChat } from '@/components/bolbot-chat';

export default function WhisperAskPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center p-4">
        <Tabs defaultValue="whisper" className="w-full max-w-2xl">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="whisper">WhisperAsk</TabsTrigger>
                <TabsTrigger value="chat">Start Chat</TabsTrigger>
            </TabsList>
            <TabsContent value="whisper">
                <WhisperAskForm />
            </TabsContent>
            <TabsContent value="chat">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline text-3xl">Chat with BolBot</CardTitle>
                        <CardDescription>
                            Your warm, encouraging AI mentor is here to help you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BolBotChat />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

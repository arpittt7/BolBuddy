
'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';
import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, User, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

interface Message {
  id: string;
  sender: string;
  senderId: string;
  text: string;
  timestamp: Timestamp;
}

export default function GroupChatPage({ params }: { params: { group: string } }) {
  const { user, loading: authLoading } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const groupName = decodeURIComponent(params.group)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const messagesCollectionRef = collection(db, 'gupshup-groups', params.group, 'messages');

  useEffect(() => {
    if (!authLoading && !user) {
      setIsLoading(false);
      return;
    }

    if (user) {
        const q = query(messagesCollectionRef, orderBy('timestamp', 'asc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
            setMessages(msgs);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }
  }, [user, authLoading, params.group, messagesCollectionRef]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && user) {
      await addDoc(messagesCollectionRef, {
        text: newMessage,
        sender: user.displayName || user.email,
        senderId: user.uid,
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
    }
  };

  if (authLoading || isLoading) {
    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-grow flex items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </main>
        </div>
    )
  }

  if (!user) {
     return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
                <Card className="w-full max-w-md p-8">
                    <CardTitle className="text-2xl font-headline">Access Denied</CardTitle>
                    <CardDescription className="mt-2">
                        You need to be signed in to join the Gupshup.
                    </CardDescription>
                    <Button asChild className="mt-6">
                        <Link href="/auth">Sign In</Link>
                    </Button>
                </Card>
            </main>
        </div>
     )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center p-4">
        <Card className="w-full max-w-3xl h-[calc(100vh-10rem)] flex flex-col shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-center">{groupName}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 ${msg.senderId === user.uid ? 'flex-row-reverse' : ''}`}>
                <Avatar>
                    <AvatarFallback>{msg.sender?.[0].toUpperCase() ?? 'U'}</AvatarFallback>
                </Avatar>
                <div className={`p-3 rounded-lg max-w-xs ${msg.senderId === user.uid ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p className="font-bold text-sm">{msg.senderId === user.uid ? 'You' : msg.sender}</p>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
             <div ref={messagesEndRef} />
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSendMessage} className="w-full flex items-center gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow"
              />
              <Button type="submit" size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

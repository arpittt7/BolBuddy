
'use client';

import { useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  sender: 'user' | 'other';
  text: string;
}

export default function GroupChatPage({ params }: { params: { group: string } }) {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'other', text: 'Welcome to the group! Feel free to start the discussion.' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const groupName = params.group
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'user', text: newMessage }]);
      setNewMessage('');
      
      // Simulate a response
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'other', text: 'That is a great point!'}]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center p-4">
        <Card className="w-full max-w-3xl h-[calc(100vh-10rem)] flex flex-col shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-center">{groupName}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <Avatar>
                    <AvatarFallback>{msg.sender === 'user' ? 'You' : 'O'}</AvatarFallback>
                </Avatar>
                <div className={`p-3 rounded-lg max-w-xs ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
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


import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coffee, Code, Bot, Component } from 'lucide-react';

const groups = [
    {
        title: 'Python Gupshup',
        description: 'Discuss everything from web development with Django and Flask to data science with Pandas and NumPy.',
        icon: <Bot className="h-10 w-10 text-primary" />,
    },
    {
        title: 'Java Gupshup',
        description: 'For the Spring framework aficionados, Android developers, and enterprise-level application builders.',
        icon: <Coffee className="h-10 w-10 text-primary" />,
    },
    {
        title: 'JavaScript Gupshup',
        description: 'A group for frontend wizards and backend masters. Talk about React, Node.js, Vue, and the latest in the JS ecosystem.',
        icon: <Code className="h-10 w-10 text-primary" />,
    },
    {
        title: 'C++ Gupshup',
        description: 'Dive deep into systems programming, game development, and high-performance computing with C++.',
        icon: <Component className="h-10 w-10 text-primary" />,
    }
];

export default function GupshupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center p-4">
        <div className="w-full container mx-auto text-center py-8 md:py-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground">
                Gupshup Gurukul
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-foreground/80">
                Join a voice group with your peers to learn, share, and grow together.
            </p>
        </div>
        <div className="w-full container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {groups.map((group) => (
                <Card key={group.title} className="w-full shadow-xl flex flex-col text-center">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                            {group.icon}
                        </div>
                        <CardTitle className="text-3xl font-headline mt-4">{group.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground">
                            {group.description}
                        </p>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Button className="w-full md:w-auto">Join the Gupshup</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </main>
    </div>
  );
}

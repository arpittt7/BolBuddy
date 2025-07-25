"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SiteHeader } from '@/components/site-header';
import { toast } from '@/hooks/use-toast';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);
    // TODO: Implement Firebase sign-in logic
    console.log('Signing in with:', { email, password });
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    toast({
        title: "Sign-in successful!",
        description: "You have been successfully signed in.",
    })
    setIsSigningIn(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-sm shadow-xl">
            <CardHeader>
            <CardTitle className="text-2xl font-headline">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSigningIn}
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isSigningIn}
                />
                </div>
                <Button type="submit" className="w-full" disabled={isSigningIn}>
                {isSigningIn ? 'Signing In...' : 'Sign In'}
                </Button>
            </form>
            </CardContent>
        </Card>
        </main>
    </div>
  );
}


"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  expertise: z.string().min(10, { message: "Please list your areas of expertise (at least 10 characters)." }),
  bio: z.string().min(20, { message: "Bio must be at least 20 characters." }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function JoinMentorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      expertise: "",
      bio: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    console.log("Mentor application submitted:", data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setSubmitted(true);
    form.reset();
    toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in becoming a mentor.",
    })
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">Become a Mentor</CardTitle>
            <CardDescription>
              Share your knowledge and guide the next generation of talent. Fill out the form below to join us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <Alert variant="default" className="bg-green-100/50 border-green-400 text-green-800">
                <AlertTitle className="font-headline">Thank You!</AlertTitle>
                <AlertDescription>Your application has been received. We will review it and get in touch with you shortly.</AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" {...form.register("name")} disabled={isLoading} />
                    {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" {...form.register("email")} disabled={isLoading} />
                     {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expertise">Expertise / Skills</Label>
                  <Input id="expertise" placeholder="e.g., Python, UI/UX Design, Public Speaking" {...form.register("expertise")} disabled={isLoading} />
                   {form.formState.errors.expertise && <p className="text-sm text-destructive">{form.formState.errors.expertise.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Short Bio</Label>
                  <Textarea id="bio" placeholder="Tell us a little about yourself and your experience." className="min-h-[100px]" {...form.register("bio")} disabled={isLoading} />
                  {form.formState.errors.bio && <p className="text-sm text-destructive">{form.formState.errors.bio.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Apply to be a Mentor
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}


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
import { useLanguage } from '@/hooks/use-language';

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
  const { t, tError } = useLanguage();

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
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setSubmitted(true);
    form.reset();
    toast({
        title: t('joinMentor.toast.title'),
        description: t('joinMentor.toast.description'),
    })
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">{t('joinMentor.title')}</CardTitle>
            <CardDescription>
              {t('joinMentor.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <Alert variant="default" className="bg-green-100/50 border-green-400 text-green-800">
                <AlertTitle className="font-headline">{t('joinMentor.submitted.title')}</AlertTitle>
                <AlertDescription>{t('joinMentor.submitted.description')}</AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('joinMentor.form.name.label')}</Label>
                    <Input id="name" {...form.register("name")} disabled={isLoading} />
                    {form.formState.errors.name && <p className="text-sm text-destructive">{tError(form.formState.errors.name.message)}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('joinMentor.form.email.label')}</Label>
                    <Input id="email" type="email" {...form.register("email")} disabled={isLoading} />
                     {form.formState.errors.email && <p className="text-sm text-destructive">{tError(form.formState.errors.email.message)}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expertise">{t('joinMentor.form.expertise.label')}</Label>
                  <Input id="expertise" placeholder={t('joinMentor.form.expertise.placeholder')} {...form.register("expertise")} disabled={isLoading} />
                   {form.formState.errors.expertise && <p className="text-sm text-destructive">{tError(form.formState.errors.expertise.message)}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">{t('joinMentor.form.bio.label')}</Label>
                  <Textarea id="bio" placeholder={t('joinMentor.form.bio.placeholder')} className="min-h-[100px]" {...form.register("bio")} disabled={isLoading} />
                  {form.formState.errors.bio && <p className="text-sm text-destructive">{tError(form.formState.errors.bio.message)}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('joinMentor.form.button.loading')}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {t('joinMentor.form.button.default')}
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

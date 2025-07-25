
import { SiteHeader } from '@/components/site-header';
import { WhisperAskForm } from '@/components/whisper-ask-form';

export default function WhisperAskPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <WhisperAskForm />
      </main>
    </div>
  );
}

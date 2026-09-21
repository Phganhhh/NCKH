import { ArSection } from '@/components/home/ar-section';
import { ChatbotSection } from '@/components/home/chatbot-section';
import { Hero } from '@/components/home/hero';
import { IntroSection } from '@/components/home/intro-section';
import { SongsPreview } from '@/components/home/songs-preview';
import { getSongs } from '@/lib/api';

export default async function HomePage() {
  const songs = await getSongs();

  return (
    <>
      <Hero />
      <IntroSection />
      <SongsPreview songs={songs} />
      <ArSection />
      <ChatbotSection />
    </>
  );
}

import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CategoryShowcase from '@/components/CategoryShowcase';
import WhatsAppButton from '@/components/WhatsAppButton';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <HeroSection />
      <CategoryShowcase />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

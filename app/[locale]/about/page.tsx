import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import AboutClient from '@/components/AboutClient';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <AboutClient />;
}

import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ContactClient from '@/components/ContactClient';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <ContactClient />;
}

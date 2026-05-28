import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ShopClient from '@/components/ShopClient';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ShopPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <ShopClient />;
}

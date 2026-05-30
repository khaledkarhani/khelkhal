import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import ShopClient from '@/components/ShopClient';

export default function ShopPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
      <ShopClient />
    </Suspense>
  );
}

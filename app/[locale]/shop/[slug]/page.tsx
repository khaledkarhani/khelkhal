import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProductGallery from '@/components/ProductGallery';
import type { Product } from '@/components/ProductCard';
import rawProductsData from '@/data/products.json';
import { routing } from '@/i18n/routing';

const productsData = rawProductsData as Product[];


export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    productsData.map((p) => ({ locale, slug: p.id }))
  );
}

export default async function ProductDetailPage({
  params: { locale, slug },
  searchParams,
}: {
  params: { locale: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('product');
  const ts = await getTranslations('shop');

  const product = productsData.find((p) => p.id === slug);
  if (!product) notFound();

  const colorVariants = product.colorGroup
    ? productsData.filter((p) => p.colorGroup === product.colorGroup)
    : [];

  const name = locale === 'ar' ? product.nameAr : product.nameEn;
  const description = locale === 'ar' ? product.descriptionAr : product.descriptionEn;
  const badge = product.badge === 'New Arrival' ? ts('newArrival') : product.badge === 'Best Seller' ? ts('bestSeller') : null;

  const { headers } = await import('next/headers');
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const productFullUrl = `${protocol}://${host}/${locale}/shop/${product.id}`;

  const whatsappMessage = encodeURIComponent(
    `${locale === 'ar' ? 'مرحباً! أنا مهتم/ة بهذا المنتج:' : "Hi! I'm interested in this product:"} ${productFullUrl}`
  );
  const whatsappUrl = `https://wa.me/96170706918?text=${whatsappMessage}`;

  // Build the "Back to Shop" link with the original filters
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === 'string') params.set(key, value);
  });
  const queryString = params.toString();
  const backToShopHref = queryString
    ? `/${locale}/shop?${queryString}`
    : `/${locale}/shop`;

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            href={backToShopHref}
            className="inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors mb-6"
          >
            <svg
              className="w-5 h-5 rtl:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>{locale === 'ar' ? 'العودة إلى المتجر' : 'Back to Shop'}</span>
          </Link>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href={`/${locale}`} className="hover:text-gold transition-colors">
              {locale === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <span>/</span>
            <Link href={backToShopHref} className="hover:text-gold transition-colors">
              {locale === 'ar' ? 'المتجر' : 'Shop'}
            </Link>
            <span>/</span>
            <span className="text-white/70">{name}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {/* Image Gallery */}
            <div className="relative">
              <ProductGallery
                images={product.images && product.images.length > 0 ? product.images : [product.image]}
                alt={name}
                badge={
                  badge ? (
                    <span
                      className={`text-sm font-medium px-3 py-1.5 rounded-full ${
                        product.badge === 'New Arrival' ? 'bg-gold text-black' : 'bg-white text-black'
                      }`}
                    >
                      {badge}
                    </span>
                  ) : null
                }
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4 leading-tight">
                  {name}
                </h1>
                <div className="w-12 h-px bg-gold mb-6" />
                <p className="text-3xl font-bold text-gold">${product.price}</p>
              </div>

              {colorVariants.length > 1 && (
                <div className="flex items-center gap-2">
                  {colorVariants.map((variant) => {
                    const variantHref = queryString
                      ? `/${locale}/shop/${variant.id}?${queryString}`
                      : `/${locale}/shop/${variant.id}`;
                    const colorLabel = locale === 'ar' ? variant.colorNameAr : variant.colorNameEn;
                    return (
                      <Link
                        key={variant.id}
                        href={variantHref}
                        title={colorLabel}
                        className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition-colors ${
                          variant.id === product.id ? 'border-gold' : 'border-white/20 hover:border-white/50'
                        }`}
                      >
                        <Image src={variant.image} alt={colorLabel ?? ''} fill className="object-cover" unoptimized />
                      </Link>
                    );
                  })}
                </div>
              )}

              <div>
                <h2 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-2">
                  {t('description')}
                </h2>
                <p className="text-white/70 leading-relaxed">{description}</p>
              </div>

              {/* Meta */}
              <div className="space-y-2 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-white/40">{t('category')}:</span>
                  <span className="text-white/80">{product.mainCategory}</span>
                  {product.subCategory && (
                    <>
                      <span className="text-white/30">/</span>
                      <span className="text-white/80">{product.subCategory}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-white/40">{t('gender')}:</span>
                  <span className="text-white/80">{product.gender}</span>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-0.5 text-base"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {t('orderViaWhatsApp')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  oldPrice?: number;
  image: string;
  descriptionAr: string;
  descriptionEn: string;
  mainCategory: string;
  subCategory: string | null;
  gender: string;
  badge: string | null;
  featured: boolean;
  colorGroup?: string;
  colorNameAr?: string;
  colorNameEn?: string;
}

interface ProductCardProps {
  product: Product;
  variants?: Product[];
  index?: number;
}

function ProductCardInner({ product: baseProduct, variants, index = 0 }: ProductCardProps) {
  const t = useTranslations('shop');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [imageError, setImageError] = useState(false);
  const [activeId, setActiveId] = useState(baseProduct.id);

  const colorOptions = variants && variants.length > 1 ? variants : [baseProduct];
  const product = colorOptions.find((p) => p.id === activeId) ?? baseProduct;

  const name = locale === 'ar' ? product.nameAr : product.nameEn;

  const currentParams = searchParams.toString();
  const productHref = currentParams
    ? `/${locale}/shop/${product.id}?${currentParams}`
    : `/${locale}/shop/${product.id}`;

  const productFullUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/${locale}/shop/${product.id}`
      : '';

  const whatsappMessage = encodeURIComponent(
    `${locale === 'ar' ? 'مرحباً! أنا مهتم/ة بهذا المنتج:' : "Hi! I'm interested in this product:"} ${productFullUrl}`
  );
  const whatsappUrl = `https://wa.me/96170706918?text=${whatsappMessage}`;

  const badgeLabel = product.badge === 'New Arrival' ? t('newArrival') : t('bestSeller');

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)
    : 0;

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative bg-[#111] border border-white/5 rounded-xl overflow-hidden hover:border-gold/30 transition-all duration-300"
    >
      {/* Image Container */}
      <Link href={productHref} className="block relative aspect-square overflow-hidden">
        <Image
          src={imageError ? `https://placehold.co/400x400/1a1a1a/C9A84C?text=${encodeURIComponent(name)}` : product.image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImageError(true)}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          unoptimized
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 start-2 z-10">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                product.badge === 'New Arrival'
                  ? 'bg-gold text-black'
                  : 'bg-white text-black'
              }`}
            >
              {badgeLabel}
            </span>
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 end-2 z-10">
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-600 text-white">
              -{discountPercent}%
            </span>
          </div>
        )}

        {/* WhatsApp hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="flex items-center gap-2 bg-[#25D366] text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-[#20ba5a] transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            {t('orderWhatsApp')}
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-3">
        <Link href={productHref}>
          <h3 className="text-sm font-medium text-white/90 hover:text-gold transition-colors line-clamp-2 leading-snug mb-1">
            {name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <p className="text-gold font-semibold text-sm">{`$${product.price}`}</p>
          {hasDiscount && (
            <p className="text-white/40 text-xs line-through">{`$${product.oldPrice}`}</p>
          )}
        </div>

        {colorOptions.length > 1 && (
          <div className="flex items-center gap-1.5 mt-2">
            {colorOptions.map((option) => {
              const colorLabel = locale === 'ar' ? option.colorNameAr : option.colorNameEn;
              return (
                <button
                  key={option.id}
                  type="button"
                  title={colorLabel}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveId(option.id);
                  }}
                  className={`relative w-6 h-6 rounded-full overflow-hidden border-2 transition-colors ${
                    option.id === product.id ? 'border-gold' : 'border-white/20 hover:border-white/50'
                  }`}
                >
                  <Image src={option.image} alt={colorLabel ?? ''} fill className="object-cover" unoptimized />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <Suspense fallback={<div className="bg-[#111] border border-white/5 rounded-xl aspect-[3/4]" />}>
      <ProductCardInner {...props} />
    </Suspense>
  );
}
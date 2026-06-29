'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';

interface ProductGalleryProps {
  images: string[];
  alt: string;
  badge?: React.ReactNode;
}

export default function ProductGallery({ images, alt, badge }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const hasMultiple = images.length > 1;

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#111] border border-white/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIndex]}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Badge */}
        {badge && <div className="absolute top-4 start-4 z-10">{badge}</div>}

        {/* Arrows */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={isRTL ? goNext : goPrev}
              aria-label="Previous image"
              className="absolute top-1/2 start-3 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-gold hover:text-black text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={isRTL ? goPrev : goNext}
              aria-label="Next image"
              className="absolute top-1/2 end-3 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-gold hover:text-black text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                i === activeIndex ? 'border-gold' : 'border-white/5 hover:border-white/20'
              }`}
              aria-label={`Show image ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${alt} ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
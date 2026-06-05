'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import productsData from '@/data/products.json';

type Product = (typeof productsData)[number];

function getRepresentativeImage(
  mainCategory: string,
  subCategory?: string,
  gender?: string
): string {
  let product: Product | undefined;

  if (gender) {
    product = (productsData as Product[]).find(
      (p) => p.mainCategory === mainCategory && p.gender === gender
    );
  } else if (subCategory) {
    product = (productsData as Product[]).find(
      (p) => p.mainCategory === mainCategory && p.subCategory === subCategory
    );
  } else {
    product = (productsData as Product[]).find(
      (p) => p.mainCategory === mainCategory
    );
  }

  if (product?.image) return product.image;

  const text = encodeURIComponent(subCategory ?? gender ?? mainCategory);
  return `https://placehold.co/400x400/1a1a1a/C9A84C?text=${text}`;
}

function buildHref(
  locale: string,
  mainCategory: string,
  subCategory?: string,
  gender?: string
): string {
  const params = new URLSearchParams({ category: mainCategory });
  if (subCategory) params.set('subcategory', subCategory);
  if (gender) params.set('gender', gender);
  return `/${locale}/shop?${params.toString()}`;
}

type CardDef = {
  labelKey: string;
  mainCategory: string;
  subCategory?: string;
  gender?: string;
};

type BlockDef = {
  labelKey: string;
  cards: CardDef[];
};

const CATEGORY_BLOCKS: BlockDef[] = [
  {
    labelKey: 'womensAccessories',
    cards: [
      { labelKey: 'rings',     mainCategory: "Women's Accessories", subCategory: 'Rings'     },
      { labelKey: 'bracelets', mainCategory: "Women's Accessories", subCategory: 'Bracelets' },
      { labelKey: 'necklaces', mainCategory: "Women's Accessories", subCategory: 'Necklaces' },
      { labelKey: 'earrings',  mainCategory: "Women's Accessories", subCategory: 'Earrings'  },
      { labelKey: 'khelkhal',  mainCategory: "Women's Accessories", subCategory: 'Khelkhal'  },
      { labelKey: 'fullSets',  mainCategory: "Women's Accessories", subCategory: 'Full Sets' },
    ],
  },
  {
    labelKey: 'mensAccessories',
    cards: [
      { labelKey: 'rings',     mainCategory: "Men's Accessories", subCategory: 'Rings'     },
      { labelKey: 'bracelets', mainCategory: "Men's Accessories", subCategory: 'Bracelets' },
      { labelKey: 'necklaces', mainCategory: "Men's Accessories", subCategory: 'Necklaces' },
    ],
  },
  {
    labelKey: 'purses',
    cards: [
      { labelKey: 'purses', mainCategory: 'Purses' },
    ],
  },
  {
    labelKey: 'sunglasses',
    cards: [
      { labelKey: 'men',   mainCategory: 'Sunglasses', gender: 'Men'   },
      { labelKey: 'women', mainCategory: 'Sunglasses', gender: 'Women' },
    ],
  },
  {
    labelKey: 'watches',
    cards: [
      { labelKey: 'men',   mainCategory: 'Watches', gender: 'Men'   },
      { labelKey: 'women', mainCategory: 'Watches', gender: 'Women' },
    ],
  },
  {
    labelKey: 'perfumes',
    cards: [
      { labelKey: 'perfume',     mainCategory: 'Perfumes', subCategory: 'Perfume'      },
      { labelKey: 'perfumeSets', mainCategory: 'Perfumes', subCategory: 'Perfume Sets' },
    ],
  },
  {
    labelKey: 'makeupProducts',
    cards: [
      { labelKey: 'makeupProducts', mainCategory: 'Makeup Products' },
    ],
  },
];

export default function CategoryShowcase() {
  const tCat  = useTranslations('categories');
  const tShop = useTranslations('shop');
  const locale = useLocale();

  function getCardLabel(key: string): string {
    if (key === 'men')   return tShop('men');
    if (key === 'women') return tShop('women');
    return tCat(key as Parameters<typeof tCat>[0]);
  }

  return (
    <section className="py-20 px-4 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto space-y-24">
        {CATEGORY_BLOCKS.map((block) => (
          <div key={block.labelKey}>
            {/* Heading */}
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-gold tracking-wide mb-4">
                {tCat(block.labelKey as Parameters<typeof tCat>[0])}
              </h2>
              <div className="w-10 h-px bg-gold mx-auto" />
            </div>

            {/* 2-column grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-5">
              {block.cards.map((card, i) => {
                const image = getRepresentativeImage(
                  card.mainCategory,
                  card.subCategory,
                  card.gender
                );
                const href  = buildHref(locale, card.mainCategory, card.subCategory, card.gender);
                const label = getCardLabel(card.labelKey);

                return (
                  <motion.div
                    key={`${card.mainCategory}-${card.labelKey}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.03 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    <Link href={href} className="group block">
                      <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden transition-colors duration-300 group-hover:border-gold/50 group-hover:shadow-lg group-hover:shadow-gold/10">
                        <div className="relative w-full aspect-square">
                          <Image
                            src={image}
                            alt={label}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 320px"
                          />
                        </div>
                        <div className="py-3 px-2 text-center">
                          <span className="text-white/75 text-sm font-medium group-hover:text-gold transition-colors duration-300">
                            {label}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

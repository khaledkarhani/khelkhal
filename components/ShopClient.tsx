'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import WhatsAppButton from '@/components/WhatsAppButton';
import productsData from '@/data/products.json';

export default function ShopClient() {
  const t = useTranslations('shop');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  
  const globalMin = 0;
  const globalMax = 100;

  // Initialize state from URL params
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedSubCategory, setSelectedSubCategory] = useState(searchParams.get('subcategory') || '');
  const [selectedGender, setSelectedGender] = useState(searchParams.get('gender') || '');
  const [priceMin, setPriceMin] = useState(Number(searchParams.get('priceMin')) || globalMin);
  const [priceMax, setPriceMax] = useState(Number(searchParams.get('priceMax')) || globalMax);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sync filters to the URL whenever they change
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedSubCategory) params.set('subcategory', selectedSubCategory);
    if (selectedGender) params.set('gender', selectedGender);
    if (priceMin !== globalMin) params.set('priceMin', String(priceMin));
    if (priceMax !== globalMax) params.set('priceMax', String(priceMax));

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [search, selectedCategory, selectedSubCategory, selectedGender, priceMin, priceMax, pathname, router]);

  const filteredProducts = useMemo(() => {
    let results = [...productsData];

    results.sort((a, b) => {
      const order = (badge: string | null) =>
        badge === 'New Arrival' ? 0 : badge === 'Best Seller' ? 1 : 2;
      return order(a.badge) - order(b.badge);
    });

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.nameAr.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      results = results.filter((p) => p.mainCategory === selectedCategory);
    }

    if (selectedSubCategory) {
      results = results.filter((p) => p.subCategory === selectedSubCategory);
    }

    if (selectedGender) {
      results = results.filter((p) => p.gender === selectedGender);
    }

    results = results.filter(
      (p) => p.price >= priceMin && p.price <= priceMax
    );

    return results;
  }, [search, selectedCategory, selectedSubCategory, selectedGender, priceMin, priceMax]);

  const handleClear = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSelectedGender('');
    setPriceMin(globalMin);
    setPriceMax(globalMax);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-white mb-3">{t('title')}</h1>
            <div className="w-16 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="flex gap-6">
            {/* Desktop Filter Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <FilterSidebar
                  search={search}
                  setSearch={setSearch}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedSubCategory={selectedSubCategory}
                  setSelectedSubCategory={setSelectedSubCategory}
                  selectedGender={selectedGender}
                  setSelectedGender={setSelectedGender}
                  minPrice={globalMin}
                  maxPrice={globalMax}
                  priceMin={priceMin}
                  priceMax={priceMax}
                  setPriceMin={setPriceMin}
                  setPriceMax={setPriceMax}
                  onClear={handleClear}
                />
              </div>
            </aside>

            {/* Products Area */}
            <div className="flex-1 min-w-0">
              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 border border-gold/30 text-gold px-4 py-2 rounded-full text-sm font-medium hover:bg-gold/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                  {t('filters')}
                </button>
              </div>

              {/* Mobile Filter Panel */}
              {isFilterOpen && (
                <div className="lg:hidden mb-6">
                  <FilterSidebar
                    search={search}
                    setSearch={setSearch}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedSubCategory={selectedSubCategory}
                    setSelectedSubCategory={setSelectedSubCategory}
                    selectedGender={selectedGender}
                    setSelectedGender={setSelectedGender}
                    minPrice={globalMin}
                    maxPrice={globalMax}
                    priceMin={priceMin}
                    priceMax={priceMax}
                    setPriceMin={setPriceMin}
                    setPriceMax={setPriceMax}
                    onClear={handleClear}
                  />
                </div>
              )}

              {/* Results Count */}
              <p className="text-white/40 text-sm mb-4">
                {filteredProducts.length} {locale === 'ar' ? 'منتج' : 'products'}
              </p>

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                  {filteredProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-white/40 text-lg">{t('noProducts')}</p>
                  <button
                    onClick={handleClear}
                    className="mt-4 text-gold text-sm underline hover:no-underline"
                  >
                    {t('clearFilters')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}

'use client';

import { useTranslations, useLocale } from 'next-intl';

const MAIN_CATEGORIES = [
  "Women's Accessories",
  "Men's Accessories",
  "Purses",
  "Sunglasses",
  "Makeup Products",
  "Watches",
  "Perfumes",
];

const SUB_CATEGORIES: Record<string, string[]> = {
  "Women's Accessories": ["Rings", "Bracelets", "Necklaces", "Earrings", "Khelkhal", "Full Sets"],
  "Men's Accessories": ["Rings", "Bracelets", "Necklaces"],
  "Perfumes": ["Perfume", "Perfume Sets"],
};

const GENDERS = ["Men", "Women", "Unisex"];

interface FilterSidebarProps {
  search: string;
  setSearch: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedSubCategory: string;
  setSelectedSubCategory: (v: string) => void;
  selectedGender: string;
  setSelectedGender: (v: string) => void;
  minPrice: number;
  maxPrice: number;
  priceMin: number;
  priceMax: number;
  setPriceMin: (v: number) => void;
  setPriceMax: (v: number) => void;
  onClear: () => void;
}

const categoryTranslations: Record<string, string> = {
  "Women's Accessories": "womensAccessories",
  "Men's Accessories": "mensAccessories",
  "Purses": "purses",
  "Sunglasses": "sunglasses",
  "Makeup Products": "makeupProducts",
  "Watches": "watches",
  "Perfumes": "perfumes",
  "Rings": "rings",
  "Bracelets": "bracelets",
  "Necklaces": "necklaces",
  "Earrings": "earrings",
  "Khelkhal": "khelkhal",
  "Full Sets": "fullSets",
  "Perfume": "perfume",
  "Perfume Sets": "perfumeSets",
};

export default function FilterSidebar({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  selectedGender,
  setSelectedGender,
  minPrice,
  maxPrice,
  priceMin,
  priceMax,
  setPriceMin,
  setPriceMax,
  onClear,
}: FilterSidebarProps) {
  const t = useTranslations('shop');
  const tc = useTranslations('categories');
  const locale = useLocale();

  const subCategories = selectedCategory ? (SUB_CATEGORIES[selectedCategory] || []) : [];

  const getCategoryLabel = (cat: string) => {
    const key = categoryTranslations[cat];
    return key ? tc(key as Parameters<typeof tc>[0]) : cat;
  };

  return (
    <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-5 space-y-6">
      {/* Search */}
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('search')}
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-medium text-gold/80 uppercase tracking-wider mb-3">
          {t('category')}
        </label>
        <div className="space-y-1">
          <button
            onClick={() => { setSelectedCategory(''); setSelectedSubCategory(''); }}
            className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedCategory === '' ? 'bg-gold/20 text-gold' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {t('allCategories')}
          </button>
          {MAIN_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setSelectedSubCategory(''); }}
              className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat ? 'bg-gold/20 text-gold' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategory */}
      {subCategories.length > 0 && (
        <div>
          <label className="block text-xs font-medium text-gold/80 uppercase tracking-wider mb-3">
            {t('subcategory')}
          </label>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedSubCategory('')}
              className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedSubCategory === '' ? 'bg-gold/20 text-gold' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {t('allSubcategories')}
            </button>
            {subCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedSubCategory === sub ? 'bg-gold/20 text-gold' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {getCategoryLabel(sub)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Gender */}
      <div>
        <label className="block text-xs font-medium text-gold/80 uppercase tracking-wider mb-3">
          {t('gender')}
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedGender('')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedGender === '' ? 'bg-gold text-black' : 'border border-white/20 text-white/60 hover:border-gold/50 hover:text-white'
            }`}
          >
            {t('allGenders')}
          </button>
          {GENDERS.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGender(g)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedGender === g ? 'bg-gold text-black' : 'border border-white/20 text-white/60 hover:border-gold/50 hover:text-white'
              }`}
            >
              {g === 'Men' ? t('men') : g === 'Women' ? t('women') : t('unisex')}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-medium text-gold/80 uppercase tracking-wider mb-3">
          {t('priceRange')}
        </label>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>${priceMin}</span>
            <span>${priceMax}</span>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceMin}
              onChange={(e) => setPriceMin(Math.min(Number(e.target.value), priceMax - 1))}
              className="w-full accent-gold"
            />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceMax}
              onChange={(e) => setPriceMax(Math.max(Number(e.target.value), priceMin + 1))}
              className="w-full accent-gold"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <span className="text-xs text-white/40">{t('min')}</span>
              <input
                type="number"
                value={priceMin}
                min={minPrice}
                max={priceMax}
                onChange={(e) => setPriceMin(Number(e.target.value))}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:border-gold/50 mt-1"
              />
            </div>
            <div className="flex-1">
              <span className="text-xs text-white/40">{t('max')}</span>
              <input
                type="number"
                value={priceMax}
                min={priceMin}
                max={maxPrice}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:border-gold/50 mt-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={onClear}
        className="w-full border border-gold/30 text-gold hover:bg-gold hover:text-black text-sm font-medium py-2.5 rounded-xl transition-colors"
      >
        {t('clearFilters')}
      </button>
    </div>
  );
}

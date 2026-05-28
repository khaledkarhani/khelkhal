'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

export default function AboutClient() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
        <motion.div {...fadeUp} className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block text-gold/70 text-xs tracking-widest uppercase border border-gold/30 px-4 py-1 rounded-full mb-6">
            KhelKhal | خلخال
          </span>
          <h1 className="text-4xl md:text-6xl font-semibold text-white mb-4">{t('title')}</h1>
          <div className="w-16 h-px bg-gold mx-auto" />
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Decorative Visual */}
            <motion.div
              {...fadeUp}
              className="relative h-96 rounded-2xl overflow-hidden bg-[#111] border border-gold/10"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full border border-gold/20 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gold/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0v18M3 12h18" />
                    </svg>
                  </div>
                  <p className="text-gold/30 text-lg tracking-[0.3em] uppercase">Khelkhal</p>
                  <p className="text-white/15 text-3xl font-light">خلخال</p>
                </div>
              </div>
              <div className="absolute top-4 start-4 w-8 h-8 border-t-2 border-s-2 border-gold/20 rounded-tl-lg" />
              <div className="absolute top-4 end-4 w-8 h-8 border-t-2 border-e-2 border-gold/20 rounded-tr-lg" />
              <div className="absolute bottom-4 start-4 w-8 h-8 border-b-2 border-s-2 border-gold/20 rounded-bl-lg" />
              <div className="absolute bottom-4 end-4 w-8 h-8 border-b-2 border-e-2 border-gold/20 rounded-br-lg" />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: locale === 'ar' ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-white">{t('subtitle')}</h2>
              <div className="w-10 h-px bg-gold" />
              <p className="text-white/70 leading-relaxed">{t('story')}</p>
              <p className="text-white/70 leading-relaxed">{t('story2')}</p>
              <p className="text-white/70 leading-relaxed">{t('story3')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">{t('values.title')}</h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
                title: t('values.quality'),
                desc: t('values.qualityDesc'),
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                title: t('values.elegance'),
                desc: t('values.eleganceDesc'),
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: t('values.service'),
                desc: t('values.serviceDesc'),
              },
            ].map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-[#111] border border-white/5 rounded-2xl p-8 text-center hover:border-gold/20 transition-colors"
              >
                <div className="text-gold mb-4 flex justify-center">{val.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{val.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}

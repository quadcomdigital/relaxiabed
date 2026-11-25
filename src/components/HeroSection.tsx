import { ArrowRight, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { TRUST_PILLARS } from '../data/sleepSystems';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onExploreCollection: () => void;
  onStartConsultant: () => void;
}

export function HeroSection({ onExploreCollection, onStartConsultant }: HeroSectionProps) {
  return (
    <section id="top" className="bg-[#FAF9F6] pb-8 md:pb-12">
      <div className="relative min-h-[76vh] lg:min-h-[84vh] flex items-end overflow-hidden bg-[#0B0B0B]">
        <motion.div
          initial={{ scale: 1.04, opacity: 0.92 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <ResilientImage
            src="/src/assets/images/hero_relaxia_bedroom_1795597626013.jpg"
            alt="Camera da letto minimalista illuminata dalla luce del mattino con letto Relaxia"
            fallbackTitle="Relaxia — Sistemi del Buon Riposo"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/92 via-[#0B0B0B]/48 to-[#0B0B0B]/22"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/60 via-transparent to-transparent"
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-20 pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h1
              style={{ fontSize: 'clamp(2.5rem, 4.8vw, 4.35rem)' }}
              className="font-serif font-medium leading-[1.05] tracking-tight text-white text-balance"
            >
              Il silenzio di un <em className="italic font-normal text-[#E3E1DB]">buon riposo</em>,
              cucito intorno alla tua schiena.
            </h1>

            <p className="mt-5 text-base md:text-lg leading-relaxed text-[#E3E1DB] max-w-lg">
              Materassi artigianali, reti ergonomiche e fibre naturali per svegliarti davvero
              rigenerato.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreCollection}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-[#FAF9F6] hover:bg-[#E3E1DB] text-[#0B0B0B] text-sm font-medium shadow-lg transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Esplora la Collezione</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.7} />
              </button>

              <button
                type="button"
                onClick={onStartConsultant}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/35 backdrop-blur-md text-sm font-medium transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Compass className="w-4 h-4" strokeWidth={1.7} />
                <span>Fatti Guidare nella Scelta</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Overlapping Architectural Pillars Dock */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 -mt-12 md:-mt-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-[#111111]/12 rounded-xl editorial-shadow p-6 md:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-[#111111]/10">
            {TRUST_PILLARS.map((pillar) => (
              <div key={pillar.number} className="lg:px-7 first:lg:pl-0 last:lg:pr-0">
                <span className="text-xs font-semibold text-[#595753] tabular-nums">
                  {pillar.number}
                </span>
                <h2 className="mt-1 font-serif text-xl font-medium text-[#111111] leading-tight">
                  {pillar.title}
                </h2>
                <p className="mt-1 text-xs text-[#595753]">{pillar.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

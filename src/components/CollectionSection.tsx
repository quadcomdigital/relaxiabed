import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import {
  SLEEP_SYSTEMS,
  type MattressCategory,
  type SleepSystem
} from '../data/sleepSystems';
import { ResilientImage } from './ResilientImage';

interface CollectionSectionProps {
  activeFilter: 'all' | MattressCategory;
  onFilterChange: (filter: 'all' | MattressCategory) => void;
  onRequestInfo: (systemId: string) => void;
}

const FILTER_OPTIONS: { value: 'all' | MattressCategory; label: string }[] = [
  { value: 'all', label: 'Tutti i Sistemi' },
  { value: 'memory', label: 'Memory Ergonomico' },
  { value: 'lattice', label: 'Natura & Lattice' },
  { value: 'ibrido', label: 'Ibrido Molle e Memory' }
];

function SystemCard({
  system,
  index,
  onRequestInfo
}: {
  system: SleepSystem;
  index: number;
  onRequestInfo: (id: string) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col bg-white border border-[#111111]/10 rounded-xl overflow-hidden editorial-shadow transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_64px_-18px_rgba(11,11,11,0.22)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E3E1DB]">
        <ResilientImage
          src={system.image}
          alt={system.imageAlt}
          fallbackTitle={system.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"
        />
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
          <span className="font-serif italic text-lg leading-none drop-shadow-sm">
            {system.lineName}
          </span>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-7 flex flex-col justify-between gap-6">
        <div>
          <h3 className="font-serif text-3xl font-medium text-[#111111] leading-snug">
            {system.name}
          </h3>
          <p className="mt-1.5 text-sm text-[#595753] leading-relaxed">{system.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={() => onRequestInfo(system.id)}
          className="w-full inline-flex items-center justify-between px-4 py-3 rounded-md bg-[#F1F0EC] hover:bg-[#111111] border border-[#111111]/12 hover:border-[#111111] text-sm font-medium text-[#111111] hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
        >
          <span>Richiedi prova o dettagli</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.7} />
        </button>
      </div>
    </motion.article>
  );
}

export function CollectionSection({
  activeFilter,
  onFilterChange,
  onRequestInfo
}: CollectionSectionProps) {
  const filteredSystems =
    activeFilter === 'all'
      ? SLEEP_SYSTEMS
      : SLEEP_SYSTEMS.filter((item) => item.slug === activeFilter);

  return (
    <section id="collezione" className="py-20 md:py-24 bg-[#FAF9F6] linen-texture">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-[#111111]/12">
          <h2
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            className="font-serif font-medium text-[#111111] leading-[1.08]"
          >
            I Sistemi del <em className="italic font-normal">Buon Riposo</em>
          </h2>

          <div
            role="tablist"
            aria-label="Filtra per linea di materassi"
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F1F0EC] border border-[#111111]/12 rounded-lg self-start lg:self-auto shadow-sm"
          >
            {FILTER_OPTIONS.map((option) => {
              const selected = activeFilter === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => onFilterChange(option.value)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#111111] ${
                    selected
                      ? 'bg-[#111111] text-white shadow-sm'
                      : 'text-[#595753] hover:text-[#111111]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`mt-10 grid gap-8 ${
            filteredSystems.length === 1
              ? 'grid-cols-1 max-w-xl'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredSystems.map((system, idx) => (
            <SystemCard
              key={system.id}
              system={system}
              index={idx}
              onRequestInfo={onRequestInfo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

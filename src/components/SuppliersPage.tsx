import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { SUPPLIER_BRANDS } from '../data/suppliers';

interface SuppliersPageProps {
  onBackHome: () => void;
}

function BrandLogoMark({ index, monogram }: { index: number; monogram: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="w-10 h-10 text-[#111111]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      {index % 4 === 0 && (
        <>
          <rect x="8" y="8" width="32" height="32" rx="4" />
          <line x1="8" y1="24" x2="40" y2="24" />
        </>
      )}
      {index % 4 === 1 && (
        <>
          <circle cx="24" cy="24" r="16" />
          <circle cx="24" cy="24" r="7" />
        </>
      )}
      {index % 4 === 2 && (
        <>
          <polygon points="24,7 41,37 7,37" />
          <line x1="15" y1="27" x2="33" y2="27" />
        </>
      )}
      {index % 4 === 3 && (
        <>
          <rect x="10" y="10" width="28" height="28" rx="14" />
          <line x1="24" y1="10" x2="24" y2="38" />
        </>
      )}
      <title>{monogram}</title>
    </svg>
  );
}

export function SuppliersPage({ onBackHome }: SuppliersPageProps) {
  return (
    <div className="bg-[#FAF9F6] linen-texture min-h-[75vh]">
      <section className="bg-[#0B0B0B] text-white py-14 md:py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#C9C6BF] hover:text-white transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.7} />
            <span>Torna alla Home</span>
          </button>

          <h1
            style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
            className="font-serif font-medium leading-[1.06] text-white"
          >
            I Nostri <em className="italic font-normal text-[#D4D2CC]">Fornitori</em>
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {SUPPLIER_BRANDS.map((brand, idx) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-[4/3] rounded-xl bg-white border border-[#111111]/12 editorial-shadow flex flex-col items-center justify-center gap-3.5 p-6 transition-transform duration-200 hover:-translate-y-1"
              >
                <BrandLogoMark index={idx} monogram={brand.monogram} />
                <span className="font-serif text-xl font-medium text-[#111111] tracking-wide">
                  {brand.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

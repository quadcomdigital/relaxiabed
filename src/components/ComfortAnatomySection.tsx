import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { COMFORT_ANATOMY_ELEMENTS } from '../data/sleepSystems';
import { ResilientImage } from './ResilientImage';

export function ComfortAnatomySection() {
  const [activeElementId, setActiveElementId] = useState(COMFORT_ANATOMY_ELEMENTS[0].id);

  const activeElement =
    COMFORT_ANATOMY_ELEMENTS.find((el) => el.id === activeElementId) ??
    COMFORT_ANATOMY_ELEMENTS[0];

  return (
    <section id="comfort" className="py-20 md:py-28 bg-[#FAF9F6] linen-texture">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="relative min-h-[300px] lg:min-h-[360px] rounded-2xl overflow-hidden bg-[#E3E1DB] border border-[#111111]/12 editorial-shadow">
              <ResilientImage
                src="/src/assets/images/anatomy_comfort_craftsmanship_1795597627252.jpg"
                alt="Dettaglio artigianale Relaxia: strati naturali in lino, schiuma traspirante, rete a doghe in faggio e guanciale cervicale"
                fallbackTitle="Anatomia del Comfort"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div
              role="tablist"
              aria-label="Componenti del sistema riposo"
              className="space-y-2.5"
            >
              {[
                COMFORT_ANATOMY_ELEMENTS[2],
                COMFORT_ANATOMY_ELEMENTS[0],
                COMFORT_ANATOMY_ELEMENTS[1]
              ].map((layer) => {
                const isActive = layer.id === activeElement.id;
                return (
                  <motion.button
                    key={layer.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveElementId(layer.id)}
                    animate={{ x: isActive ? 6 : 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full flex items-center justify-between gap-4 px-5 py-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#111111] border-[#111111] text-white shadow-md'
                        : 'bg-white border-[#111111]/12 text-[#111111] hover:bg-[#F1F0EC]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`text-xs font-semibold tabular-nums shrink-0 ${
                          isActive ? 'text-[#D4D2CC]' : 'text-[#595753]'
                        }`}
                      >
                        {layer.index}
                      </span>
                      <span className="text-sm font-medium truncate">{layer.title}</span>
                    </div>
                    <span
                      className={`text-xs shrink-0 ${
                        isActive ? 'text-[#D4D2CC]' : 'text-[#595753]'
                      }`}
                    >
                      {layer.shortLabel}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            <h2
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              className="font-serif font-medium text-[#111111] leading-[1.08] text-balance"
            >
              Anatomia del <em className="italic font-normal">Comfort</em>
            </h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeElement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 flex flex-col justify-between p-7 md:p-9 rounded-2xl bg-[#F1F0EC] border border-[#111111]/12 editorial-shadow"
              >
                <div>
                  <span className="text-xs font-semibold text-[#595753] tabular-nums">
                    {activeElement.index} · {activeElement.shortLabel}
                  </span>
                  <h3 className="mt-2 font-serif text-3xl font-medium text-[#111111]">
                    {activeElement.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[#595753]">
                    {activeElement.description}
                  </p>
                </div>

                <ul className="mt-7 pt-6 border-t border-[#111111]/12 space-y-2.5 text-sm text-[#111111]">
                  {activeElement.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

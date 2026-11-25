import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { SLEEP_SYSTEMS, type SleepSystem } from '../data/sleepSystems';
import { ResilientImage } from './ResilientImage';

interface SleepConsultantSectionProps {
  onBookWithRecommendation: (systemId: string, summaryNote: string) => void;
}

interface ConsultantOption {
  id: string;
  label: string;
  hint: string;
  weights: {
    'quiete-memory': number;
    'alba-lattice': number;
    'armonia-ibrido': number;
  };
}

interface ConsultantStep {
  number: string;
  title: string;
  prompt: string;
  options: ConsultantOption[];
}

const CONSULTANT_STEPS: ConsultantStep[] = [
  {
    number: '01',
    title: 'Posizione',
    prompt: 'In quale posizione dormi abitualmente?',
    options: [
      {
        id: 'fianco',
        label: 'Sul fianco',
        hint: 'Accoglienza su spalle e bacino',
        weights: { 'quiete-memory': 4, 'alba-lattice': 2, 'armonia-ibrido': 1 }
      },
      {
        id: 'supino',
        label: 'Supino',
        hint: 'Equilibrio lombare costante',
        weights: { 'quiete-memory': 2, 'alba-lattice': 3, 'armonia-ibrido': 3 }
      },
      {
        id: 'prono',
        label: 'Prono',
        hint: 'Piano stabile e sostenuto',
        weights: { 'quiete-memory': 0, 'alba-lattice': 2, 'armonia-ibrido': 4 }
      },
      {
        id: 'variabile',
        label: 'Cambio spesso posizione',
        hint: 'Risposta elastica immediata',
        weights: { 'quiete-memory': 1, 'alba-lattice': 4, 'armonia-ibrido': 2 }
      }
    ]
  },
  {
    number: '02',
    title: 'Sostegno',
    prompt: 'Che sensazione preferisci sul materasso?',
    options: [
      {
        id: 'avvolgente',
        label: 'Avvolgente',
        hint: 'Contatto morbido e graduale',
        weights: { 'quiete-memory': 4, 'alba-lattice': 1, 'armonia-ibrido': 1 }
      },
      {
        id: 'equilibrato',
        label: 'Equilibrato',
        hint: 'Giusto mezzo tra accoglienza e spinta',
        weights: { 'quiete-memory': 2, 'alba-lattice': 4, 'armonia-ibrido': 2 }
      },
      {
        id: 'sostenuto',
        label: 'Sostenuto',
        hint: 'Base compatta ed ergonomica',
        weights: { 'quiete-memory': 0, 'alba-lattice': 2, 'armonia-ibrido': 4 }
      }
    ]
  },
  {
    number: '03',
    title: 'Esigenze',
    prompt: 'Qual è la tua priorità principale?',
    options: [
      {
        id: 'schiena',
        label: 'Mal di schiena o lombalgia',
        hint: 'Decompressione vertebrale',
        weights: { 'quiete-memory': 4, 'alba-lattice': 2, 'armonia-ibrido': 3 }
      },
      {
        id: 'calore',
        label: 'Soffro il caldo notturno',
        hint: 'Fibre naturali traspiranti',
        weights: { 'quiete-memory': 1, 'alba-lattice': 4, 'armonia-ibrido': 3 }
      },
      {
        id: 'cervicale',
        label: 'Tensioni a spalle e collo',
        hint: 'Riduzione dei punti di pressione',
        weights: { 'quiete-memory': 4, 'alba-lattice': 3, 'armonia-ibrido': 1 }
      },
      {
        id: 'prevenzione',
        label: 'Nessun disturbo specifico',
        hint: 'Qualità e durata nel tempo',
        weights: { 'quiete-memory': 2, 'alba-lattice': 3, 'armonia-ibrido': 3 }
      }
    ]
  },
  {
    number: '04',
    title: 'Utilizzo',
    prompt: 'Chi utilizzerà il materasso?',
    options: [
      {
        id: 'singolo',
        label: 'Riposo individuale',
        hint: 'Calibrato su una persona',
        weights: { 'quiete-memory': 3, 'alba-lattice': 3, 'armonia-ibrido': 2 }
      },
      {
        id: 'coppia-simile',
        label: 'In coppia, abitudini simili',
        hint: 'Distribuzione uniforme del peso',
        weights: { 'quiete-memory': 2, 'alba-lattice': 3, 'armonia-ibrido': 3 }
      },
      {
        id: 'coppia-diversa',
        label: 'In coppia, corporature diverse',
        hint: 'Isolamento dei movimenti',
        weights: { 'quiete-memory': 2, 'alba-lattice': 1, 'armonia-ibrido': 4 }
      }
    ]
  }
];

function computeRecommendedSystem(answers: Record<number, string>): SleepSystem {
  const scores: Record<string, number> = {
    'quiete-memory': 0,
    'alba-lattice': 0,
    'armonia-ibrido': 0
  };

  CONSULTANT_STEPS.forEach((step, idx) => {
    const selectedId = answers[idx];
    const option = step.options.find((opt) => opt.id === selectedId);
    if (option) {
      scores['quiete-memory'] += option.weights['quiete-memory'];
      scores['alba-lattice'] += option.weights['alba-lattice'];
      scores['armonia-ibrido'] += option.weights['armonia-ibrido'];
    }
  });

  const bestId = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'quiete-memory';
  return SLEEP_SYSTEMS.find((s) => s.id === bestId) ?? SLEEP_SYSTEMS[0];
}

export function SleepConsultantSection({
  onBookWithRecommendation
}: SleepConsultantSectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const stepData = CONSULTANT_STEPS[currentStep];
  const selectedOptionId = answers[currentStep];

  const handleSelectOption = (optionId: string) => {
    const updatedAnswers = { ...answers, [currentStep]: optionId };
    setAnswers(updatedAnswers);

    if (currentStep < CONSULTANT_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const recommendedSystem = computeRecommendedSystem(answers);

  const answerSummaryText = CONSULTANT_STEPS.map((step, idx) => {
    const opt = step.options.find((o) => o.id === answers[idx]);
    return opt ? `${step.title}: ${opt.label}` : '';
  })
    .filter(Boolean)
    .join(' · ');

  return (
    <section
      id="consulente"
      className="relative py-20 md:py-28 bg-[#0B0B0B] text-white overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 w-[520px] h-[520px] rounded-full bg-white/5 blur-3xl"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <h2
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            className="font-serif font-medium text-white leading-[1.08] text-balance"
          >
            Consulente del <em className="italic font-normal text-[#D4D2CC]">Sonno</em>
          </h2>
          <p className="mt-2 text-sm md:text-base text-[#C9C6BF]">
            Quattro risposte per trovare il tuo materasso ideale.
          </p>
        </div>

        <div className="bg-[#FAF9F6] text-[#111111] rounded-2xl shadow-[0_32px_80px_-20px_rgba(0,0,0,0.65)] p-6 sm:p-9 md:p-10">
          {!isCompleted ? (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#111111]/10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-[#111111] tabular-nums">
                    {currentStep + 1} / {CONSULTANT_STEPS.length}
                  </span>
                  <span aria-hidden="true" className="text-[#111111]/25">
                    ·
                  </span>
                  <span className="text-sm font-medium text-[#595753]">{stepData.title}</span>
                </div>

                <div className="grid grid-cols-4 gap-2 w-full sm:w-48" aria-hidden="true">
                  {CONSULTANT_STEPS.map((step, idx) => (
                    <span
                      key={step.number}
                      className={`h-1.5 rounded-full transition-colors duration-200 ${
                        idx <= currentStep ? 'bg-[#111111]' : 'bg-[#E3E1DB]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-7"
                >
                  <h3 className="font-serif text-2xl md:text-3xl font-medium text-[#111111] leading-snug">
                    {stepData.prompt}
                  </h3>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {stepData.options.map((option) => {
                      const isSelected = selectedOptionId === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleSelectOption(option.id)}
                          className={`group p-4 sm:p-5 rounded-xl border text-left transition-all duration-150 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#111111] ${
                            isSelected
                              ? 'bg-[#111111] border-[#111111] text-white'
                              : 'bg-[#F1F0EC]/75 border-[#111111]/12 hover:bg-[#F1F0EC] hover:border-[#111111]/30'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span
                              className={`text-base font-semibold ${
                                isSelected ? 'text-white' : 'text-[#111111]'
                              }`}
                            >
                              {option.label}
                            </span>
                            <ArrowRight
                              className={`w-4 h-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 ${
                                isSelected ? 'text-white' : 'text-[#111111]'
                              }`}
                              strokeWidth={1.8}
                            />
                          </div>
                          <p
                            className={`mt-1 text-xs ${
                              isSelected ? 'text-[#D4D2CC]' : 'text-[#595753]'
                            }`}
                          >
                            {option.hint}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-7 pt-5 border-t border-[#111111]/10 flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#595753] hover:text-[#111111] disabled:opacity-35 disabled:pointer-events-none cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.7} />
                  <span>Indietro</span>
                </button>

                {Object.keys(answers).length > 0 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#595753] hover:text-[#111111] cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.7} />
                    <span>Ricomincia</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#111111]/10">
                <div>
                  <span className="text-xs font-semibold text-[#595753]">
                    Sistema Consigliato
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl font-medium text-[#111111] mt-0.5">
                    {recommendedSystem.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[#111111]/15 text-xs font-medium text-[#111111] hover:bg-[#F1F0EC] transition-colors self-start sm:self-auto cursor-pointer whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.7} />
                  <span>Ripeti</span>
                </button>
              </div>

              <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
                <div className="lg:col-span-5 rounded-xl overflow-hidden bg-[#E3E1DB] aspect-[4/3] lg:aspect-auto shadow-md">
                  <ResilientImage
                    src={recommendedSystem.image}
                    alt={recommendedSystem.imageAlt}
                    fallbackTitle={recommendedSystem.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-[#595753]">
                      {recommendedSystem.lineName}
                    </span>
                    <p className="text-base leading-relaxed text-[#111111]">
                      {recommendedSystem.ergonomicProfile}
                    </p>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        onBookWithRecommendation(recommendedSystem.id, answerSummaryText)
                      }
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#111111] hover:bg-[#262626] text-white text-sm font-medium shadow-md transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Prenota prova</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={1.7} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

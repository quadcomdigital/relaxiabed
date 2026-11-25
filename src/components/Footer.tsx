import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigateLanding: (sectionId?: string) => void;
  onNavigateSuppliers: () => void;
}

export function Footer({ onNavigateLanding, onNavigateSuppliers }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (event: FormEvent) => {
    event.preventDefault();
    setNewsletterError(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(newsletterEmail.trim())) {
      setNewsletterError('Inserisci un indirizzo email valido.');
      return;
    }

    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#0B0B0B] text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/12">
          <div className="md:col-span-5 space-y-4">
            <div className="relative w-52 h-16 overflow-hidden">
              <img
                src="/assets/aistudio/image_a67fcc41.png"
                alt="Relaxia — Sistemi del Buon Riposo"
                className="w-52 h-52 max-w-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.65] mix-blend-screen pointer-events-none select-none"
              />
            </div>
            <p className="text-xs text-[#A8A59E] leading-relaxed">
              Dispositivo Medico Classe 1 CE · OEKO-TEX® Standard 100 · Fatto in Italia
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-sm text-[#C9C6BF]">
            <button
              type="button"
              onClick={() => onNavigateLanding('top')}
              className="block hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={onNavigateSuppliers}
              className="block hover:text-white transition-colors cursor-pointer"
            >
              Fornitori
            </button>
            <button
              type="button"
              onClick={() => onNavigateLanding('contatti')}
              className="block hover:text-white transition-colors cursor-pointer"
            >
              Partinico &amp; Contatti
            </button>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="text-sm font-medium text-white">Consigli sul buon riposo</h3>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 text-sm text-white bg-white/10 px-4 py-2.5 rounded-md border border-white/15">
                <Check className="w-4 h-4 text-white shrink-0" strokeWidth={2} />
                <span>Iscrizione confermata.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} noValidate className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <label htmlFor="footer-newsletter" className="sr-only">
                    Indirizzo email per la newsletter
                  </label>
                  <input
                    id="footer-newsletter"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="La tua email"
                    className="flex-1 px-3.5 py-2.5 rounded-md bg-white/8 border border-white/18 text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-white/55"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md bg-[#FAF9F6] hover:bg-[#E3E1DB] text-[#0B0B0B] text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Iscriviti</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.7} />
                  </button>
                </div>
                {newsletterError && (
                  <p role="alert" className="text-xs text-[#E8B4B4]">
                    {newsletterError}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#8E8B84]">
          <p>© {new Date().getFullYear()} Relaxia · Corso dei Mille 148, Partinico (PA)</p>
          <p>100 Notti di Prova · Garanzia 12 Anni</p>
        </div>
      </div>
    </footer>
  );
}

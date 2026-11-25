import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type ActivePage = 'landing' | 'fornitori';

interface NavbarProps {
  activePage: ActivePage;
  onNavigateLanding: (sectionId?: string) => void;
  onNavigateSuppliers: () => void;
}

export function Navbar({
  activePage,
  onNavigateLanding,
  onNavigateSuppliers
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleGoHome = () => {
    setMobileOpen(false);
    onNavigateLanding('top');
  };

  const handleGoSuppliers = () => {
    setMobileOpen(false);
    onNavigateSuppliers();
  };

  const handleGoContacts = () => {
    setMobileOpen(false);
    onNavigateLanding('contatti');
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#0B0B0B]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Uploaded Relaxia Logo */}
        <button
          type="button"
          onClick={handleGoHome}
          aria-label="Relaxia — Torna alla Home"
          className="relative w-44 h-12 overflow-hidden shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <img
            src="/assets/aistudio/image_a67fcc41.png"
            alt="Relaxia — Sistemi del Buon Riposo"
            className="w-44 h-44 max-w-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.65] mix-blend-screen pointer-events-none select-none"
          />
        </button>

        {/* Zone 2: Minimal navigation without Collezione, Consulente, Comfort, Storie */}
        <nav
          aria-label="Navigazione principale"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#C9C6BF]"
        >
          <button
            type="button"
            onClick={handleGoHome}
            className={`py-1 border-b transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
              activePage === 'landing'
                ? 'text-white border-white'
                : 'text-[#C9C6BF] border-transparent hover:text-white hover:border-white'
            }`}
          >
            Home
          </button>

          <button
            type="button"
            onClick={handleGoSuppliers}
            className={`py-1 border-b transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
              activePage === 'fornitori'
                ? 'text-white border-white'
                : 'text-[#C9C6BF] border-transparent hover:text-white hover:border-white'
            }`}
          >
            Fornitori
          </button>

          <button
            type="button"
            onClick={handleGoContacts}
            className="py-1 text-[#C9C6BF] hover:text-white border-b border-transparent hover:border-white transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Contatti
          </button>
        </nav>

        {/* Zone 3: Single primary CTA + mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleGoContacts}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-[#0B0B0B] bg-[#FAF9F6] hover:bg-[#E3E1DB] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Prenota Consulenza
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Chiudi menu di navigazione' : 'Apri menu di navigazione'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" strokeWidth={1.6} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.6} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0B0B0B] border-b border-white/10 px-6 py-5 space-y-4">
          <nav aria-label="Navigazione mobile" className="flex flex-col gap-1">
            <button
              type="button"
              onClick={handleGoHome}
              className="py-2.5 text-left text-base font-medium text-[#FAF9F6] border-b border-white/10 cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={handleGoSuppliers}
              className="py-2.5 text-left text-base font-medium text-[#FAF9F6] border-b border-white/10 cursor-pointer"
            >
              Fornitori
            </button>
            <button
              type="button"
              onClick={handleGoContacts}
              className="py-2.5 text-left text-base font-medium text-[#FAF9F6] cursor-pointer"
            >
              Contatti
            </button>
          </nav>
          <button
            type="button"
            onClick={handleGoContacts}
            className="w-full py-3 px-5 text-sm font-medium text-[#0B0B0B] bg-[#FAF9F6] hover:bg-[#E3E1DB] rounded-md transition-colors cursor-pointer"
          >
            Prenota Consulenza
          </button>
        </div>
      )}
    </header>
  );
}

import { useState } from 'react';
import { CollectionSection } from './components/CollectionSection';
import { ComfortAnatomySection } from './components/ComfortAnatomySection';
import { ConsultationSection } from './components/ConsultationSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar, type ActivePage } from './components/Navbar';
import { SleepConsultantSection } from './components/SleepConsultantSection';
import { SuppliersPage } from './components/SuppliersPage';
import { TestimonialsSection } from './components/TestimonialsSection';
import { SLEEP_SYSTEMS, type MattressCategory } from './data/sleepSystems';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('landing');
  const [activeFilter, setActiveFilter] = useState<'all' | MattressCategory>('all');
  const [bookingSystemId, setBookingSystemId] = useState<string>('');
  const [bookingNote, setBookingNote] = useState<string>('');

  const handleNavigateLanding = (sectionId?: string) => {
    if (activePage !== 'landing') {
      setActivePage('landing');
      setTimeout(() => {
        if (sectionId && sectionId !== 'top') {
          scrollToSection(sectionId);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
      return;
    }

    if (sectionId && sectionId !== 'top') {
      scrollToSection(sectionId);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateSuppliers = () => {
    setActivePage('fornitori');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestInfoFromCard = (systemId: string) => {
    const matched = SLEEP_SYSTEMS.find((s) => s.id === systemId);
    setBookingSystemId(systemId);
    if (matched) {
      setBookingNote(`Richiesta informazioni per ${matched.name} (${matched.lineName}).`);
    }
    handleNavigateLanding('contatti');
  };

  const handleBookWithRecommendation = (systemId: string, summaryNote: string) => {
    setBookingSystemId(systemId);
    setBookingNote(`Consulente del Sonno — ${summaryNote}`);
    handleNavigateLanding('contatti');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#111111]">
      <Navbar
        activePage={activePage}
        onNavigateLanding={handleNavigateLanding}
        onNavigateSuppliers={handleNavigateSuppliers}
      />

      <main className="flex-1">
        {activePage === 'fornitori' ? (
          <SuppliersPage onBackHome={() => handleNavigateLanding('top')} />
        ) : (
          <>
            <HeroSection
              onExploreCollection={() => scrollToSection('collezione')}
              onStartConsultant={() => scrollToSection('consulente')}
            />

            <CollectionSection
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              onRequestInfo={handleRequestInfoFromCard}
            />

            <SleepConsultantSection
              onBookWithRecommendation={handleBookWithRecommendation}
            />

            <ComfortAnatomySection />

            <TestimonialsSection />

            <ConsultationSection
              prefilledSystemId={bookingSystemId}
              prefilledNote={bookingNote}
            />
          </>
        )}
      </main>

      <Footer
        onNavigateLanding={handleNavigateLanding}
        onNavigateSuppliers={handleNavigateSuppliers}
      />
    </div>
  );
}

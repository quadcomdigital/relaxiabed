import { useEffect, useState, type FormEvent } from 'react';
import { Calendar, CheckCircle2, MapPin, Phone, Video } from 'lucide-react';
import { motion } from 'motion/react';
import { SLEEP_SYSTEMS } from '../data/sleepSystems';

export type ConsultationChannel = 'showroom-partinico' | 'consulenza-digitale';

interface ConsultationSectionProps {
  prefilledSystemId: string;
  prefilledNote: string;
}

interface BookingSummary {
  channel: ConsultationChannel;
  fullName: string;
  contactInfo: string;
  systemName: string;
  preferredSlot: string;
}

export function ConsultationSection({
  prefilledSystemId,
  prefilledNote
}: ConsultationSectionProps) {
  const [channel, setChannel] = useState<ConsultationChannel>('showroom-partinico');
  const [selectedSystem, setSelectedSystem] = useState<string>(
    prefilledSystemId || 'non-so-ancora'
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Mattina (09:30 – 12:30)');
  const [notes, setNotes] = useState(prefilledNote);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedBooking, setSubmittedBooking] = useState<BookingSummary | null>(null);

  useEffect(() => {
    if (prefilledSystemId) {
      setSelectedSystem(prefilledSystemId);
      setSubmittedBooking(null);
    }
  }, [prefilledSystemId]);

  useEffect(() => {
    if (prefilledNote) {
      setNotes(prefilledNote);
      setSubmittedBooking(null);
    }
  }, [prefilledNote]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Inserisci il tuo nome e cognome.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Inserisci un indirizzo email valido.');
      return;
    }

    if (phone.trim().replace(/\D/g, '').length < 7) {
      setErrorMessage('Inserisci un numero di telefono valido.');
      return;
    }

    if (!privacyAccepted) {
      setErrorMessage('Conferma il consenso per inviare la richiesta.');
      return;
    }

    const matchedSystem = SLEEP_SYSTEMS.find((s) => s.id === selectedSystem);
    setSubmittedBooking({
      channel,
      fullName: fullName.trim(),
      contactInfo: `${email.trim()} · ${phone.trim()}`,
      systemName: matchedSystem ? matchedSystem.name : 'Consulenza personalizzata',
      preferredSlot
    });
  };

  return (
    <section id="contatti" className="py-20 md:py-28 bg-[#FAF9F6] linen-texture">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
                className="font-serif font-medium text-[#111111] leading-[1.08] text-balance"
              >
                Prenota la tua <em className="italic font-normal">consulenza</em>
              </h2>
              <p className="mt-3 text-base text-[#595753]">
                In showroom a Partinico o in videochiamata gratuita.
              </p>
            </div>

            <div className="divide-y divide-[#111111]/12 border-y border-[#111111]/12 text-sm">
              <div className="py-4 flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#111111] shrink-0 mt-0.5" strokeWidth={1.6} />
                <div>
                  <h3 className="font-semibold text-[#111111]">Showroom Partinico</h3>
                  <p className="mt-0.5 text-[#595753]">Corso dei Mille 148, Partinico (PA)</p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-3.5">
                <Calendar className="w-5 h-5 text-[#111111] shrink-0 mt-0.5" strokeWidth={1.6} />
                <div>
                  <h3 className="font-semibold text-[#111111]">Orari</h3>
                  <p className="mt-0.5 text-[#595753] tabular-nums">
                    Lun – Sab · 09:30–13:00 / 16:00–19:30
                  </p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#111111] shrink-0 mt-0.5" strokeWidth={1.6} />
                <div>
                  <h3 className="font-semibold text-[#111111]">Recapiti</h3>
                  <p className="mt-0.5 text-[#595753] tabular-nums">
                    +39 091 878 4210 · consulenza@relaxia.it
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#F1F0EC] border border-[#111111]/12 rounded-2xl p-6 sm:p-8 md:p-10 editorial-shadow">
            {submittedBooking ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="py-6 space-y-6"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#111111] text-white">
                  <CheckCircle2 className="w-6 h-6" strokeWidth={1.7} />
                </div>

                <div>
                  <h3 className="font-serif text-3xl font-medium text-[#111111]">
                    Richiesta confermata, {submittedBooking.fullName}
                  </h3>
                  <p className="mt-2 text-sm text-[#595753]">
                    Ti contatteremo a breve per fissare l’orario esatto.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#111111]/10 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-[#595753]">Modalità</span>
                    <span className="font-medium text-[#111111]">
                      {submittedBooking.channel === 'showroom-partinico'
                        ? 'Showroom Partinico'
                        : 'Consulenza Digitale'}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#595753]">Sistema</span>
                    <span className="font-medium text-[#111111]">{submittedBooking.systemName}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#595753]">Fascia</span>
                    <span className="font-medium text-[#111111] tabular-nums">
                      {submittedBooking.preferredSlot}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmittedBooking(null)}
                  className="px-5 py-2.5 rounded-md border border-[#111111]/20 bg-white hover:bg-[#E3E1DB] text-sm font-medium text-[#111111] transition-colors cursor-pointer"
                >
                  Nuova richiesta
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setChannel('showroom-partinico')}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      channel === 'showroom-partinico'
                        ? 'bg-[#111111] border-[#111111] text-white shadow-md'
                        : 'bg-white border-[#111111]/15 text-[#111111] hover:border-[#111111]/35'
                    }`}
                  >
                    <MapPin className="w-4 h-4 shrink-0" strokeWidth={1.7} />
                    <span className="text-sm font-medium">Showroom a Partinico</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setChannel('consulenza-digitale')}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      channel === 'consulenza-digitale'
                        ? 'bg-[#111111] border-[#111111] text-white shadow-md'
                        : 'bg-white border-[#111111]/15 text-[#111111] hover:border-[#111111]/35'
                    }`}
                  >
                    <Video className="w-4 h-4 shrink-0" strokeWidth={1.7} />
                    <span className="text-sm font-medium">Consulenza Digitale</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="booking-name"
                      className="block text-xs font-medium text-[#111111] mb-1.5"
                    >
                      Nome e Cognome
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Marco Bellini"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#111111]/18 text-sm text-[#111111] placeholder:text-[#595753]/55 focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="block text-xs font-medium text-[#111111] mb-1.5"
                    >
                      Telefono
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+39 333 000 0000"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#111111]/18 text-sm text-[#111111] placeholder:text-[#595753]/55 focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="booking-email"
                      className="block text-xs font-medium text-[#111111] mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nome@esempio.it"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#111111]/18 text-sm text-[#111111] placeholder:text-[#595753]/55 focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="booking-slot"
                      className="block text-xs font-medium text-[#111111] mb-1.5"
                    >
                      Fascia Oraria
                    </label>
                    <select
                      id="booking-slot"
                      value={preferredSlot}
                      onChange={(e) => setPreferredSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#111111]/18 text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                    >
                      <option value="Mattina (09:30 – 12:30)">Mattina (09:30 – 12:30)</option>
                      <option value="Pomeriggio (16:00 – 18:30)">Pomeriggio (16:00 – 18:30)</option>
                      <option value="Tardo Pomeriggio (18:30 – 20:00)">
                        Tardo Pomeriggio (18:30 – 20:00)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-system"
                    className="block text-xs font-medium text-[#111111] mb-1.5"
                  >
                    Sistema d’Interesse
                  </label>
                  <select
                    id="booking-system"
                    value={selectedSystem}
                    onChange={(e) => setSelectedSystem(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#111111]/18 text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                  >
                    <option value="non-so-ancora">Consiglio personalizzato</option>
                    {SLEEP_SYSTEMS.map((system) => (
                      <option key={system.id} value={system.id}>
                        {system.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="booking-notes"
                    className="block text-xs font-medium text-[#111111] mb-1.5"
                  >
                    Note (facoltativo)
                  </label>
                  <textarea
                    id="booking-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Misure o preferenze..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#111111]/18 text-sm text-[#111111] placeholder:text-[#595753]/55 focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <label className="flex items-center gap-2.5 text-xs text-[#595753] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="rounded border-[#111111]/30 accent-[#111111]"
                  />
                  <span>Acconsento al trattamento dei dati per la consulenza.</span>
                </label>

                {errorMessage && (
                  <p role="alert" className="text-sm font-medium text-[#8C2B2B]">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-md bg-[#111111] hover:bg-[#262626] text-white text-sm font-medium shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  {channel === 'showroom-partinico'
                    ? 'Prenota a Partinico'
                    : 'Richiedi Consulenza Digitale'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

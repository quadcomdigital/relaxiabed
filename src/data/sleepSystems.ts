export type MattressCategory = 'memory' | 'lattice' | 'ibrido';

export interface SleepSystem {
  id: string;
  slug: MattressCategory;
  lineName: string;
  name: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  ergonomicProfile: string;
}

export interface TrustPillar {
  number: string;
  title: string;
  detail: string;
}

export interface ComfortElement {
  id: string;
  index: string;
  title: string;
  shortLabel: string;
  description: string;
  highlights: string[];
}

export interface SleepStory {
  id: string;
  author: string;
  city: string;
  systemChosen: string;
  quote: string;
}

export const TRUST_PILLARS: TrustPillar[] = [
  {
    number: '01',
    title: 'Qualità Selezionata',
    detail: 'Fibre naturali e lavorazioni curate'
  },
  {
    number: '02',
    title: '100 Notti di Prova',
    detail: 'Provalo a casa senza pensieri'
  },
  {
    number: '03',
    title: 'Garanzia Pluriennale',
    detail: 'Tenuta strutturale nel tempo'
  },
  {
    number: '04',
    title: 'Consegna Dedicata',
    detail: 'Installazione diretta in camera'
  }
];

export const SLEEP_SYSTEMS: SleepSystem[] = [
  {
    id: 'quiete-memory',
    slug: 'memory',
    lineName: 'Memory Ergonomico',
    name: 'Quiete Visco Natura',
    subtitle: 'Accoglienza progressiva e scarico vertebrale',
    image: '/src/assets/images/mattress_memory_ergonomico_1795597626755.jpg',
    imageAlt: 'Materasso linea Memory Ergonomico su base in legno chiaro',
    ergonomicProfile:
      'Indicato per chi dorme sul fianco o supino e cerca un’accoglienza progressiva con colonna allineata.'
  },
  {
    id: 'alba-lattice',
    slug: 'lattice',
    lineName: 'Natura & Lattice',
    name: 'Alba Lattice Puro',
    subtitle: 'Freschezza costante e spinta elastica',
    image: '/src/assets/images/mattress_natura_lattice_1795597626749.jpg',
    imageAlt: 'Materasso linea Natura e Lattice rivestito in lino grezzo',
    ergonomicProfile:
      'Consigliato a chi avverte calore notturno, cambia spesso posizione o predilige una risposta elastica immediata.'
  },
  {
    id: 'armonia-ibrido',
    slug: 'ibrido',
    lineName: 'Ibrido Molle e Memory',
    name: 'Armonia 1600 Ibrido',
    subtitle: 'Sostegno deciso e indipendenza di coppia',
    image: '/src/assets/images/mattress_ibrido_molle_1795597627981.jpg',
    imageAlt: 'Materasso linea Ibrido Molle e Memory su letto imbottito',
    ergonomicProfile:
      'Ideale per coppie con corporature diverse e per chi desidera un piano stabile, traspirante e sostenuto.'
  }
];

export const COMFORT_ANATOMY_ELEMENTS: ComfortElement[] = [
  {
    id: 'strati',
    index: '01',
    title: 'Strati Interni Traspiranti',
    shortLabel: 'Microclima asciutto',
    description:
      'Canali di aerazione e fibre naturali disperdono calore e umidità, mantenendo il riposo asciutto per tutta la notte.',
    highlights: [
      'Ricircolo d’aria continuo',
      'Fibre traspiranti selezionate',
      'Portanza differenziata'
    ]
  },
  {
    id: 'rete',
    index: '02',
    title: 'Rete Ergonomica a Doghe',
    shortLabel: 'Supporto calibrato',
    description:
      'Doghe basculanti con regolatori lombari calibrano il sostegno sul peso corporeo senza cigolii.',
    highlights: [
      'Accoglienza dedicata alle spalle',
      'Regolatori lombari indipendenti',
      'Telaio silenzioso'
    ]
  },
  {
    id: 'guanciale',
    index: '03',
    title: 'Guanciale Cervicale Adattivo',
    shortLabel: 'Zona cervicale',
    description:
      'Altezze dedicate alla posizione in cui dormi mantengono libero il tratto cervicale e rilassati i muscoli delle spalle.',
    highlights: [
      'Profilo onda o saponetta',
      'Federa sfoderabile lavabile',
      'Abbinato al materasso scelto'
    ]
  }
];

export const SLEEP_STORIES: SleepStory[] = [
  {
    id: 'storia-1',
    author: 'Chiara Bellavista',
    city: 'Palermo',
    systemChosen: 'Quiete Visco Natura',
    quote:
      'In showroom a Partinico abbiamo provato tre portanze con calma. Dopo due settimane ho smesso di svegliarmi con la bassa schiena rigida.'
  },
  {
    id: 'storia-2',
    author: 'Matteo e Giulia Rinaldi',
    city: 'Trapani',
    systemChosen: 'Armonia 1600 Ibrido',
    quote:
      'Abbiamo corporature molto diverse, eppure nessuno dei due avverte quando l’altro si muove. È il riposo più silenzioso che abbiamo mai avuto.'
  },
  {
    id: 'storia-3',
    author: 'Lorenzo D’Amico',
    city: 'Alcamo',
    systemChosen: 'Alba Lattice Puro',
    quote:
      'Temevo il caldo estivo, invece il lattice naturale rivestito in lino resta sempre fresco e asciutto fino al mattino.'
  }
];

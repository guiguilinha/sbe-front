// =======================================================================
// Tipos para Home Page - Alinhados com o backend
// =======================================================================

// Tipo principal da Home Page
export interface HomeData {
  hero: HeroData;
  benefits: BenefitsData;
  howItWorks: HowItWorksData;
  maturityLevels: MaturityLevelsData;
  faq: FAQData;
  footer: FooterData;
}

// =======================================================================
// Tipos para resposta da API
// =======================================================================

export interface SectionData {
  id: number;
  overline?: string;
  title: string;
  description: string;
  order?: number;
}

export interface CardData {
  id: number;
  title: string;
  description: string;
  image_alt?: string;
  label_button?: string | null;
  order: number;
  parent: number;
  image?: string;
  bg_image?: string;
}

export interface FAQItemData {
  id: number;
  question: string;
  answer: string;
  order: number;
  parent: number;
}

export interface HomePageResponse {
  hero: HeroData;
  benefits: {
    section: SectionData;
    cards: CardData[];
  };
  how_it_works: {
    section: SectionData;
    cards: CardData[];
  };
  maturity_levels: {
    section: SectionData;
    cards: CardData[];
  };
  faq: {
    section: SectionData;
    items: FAQItemData[];
  };
  footer: FooterData;
}

// =======================================================================
// Tipos para seção Hero
// =======================================================================

export interface HeroData {
  overline?: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  image_alt?: string;
  label_button?: string;
  url_button?: string;
}

// =======================================================================
// Tipos para seção Benefits
// =======================================================================

export interface BenefitsData {
  overline?: string;
  title: string;
  description?: string;
  benefits: Benefit[];
}

export interface Benefit {
  id: number;
  title: string;
  description?: string;
  image?: string;
  image_alt?: string;
  label_button?: string;
  order?: number;
  parent?: number;
}

// =======================================================================
// Tipos para seção How It Works
// =======================================================================

export interface HowItWorksData {
  id: number;
  overline?: string;
  title: string;
  description?: string;
  steps: HowItWorksStep[];
}

export interface HowItWorksStep {
  id: number;
  overline?: string;
  title: string;
  description?: string;
  order?: number;
  parent?: number;
}

// =======================================================================
// Tipos para seção Maturity Levels
// =======================================================================

export interface MaturityLevelsData {
  id: number;
  overline?: string;
  title: string;
  description?: string;
  cards: MaturityExplanationCard[];
}

export interface MaturityExplanationCard {
  id: number;
  overline?: string;
  title: string;
  description?: string;
  image?: string;
  image_alt?: string;
  bg_image?: string;
  order?: number;
  parent?: number;
}

// =======================================================================
// Tipos para seção FAQ
// =======================================================================

export interface FAQData {
  id: number;
  overline?: string;
  title: string;
  description?: string;
  items: FAQItem[];
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  order?: number;
  parent?: number;
}

// =======================================================================
// Tipos para seção Footer
// =======================================================================

export interface FooterData {
  id: number;
  title: string;
} 
// Tipos para dados do Directus
export interface DirectusResponse<T> {
  data: T[];
  meta?: {
    total_count?: number;
    filter_count?: number;
  };
}

// Tipos para categorias
export interface Category {
  id: number;
  title: string;
  // Removido: order (não existe no backend)
}

// Tipos para perguntas do quiz
export interface QuizQuestion {
  id: number;
  question: string;
  category_id: number;
  order: number;
}

// Tipos para respostas do quiz
export interface QuizAnswer {
  id: number;
  answer: string;
  score: number;
  question_id: number;
  // Removido: order (não existe no backend)
}

// Tipos para níveis de maturidade
export interface MaturityLevel {
  id: number;
  title: string;
  description: string;
  min_score: number;
  max_score: number;
  // Removido: image (não existe no backend)
}

// Tipos para faixas de pontuação geral
export interface MaturityLevelsRange {
  id: number;
  min_score: number;
  max_score: number;
  level_id: number;
}

// Tipos para insights gerais
export interface MaturityLevelsInsights {
  id: number;
  level_id: number;
  description: string;
}

// Tipos para faixas de pontuação por categoria
export interface CategoryLevelsRange {
  id: number;
  category_id: number;
  min_score: number;
  max_score: number;
  level_id: number;
}

// Tipos para insights por categoria
export interface CategoryLevelsInsights {
  id: number;
  category_id: number;
  level_id: number;
  description: string;
  support_text: string; // Adicionado conforme backend
}

// Tipos para cursos
export interface Course {
  id: number;
  title: string;
  description: string;
  url: string;
  image?: string;
  image_alt?: string;
  // Removido: category_id (não existe no backend)
}

// Novos tipos alinhados com o backend
export interface Region {
  id: number;
  title: string;
}

export interface RegionPhone {
  id: string;
  region: number;
  phone: string;
  city: string;
}

export interface Page {
  id: number;
  title: string;
}

export interface CTAData {
  id: number;
  title: string;
  description?: string;
  label_button: string;
  url_button: string;
  page_order?: number;
  page?: string;
  overline: string;
  image: string;
  label_button_secondary: string;
  url_button_secondary: string;
}

export interface QuizHeaderData {
  id: number;
  overline?: string;
  title: string;
  description: string;
}

export interface HeaderData {
  id: number;
  title: string;
}

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

export interface BenefitsData {
  overline?: string;
  title: string;
  description?: string;
  order?: number;
}

export interface HowItWorksData {
  id: number;
  overline?: string;
  title: string;
  description?: string;
}

export interface MaturityLevelsData {
  id: number;
  overline?: string;
  title: string;
  description?: string;
}

export interface FAQData {
  id: number;
  overline?: string;
  title: string;
  description?: string;
}

export interface FooterData {
  id: number;
  title: string;
}

// Interfaces para HomepageCardsService
export interface BenefitCard {
  id: number;
  title: string;
  description?: string;
  image_alt?: string;
  label_button?: string;
  order?: number;
  parent?: number;
  image?: string;
}

export interface HowItWorksCard {
  id: number;
  overline?: string;
  title: string;
  description?: string;
  order?: number;
  parent?: number;
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

export interface FAQQuestion {
  id: number;
  question: string;
  answer: string;
  order?: number;
  parent?: number;
}

export interface FooterMenuItem {
  id: number;
  title: string;
  url?: string;
  order?: number;
  parent?: number;
}

export interface FooterPhone {
  id: number;
  phone: string;
  parent?: number;
}

export interface FooterSocial {
  id: number;
  title: string;
  url?: string;
  icon?: string;
  order?: number;
  parent?: number;
} 
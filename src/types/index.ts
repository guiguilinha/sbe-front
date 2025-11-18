// Tipos básicos para a nova estrutura simplificada
// Serão definidos conforme os novos serviços forem criados

// Tipos utilitários
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
}

// Tipos da Home Page
export type {
  HomeData,
  HeroData,
  BenefitsData,
  Benefit,
  HowItWorksData,
  HowItWorksStep,
  MaturityLevelsData,
  MaturityExplanationCard,
  FAQData,
  FAQItem,
  FooterData,
  HomePageResponse,
  SectionData,
  CardData,
  FAQItemData
} from './home';

// Tipos da Quiz Page
export type {
  QuizData,
  QuizHeaderData,
  CategoryData,
  QuestionData,
  AnswerData,
  QuizSubmission,
  UserAnswer,
  QuizSubmissionResponse,
  QuizResponse,
  QuizHeaderResponse,
  QuestionResponse,
  AnswerResponse,
  CategoryResponse,
  LevelResponse
} from './quiz';

// Tipos da Results Page
export type {
  UserResultsData,
  CalculatedResult,
  ResultsData,
  HeroSectionData,
  AdviceSectionData,
  CategoryItemData,
  CategorySectionData,
  CTASectionData,
  ConclusionSectionData,
  ContentSectionData,
  MapSectionData
} from './results';

// Tipos do Mapa
export type {
  MapSection,
  MapRegion,
  MapRegionsMGProps
} from './map';

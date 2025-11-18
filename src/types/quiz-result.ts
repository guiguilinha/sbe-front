// Tipos base primeiro
export interface MaturityLevel {
  id: number;
  title: string;
  description: string;
  min_score: number;
  max_score: number;
  // Removido: color, icon, image (não existem no backend)
}

export interface Category {
  id: number;
  title: string;
  // Removido: order (não existe no backend)
}

export interface Course {
  id: number;
  title: string;
  description: string;
  url: string;
  image?: string;
  image_alt?: string;
  category: number[]; // Array de IDs de categorias
  level: number[];    // Array de IDs de níveis
}

// Tipos para dados do Directus
export interface QuizQuestion {
  id: number;
  question: string;
  category_id: number;
  order: number;
  options: AnswerOption[]; // Adicionado para consistência
}

export interface QuizAnswer {
  id: number;
  answer: string;
  score: number;
  question_id: number;
  // Removido: order, question (não existem no backend)
}

export interface MaturityLevelsRange {
  id: number;
  min_score: number;
  max_score: number;
  level_id: number;
}

export interface MaturityLevelsInsights {
  id: number;
  level_id: number;
  description: string;
  image?: string;
  alt_image?: string;
}

export interface CategoryLevelsRange {
  id: number;
  category_id: number;
  min_score: number;
  max_score: number;
  level_id: number;
}

export interface CategoryLevelsInsights {
  id: number;
  category_id: number;
  level_id: number;
  description: string;
  support_text: string; // Adicionado conforme backend
}

// Tipo para respostas do usuário
export interface UserAnswer {
  question_id: number;
  answer_id: number;
}

// Tipos para cálculos de resultado do quiz
export interface CategoryScore {
  category_id: number;
  category_title: string;
  score: number;
  max_possible_score: number;
  percentage: number;
}

export interface CategoryMaturityLevel {
  category_id: number;
  category_title: string;
  maturity_level: MaturityLevel;
  score: number;
  insight: string;
}

export interface QuizCalculation {
  total_score: number;
  category_scores: CategoryScore[];
  general_maturity_level: MaturityLevel;
  category_maturity_levels: CategoryMaturityLevel[];
  recommendations: Course[];
}

// Tipos para dados do Directus
export interface DirectusQuizData {
  questions: QuizQuestion[];
  answerOptions: QuizAnswer[];
  categories: Category[];
  maturity_levels: MaturityLevel[];
  maturity_levels_range: MaturityLevelsRange[];
  maturity_levels_insights: MaturityLevelsInsights[];
  category_levels_range: CategoryLevelsRange[];
  category_levels_insights: CategoryLevelsInsights[];
  courses: Course[];
}

// Novos tipos alinhados com o backend
export interface CategoryLevelInsight {
  id: number;
  description: string;
  support_text: string;
  category_id: number;
  level_id: number;
}

export interface CategoryLevelRange {
  id: number;
  min_score: number;
  max_score: number;
  level_id: number;
  category_id: number;
}

export interface MaturityLevelInsight {
  id: number;
  level_id: number;
  description: string;
}

export interface QuizResult {
  id?: number;
  user_id: string;
  total_score: number;
  category_scores: CategoryScore[];
  answers: UserAnswer[];
  data_criacao?: Date;
}

export interface AnswerOption {
  id: number;
  answer: string;
  score: number;
  question_id: number;
}

export interface Question {
  id: number;
  question: string;
  category_id: Category;
  order: number;
}

// Tipo para o novo serviço ResultsCategoryDetailsSummary
export interface ResultsCategoryDetailsSummary {
  id: number;
  title: string;
  order: number;
  level_id: number;
  category_id: number;
} 
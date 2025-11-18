// Tipos para a Quiz Page
// Baseados nos endpoints do backend

// =======================================================================
// Tipos para resposta da API
// =======================================================================

export interface QuizHeaderResponse {
  id: number;
  overline: string;
  title: string;
  description: string;
  order?: number;
}

export interface QuestionResponse {
  id: number;
  question: string;
  order: number;
  category_id: number;
  parent: number;
}

export interface AnswerResponse {
  id: number;
  answer: string;
  score: number;
  question_id: number;
  order: number;
  parent: number;
}

export interface CategoryResponse {
  id: number;
  title: string;
}

export interface LevelResponse {
  id: number;
  title: string;
}

export interface QuizResponse {
  header: QuizHeaderResponse;
  questions: QuestionResponse[];
  answers: AnswerResponse[];
  categories: CategoryResponse[];
  levels: LevelResponse[];
}

// =======================================================================
// Tipos para o frontend
// =======================================================================

export interface QuizData {
  header: QuizHeaderData;
  questions: QuestionData[];
  answers: AnswerData[];
  categories: CategoryData[];
  levels: LevelData[];
}

export interface QuizHeaderData {
  id: number;
  overline: string;
  title: string;
  description: string;
  order: number;
}

export interface CategoryData {
  id: number;
  title: string;
}

export interface LevelData {
  id: number;
  title: string;
}

export interface QuestionData {
  id: number;
  question: string;
  category_id: number;
  order: number;
  parent: number;
}

export interface AnswerData {
  id: number;
  answer: string;
  score: number;
  question_id: number;
  order: number;
  parent: number;
}

// =======================================================================
// Tipos para submissão do quiz
// =======================================================================

export interface QuizSubmission {
  answers: UserAnswer[];
}

export interface UserAnswer {
  question_id: number;
  answer_id: number;
  score: number;
  category_id: number;
}

// Tipos para resposta do quiz
export interface QuizSubmissionResponse {
  success: boolean;
  data: {
    result_id: string;
    message: string;
  };
  message?: string;
} 
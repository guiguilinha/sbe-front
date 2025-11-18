import type { UserAnswer } from "@/types/quiz";

const STORAGE_KEY = "quiz-progresso-maturidade-digital";

export type ProgressoQuizLocal = {
  respostas: UserAnswer[];
  perguntaAtual: number;
};

// Salva o progresso no localStorage
export function salvarProgressoQuiz(progresso: ProgressoQuizLocal) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progresso));
  } catch (e) {
    // Falha silenciosa
  }
}

// Recupera o progresso do localStorage
export function recuperarProgressoQuiz(): ProgressoQuizLocal | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ProgressoQuizLocal;
  } catch (e) {
    return null;
  }
}

// Limpa o progresso do localStorage
export function limparProgressoQuiz() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // Falha silenciosa
  }
} 
import { useState, useEffect, useCallback } from 'react';
import { getQuizData, submitQuiz } from '../services/quizService';
import type { QuizData, QuizSubmission, QuizSubmissionResponse } from '../types';

interface UseQuizDataReturn {
  data: QuizData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  submitAnswers: (answers: QuizSubmission) => Promise<QuizSubmissionResponse>;
}

export const useQuizData = (previewToken?: string): UseQuizDataReturn => {
  const [data, setData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const quizData = await getQuizData(previewToken);
      console.log('✅ Dados do Quiz carregados:', quizData);
      setData(quizData);
    } catch (err) {
      console.error('❌ Erro no hook useQuizData:', err);
      setError(err instanceof Error ? err.message : 'Erro inesperado ao carregar dados do Quiz');
    } finally {
      setLoading(false);
    }
  }, [previewToken]);

  const submitAnswers = useCallback(async (answers: QuizSubmission): Promise<QuizSubmissionResponse> => {
    try {
      console.log('📤 Submetendo respostas via hook...', {
        hasPreviewToken: !!previewToken,
        previewTokenLength: previewToken?.length || 0
      });
      const response = await submitQuiz(answers, previewToken);
      console.log('✅ Respostas submetidas com sucesso:', response);
      return response;
    } catch (err) {
      console.error('❌ Erro ao submeter respostas:', err);
      throw err;
    }
  }, [previewToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    submitAnswers
  };
}; 
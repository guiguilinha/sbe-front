import api from '../api';
import type { 
  QuizQuestion, 
  QuizAnswer, 
  DirectusQuizData,
  QuizCalculation,
  UserAnswer,
  CategoryScore
} from '../../types/quiz-result';

/**
 * Busca todos os dados do quiz do backend
 */
export const getQuizData = async (): Promise<DirectusQuizData> => {
  try {
    const response = await api.get('/questions/quiz-data');
    return response.data.data; // Acessa o campo 'data' dentro da resposta
  } catch (error) {
    throw new Error('Falha ao carregar dados do quiz');
  }
};

/**
 * Busca todas as perguntas do quiz
 */
export const getAllQuestions = async (): Promise<QuizQuestion[]> => {
  try {
    const response = await api.get('/questions');
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar perguntas:', error);
    throw new Error('Falha ao carregar perguntas');
  }
};

/**
 * Busca perguntas por categoria
 */
export const getQuestionsByCategory = async (categoryId: number): Promise<QuizQuestion[]> => {
  try {
    const response = await api.get(`/questions/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar perguntas por categoria:', error);
    throw new Error('Falha ao carregar perguntas da categoria');
  }
};

/**
 * Busca uma pergunta específica por ID
 */
export const getQuestionById = async (questionId: number): Promise<QuizQuestion> => {
  try {
    const response = await api.get(`/questions/${questionId}`);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar pergunta:', error);
    throw new Error('Falha ao carregar pergunta');
  }
};

/**
 * Busca opções de resposta de uma pergunta
 */
export const getQuestionOptions = async (questionId: number): Promise<QuizAnswer[]> => {
  try {
    const response = await api.get(`/questions/${questionId}/options`);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar opções da pergunta:', error);
    throw new Error('Falha ao carregar opções da pergunta');
  }
};

/**
 * Valida uma pergunta específica
 */
export const validateQuestion = async (questionId: number): Promise<boolean> => {
  try {
    const response = await api.get(`/questions/${questionId}/validate`);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao validar pergunta:', error);
    throw new Error('Falha ao validar pergunta');
  }
};

/**
 * Busca estatísticas do quiz
 */
export const getQuizStats = async () => {
  try {
    const response = await api.get('/questions/stats');
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas do quiz:', error);
    throw new Error('Falha ao carregar estatísticas do quiz');
  }
};

/**
 * Calcula resultado do quiz
 */
export const calculateQuizResult = (
  userAnswers: UserAnswer[],
  quizData: DirectusQuizData
): QuizCalculation => {
  let totalScore = 0;
  const categoryScores: CategoryScore[] = [];
  const categoryMaturityLevels: any[] = [];

  // Calcular pontuação total
  userAnswers.forEach(userAnswer => {
    const answerOption = quizData.answerOptions?.find(a => a.id === userAnswer.answer_id);
    if (answerOption) {
      totalScore += answerOption.score || 0;
    }
  });

  // Calcular pontuação por categoria
  const categoryIds = [...new Set(quizData.questions?.map(q => q.category_id) || [])];
  
  categoryIds.forEach(categoryId => {
    const categoryIdNum = typeof categoryId === 'string' ? parseInt(categoryId) : categoryId;
    const questions = quizData.questions?.filter(q => q.category_id === categoryIdNum) || [];
    
    const category = quizData.categories?.find(c => c.id === categoryIdNum);
    
    if (!category) return;

    // Calcular pontuação da categoria
    let categoryScore = 0;
    let maxPossibleScore = 0;

    questions.forEach(question => {
      const userAnswer = userAnswers.find(ua => ua.question_id === question.id);
      if (userAnswer) {
        const answerOption = quizData.answerOptions?.find(a => a.id === userAnswer.answer_id);
        categoryScore += answerOption?.score || 0;
      }
      
      // Calcular pontuação máxima possível para esta pergunta
      const questionOptions = quizData.answerOptions?.filter(a => a.question_id === question.id) || [];
      const maxScoreForQuestion = questionOptions.length > 0 ? Math.max(...questionOptions.map(opt => opt.score || 0)) : 0;
      maxPossibleScore += maxScoreForQuestion;
    });

    const percentage = maxPossibleScore > 0 ? Math.round((categoryScore / maxPossibleScore) * 100) : 0;

    // Adicionar pontuação da categoria
    categoryScores.push({
      category_id: categoryIdNum,
      category_title: category.title,
      score: categoryScore,
      max_possible_score: maxPossibleScore,
      percentage
    });

    // Determinar nível de maturidade da categoria
    const categoryRange = quizData.category_levels_range?.find(
      range => categoryScore >= range.min_score && 
      categoryScore <= range.max_score
    );

    if (categoryRange) {
      const maturityLevel = quizData.maturity_levels?.find(ml => ml.id === categoryRange.level_id);
      const insight = quizData.category_levels_insights?.find(
        insight => insight.category_id === categoryIdNum && insight.level_id === categoryRange.level_id
      );

      if (maturityLevel) {
        categoryMaturityLevels.push({
          category_id: categoryIdNum,
          category_title: category.title,
          maturity_level: maturityLevel,
          score: categoryScore,
          insight: insight?.description || ''
        });
      }
    }
  });

  // Determinar nível de maturidade geral
  const generalRange = quizData.maturity_levels_range?.find(
    range => totalScore >= range.min_score && totalScore <= range.max_score
  );

  const generalMaturityLevel = generalRange 
    ? quizData.maturity_levels?.find(ml => ml.id === generalRange.level_id)
    : quizData.maturity_levels?.[0]; // Fallback para o primeiro nível

  if (!generalMaturityLevel) {
    throw new Error('Não foi possível determinar o nível de maturidade geral');
  }

  return {
    total_score: totalScore,
    category_scores: categoryScores,
    general_maturity_level: generalMaturityLevel,
    category_maturity_levels: categoryMaturityLevels,
    recommendations: [] // Por enquanto vazio, pode ser implementado depois
  };
};

/**
 * Envia resultado do quiz para o backend
 */
export const submitQuizResult = async (
  userAnswers: UserAnswer[],
  quizResult: QuizCalculation
): Promise<void> => {
  try {
    const response = await api.post('/results/submit', {
      answers: userAnswers,
      result: quizResult
    });
    
    if (!response.data.success) {
      throw new Error('Falha ao enviar resultado do quiz');
    }
  } catch (error) {
    console.error('❌ Erro ao enviar resultado do quiz:', error);
    throw new Error('Falha ao enviar resultado do quiz');
  }
}; 
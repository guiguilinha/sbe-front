import api from './api';
import type { 
  QuizData, 
  QuizSubmission, 
  QuizSubmissionResponse,
  QuizResponse,
  QuizHeaderData,
  QuestionData,
  AnswerData,
  CategoryData
} from '../types';

/**
 * Busca dados do quiz (header, perguntas, respostas, categorias e níveis)
 * Endpoint: GET /api/quiz/
 */
export const getQuizData = async (previewToken?: string): Promise<QuizData> => {
  try {
    console.log('🌐 Buscando dados do Quiz...', {
      hasPreviewToken: !!previewToken,
      previewTokenLength: previewToken?.length || 0
    });
    
    // Construir URL com preview token se fornecido
    let url = '/quiz/';
    if (previewToken) {
      url += `?token=${encodeURIComponent(previewToken)}`;
    }
    
    // Buscar todos os dados do quiz em uma única chamada
    const response = await api.get<QuizResponse>(url);
    const data = response.data;

    // Mapear dados da API para os tipos do frontend
    const mapHeaderToHeaderData = (header: QuizResponse['header']): QuizHeaderData => ({
      id: header.id,
      overline: header.overline,
      title: header.title,
      description: header.description,
      order: header.order || 0
    });

    const mapQuestionToQuestionData = (question: QuizResponse['questions'][0]): QuestionData => ({
      id: question.id,
      question: question.question,
      category_id: question.category_id,
      order: question.order,
      parent: question.parent
    });

    const mapAnswerToAnswerData = (answer: QuizResponse['answers'][0]): AnswerData => ({
      id: answer.id,
      answer: answer.answer,
      score: answer.score,
      question_id: answer.question_id,
      order: answer.order,
      parent: answer.parent
    });

    const mapCategoryToCategoryData = (category: QuizResponse['categories'][0]): CategoryData => ({
      id: category.id,
      title: category.title
    });

    const mapLevelToLevelData = (level: QuizResponse['levels'][0]) => ({
      id: level.id,
      title: level.title
    });

    const quizData: QuizData = {
      header: mapHeaderToHeaderData(data.header),
      questions: (data.questions || []).map(mapQuestionToQuestionData),
      answers: (data.answers || []).map(mapAnswerToAnswerData),
      categories: (data.categories || []).map(mapCategoryToCategoryData),
      levels: (data.levels || []).map(mapLevelToLevelData)
    };
    
    console.log('✅ Dados do Quiz carregados com sucesso');
    return quizData;
    
  } catch (error) {
    console.error('❌ Erro ao buscar dados do Quiz:', error);
    
    if (error instanceof Error) {
      throw new Error(`Falha ao carregar dados do Quiz: ${error.message}`);
    }
    
    throw new Error('Erro inesperado ao carregar dados do Quiz');
  }
};

/**
 * Submete as respostas do quiz
 * Endpoint: POST /quiz/submit
 */
export const submitQuiz = async (answers: QuizSubmission, previewToken?: string): Promise<QuizSubmissionResponse> => {
  try {
    console.log('📤 Submetendo respostas do Quiz...', {
      hasPreviewToken: !!previewToken,
      previewTokenLength: previewToken?.length || 0
    });
    
    // Construir URL com preview token se fornecido
    let url = '/quiz/submit';
    if (previewToken) {
      url += `?token=${encodeURIComponent(previewToken)}`;
    }
    
    const response = await api.post<QuizSubmissionResponse>(url, answers);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Falha ao submeter quiz');
    }
    
    console.log('✅ Quiz submetido com sucesso');
    return response.data;
    
  } catch (error) {
    console.error('❌ Erro ao submeter quiz:', error);
    
    if (error instanceof Error) {
      throw new Error(`Falha ao submeter quiz: ${error.message}`);
    }
    
    throw new Error('Erro inesperado ao submeter quiz');
  }
}; 
import api from '../api';
import type { UserAnswer, UserResultsData, CalculatedResult } from '../../types';

interface CalculateResultsResponse {
  success: boolean;
  data: UserResultsData;
  calculatedResult: CalculatedResult;
  message?: string;
}

/**
 * Envia as respostas do quiz para cálculo dos resultados
 * Endpoint: POST /api/results/calculate
 */
export const calculateResults = async (answers: UserAnswer[], previewToken?: string): Promise<CalculateResultsResponse> => {
  try {
    console.log('📤 Enviando respostas para cálculo...', {
      hasPreviewToken: !!previewToken,
      previewTokenLength: previewToken?.length || 0,
      answersCount: answers.length
    });
    
    // Construir URL com preview token se fornecido
    let url = '/results/calculate';
    if (previewToken) {
      url += `?token=${encodeURIComponent(previewToken)}`;
    }
    
    const response = await api.post<CalculateResultsResponse>(url, {
      answers
    });
    
    console.log('✅ Resultados calculados com sucesso');
    return response.data;
    
  } catch (error) {
    console.error('❌ Erro ao calcular resultados:', error);
    
    if (error instanceof Error) {
      throw new Error(`Falha ao calcular resultados: ${error.message}`);
    }
    
    throw new Error('Erro inesperado ao calcular resultados');
  }
};

 
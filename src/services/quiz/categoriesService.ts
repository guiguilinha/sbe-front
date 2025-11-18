import api from '../api';
import type { Category } from '../../types/quiz-result';

/**
 * Busca todas as categorias
 */
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar categorias:', error);
    throw new Error('Falha ao carregar categorias');
  }
};

/**
 * Busca uma categoria específica por ID
 */
export const getCategoryById = async (categoryId: number): Promise<Category> => {
  try {
    const response = await api.get(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar categoria:', error);
    throw new Error('Falha ao carregar categoria');
  }
};

/**
 * Busca perguntas de uma categoria específica
 */
export const getQuestionsByCategory = async (categoryId: number) => {
  try {
    const response = await api.get(`/categories/${categoryId}/questions`);
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar perguntas da categoria:', error);
    throw new Error('Falha ao carregar perguntas da categoria');
  }
};

/**
 * Busca estatísticas das categorias
 */
export const getCategoryStats = async () => {
  try {
    const response = await api.get('/categories/stats');
    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas das categorias:', error);
    throw new Error('Falha ao carregar estatísticas das categorias');
  }
}; 
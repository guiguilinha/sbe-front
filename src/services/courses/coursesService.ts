import api from '../api';
import type { Course } from '../../types/quiz-result';

/**
 * Busca cursos com filtros opcionais por categoria e nível
 */
export const getCoursesByFilters = async (
  categoryId?: number, 
  levelId?: number
): Promise<Course[]> => {
  try {
    const params = new URLSearchParams();
    
    if (categoryId !== undefined) {
      params.append('category_id', categoryId.toString());
    }
    
    if (levelId !== undefined) {
      params.append('level_id', levelId.toString());
    }

    const queryString = params.toString();
    const url = `/results/courses${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get(url);
    return response.data; // O interceptor já extrai response.data.data automaticamente
  } catch (error) {
    console.error(`❌ Erro ao buscar cursos (categoryId: ${categoryId}, levelId: ${levelId}):`, error);
    throw new Error('Falha ao carregar cursos');
  }
};

/**
 * Busca todos os cursos disponíveis
 */
export const getAllCourses = async (): Promise<Course[]> => {
  return getCoursesByFilters();
};

/**
 * Busca cursos por categoria específica
 */
export const getCoursesByCategory = async (categoryId: number): Promise<Course[]> => {
  return getCoursesByFilters(categoryId);
};

/**
 * Busca cursos por nível específico
 */
export const getCoursesByLevel = async (levelId: number): Promise<Course[]> => {
  return getCoursesByFilters(undefined, levelId);
};
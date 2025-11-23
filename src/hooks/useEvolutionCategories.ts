import { useState, useEffect } from 'react';
import api from '@/services/api';

export interface CategoryEvolutionData {
  id: string;
  name: string;
  level: number;
  levelLabel: string;
  score: number;
  delta: number;
  color: string;
}

export interface EvolutionCategoriesData {
  data: Array<{
    month: string;
    topCategories: CategoryEvolutionData[];
  }>;
  performance: Record<string, {
    percentage: number;
    trend: 'up' | 'down' | 'flat';
    period: string;
  }>;
}

export interface UseEvolutionCategoriesReturn {
  data: EvolutionCategoriesData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useEvolutionCategories(): UseEvolutionCategoriesReturn {
  const [data, setData] = useState<EvolutionCategoriesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('[useEvolutionCategories] Iniciando busca de dados de evolução por categorias');
      
      const response = await api.get<EvolutionCategoriesData>('/dashboard/evolution/categories');
      
      console.log('[useEvolutionCategories] Dados recebidos:', {
        hasData: !!response.data.data,
        dataLength: response.data.data?.length || 0,
        hasPerformance: !!response.data.performance
      });
      
      setData(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('[useEvolutionCategories] Erro ao buscar dados:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch
  };
}

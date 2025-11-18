import { useState, useEffect } from 'react';

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
      
      const response = await fetch('/api/dashboard/evolution/categories');
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const result = await response.json();
      
      console.log('[useEvolutionCategories] Dados recebidos:', {
        hasData: !!result.data,
        dataLength: result.data?.length || 0,
        hasPerformance: !!result.performance
      });
      
      setData(result);
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

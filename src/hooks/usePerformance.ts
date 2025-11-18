import { useState, useEffect } from 'react';

export interface PerformanceData {
  percentage: number;
  trend: 'up' | 'down' | 'flat';
  period: string;
}

export interface UsePerformanceGeneralReturn {
  data: PerformanceData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface UsePerformanceCategoryReturn {
  data: PerformanceData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook para buscar performance geral
 */
export function usePerformanceGeneral(): UsePerformanceGeneralReturn {
  const [data, setData] = useState<PerformanceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('[usePerformanceGeneral] Iniciando busca de performance geral');
      
      const response = await fetch('/api/dashboard/performance/general');
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const result = await response.json();
      
      console.log('[usePerformanceGeneral] Dados recebidos:', {
        percentage: result.percentage,
        trend: result.trend,
        period: result.period
      });
      
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('[usePerformanceGeneral] Erro ao buscar dados:', errorMessage);
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

/**
 * Hook para buscar performance de uma categoria específica
 */
export function usePerformanceCategory(categoryId: string): UsePerformanceCategoryReturn {
  const [data, setData] = useState<PerformanceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('[usePerformanceCategory] Iniciando busca de performance para categoria:', categoryId);
      
      const response = await fetch(`/api/dashboard/performance/category/${categoryId}`);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const result = await response.json();
      
      console.log('[usePerformanceCategory] Dados recebidos:', {
        categoryId,
        percentage: result.percentage,
        trend: result.trend,
        period: result.period
      });
      
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('[usePerformanceCategory] Erro ao buscar dados:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  return {
    data,
    isLoading,
    error,
    refetch
  };
}

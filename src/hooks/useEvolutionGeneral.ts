import { useState, useEffect } from 'react';

export interface EvolutionGeneralData {
  data: Array<{
    month: string;
    level: number;
    levelLabel: string;
    score: number;
    delta: number;
  }>;
  performance: {
    percentage: number;
    trend: 'up' | 'down' | 'flat';
    period: string;
  };
}

export interface UseEvolutionGeneralReturn {
  data: EvolutionGeneralData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useEvolutionGeneral(): UseEvolutionGeneralReturn {
  const [data, setData] = useState<EvolutionGeneralData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('[useEvolutionGeneral] Iniciando busca de dados de evolução geral');
      
      const response = await fetch('/api/dashboard/evolution/general');
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const result = await response.json();
      
      console.log('[useEvolutionGeneral] Dados recebidos:', {
        hasData: !!result.data,
        dataLength: result.data?.length || 0,
        hasPerformance: !!result.performance
      });
      
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('[useEvolutionGeneral] Erro ao buscar dados:', errorMessage);
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

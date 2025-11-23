import { useState, useEffect } from 'react';
import api from '@/services/api';

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
      
      const response = await api.get<EvolutionGeneralData>('/dashboard/evolution/general');
      
      console.log('[useEvolutionGeneral] Dados recebidos:', {
        hasData: !!response.data.data,
        dataLength: response.data.data?.length || 0,
        hasPerformance: !!response.data.performance
      });
      
      setData(response.data);
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

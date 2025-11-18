import { useState, useEffect, useCallback } from 'react';
import { getHomeData } from '../services/homeService';
import type { HomeData } from '../types';

interface UseHomeDataReturn {
  data: HomeData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useHomeData = (previewToken?: string): UseHomeDataReturn => {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const homeData = await getHomeData(previewToken);
        
        setData(homeData);
        
      } catch (err) {
        console.error('❌ Erro no hook useHomeData:', err);
        setError(err instanceof Error ? err.message : 'Erro inesperado ao carregar dados da Home Page');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [previewToken]);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const homeData = await getHomeData(previewToken);
      setData(homeData);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado ao carregar dados da Home Page');
    } finally {
      setLoading(false);
    }
  }, [previewToken]);

  return {
    data,
    loading,
    error,
    refetch
  };
}; 
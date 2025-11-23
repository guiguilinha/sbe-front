import { useState } from 'react';
import { useEvolutionGeneral } from './useEvolutionGeneral';
import { useEvolutionCategories } from './useEvolutionCategories';

export type EvolutionView = 'geral' | 'categorias';

export interface UseEvolutionReturn {
  // Dados gerais
  generalData: ReturnType<typeof useEvolutionGeneral>;
  categoriesData: ReturnType<typeof useEvolutionCategories>;
  
  // Estado da view atual
  currentView: EvolutionView;
  setCurrentView: (view: EvolutionView) => void;
  
  // Estado do período
  currentPeriod: '3m' | '6m' | '12m';
  setCurrentPeriod: (period: '3m' | '6m' | '12m') => void;
  
  // Dados filtrados por período
  filteredGeneralData: any[] | null;
  filteredCategoriesData: any[] | null;
  
  // Performance atual
  currentPerformance: {
    percentage: number;
    trend: 'up' | 'down' | 'flat';
    period: string;
  } | null;
  
  // Estados de loading e erro
  isLoading: boolean;
  error: string | null;
  
  // Função para refetch
  refetch: () => void;
}

export function useEvolution(): UseEvolutionReturn {
  const [currentView, setCurrentView] = useState<EvolutionView>('geral');
  const [currentPeriod, setCurrentPeriod] = useState<'3m' | '6m' | '12m'>('6m');
  
  const generalData = useEvolutionGeneral();
  const categoriesData = useEvolutionCategories();
  
  // Calcular dados filtrados por período
  const filteredGeneralData = generalData.data?.data ? 
    filterDataByPeriod(generalData.data.data, currentPeriod) : null;
    
  const filteredCategoriesData = categoriesData.data?.data ? 
    filterDataByPeriod(categoriesData.data.data, currentPeriod) : null;
  
  // Performance atual baseada na view
  const currentPerformance = currentView === 'geral' 
    ? generalData.data?.performance || null
    : categoriesData.data?.performance || null;
  
  // Estados combinados
  const isLoading = generalData.isLoading || categoriesData.isLoading;
  const error = generalData.error || categoriesData.error;
  
  const refetch = () => {
    generalData.refetch();
    categoriesData.refetch();
  };
  
  return {
    generalData,
    categoriesData,
    currentView,
    setCurrentView,
    currentPeriod,
    setCurrentPeriod,
    filteredGeneralData,
    filteredCategoriesData,
    currentPerformance,
    isLoading,
    error,
    refetch
  };
}

/**
 * Filtra dados por período baseado na data do mês
 */
function filterDataByPeriod(data: any[], period: '3m' | '6m' | '12m'): any[] {
  if (!data || data.length === 0) {
    return [];
  }

  const periods = {
    '3m': 3,
    '6m': 6,
    '12m': 12
  };
  
  const monthsToInclude = periods[period] || 12;
  
  // Obter a data mais recente (último mês)
  const lastMonth = data[data.length - 1]?.month;
  if (!lastMonth) {
    return data;
  }
  
  // Parsear o último mês (formato: "YYYY-MM")
  const [lastYear, lastMonthNum] = lastMonth.split('-').map(Number);
  
  // Calcular a data de corte (X meses atrás)
  const cutoffDate = new Date(lastYear, lastMonthNum - 1, 1);
  cutoffDate.setMonth(cutoffDate.getMonth() - monthsToInclude);
  
  // Filtrar dados que estão dentro do período
  return data.filter(item => {
    if (!item.month) return false;
    
    const [itemYear, itemMonthNum] = item.month.split('-').map(Number);
    const itemDate = new Date(itemYear, itemMonthNum - 1, 1);
    
    return itemDate >= cutoffDate;
  });
}

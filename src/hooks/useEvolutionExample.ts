import { useEvolution } from './useEvolution';
import { usePerformanceCategory } from './usePerformance';

/**
 * Exemplo de como usar os hooks de evolução
 */
export function useEvolutionExample() {
  // Hook principal que gerencia estado e dados
  const evolution = useEvolution();
  
  // Hook para performance de categoria específica
  const categoryPerformance = usePerformanceCategory('presenca-digital');
  
  return {
    // Dados de evolução
    evolution,
    
    // Performance de categoria específica
    categoryPerformance,
    
    // Métodos úteis
    switchToGeneral: () => evolution.setCurrentView('geral'),
    switchToCategories: () => evolution.setCurrentView('categorias'),
    setPeriod: (period: '3m' | '6m' | '12m') => evolution.setCurrentPeriod(period),
    
    // Estados
    isGeneralLoading: evolution.generalData.isLoading,
    isCategoriesLoading: evolution.categoriesData.isLoading,
    isPerformanceLoading: categoryPerformance.isLoading,
    
    // Dados prontos para usar
    generalChartData: evolution.filteredGeneralData,
    categoriesChartData: evolution.filteredCategoriesData,
    currentPerformance: evolution.currentPerformance,
    categoryPerformanceData: categoryPerformance.data
  };
}

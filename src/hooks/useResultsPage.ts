import { useState, useEffect } from 'react';

// Hook temporário para ResultsPage funcionar
// Será substituído quando implementarmos a Results Page
export const useResultsPage = (previewToken?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    
    // Simular carregamento
    setTimeout(() => {
      setLoading(false);
      setError('Results Page ainda não implementada');
    }, 1000);
  }, [previewToken]);

  return {
    loading,
    error,
    data,
    refetch: () => {}
  };
}; 
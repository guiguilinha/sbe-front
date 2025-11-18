import { useEffect, useState } from 'react';
import { dashboardService } from '@/services/dashboard/dashboardService';
import { useSimpleAuth } from '@/auth/SimpleAuthProvider';

type DiagnosticoListItem = {
  id: string;
  date: string;
  overallScore: number;
};

type State =
  | { isLoading: true; error: null; data: null }
  | { isLoading: false; error: Error; data: null }
  | { isLoading: false; error: null; data: DiagnosticoListItem[] };

/**
 * Hook para buscar lista de diagnósticos do usuário logado
 * Usa dados reais do Directus via API de persistência
 */
export function useDiagnosticos(): State {
  const { enrichedUserData } = useSimpleAuth();
  const [state, setState] = useState<State>({ isLoading: true, error: null, data: null });

  useEffect(() => {
    // Se não tem dados do usuário, não buscar
    if (!enrichedUserData?.user?.id) {
      setState({ isLoading: false, error: null, data: [] });
      return;
    }

    let alive = true;
    
    (async () => {
      try {
        console.log('📋 [useDiagnosticos] Buscando diagnósticos do usuário:', enrichedUserData.user.id);
        
        // Buscar diagnósticos do usuário
        const data = await dashboardService.listDiagnosticos(enrichedUserData.user.id.toString());
        
        if (alive) {
          console.log('✅ [useDiagnosticos] Diagnósticos carregados:', data.length);
          setState({ isLoading: false, error: null, data });
        }
      } catch (err) {
        console.error('❌ [useDiagnosticos] Erro ao buscar diagnósticos:', err);
        
        if (alive) {
          setState({ isLoading: false, error: err as Error, data: null });
        }
      }
    })();

    return () => { 
      alive = false; 
    };
  }, [enrichedUserData?.user?.id]);

  return state;
}


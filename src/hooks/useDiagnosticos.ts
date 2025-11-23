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
    // IMPORTANTE: Não precisamos mais verificar enrichedUserData.user.id
    // O backend extrai o userId automaticamente do token Keycloak
    // Apenas verificar se está autenticado (o token será enviado automaticamente pela API)
    
    // Se não tem enrichedUserData, pode estar carregando ainda, manter loading
    if (!enrichedUserData) {
      console.log('📋 [useDiagnosticos] Aguardando dados do usuário...');
      return;
    }

    let alive = true;
    
    (async () => {
      try {
        console.log('📋 [useDiagnosticos] Buscando diagnósticos do usuário autenticado...');
        console.log('📋 [useDiagnosticos] O backend vai extrair userId do token Keycloak automaticamente');
        
        // Buscar diagnósticos do usuário
        // O backend extrai userId do token Keycloak automaticamente
        const data = await dashboardService.listDiagnosticos();
        
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
  }, [enrichedUserData]); // Dependência apenas de enrichedUserData (não mais user.id)

  return state;
}


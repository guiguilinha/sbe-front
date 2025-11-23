import { useEffect, useState } from 'react';
import { dashboardService } from '@/services/dashboard/dashboardService';
import { useSimpleAuth } from '@/auth/SimpleAuthProvider';
import type { DashboardResponse } from '@/types/contracts/dashboard.types';

type State =
  | { isLoading: true; error: null; data: null }
  | { isLoading: false; error: Error; data: null }
  | { isLoading: false; error: null; data: DashboardResponse };

/**
 * Hook para buscar dados do dashboard
 * O backend extrai o CPF do token Keycloak, busca o usuário no Directus pelo CPF,
 * e então busca os diagnósticos usando o ID do Directus
 * 
 * IMPORTANTE: O enrichedUserData.user.id é o ID do Keycloak, não do Directus.
 * O backend faz a conversão automaticamente usando o CPF do token.
 */
export function useDashboard(): State {
  const { enrichedUserData, authenticated } = useSimpleAuth();
  const [state, setState] = useState<State>({ isLoading: true, error: null, data: null });

  useEffect(() => {
    console.log('📊 [useDashboard] Hook executado:', {
      authenticated,
      hasEnrichedUserData: !!enrichedUserData,
      hasUser: !!enrichedUserData?.user,
      userCpf: enrichedUserData?.user?.cpf,
      // Nota: enrichedUserData.user.id é o ID do Keycloak, não do Directus
      // O backend usa o CPF do token para buscar o ID do Directus automaticamente
    });
    
    // Verificar se está autenticado e tem dados do usuário
    // O backend vai usar o CPF do token para buscar o ID do Directus
    if (!authenticated || !enrichedUserData || !enrichedUserData.user) {
      console.log('📊 [useDashboard] Não autenticado ou sem dados do usuário, não buscando dashboard');
      setState({ isLoading: false, error: null, data: null });
      return;
    }

    let alive = true;
    (async () => {
      try {
        console.log('📊 [useDashboard] Buscando dados do dashboard...');
        console.log('📊 [useDashboard] Dados do usuário (backend vai usar CPF do token):', {
          userCpf: enrichedUserData.user?.cpf,
          userName: enrichedUserData.user?.name,
          hasEmpresaData: enrichedUserData.metadata?.hasEmpresaData,
          note: 'O backend extrai o CPF do token Keycloak e busca o ID do Directus automaticamente'
        });
        
        const data = await dashboardService.getDashboard();
        
        if (alive) {
          console.log('✅ [useDashboard] Dados do dashboard carregados com sucesso:', {
            hasData: !!data,
            categoriesCount: data?.categories?.length || 0,
            historyCount: data?.historySample?.length || 0
          });
          setState({ isLoading: false, error: null, data });
        }
      } catch (err: any) {
        console.error('❌ [useDashboard] Erro ao buscar dashboard:', {
          message: err?.message,
          status: err?.response?.status,
          statusText: err?.response?.statusText,
          data: err?.response?.data
        });
        if (alive) {
          setState({ isLoading: false, error: err as Error, data: null });
        }
      }
    })();
    return () => { alive = false; };
  }, [authenticated, enrichedUserData]);

  return state;
}

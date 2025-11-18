import api from '../api';
import type { DashboardResponse } from '@/types/contracts/dashboard.types';
import type { DiagnosticoDetail } from '@/types/contracts/diagnostico.types';
import type { Diagnostic } from '@contracts';

/**
 * Busca dados do dashboard
 * Nota: O backend atualmente retorna dados mock. A agregação de dados reais do Directus
 * será implementada quando necessário para funcionalidades de evolução e performance.
 */
async function getDashboard(): Promise<DashboardResponse>{
  const res = await api.get<DashboardResponse>('/dashboard');
  return res.data;
}

/**
 * Lista diagnósticos de um usuário específico
 * Agora usa dados reais do Directus via API de persistência
 * 
 * @param userId - ID do usuário no Directus
 */
async function listDiagnosticos(userId: string): Promise<Array<{id:string; date:string; overallScore:number}>>{
  try {
    console.log('📋 [DashboardService] Buscando diagnósticos do usuário:', userId);
    
    // Buscar diagnósticos reais do Directus
    const res = await api.get<{ success: boolean; data: Diagnostic[] }>(
      `/diagnostics/user/${userId}`
    );
    
    if (!res.data.success) {
      throw new Error('Falha ao buscar diagnósticos');
    }
    
    // Mapear para formato esperado pelo frontend
    const diagnosticos = res.data.data.map(diag => ({
      id: diag.id.toString(),
      date: diag.performed_at,
      overallScore: diag.overall_score
    }));
    
    console.log('✅ [DashboardService] Diagnósticos encontrados:', diagnosticos.length);
    
    return diagnosticos;
    
  } catch (error) {
    console.error('[DashboardService] Erro ao buscar diagnósticos:', error);
    throw error;
  }
}

/**
 * Busca detalhes de um diagnóstico específico
 * Agora usa dados reais do Directus via API de persistência com categorias e respostas
 * 
 * @param id - ID do diagnóstico
 */
async function getDiagnostico(id: string): Promise<DiagnosticoDetail>{
  try {
    console.log('🔍 [DashboardService] Buscando diagnóstico:', id);
    
    // Buscar diagnóstico real do Directus (agora retorna categorias e respostas)
    const res = await api.get<{ 
      success: boolean; 
      data: Diagnostic & {
        categorias?: Array<{
          id: number;
          category_id: number;
          level_id: number;
          score: number;
          insight: string;
          tip: string;
          respostas?: Array<{
            id: number;
            question_id: number;
            answer_id: number;
            score: number;
          }>;
        }>;
      }
    }>(
      `/diagnostics/${id}`
    );
    
    if (!res.data.success) {
      throw new Error('Falha ao buscar diagnóstico');
    }
    
    const diag = res.data.data;
    
    // Mapear categorias para formato esperado pelo frontend
    const categories = (diag.categorias || []).map((cat) => {
      // Mapear status baseado no nível (pode ser ajustado conforme regras de negócio)
      let status: 'attention' | 'evolving' | 'ok' = 'ok';
      if (cat.level_id <= 2) {
        status = 'attention';
      } else if (cat.level_id === 3) {
        status = 'evolving';
      }
      
      return {
        id: cat.category_id.toString(),
        name: `Categoria ${cat.category_id}`, // Pode ser melhorado buscando nome real da categoria
        score: cat.score,
        status: status,
        insight: cat.insight || '',
        actions: [], // Pode ser preenchido com dados adicionais se necessário
        resources: [] // Pode ser preenchido com dados adicionais se necessário
      };
    });
    
    const diagnosticoDetail: DiagnosticoDetail = {
      id: diag.id.toString(),
      date: diag.performed_at,
      overallScore: diag.overall_score,
      categories: categories,
      notes: [] // Pode ser preenchido com dados adicionais se necessário
    };
    
    console.log('✅ [DashboardService] Diagnóstico encontrado com', categories.length, 'categorias');
    
    return diagnosticoDetail;
    
  } catch (error) {
    console.error('[DashboardService] Erro ao buscar diagnóstico:', error);
    throw error;
  }
}

export const dashboardService = { getDashboard, getDiagnostico, listDiagnosticos };
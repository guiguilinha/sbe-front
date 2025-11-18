import api from '../api';
import type { 
  CompleteDiagnosticRequest, 
  CompleteDiagnosticResponse,
  Diagnostic
} from '@contracts';

/**
 * Serviço responsável por gerenciar chamadas à API de persistência de diagnósticos
 */
export class DiagnosticPersistenceService {
  /**
   * Salva diagnóstico completo no backend
   * 
   * @param diagnosticData - Dados completos do diagnóstico
   * @returns Resposta com dados salvos
   */
  async saveDiagnostic(
    diagnosticData: CompleteDiagnosticRequest
  ): Promise<CompleteDiagnosticResponse> {
    try {
      console.log('💾 [DiagnosticPersistence] Salvando diagnóstico no backend...');
      console.log('💾 [DiagnosticPersistence] Usuário:', diagnosticData.usuario.given_name);
      console.log('💾 [DiagnosticPersistence] Empresa:', diagnosticData.diagnostico.empresaSelecionada);
      console.log('💾 [DiagnosticPersistence] Pontuação:', diagnosticData.diagnostico.pontuacaoGeral);
      
      const response = await api.post<CompleteDiagnosticResponse>(
        '/diagnostics',
        diagnosticData
      );
      
      if (!response.data.success) {
        throw new Error('Resposta do backend indica falha');
      }
      
      console.log('✅ [DiagnosticPersistence] Diagnóstico salvo com sucesso');
      console.log('✅ [DiagnosticPersistence] ID do diagnóstico:', response.data.data.diagnostic.id);
      
      return response.data;
      
    } catch (error) {
      console.error('❌ [DiagnosticPersistence] Erro ao salvar diagnóstico:', error);
      
      if (error instanceof Error) {
        throw new Error(`Falha ao salvar diagnóstico: ${error.message}`);
      }
      
      throw new Error('Erro desconhecido ao salvar diagnóstico no banco de dados');
    }
  }

  /**
   * Busca diagnósticos de um usuário
   * 
   * @param userId - ID do usuário
   * @returns Lista de diagnósticos do usuário
   */
  async getUserDiagnostics(userId: string): Promise<Diagnostic[]> {
    try {
      console.log('🔍 [DiagnosticPersistence] Buscando diagnósticos do usuário:', userId);
      
      const response = await api.get<{ success: boolean; data: Diagnostic[] }>(
        `/diagnostics/user/${userId}`
      );
      
      if (!response.data.success) {
        throw new Error('Resposta do backend indica falha');
      }
      
      console.log('✅ [DiagnosticPersistence] Diagnósticos encontrados:', response.data.data.length);
      
      return response.data.data;
      
    } catch (error) {
      console.error('❌ [DiagnosticPersistence] Erro ao buscar diagnósticos:', error);
      
      if (error instanceof Error) {
        throw new Error(`Falha ao buscar diagnósticos: ${error.message}`);
      }
      
      throw new Error('Erro desconhecido ao buscar diagnósticos');
    }
  }

  /**
   * Busca diagnóstico específico por ID
   * 
   * @param diagnosticId - ID do diagnóstico
   * @returns Dados completos do diagnóstico
   */
  async getDiagnosticById(diagnosticId: number): Promise<Diagnostic> {
    try {
      console.log('🔍 [DiagnosticPersistence] Buscando diagnóstico por ID:', diagnosticId);
      
      const response = await api.get<{ success: boolean; data: Diagnostic }>(
        `/diagnostics/${diagnosticId}`
      );
      
      if (!response.data.success) {
        throw new Error('Resposta do backend indica falha');
      }
      
      console.log('✅ [DiagnosticPersistence] Diagnóstico encontrado');
      
      return response.data.data;
      
    } catch (error) {
      console.error('❌ [DiagnosticPersistence] Erro ao buscar diagnóstico:', error);
      
      if (error instanceof Error) {
        throw new Error(`Falha ao buscar diagnóstico: ${error.message}`);
      }
      
      throw new Error('Erro desconhecido ao buscar diagnóstico');
    }
  }

  /**
   * Verifica se o serviço de persistência está disponível
   * 
   * @returns true se disponível, false caso contrário
   */
  async healthCheck(): Promise<boolean> {
    try {
      // Tentar fazer uma requisição simples
      await api.get('/diagnostics/health');
      return true;
    } catch (error) {
      console.warn('⚠️ [DiagnosticPersistence] Serviço de persistência indisponível');
      return false;
    }
  }
}

// Exportar instância singleton
export const diagnosticPersistenceService = new DiagnosticPersistenceService();

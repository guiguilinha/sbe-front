/**
 * Serviço para enriquecimento de dados do usuário
 * Chama a API do backend para combinar dados do Keycloak com dados da empresa
 */

import { EnrichedUserData } from '../types/enriched-user.types';

export class EnrichedUserService {
  private readonly baseUrl: string;

  constructor() {
    // Usa a URL do backend configurada
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  }

  /**
   * Enriquece dados do usuário usando o token Keycloak
   * @param idToken - Token ID do Keycloak
   * @returns Dados enriquecidos do usuário
   */
  async enrichUserData(idToken: string): Promise<EnrichedUserData> {
    try {
      console.log('🚀 [EnrichedUserService] Iniciando enriquecimento de dados...');

      const response = await fetch(`${this.baseUrl}/auth/enrich-user-data`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      }

      const enrichedData: EnrichedUserData = await response.json();
      
      console.log('✅ [EnrichedUserService] Dados enriquecidos recebidos:', {
        hasUserData: !!enrichedData.user,
        hasEmpresaData: enrichedData.metadata.hasEmpresaData,
        empresaSource: enrichedData.metadata.empresaSource,
        lastUpdated: enrichedData.metadata.lastUpdated
      });

      return enrichedData;

    } catch (error) {
      console.error('❌ [EnrichedUserService] Erro no enriquecimento:', error);
      
      if (error instanceof Error) {
        throw new Error(`Falha no enriquecimento de dados: ${error.message}`);
      }
      
      throw new Error('Erro desconhecido no enriquecimento de dados');
    }
  }

  /**
   * Verifica o status dos serviços de enriquecimento
   * @returns Status dos serviços
   */
  async getServiceStatus(): Promise<any> {
    try {
      console.log('🔍 [EnrichedUserService] Verificando status dos serviços...');

      const response = await fetch(`${this.baseUrl}/auth/enrich-user-status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const status = await response.json();
      
      console.log('✅ [EnrichedUserService] Status dos serviços:', status);
      
      return status;

    } catch (error) {
      console.error('❌ [EnrichedUserService] Erro ao verificar status:', error);
      throw error;
    }
  }

  /**
   * Verifica se o serviço está configurado
   * @returns true se configurado, false caso contrário
   */
  isConfigured(): boolean {
    return !!(this.baseUrl && this.baseUrl.length > 0);
  }
}

// Instância singleton do serviço
export const enrichedUserService = new EnrichedUserService();

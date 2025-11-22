/**
 * Implementação EXTREMAMENTE SIMPLES do Keycloak
 * Sem loops, sem complexidade desnecessária
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { EnrichedUserData } from '@/types/enriched-user.types';
import { enrichedUserService } from '../services/enriched-user.service';
import { bindAuthTokenGetter } from '../services/api';

// Tipos simples (mantidos para compatibilidade)
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles?: string[];
  permissions?: string[];
}

export interface AuthContextType {
  authenticated: boolean;
  user: AuthUser | null;
  enrichedUserData: EnrichedUserData | null;
  loading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
  register: () => void;
  refreshEnrichedUserData: () => Promise<void>;
}

// Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configuração Keycloak (via variáveis de ambiente)
const KEYCLOAK_CONFIG = {
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'externo',
  url: import.meta.env.VITE_KEYCLOAK_AUTH_SERVER_URL || 'https://amei.homolog.kubernetes.sebrae.com.br/auth',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'maturidadedigital',
  sslRequired: import.meta.env.VITE_KEYCLOAK_SSL_REQUIRED || 'external',
  publicClient: import.meta.env.VITE_KEYCLOAK_PUBLIC_CLIENT === 'true' || true,
  confidentialPort: parseInt(import.meta.env.VITE_KEYCLOAK_CONFIDENTIAL_PORT || '0')
};

interface SimpleAuthProviderProps {
  children: ReactNode;
}

export function SimpleAuthProvider({ children }: SimpleAuthProviderProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [enrichedUserData, setEnrichedUserData] = useState<EnrichedUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keycloak, setKeycloak] = useState<any>(null);

  // Inicialização SIMPLES - apenas uma vez
  useEffect(() => {
    const initKeycloak = async () => {
      try {
        // Verifica se script está disponível
        if (!(window as any).Keycloak) {
          throw new Error('Script Keycloak não encontrado');
        }

        // Cria instância
        const kc = new (window as any).Keycloak(KEYCLOAK_CONFIG);
        
        // Inicializa com check-sso
        const authenticated = await kc.init({
          onLoad: 'check-sso',
          checkLoginIframe: false,
          pkceMethod: 'S256',
          enableLogging: false
        });

            // Atualiza estado
            if (authenticated) {
              const userData = {
                id: kc.tokenParsed?.sub || 'unknown',
                name: kc.tokenParsed?.name || kc.tokenParsed?.preferred_username || 'Usuário',
                email: kc.tokenParsed?.email || '',
                roles: kc.tokenParsed?.realm_access?.roles || [],
                permissions: kc.tokenParsed?.resource_access?.[kc.clientId]?.roles || []
              };
          
              // Log de login via Keycloak
              console.log('🔑 [Keycloak Login] Login realizado com sucesso');
              console.log('🔑 [Keycloak Login] Dados da resposta:', JSON.stringify({
                userId: userData.id,
                name: userData.name,
                email: userData.email,
                roles: userData.roles,
                permissions: userData.permissions,
                tokenParsed: kc.tokenParsed
              }, null, 2));
          
          setAuthenticated(true);
          setUser(userData);

          // Enriquecer dados do usuário
          await enrichUserData(kc.idToken);
        }

        setKeycloak(kc);
        setLoading(false);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setLoading(false);
      }
    };

    initKeycloak();
  }, []); // Array vazio - executa apenas uma vez

  // Configurar o token getter para a API
  useEffect(() => {
    bindAuthTokenGetter(async () => {
      if (keycloak && authenticated) {
        return keycloak.token;
      }
      return undefined;
    });
  }, [keycloak, authenticated]);

      // Método para enriquecer dados do usuário
      const enrichUserData = async (idToken: string): Promise<void> => {
        try {
          const enrichedData = await enrichedUserService.enrichUserData(idToken);
          setEnrichedUserData(enrichedData);
        } catch (error) {
          console.warn('⚠️ [EnrichedUser] Erro no enriquecimento:', error);
        }
      };

      // Método público para recarregar dados enriquecidos
      const refreshEnrichedUserData = async (): Promise<void> => {
        if (keycloak && authenticated && keycloak.idToken) {
          console.log('🔄 [SimpleAuthProvider] Recarregando dados enriquecidos...');
          await enrichUserData(keycloak.idToken);
          console.log('✅ [SimpleAuthProvider] Dados enriquecidos recarregados');
        } else {
          console.warn('⚠️ [SimpleAuthProvider] Não é possível recarregar dados: usuário não autenticado');
        }
      };

  // Login SIMPLES
  const login = () => {
    if (keycloak) {
      keycloak.login({
        redirectUri: 'http://localhost:5173/'
      });
    }
  };

  // Logout SIMPLES
  const logout = () => {
    if (keycloak) {
      keycloak.logout();
    }
  };

  // Register SIMPLES
  const register = () => {
    if (keycloak) {
      keycloak.register();
    }
  };

  const value: AuthContextType = {
    authenticated,
    user,
    enrichedUserData,
    loading,
    error,
    login,
    logout,
    register,
    refreshEnrichedUserData: async () => {
      if (keycloak && authenticated && keycloak.idToken) {
        console.log('🔄 [SimpleAuthProvider] Recarregando dados enriquecidos...');
        try {
          const enrichedData = await enrichedUserService.enrichUserData(keycloak.idToken);
          setEnrichedUserData(enrichedData);
          console.log('✅ [SimpleAuthProvider] Dados enriquecidos recarregados');
        } catch (error) {
          console.warn('⚠️ [SimpleAuthProvider] Erro ao recarregar dados:', error);
        }
      } else {
        console.warn('⚠️ [SimpleAuthProvider] Não é possível recarregar dados: usuário não autenticado');
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook simples
export function useSimpleAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSimpleAuth deve ser usado dentro de SimpleAuthProvider');
  }
  return context;
}
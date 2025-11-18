/**
 * Hook SIMPLES para usar com SimpleAuthProvider
 */

import { useSimpleAuth } from './SimpleAuthProvider';

export function useAuth() {
  const auth = useSimpleAuth();
  
  return {
    // Estado de autenticação
    isAuthenticated: auth.authenticated,
    user: auth.user,
    isLoading: auth.loading,
    error: auth.error,
    
    // Métodos de autenticação
    login: auth.login,
    logout: auth.logout,
    register: auth.register,
    
    // Métodos vazios para compatibilidade
    refreshToken: async () => null,
    hasRole: () => false,
    hasPermission: () => false,
    
    // Informações do contexto
    isKeycloak: true,
    isFallback: false,
    environment: 'development',
    
    // Estados de loading específicos
    isLoggingIn: false,
    isLoggingOut: false,
    isRefreshing: false,
  };
}

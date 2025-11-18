/**
 * Hook personalizado para acessar configurações do ambiente
 */

import { useMemo } from 'react';
import { getEnvironmentConfig, type EnvironmentConfig } from '../config/environment';

export interface UseConfigReturn extends EnvironmentConfig {
  buildApiUrl: (endpoint: string) => string;
  buildDirectusUrl: (path?: string) => string;
  isLocalhost: boolean;
  isProduction: boolean;
  isDevelopment: boolean;
  isHomologation: boolean;
}

/**
 * Hook que retorna a configuração atual do ambiente
 * Recalcula automaticamente quando o ambiente muda
 */
export function useConfig(): UseConfigReturn {
  const config = useMemo(() => {
    const envConfig = getEnvironmentConfig();
    
    return {
      ...envConfig,
      buildApiUrl: (endpoint: string) => `${envConfig.API_URL}${endpoint}`,
      buildDirectusUrl: (path?: string) => `${envConfig.DIRECTUS_URL}${path ? `/${path}` : ''}`,
      isLocalhost: typeof window !== 'undefined' && 
                   (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'),
      isProduction: envConfig.IS_PRODUCTION,
      isDevelopment: envConfig.IS_DEVELOPMENT,
      isHomologation: envConfig.IS_HOMOLOGATION,
    };
  }, []);

  return config;
}

/**
 * Hook específico para URLs da API
 */
export function useApiUrl() {
  const config = useConfig();
  
  return {
    baseUrl: config.API_URL,
    buildUrl: config.buildApiUrl,
    fullUrl: (endpoint: string) => {
      if (typeof window !== 'undefined') {
        return `${window.location.origin}${config.buildApiUrl(endpoint)}`;
      }
      return config.buildApiUrl(endpoint);
    }
  };
}

/**
 * Hook específico para URLs do Directus
 */
export function useDirectusUrl() {
  const config = useConfig();
  
  return {
    baseUrl: config.DIRECTUS_URL,
    buildUrl: config.buildDirectusUrl,
    assetsUrl: (assetId: string) => config.buildDirectusUrl(`assets/${assetId}`),
  };
}

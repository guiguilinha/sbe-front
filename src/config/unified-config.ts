import { getEnvironmentConfig } from './environment';

export interface UnifiedConfig {
  // Configurações do Frontend
  FRONTEND_DOMAIN: string;
  FRONTEND_PORT: string;
  API_URL: string;
  DIRECTUS_URL: string; // Apenas para processamento de imagens
  ASSETS_PATH: string;
  
  // Configurações do Keycloak
  KEYCLOAK_AUTH_SERVER_URL: string;
  KEYCLOAK_REALM: string;
  KEYCLOAK_CLIENT_ID: string;
  KEYCLOAK_SSL: string;
  KEYCLOAK_PUBLIC_CLIENT: boolean;
  KEYCLOAK_CONFIDENTIAL_PORT: number;
  
  // Metadados
  ENVIRONMENT: string;
  IS_PRODUCTION: boolean;
  IS_DEVELOPMENT: boolean;
  IS_HOMOLOGATION: boolean;
}

function detectEnvironment(): 'development' | 'production' | 'homologation' {
  const hostname = window.location.hostname;
  
  if (hostname.includes('sebrae-mg.com.br') || hostname.includes('sebraemg.com.br')) {
    return 'production';
  }
  
  if (hostname.includes('homolog')) {
    return 'homologation';
  }
  
  return 'development';
}

export function getUnifiedConfig(): UnifiedConfig {
  const environment = detectEnvironment();
  const baseConfig = getEnvironmentConfig();
  
  switch (environment) {
    case 'development':
      return {
        // Frontend
        FRONTEND_DOMAIN: import.meta.env.VITE_DEVELOPMENT_DOMAIN || 'http://localhost:5173',
        FRONTEND_PORT: import.meta.env.VITE_DEVELOPMENT_PORT || '5173',
        API_URL: baseConfig.API_URL,
        DIRECTUS_URL: baseConfig.DIRECTUS_URL,
        ASSETS_PATH: import.meta.env.VITE_DEVELOPMENT_ASSETS_PATH || 'assets',
        
        // Keycloak
        KEYCLOAK_AUTH_SERVER_URL: import.meta.env.VITE_DEVELOPMENT_KEYCLOAK_AUTH_SERVER_URL || 'https://amei.homolog.kubernetes.sebrae.com.br/auth',
        KEYCLOAK_REALM: import.meta.env.VITE_DEVELOPMENT_KEYCLOAK_REALM || 'externo',
        KEYCLOAK_CLIENT_ID: import.meta.env.VITE_DEVELOPMENT_KEYCLOAK_CLIENT_ID || 'maturidadedigital',
        KEYCLOAK_SSL: import.meta.env.VITE_DEVELOPMENT_KEYCLOAK_SSL || 'external',
        KEYCLOAK_PUBLIC_CLIENT: import.meta.env.VITE_DEVELOPMENT_KEYCLOAK_PUBLIC_CLIENT === 'true',
        KEYCLOAK_CONFIDENTIAL_PORT: parseInt(import.meta.env.VITE_DEVELOPMENT_KEYCLOAK_CONFIDENTIAL_PORT || '0'),
        
        // Backend (para referência)
        // BACKEND_URL removido - usando API_URL
        
        // Metadados
        ENVIRONMENT: baseConfig.ENVIRONMENT,
        IS_PRODUCTION: baseConfig.IS_PRODUCTION,
        IS_DEVELOPMENT: baseConfig.IS_DEVELOPMENT,
        IS_HOMOLOGATION: baseConfig.IS_HOMOLOGATION,
      };
    
    case 'production':
      return {
        // Frontend
        FRONTEND_DOMAIN: import.meta.env.VITE_PRODUCTION_DOMAIN || 'https://sebraemg.com.br/maturidade-digital',
        FRONTEND_PORT: import.meta.env.VITE_PRODUCTION_PORT || '80',
        API_URL: baseConfig.API_URL,
        DIRECTUS_URL: baseConfig.DIRECTUS_URL,
        ASSETS_PATH: import.meta.env.VITE_PRODUCTION_ASSETS_PATH || 'assets',
        
        // Keycloak
        KEYCLOAK_AUTH_SERVER_URL: import.meta.env.VITE_PRODUCTION_KEYCLOAK_AUTH_SERVER_URL || 'https://amei.sebrae.com.br/auth',
        KEYCLOAK_REALM: import.meta.env.VITE_PRODUCTION_KEYCLOAK_REALM || '',
        KEYCLOAK_CLIENT_ID: import.meta.env.VITE_PRODUCTION_KEYCLOAK_CLIENT_ID || '',
        KEYCLOAK_SSL: import.meta.env.VITE_PRODUCTION_KEYCLOAK_SSL || '',
        KEYCLOAK_PUBLIC_CLIENT: import.meta.env.VITE_PRODUCTION_KEYCLOAK_PUBLIC_CLIENT === 'true',
        KEYCLOAK_CONFIDENTIAL_PORT: parseInt(import.meta.env.VITE_PRODUCTION_KEYCLOAK_CONFIDENTIAL_PORT || '0'),
        
        // Backend (para referência)
        // BACKEND_URL removido - usando API_URL
        
        // Metadados
        ENVIRONMENT: baseConfig.ENVIRONMENT,
        IS_PRODUCTION: baseConfig.IS_PRODUCTION,
        IS_DEVELOPMENT: baseConfig.IS_DEVELOPMENT,
        IS_HOMOLOGATION: baseConfig.IS_HOMOLOGATION,
      };
    
    case 'homologation':
      return {
        // Frontend
        FRONTEND_DOMAIN: import.meta.env.VITE_DEVELOPMENT_DOMAIN || 'https://homolog.sebraemg.com.br/maturidade-digital',
        FRONTEND_PORT: import.meta.env.VITE_DEVELOPMENT_PORT || '80',
        API_URL: baseConfig.API_URL,
        DIRECTUS_URL: baseConfig.DIRECTUS_URL,
        ASSETS_PATH: import.meta.env.VITE_DEVELOPMENT_ASSETS_PATH || 'assets',
        
        // Keycloak
        KEYCLOAK_AUTH_SERVER_URL: import.meta.env.VITE_DEVELOPMENT_KEYCLOAK_AUTH_SERVER_URL || 'https://amei.homolog.kubernetes.sebrae.com.br/auth',
        KEYCLOAK_REALM: import.meta.env.VITE_DEVELOPMENT_KEYCLOAK_REALM || 'externo',
        KEYCLOAK_CLIENT_ID: import.meta.env.VITE_DEVELOPMENT_KEYCLOAK_CLIENT_ID || 'maturidadedigital',
        KEYCLOAK_SSL: import.meta.env.VITE_DEVELOPMENT_KEYCLOAK_SSL || 'external',
        KEYCLOAK_PUBLIC_CLIENT: import.meta.env.VITE_DEVELOPMENT_KEYCLOAK_PUBLIC_CLIENT === 'true',
        KEYCLOAK_CONFIDENTIAL_PORT: parseInt(import.meta.env.VITE_DEVELOPMENT_KEYCLOAK_CONFIDENTIAL_PORT || '0'),
        
        // Backend (para referência)
        // BACKEND_URL removido - usando API_URL
        
        // Metadados
        ENVIRONMENT: baseConfig.ENVIRONMENT,
        IS_PRODUCTION: baseConfig.IS_PRODUCTION,
        IS_DEVELOPMENT: baseConfig.IS_DEVELOPMENT,
        IS_HOMOLOGATION: baseConfig.IS_HOMOLOGATION,
      };
    
    default:
      throw new Error(`Ambiente não reconhecido: ${environment}`);
  }
}
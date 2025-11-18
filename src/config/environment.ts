export interface EnvironmentConfig {
  API_URL: string;
  DIRECTUS_URL: string; // Apenas para processamento de imagens
  ENVIRONMENT: string;
  IS_PRODUCTION: boolean;
  IS_DEVELOPMENT: boolean;
  IS_HOMOLOGATION: boolean;
}

function detectEnvironment(): 'development' | 'production' | 'homologation' {
  // Verifica variável de ambiente do Vite
  if (import.meta.env.VITE_ENVIRONMENT) {
    return import.meta.env.VITE_ENVIRONMENT as 'development' | 'production' | 'homologation';
  }
  
  // Verifica se está em produção baseado no hostname
  const hostname = window.location.hostname;
  
  if (hostname.includes('sebrae-mg.com.br') || hostname.includes('sebraemg.com.br')) {
    return 'production';
  }
  
  if (hostname.includes('homolog')) {
    return 'homologation';
  }
  
  return 'development';
}

export function getEnvironmentConfig(): EnvironmentConfig {
  const environment = detectEnvironment();
  
  switch (environment) {
    case 'development':
      return {
        API_URL: import.meta.env.VITE_DEVELOPMENT_API_URL || '/api',
        DIRECTUS_URL: import.meta.env.VITE_DEVELOPMENT_DIRECTUS_URL || 'http://localhost:8055',
        ENVIRONMENT: 'development',
        IS_PRODUCTION: false,
        IS_DEVELOPMENT: true,
        IS_HOMOLOGATION: false,
      };
    
    case 'production':
      return {
        API_URL: import.meta.env.VITE_PRODUCTION_API_URL || '/api',
        DIRECTUS_URL: import.meta.env.VITE_PRODUCTION_DIRECTUS_URL || 'https://cms.sebrae-mg.com.br',
        ENVIRONMENT: 'production',
        IS_PRODUCTION: true,
        IS_DEVELOPMENT: false,
        IS_HOMOLOGATION: false,
      };
    
    case 'homologation':
      return {
        API_URL: import.meta.env.VITE_DEVELOPMENT_API_URL || '/api',
        DIRECTUS_URL: import.meta.env.VITE_DEVELOPMENT_DIRECTUS_URL || 'https://homolog-cms.sebrae-mg.com.br',
        ENVIRONMENT: 'homologation',
        IS_PRODUCTION: false,
        IS_DEVELOPMENT: false,
        IS_HOMOLOGATION: true,
      };
    
    default:
      return {
        API_URL: '/api',
        DIRECTUS_URL: 'http://localhost:8055',
        ENVIRONMENT: 'development',
        IS_PRODUCTION: false,
        IS_DEVELOPMENT: true,
        IS_HOMOLOGATION: false,
      };
  }
}
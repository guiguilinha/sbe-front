/**
 * Função genérica para corrigir URLs de imagens do Directus
 * @param url - URL ou ID da imagem
 * @returns URL completa da imagem
 */
export const fixDirectusImageUrl = (url: string): string => {
  // Se é um ID de imagem do Directus (UUID)
  if (url.match(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/)) {
    if (import.meta.env.PROD) {
      // Em produção, usa URL relativa para o proxy
      return `/assets/${url}`;
    } else {
      // Em desenvolvimento, usa o Directus local
      const directusUrl = import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055';
      return `${directusUrl}/assets/${url}`;
    }
  }
  
  // Se é uma URL HTTP, converte para HTTPS em produção
  if (import.meta.env.PROD && url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  
  return url;
};

/**
 * Função para verificar se uma string é um UUID válido
 * @param str - String para verificar
 * @returns true se for um UUID válido
 */
export const isUUID = (str: string): boolean => {
  return /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(str);
};

/**
 * Função para obter a URL base do Directus baseada no ambiente
 * @returns URL base do Directus
 */
export const getDirectusBaseUrl = (): string => {
  // Usa sempre a configuração dinâmica via variáveis de ambiente
  const directusUrl = import.meta.env.VITE_DIRECTUS_URL;
  
  if (!directusUrl) {
    console.warn('⚠️ VITE_DIRECTUS_URL não configurada, usando fallback');
    return import.meta.env.PROD 
      ? 'https://cms.sebrae-mg.com.br/assets'
      : 'http://localhost:8055/assets';
  }
  
  return `${directusUrl}/assets`;
}; 
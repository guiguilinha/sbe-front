// Script para detectar a URL atual do Directus e salvar informações no sessionStorage
(function() {
  'use strict';
  
  console.log('[DirectusDetector] Script carregado');
  
  // Função para extrair collection e ID da URL atual
  function extractCollectionAndId() {
    const currentUrl = window.location.href;
    console.log('[DirectusDetector] URL atual:', currentUrl);
    
    try {
      const url = new URL(currentUrl);
      const pathParts = url.pathname.split('/');
      console.log('[DirectusDetector] Path parts:', pathParts);
      
      let collection = null;
      let id = null;
      
      // Procurar por padrões como /content/home_hero ou /content/home_hero/123
      const contentIndex = pathParts.indexOf('content');
      if (contentIndex !== -1 && pathParts[contentIndex + 1]) {
        collection = pathParts[contentIndex + 1];
        id = pathParts[contentIndex + 2] || null;
        console.log('[DirectusDetector] Detectado via content:', collection, id);
      }
      
      // Procurar por padrões como /items/home_hero ou /items/home_hero/123
      const itemsIndex = pathParts.indexOf('items');
      if (itemsIndex !== -1 && pathParts[itemsIndex + 1]) {
        collection = pathParts[itemsIndex + 1];
        id = pathParts[itemsIndex + 2] || null;
        console.log('[DirectusDetector] Detectado via items:', collection, id);
      }
      
      // Procurar por padrões como /admin/content/home_hero ou /admin/content/home_hero/123
      const adminContentIndex = pathParts.indexOf('admin');
      if (adminContentIndex !== -1 && pathParts[adminContentIndex + 1] === 'content' && pathParts[adminContentIndex + 2]) {
        collection = pathParts[adminContentIndex + 2];
        id = pathParts[adminContentIndex + 3] || null;
        console.log('[DirectusDetector] Detectado via admin content:', collection, id);
      }
      
      // Salvar no sessionStorage
      if (collection) {
        sessionStorage.setItem('directus_collection', collection);
        if (id) {
          sessionStorage.setItem('directus_id', id);
        }
        console.log('[DirectusDetector] Salvo no sessionStorage:', collection, id);
        return { collection, id };
      }
      
    } catch (error) {
      console.error('[DirectusDetector] Erro ao analisar URL:', error);
    }
    
    return { collection: null, id: null };
  }
  
  // Executar imediatamente
  extractCollectionAndId();
  
  // Executar quando a URL mudar (para SPA)
  let lastUrl = window.location.href;
  const observer = new MutationObserver(() => {
    if (window.location.href !== lastUrl) {
      lastUrl = window.location.href;
      console.log('[DirectusDetector] URL mudou, re-analisando...');
      extractCollectionAndId();
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Também escutar mudanças de hash
  window.addEventListener('hashchange', () => {
    console.log('[DirectusDetector] Hash mudou, re-analisando...');
    extractCollectionAndId();
  });
  
  // Também escutar mudanças de popstate (navegação)
  window.addEventListener('popstate', () => {
    console.log('[DirectusDetector] Popstate, re-analisando...');
    extractCollectionAndId();
  });
  
})();

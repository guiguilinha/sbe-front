/**
 * Página de teste para o sistema de autenticação
 * Integra todos os componentes de teste criados
 */

// Componentes de teste removidos - não existem mais
// import { AuthTestComponent } from '../auth/AuthTestComponent';
// import { HooksTestComponent } from '../auth/HooksTestComponent';

/**
 * Página de teste para autenticação
 */
export default function AuthTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🧪 Teste do Sistema de Autenticação
          </h1>
          <p className="text-gray-600">
            Validação completa do sistema Keycloak + Fallback
          </p>
        </div>

        {/* Componentes de teste removidos - não existem mais */}
        <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">
            ⚠️ Componentes de teste (AuthTestComponent, HooksTestComponent) foram removidos.
          </p>
        </div>

        {/* Informações do sistema */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">ℹ️ Informações do Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Ambiente:</span>
              <span className="ml-2 text-gray-600">{import.meta.env.VITE_ENVIRONMENT || 'development'}</span>
            </div>
            <div>
              <span className="font-medium">Modo:</span>
              <span className="ml-2 text-gray-600">{import.meta.env.PROD ? 'Production' : 'Development'}</span>
            </div>
            <div>
              <span className="font-medium">API URL:</span>
              <span className="ml-2 text-gray-600">{import.meta.env.VITE_API_URL || '/api'}</span>
            </div>
            <div>
              <span className="font-medium">Directus URL:</span>
              <span className="ml-2 text-gray-600">{import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

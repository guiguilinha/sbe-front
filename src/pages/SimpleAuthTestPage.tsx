/**
 * Página de teste simples para isolar problemas
 */

export default function SimpleAuthTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🧪 Teste Simples
          </h1>
          <p className="text-gray-600">
            Teste básico sem dependências complexas
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">✅ Página Funcionando</h2>
          <p className="text-gray-600 mb-4">
            Se você está vendo esta mensagem, a página está carregando corretamente.
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">🎉 Sucesso!</h3>
            <p className="text-green-700">
              O sistema de roteamento está funcionando. O problema pode estar nos componentes de autenticação.
            </p>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">🔍 Informações do Sistema</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <div>Ambiente: {import.meta.env.VITE_ENVIRONMENT || 'development'}</div>
              <div>Modo: {import.meta.env.PROD ? 'Production' : 'Development'}</div>
              <div>API URL: {import.meta.env.VITE_API_URL || '/api'}</div>
              <div>Directus URL: {import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

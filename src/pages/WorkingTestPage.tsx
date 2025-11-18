export default function WorkingTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎉 Sistema Funcionando!
        </h1>
        <p className="text-gray-600 mb-8">
          O React está renderizando corretamente!
        </p>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          ✅ Página de teste funcionando perfeitamente
        </div>
        <div className="mt-4">
          <a href="/" className="text-blue-600 hover:text-blue-800">
            ← Voltar para página principal
          </a>
        </div>
      </div>
    </div>
  );
}

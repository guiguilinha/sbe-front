import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/auth/SimpleUseAuth'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }
  
  if (!isAuthenticated) {
    // Em vez de redirecionar para /login, mantém na página atual
    // e mostra modal de autenticação (isso será tratado pelo useQuizAccess)
    return <Navigate to="/" state={{ from: location }} replace />
  }
  
  return <>{children}</>
}

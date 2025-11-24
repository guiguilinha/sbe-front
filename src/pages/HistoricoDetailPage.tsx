import DashboardShell from '@/components/layout/DashboardShell';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDiagnostico } from '@/hooks/useDiagnostico';
import CategoryList from '@/blocks/CategoryList';
import { EvolutionBlock } from '@/blocks/EvolutionBlock';
import { ArrowLeft, Home, History } from 'lucide-react';

export default function HistoricoDetailPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, error } = useDiagnostico(id);
  
  // Detectar de onde o usuário veio baseado no referrer ou state
  const referrer = location.state?.from || document.referrer;
  const isFromDashboard = referrer.includes('/dashboard') || location.state?.from === 'dashboard';
  const isFromHistorico = referrer.includes('/historico') || location.state?.from === 'historico';
  
  // Determinar para onde voltar
  const getBackPath = () => {
    if (isFromDashboard) return '/dashboard';
    if (isFromHistorico) return '/historico';
    return '/dashboard'; // fallback padrão
  };
  
  const getBackLabel = () => {
    if (isFromDashboard) return 'Voltar ao Dashboard';
    if (isFromHistorico) return 'Voltar ao Histórico';
    return 'Voltar ao Dashboard';
  };
  
  const getBackIcon = () => {
    if (isFromDashboard) return <Home className="w-4 h-4" />;
    if (isFromHistorico) return <History className="w-4 h-4" />;
    return <ArrowLeft className="w-4 h-4" />;
  };
  
  if (isLoading) return (
    <DashboardShell>
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando diagnóstico...</p>
        </div>
      </div>
    </DashboardShell>
  );
  
  if (error || !data) return (
    <DashboardShell>
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Erro ao carregar diagnóstico</p>
        <button 
          onClick={() => navigate(getBackPath())}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
        >
          {getBackIcon()}
          {getBackLabel()}
        </button>
      </div>
    </DashboardShell>
  );

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Header com navegação dinâmica */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Diagnóstico {data.id}</h1>
            <p className="text-sm text-muted-foreground">{new Date(data.date).toLocaleDateString('pt-BR')}</p>
          </div>
          <button 
            onClick={() => navigate(getBackPath())}
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
          >
            {getBackIcon()}
            {getBackLabel()}
          </button>
        </div>
        <EvolutionBlock 
          insightLines={`Evolução consolidada: ${data.overallScore} pts`} 
        />
        <CategoryList categories={data.categories} defaultOpenCount={2} />
      </div>
    </DashboardShell>
  );
}

import DashboardShell from '@/components/layout/DashboardShell';
import { useDashboard } from '@/hooks/useDashboard';
import { HeroStatus } from '@/blocks/HeroStatus';
import CategoryList from '@/blocks/CategoryList';
import { HistoryTableBlock } from '@/blocks/HistoryTableBlock';
import { TrailCTA } from '@/blocks/TrailCTA';
import { EvolutionBlock } from '@/blocks/EvolutionBlock';

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboard();
  
  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-600">Carregando dados do dashboard...</p>
          </div>
        </div>
      </DashboardShell>
    );
  }
  
  if (error) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-2">Erro ao carregar dashboard</p>
            <p className="text-sm text-gray-600">{error.message}</p>
          </div>
        </div>
      </DashboardShell>
    );
  }
  
  // Se não tem dados (usuário sem diagnósticos), mostrar mensagem amigável
  if (!data || !data.categories || data.categories.length === 0) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="text-center max-w-md">
            <p className="text-lg font-medium text-gray-900 mb-2">
              Bem-vindo ao Dashboard!
            </p>
            <p className="text-gray-600 mb-4">
              Você ainda não realizou nenhum diagnóstico. Realize seu primeiro diagnóstico para ver seus resultados aqui.
            </p>
            <a 
              href="/quiz" 
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Fazer diagnóstico
            </a>
          </div>
        </div>
      </DashboardShell>
    );
  }
  
  return (
    <DashboardShell>
      <div className="space-y-8">
        <HeroStatus data={data} />
        <CategoryList categories={data.categories} defaultOpenCount={2} />
        <TrailCTA data={data.trailCta} />
        <EvolutionBlock 
          insightLines={(data as any).evolution?.insightLines || [
            "Atualmente em sua trilha de crescimento",
            "Continue evoluindo para alcançar novos patamares"
          ]}
        />
        <HistoryTableBlock data={data} viewAllHref='/historico' />
      </div>
    </DashboardShell>
  );
}

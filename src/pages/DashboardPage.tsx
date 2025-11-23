import DashboardShell from '@/components/layout/DashboardShell';
import { useDashboard } from '@/hooks/useDashboard';
import { HeroStatus } from '@/blocks/HeroStatus';
import CategoryList from '@/blocks/CategoryList';
import { HistoryTableBlock } from '@/blocks/HistoryTableBlock';
import { TrailCTA } from '@/blocks/TrailCTA';
import { EvolutionBlock } from '@/blocks/EvolutionBlock';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Skeleton para HeroStatus
const HeroStatusSkeleton = () => (
  <Card className="rounded-2xl border-0 shadow-lg">
    <CardHeader className="pb-0">
      <Skeleton className="h-6 w-48" />
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
      <Skeleton className="h-10 w-48 rounded-lg" />
    </CardContent>
  </Card>
);

// Skeleton para CategoryList
const CategoryListSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-7 w-56" />
    {[...Array(3)].map((_, i) => (
      <Card key={i} className="rounded-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2 mt-4">
              <Skeleton className="h-8 w-24 rounded" />
              <Skeleton className="h-8 w-24 rounded" />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

// Skeleton para TrailCTA
const TrailCTASkeleton = () => (
  <Card className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50">
    <CardContent className="p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </CardContent>
  </Card>
);

// Skeleton para EvolutionBlock
const EvolutionBlockSkeleton = () => (
  <Card className="rounded-xl">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-48" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-24 rounded" />
          <Skeleton className="h-10 w-48 rounded" />
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-8 w-32 rounded" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </CardContent>
  </Card>
);

// Skeleton para HistoryTableBlock
const HistoryTableBlockSkeleton = () => (
  <Card className="rounded-xl">
    <CardHeader>
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-8 w-24 rounded" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4 flex-1">
              <Skeleton className="h-10 w-10 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Componente principal do skeleton do dashboard
const DashboardSkeleton = () => (
  <div className="space-y-8">
    <HeroStatusSkeleton />
    <CategoryListSkeleton />
    <TrailCTASkeleton />
    <EvolutionBlockSkeleton />
    <HistoryTableBlockSkeleton />
  </div>
);

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboard();
  
  if (isLoading) {
    return (
      <DashboardShell>
        <DashboardSkeleton />
      </DashboardShell>
    );
  }
  
  if (error) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md">
            <p className="text-lg font-medium text-red-600 mb-2">Erro ao carregar dashboard</p>
            <p className="text-sm text-gray-600 mb-4">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </DashboardShell>
    );
  }
  
  // IMPORTANTE: Só mostrar "sem dados" se:
  // 1. NÃO estiver carregando (isLoading === false)
  // 2. NÃO houve erro (error === null)
  // 3. A requisição foi completada mas não retornou dados válidos
  // Isso garante que a mensagem só aparece após a resposta do backend
  if (!isLoading && !error && (!data || !data.categories || data.categories.length === 0)) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md px-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Bem-vindo ao Dashboard!
            </h1>
            <p className="text-gray-600 mb-6">
              Você ainda não realizou nenhum diagnóstico. Realize seu primeiro diagnóstico para ver seus resultados aqui.
            </p>
            <a 
              href="/quiz" 
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
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

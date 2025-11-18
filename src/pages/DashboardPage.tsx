import DashboardShell from '@/components/layout/DashboardShell';
import { useDashboard } from '@/hooks/useDashboard';
import { HeroStatus } from '@/blocks/HeroStatus';
import CategoryList from '@/blocks/CategoryList';
import { HistoryTableBlock } from '@/blocks/HistoryTableBlock';
import { TrailCTA } from '@/blocks/TrailCTA';
import { EvolutionBlock } from '@/blocks/EvolutionBlock';

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboard();
  if (isLoading) return <>Carregando…</>;
  if (error || !data) return <>Erro ao carregar</>;
  
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

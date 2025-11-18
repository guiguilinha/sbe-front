import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { DashboardResponse } from '@/types/contracts/dashboard.types';

export function TrailCTA({ data }: { data: DashboardResponse['trailCta'] }) {
  if (!data) return null;
  
  const theme = data.theme ?? 'Presença digital';
  const whyNow = data.whyNow ?? 'Melhore sua presença digital e alcance mais clientes.';
  const videoHref = data.videoUrl;
  return (
    <Card className="rounded-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-900">Assista à trilha {theme}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-2xl text-sm text-muted-foreground">{whyNow}</p>
        <Button asChild>
          <a href={videoHref} target="_blank" rel="noopener noreferrer">
            Assistir à trilha ↗
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

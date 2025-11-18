import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { DashboardResponse } from '@/types/contracts/dashboard.types';
import type { HistoryRow } from "@/types/dashboard";

export function HistoryTableBlock({ data, viewAllHref }: { data: DashboardResponse; viewAllHref?: string }) {
  // Transformação dos dados internamente
  const rows: HistoryRow[] = (data.historySample ?? []).map(r => ({
    id: r.id,
    date: r.date,
    level: r.level?.label ?? '-',
    points: r.overallScore,
    delta: r.delta ?? 0,
    detailsUrl: `/historico/${r.id}`,
  }));
  return (
    <Card className="rounded-xl overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-gray-900">Histórico de resultados</CardTitle>
          {viewAllHref && (
            <a href={viewAllHref} className="text-sm text-blue-700 hover:underline">
              Ver todos os registros
            </a>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="px-4 py-2 text-left">Data</th>
              <th className="px-4 py-2 text-left">Nível Geral</th>
              <th className="px-4 py-2 text-left">Pontuação</th>
              <th className="px-4 py-2 text-left">Variação vs. anterior</th>
              <th className="px-4 py-2 text-left">Ação</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const key = `history-${r.id}-${i}`;
              console.log(`🔑 Blocks/HistoryTableBlock - Key gerada para row: ${key}`);
              return (
                <tr key={key} className="border-b last:border-0">
                <td className="px-4 py-2">{new Date(r.date).toLocaleDateString("pt-BR")}</td>
                <td className="px-4 py-2">{r.level}</td>
                <td className="px-4 py-2">{r.points} pts</td>
                <td className="px-4 py-2">
                  {r.delta === 0 ? "±0 pts" : `${r.delta > 0 ? "+" : ""}${r.delta} pts`}
                </td>
                <td className="px-4 py-2">
                  <Link 
                    to={r.detailsUrl} 
                    state={{ from: 'dashboard' }}
                    className="inline-flex items-center gap-1 text-blue-700 hover:underline"
                  >
                    Ver detalhes <ArrowUpRight className="size-4" />
                  </Link>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

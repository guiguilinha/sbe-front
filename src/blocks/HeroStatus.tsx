import type { DashboardResponse } from '@/types/contracts/dashboard.types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp } from "lucide-react";

export function HeroStatus({ data }: { data: DashboardResponse }) {
  // Transformação dos dados internamente
  const hero = {
    level: data.overallLevel,
    pointsOverall: data.overallPoints ?? 0,
    pointsMax: 60,
    deltaOverall: data.deltaOverall ?? 0,
    evaluatedAt: data.historySample?.[0]?.date ?? new Date().toISOString(),
    message: data.trailCta?.whyNow ?? data.categories[0]?.insight ?? `Olá ${data.user.name}`,
    focusCategory: data.categories[0]?.name,
    nextCheckInDays: 30,
    cta: data.trailCta 
      ? { label: `Veja a trilha ${data.trailCta.title}`, href: data.trailCta.videoUrl } 
      : { label: 'Ver historico', href: '/historico'},
  };

  const {
    level,
    pointsOverall,
    pointsMax,
    deltaOverall,
    evaluatedAt,
    message,
    nextCheckInDays,
    focusCategory,
    cta,
  } = hero;
  const levelLabel = typeof level === "string" ? level : level.label;
  
  return (
    <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="pb-0">
        <div className="space-y-2">
          <CardTitle className="text-lg font-medium text-gray-900">
            Resultado do diagnóstico
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Pontuação e variação */}
        <div className="gap-4">
          <div className="block w-full">
            <p className="text-sm text-gray-600 mb-2">Seu negócio está no nível{" "}<br/>
              <span className="text-4xl md:text-5xl font-semibold text-gray-900">
                {levelLabel}
              </span>
            </p>
          </div>

          <div className="flex items-left gap-1 align-bottom">
            <span className="text-sm text-gray-600">Medição atual:</span>
            <span className="text-sm font-medium text-green-600">{pointsOverall}</span>
            <span className="text-sm text-gray-600">pts de</span>
            <span className="text-sm font-medium text-green-600">{pointsMax}</span>
            <span className="text-green-600 px-2">&bull;</span>
            {deltaOverall !== 0 && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  {deltaOverall > 0 ? "+" : ""}{deltaOverall} pts
                </span>
                <span className="text-sm text-gray-600">desde o último diagnóstico</span>
              </div>
            )}
            <span className="text-green-600 px-2">&bull;</span>
            <span className="text-sm text-gray-600">Avaliado em</span>
            <span className="text-sm font-medium text-green-600">
              {new Date(evaluatedAt).toLocaleDateString("pt-BR")}
            </span>
          </div>

        </div>

        {/* Explicação do nível */}
        <div className="">
          <p className="text-md font-medium text-gray-600">
            O que significa estar no nível {levelLabel}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {message}
            {focusCategory && (
              <> Priorize <span className="font-medium text-gray-900">{focusCategory}</span>.</>
            )}
          </p>
        </div>

        {/* Footer com CTA e próximo check-in */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Próximo check-in em</span>
            <span className="text-sm font-medium text-green-600">
              {nextCheckInDays || 30} dias
            </span>
          </div>
          
          <Button 
            asChild 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2"
          >
            <a href={cta.href} target="_blank" rel="noopener noreferrer">
              {cta.label}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

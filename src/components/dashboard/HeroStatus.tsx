import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatPill } from "@/components/sdp/StatPill";
import { DeltaBadge } from "@/components/sdp/DeltaBadge";
import type { HeroStatusProps } from "@/types/dashboard";

export function HeroStatus({
  level,
  pointsOverall,
  pointsMax,
  deltaOverall,
  evaluatedAt,
  message,
  nextCheckInDays,
  focusCategory,
  cta,
}: HeroStatusProps) {
  const levelLabel = typeof level === 'string' ? level : level.label;
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl md:text-3xl">Seu negócio está no nível {levelLabel}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <StatPill value={pointsOverall} label={`de ${pointsMax}`} intent="neutral" />
          <DeltaBadge deltaPts={deltaOverall} />
          <span className="text-sm text-muted-foreground">
            Avaliado em {new Date(evaluatedAt).toLocaleDateString("pt-BR")}
          </span>
        </div>

        <p className="text-muted-foreground">
          {message}
          {focusCategory ? <> Priorize <span className="font-medium">{focusCategory}</span>.</> : null}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button asChild>
            <a href={cta.href} target="_blank" rel="noopener noreferrer">
              {cta.label}
            </a>
          </Button>
          {typeof nextCheckInDays === "number" && (
            <span className="text-sm text-muted-foreground">
              Próximo check-in em <span className="font-medium">{nextCheckInDays} dias</span>
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

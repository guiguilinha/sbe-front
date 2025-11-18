import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Lightbulb, ClipboardList, Library } from "lucide-react";
import { CategoryBar } from "@/components/sdp/CategoryBar";
import { ChipStatus } from "@/components/sdp/ChipStatus";
import { DeltaBadge } from "@/components/sdp/DeltaBadge";
import { ResourceLink } from "@/components/sdp/ResourceLink";
import { cn } from "@/lib/utils";
import type { CategoryItemProps } from '@/types/dashboard';

export function CategoryItem(props: CategoryItemProps) {
  const {
    name, levelTag, points, prevPoints, status,
    insight, actions, resources, defaultOpen, className,
  } = props;

  const [open, setOpen] = useState(Boolean(defaultOpen));
  const delta = typeof prevPoints === "number" ? points - prevPoints : 0;

  return (
    <Card className={cn("rounded-xl", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base md:text-lg">{name}</CardTitle>
            <div className="text-xs text-muted-foreground">{levelTag}</div>
          </div>

          <div className="flex items-center gap-2">
            <ChipStatus status={status} />
            <DeltaBadge deltaPts={delta} />
          </div>
        </div>

        <CategoryBar
          points={points}
          total={12}
          status={status}
          className="mt-3"
          labelPosition="right"
        />

        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={() => setOpen(v => !v)} className="gap-1">
            {open ? <>Ver menos <ChevronUp className="size-4" /></> : <>Ver detalhes <ChevronDown className="size-4" /></>}
          </Button>
        </div>
      </CardHeader>

      {open && (
        <CardContent className="space-y-4">
          <section className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Lightbulb className="size-4 text-yellow-600" /> Insight
            </div>
            <p className="text-sm text-muted-foreground">{insight}</p>
          </section>

          {actions?.length > 0 && (
            <section className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ClipboardList className="size-4 text-blue-600" /> O que fazer a seguir (2–4 semanas)
              </div>
              <ul className="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
                {actions.map((a, i) => {
                  const key = `action-${i}-${a.substring(0, 20)}`;
                  console.log(`🔑 CategoryItem - Key gerada para action: ${key}`);
                  return <li key={key}>{a}</li>;
                })}
              </ul>
            </section>
          )}

          {resources?.length > 0 && (
            <section className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Library className="size-4 text-emerald-600" /> Recursos úteis
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {resources.map((r, i) => {
                  const key = `resource-${i}-${r.title}`;
                  console.log(`🔑 CategoryItem - Key gerada para resource: ${key}`);
                  return (
                    <ResourceLink key={key} href={r.href} title={r.title} duration={r.duration} />
                  );
                })}
              </div>
            </section>
          )}
        </CardContent>
      )}
    </Card>
  );
}

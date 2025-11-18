import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { fmtPts } from "@/lib/format";
import { cn } from "@/lib/utils";

type DeltaBadgeProps = {
  deltaPts: number;      // pode ser negativo, zero ou positivo
  className?: string;
};

export function DeltaBadge({ deltaPts, className }: DeltaBadgeProps) {
  const up = deltaPts > 0;
  const down = deltaPts < 0;

  const Icon = up ? TrendingUp : down ? TrendingDown : Minus;
  const color = up
    ? "text-green-700 bg-green-100"
    : down
      ? "text-red-600 bg-red-100"
      : "text-gray-700 bg-gray-100";

  const signed =
    deltaPts === 0 ? "±0 pts" : `${deltaPts > 0 ? "+" : ""}${fmtPts(deltaPts)}`;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-medium",
        color,
        className
      )}
      aria-label={`Variação: ${signed}`}
    >
      <Icon className="size-4" aria-hidden />
      <span className="tabular-nums">{signed}</span>
    </span>
  );
}

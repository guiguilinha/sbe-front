import { cn } from "@/lib/utils";
import { fmtPts, pct } from "@/lib/format";

type CategoryBarProps = {
  points: number;          // pontos do usuário
  total?: number;          // padrão 12
  status?: "attention" | "evolving" | "ok"; // ajusta a cor da barra
  className?: string;
  labelPosition?: "right" | "below"; // onde exibir "X pontos de 12 (Y%)"
};

const BAR_COLOR: Record<NonNullable<CategoryBarProps["status"]>, string> = {
  attention: "bg-red-600",
  evolving: "bg-blue-600",
  ok: "bg-green-600",
};

export function CategoryBar({
  points,
  total = 12,
  status = "evolving",
  className,
  labelPosition = "right",
}: CategoryBarProps) {
  const perc = Math.max(0, Math.min(100, (points / total) * 100));

  const label = `${fmtPts(points)} de ${total} (${pct(perc)})`;

  return (
    <div className={cn("w-full flex items-center justify-between", className)}>
      <div
        className="relative h-1.5 w-2/3 rounded-full bg-gray-200"
        role="progressbar"
        aria-valuenow={Math.round(perc)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={cn("absolute left-0 top-0 h-full rounded-full", BAR_COLOR[status])}
          style={{ width: `${perc}%` }}
        >
        </div>
      </div>
      <div
        className={cn(
          "text-xs text-gray-700",
          labelPosition === "right" ? "mt-0 text-right ps-2" : "mt-0"
        )}
      >
        {label}
      </div>
    </div>
  );
}

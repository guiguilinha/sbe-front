import { cn } from "@/lib/utils";
import { pct } from "@/lib/format";

type StatPillProps = {
  value: number;                  // ex.: 55 (será exibido como "55%" se percentual)
  label: string;                  // ex.: "completo" ou "vs. último diagnóstico"
  kind?: "percent" | "raw";       // padrão: "raw"
  intent?: "neutral" | "positive" | "negative";
  className?: string;
};

const INTENT_CLASSES: Record<
  NonNullable<StatPillProps["intent"]>,
  string
> = {
  neutral:  "bg-blue-50 text-blue-700",
  positive: "bg-green-100 text-green-700",
  negative: "bg-red-600 text-white",
};

export function StatPill({
  value,
  label,
  kind = "raw",
  intent = "neutral",
  className,
}: StatPillProps) {
  const display = kind === "percent" ? pct(value) : String(value);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
        INTENT_CLASSES[intent],
        className
      )}
      aria-label={`${display} ${label}`}
    >
      <span className="tabular-nums">{display}</span>
      <span className="opacity-80">{label}</span>
    </span>
  );
}

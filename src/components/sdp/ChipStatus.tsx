import * as React from "react";
import { AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusKind = "attention" | "evolving" | "ok";

type ChipStatusProps = {
  status: StatusKind;
  children?: React.ReactNode; // rótulo custom se quiser (senão usamos padrão)
  className?: string;
};

const MAP = {
  attention: {
    icon: AlertTriangle,
    label: "Precisa de atenção",
    cls: "bg-red-600 text-white",
  },
  evolving: {
    icon: TrendingUp,
    label: "Continue evoluindo",
    cls: "bg-yellow-100 text-yellow-800",
  },
  ok: {
    icon: CheckCircle2,
    label: "Tudo em ordem",
    cls: "bg-green-100 text-green-800",
  },
};

export function ChipStatus({ status, children, className }: ChipStatusProps) {
  const { icon: Icon, label, cls } = MAP[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
        cls,
        className
      )}
      role="status"
      aria-live="polite"
    >
      <Icon className="size-4" aria-hidden />
      {children ?? label}
    </span>
  );
}

import { ExternalLink, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type ResourceLinkProps = {
  href: string;
  title: string;
  duration?: string;       // ex.: "12 min" ou "3 aulas"
  className?: string;
};

export function ResourceLink({ href, title, duration, className }: ResourceLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group block rounded-md border border-gray-200 p-3 transition-colors hover:bg-accent",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium text-foreground">{title}</span>
        <ExternalLink className="size-4 text-muted-foreground group-hover:text-blue-700" aria-hidden />
      </div>

      {duration && (
        <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="size-4" aria-hidden />
          <span>{duration}</span>
        </div>
      )}
    </a>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { TrailCTAProps } from "@/types/dashboard";

export function TrailCTA({ theme, whyNow, videoHref }: TrailCTAProps) {
  return (
    <Card className="rounded-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-base md:text-lg">Assista à trilha {theme}</CardTitle>
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

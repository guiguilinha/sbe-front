export type HeroStatusProps = {
  level: { code: 'L1' | 'L2' | 'L3' | 'L4'; label: string } | string;
  pointsOverall: number;   // 33
  pointsMax: number;       // 60
  deltaOverall: number;    // +8
  evaluatedAt: string;     // ISO
  message: string;         // 1–2 linhas
  nextCheckInDays?: number;// 30
  focusCategory?: string;  // "Presença digital"
  cta: { label: string; href: string };
};

export type EvolutionBlockProps = {
  insightLines: string | [string, string];
};

export type HistoryRow = { 
    id: string;
    date: string; 
    level: string; 
    points: number; 
    delta: number; 
    detailsUrl: string 
};

export type HistoryTableBlockProps = {
  rows: HistoryRow[]; // 3 itens
  viewAllHref?: string;
};

export type TrailCTAProps = {
  theme: string;   // "Presença digital"
  whyNow: string;  // 1–2 frases
  videoHref: string;
  allowMarkAsWatched?: boolean;
};

export type StatusKind = "attention" | "evolving" | "ok";

export type CategoryItemProps = {
  id: string;
  name: string;
  levelTag: string;
  points: number;
  prevPoints?: number;
  status: StatusKind;
  insight: string;
  actions: string[]; // 2–3 itens
  resources: { title: string; duration?: string; href: string }[];
  defaultOpen?: boolean;
  className?: string;
};
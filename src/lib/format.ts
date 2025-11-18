// Pequenos utilitários de formatação (pt-BR)
export const nf = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
});

export function fmtPts(v: number) {
  // Vocabulário padronizado: "pts"
  return `${nf.format(v)} pts`;
}

export function pct(n: number) {
  return `${nf.format(n)}%`;
}

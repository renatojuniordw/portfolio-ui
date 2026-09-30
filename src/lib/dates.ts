const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Data AAAA-MM-DD válida (ex.: rejeita 2026-02-31). */
export function isIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

/**
 * Formata a data de um artigo em pt-BR sem deslocar o dia pelo fuso:
 * a data do frontmatter é um dia de calendário, então é lida e formatada em UTC.
 */
export function formatPostDate(
  value: string,
  { month = "long", day = false }: { month?: "long" | "short"; day?: boolean } = {},
): string {
  if (!isIsoDate(value)) return value;
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("pt-BR", {
    year: "numeric",
    month,
    ...(day ? { day: "numeric" } : {}),
    timeZone: "UTC",
  });
}

import { test as base, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/** Hosts externos bloqueados para os testes não dependerem de terceiros. */
const BLOCKED_HOSTS = [
  "googletagmanager.com",
  "google-analytics.com",
  "instagram.com",
  "cdninstagram.com",
  "images.unsplash.com",
];

export const test = base.extend({
  page: async ({ page }, provide) => {
    await page.route("**/*", (route) => {
      const host = new URL(route.request().url()).hostname;
      if (BLOCKED_HOSTS.some((blocked) => host.endsWith(blocked))) {
        return route.abort();
      }
      return route.continue();
    });
    await provide(page);
  },
});

export { expect };

export async function expectNoAxeViolations(page: Page, include?: string) {
  let builder = new AxeBuilder({ page }).withTags([
    "wcag2a",
    "wcag2aa",
    "wcag21a",
    "wcag21aa",
    "wcag22aa",
  ]);
  if (include) builder = builder.include(include);
  const { violations } = await builder.analyze();
  const summary = violations.map(
    (v) => `${v.id}: ${v.help} → ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
  );
  expect(summary, summary.join("\n")).toEqual([]);
}

export async function setTheme(page: Page, theme: "light" | "dark") {
  await page.addInitScript((value) => {
    try {
      localStorage.setItem("theme", value);
    } catch {}
  }, theme);
}

/** Largura do documento não pode exceder a viewport (sem rolagem lateral global). */
export async function expectNoHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
}

import { test } from "./fixtures";

/*
 * Gera as capturas de revisão visual em docs/evidencias/. Não é um teste de
 * regressão por snapshot: roda só sob demanda com
 *   EVIDENCE=1 npx playwright test tests/e2e/evidence.spec.ts --project=chromium-desktop
 */
test.skip(!process.env.EVIDENCE, "defina EVIDENCE=1 para gerar capturas");

const PAGES = [
  ["home", "/"],
  ["catalogo", "/projetos"],
  ["case", "/projetos/unificando/radar"],
  ["artigo", "/blog/prompt-injection-defesa-na-pratica"],
  ["contato", "/contato"],
] as const;

const VIEWPORTS = [
  ["mobile-375", { width: 375, height: 812 }],
  ["desktop-1440", { width: 1440, height: 900 }],
] as const;

for (const [name, path] of PAGES) {
  for (const [label, viewport] of VIEWPORTS) {
    for (const theme of ["light", "dark"] as const) {
      test(`${name} ${label} ${theme}`, async ({ page }) => {
        await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
        await page.setViewportSize(viewport);
        await page.goto(path);
        await page.waitForLoadState("networkidle");
        await page.screenshot({
          path: `docs/evidencias/${name}-${label}-${theme}.jpg`,
          type: "jpeg",
          quality: 60,
          fullPage: true,
        });
      });
    }
  }
}

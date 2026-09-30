import { test, expect, expectNoHorizontalScroll } from "./fixtures";

const ROUTES = [
  "/",
  "/projetos",
  "/projetos/unificando/radar",
  "/blog",
  "/blog/prompt-injection-defesa-na-pratica",
  "/contato",
  "/curriculo",
  "/links",
];
const WIDTHS = [320, 375, 768, 1024, 1440];

test.describe("responsividade @desktop-only", () => {
  for (const width of WIDTHS) {
    test(`sem rolagem lateral global em ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      for (const route of ROUTES) {
        await page.goto(route);
        await expectNoHorizontalScroll(page);
        // Título principal inteiro dentro da viewport horizontal.
        const box = await page.getByRole("heading", { level: 1 }).boundingBox();
        expect(box!.x, route).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width, route).toBeLessThanOrEqual(width + 1);
      }
    });
  }

  test("reflow equivalente a 320 CSS px com zoom de 200% (640px)", async ({ page }) => {
    await page.setViewportSize({ width: 640, height: 480 });
    await page.addInitScript(() => {
      document.addEventListener("DOMContentLoaded", () => {
        document.documentElement.style.fontSize = "200%";
      });
    });
    for (const route of ["/", "/blog", "/projetos"]) {
      await page.goto(route);
      await expectNoHorizontalScroll(page);
    }
  });

  test("controles principais têm alvo de 44×44 px no mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 700 });
    await page.goto("/");
    for (const name of ["Abrir menu", "Ativar tema escuro", /Abrir terminal interativo/]) {
      const box = await page.getByRole("button", { name }).boundingBox();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
    for (const name of ["Ver projetos", "Vamos conversar"]) {
      const box = await page.getByRole("link", { name }).boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
  });

  test("botão do terminal não cobre o último conteúdo da página", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 700 });
    await page.goto("/contato");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const fab = await page.getByRole("button", { name: /Abrir terminal interativo/ }).boundingBox();
    const lastLink = await page.locator("main a").last().boundingBox();
    const footer = await page.locator("footer p").boundingBox();
    for (const target of [lastLink!, footer!]) {
      const overlap =
        fab!.x < target.x + target.width &&
        target.x < fab!.x + fab!.width &&
        fab!.y < target.y + target.height &&
        target.y < fab!.y + fab!.height;
      expect(overlap).toBe(false);
    }
  });
});

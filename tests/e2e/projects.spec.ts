import { test, expect } from "./fixtures";

const status = (page: import("@playwright/test").Page) => page.getByRole("status");

test.describe("filtros de projetos", () => {
  test("Todos, áreas, URL, reload e voltar/avançar", async ({ page }) => {
    await page.goto("/projetos");
    const group = page.getByRole("group", { name: "Filtrar projetos por área" });
    const all = group.getByRole("button", { name: "Todos" });
    await expect(all).toHaveAttribute("aria-pressed", "true");
    const total = await page.getByRole("link", { name: /^Ver projeto/ }).count();
    await expect(status(page)).toHaveText(`${total} projetos encontrados`);

    await group.getByRole("button", { name: "Automação" }).click();
    await expect(page).toHaveURL(/\?area=automacao$/);
    await expect(group.getByRole("button", { name: "Automação" })).toHaveAttribute("aria-pressed", "true");
    await expect(status(page)).toContainText("em Automação");
    const automacao = await page.getByRole("link", { name: /^Ver projeto/ }).count();
    expect(automacao).toBeGreaterThan(0);
    expect(automacao).toBeLessThan(total);
    await expect(page.getByRole("link", { name: "Ver projeto Seu Barraco Esperto" })).toBeVisible();

    await group.getByRole("button", { name: "IA" }).click();
    await expect(page).toHaveURL(/\?area=ia$/);
    await expect(page.getByRole("link", { name: "Ver projeto Seu Barraco Esperto" })).toHaveCount(0);

    await page.reload();
    await expect(group.getByRole("button", { name: "IA" })).toHaveAttribute("aria-pressed", "true");

    await page.goBack();
    await expect(page).toHaveURL(/\?area=automacao$/);
    await expect(group.getByRole("button", { name: "Automação" })).toHaveAttribute("aria-pressed", "true");
    await page.goForward();
    await expect(page).toHaveURL(/\?area=ia$/);

    await group.getByRole("button", { name: "Todos" }).click();
    await expect(page).toHaveURL(/\/projetos$/);
    await expect(status(page)).toHaveText(`${total} projetos encontrados`);
  });

  test("parâmetro inválido equivale a Todos e grupos vazios somem", async ({ page }) => {
    await page.goto("/projetos?area=xyz");
    await expect(
      page.getByRole("button", { name: "Todos" }),
    ).toHaveAttribute("aria-pressed", "true");

    await page.goto("/projetos?area=automacao");
    await expect(page.getByRole("heading", { name: "Unificando", level: 2 })).toBeVisible();
    await page.goto("/projetos?area=frontend&utm=x");
    await expect(page.getByRole("button", { name: "Front-end" })).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "IA" }).click();
    await expect(page).toHaveURL(/utm=x/);
  });

  test("filtro não move o foco", async ({ page }) => {
    await page.goto("/projetos");
    const button = page.getByRole("button", { name: "Front-end" });
    await button.click();
    await expect(button).toBeFocused();
  });

  test("cases e rotas antigas continuam válidos; desconhecidas dão 404 @smoke", async ({ page, request }) => {
    await page.goto("/projetos");
    const hrefs = await page
      .getByRole("link", { name: /^Ver projeto/ })
      .evaluateAll((links) => links.map((l) => l.getAttribute("href")!));
    for (const href of hrefs) {
      const response = await request.get(href);
      expect(response.status(), href).toBe(200);
    }
    const legacy = await request.get("/projetos/unificando", { maxRedirects: 0 });
    expect(legacy.status()).toBe(308);
    expect((await request.get("/projetos/nao-existe")).status()).toBe(404);
    expect((await request.get("/blog/nao-existe")).status()).toBe(404);
  });

  test("case mostra contexto antes de participação e estudo de caso", async ({ page }) => {
    await page.goto("/projetos/unificando/automacao");
    const headings = await page.locator("article h2").allTextContents();
    const participation = headings.indexOf("Participação");
    expect(participation).toBeGreaterThan(0);
    expect(headings.indexOf("Case Study")).toBeGreaterThan(participation);
  });
});

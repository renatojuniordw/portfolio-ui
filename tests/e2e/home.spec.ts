import { test, expect } from "./fixtures";

test.describe("home", () => {
  test("hero leva a projetos e contato @smoke", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("section[aria-labelledby=hero-heading]");
    await expect(hero.getByRole("link", { name: "Ver projetos" })).toHaveAttribute("href", "/projetos");
    const talk = hero.getByRole("link", { name: "Vamos conversar" });
    await expect(talk).toHaveAttribute("href", "/contato");
    await expect(talk).not.toHaveAttribute("target", "_blank");
    await expect(hero.getByRole("link", { name: /LinkedIn/ })).toBeVisible();
    await expect(hero.getByRole("link", { name: /GitHub/ })).toBeVisible();

    await talk.click();
    await expect(page).toHaveURL(/\/contato$/);
  });

  test("três projetos selecionados logo após o hero, conectados ao catálogo", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#projetos-selecionados");
    const order = await page.evaluate(() =>
      [...document.querySelectorAll("main section[id], main section[aria-labelledby]")]
        .map((s) => s.id || s.getAttribute("aria-labelledby"))
        .slice(0, 3),
    );
    expect(order).toEqual(["hero-heading", "projetos-selecionados", "sobre"]);

    const cases = section.getByRole("link", { name: /^Ver case/ });
    await expect(cases).toHaveCount(3);
    const hrefs = await cases.evaluateAll((links) => links.map((l) => l.getAttribute("href")));
    expect(hrefs).toEqual([
      "/projetos/unificando/radar",
      "/projetos/unificando/med",
      "/projetos/seu-barraco-esperto",
    ]);
    await expect(section.getByRole("link", { name: "Ver todos os projetos" })).toHaveAttribute(
      "href",
      "/projetos",
    );

    // Imagens com proporção reservada e carregadas; fallback sem <img> quebrada.
    const images = section.locator("img");
    await expect(images).toHaveCount(2);
    for (const img of await images.all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    }
  });

  test("home continua utilizável com terceiros bloqueados", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // GitHub: dados ou aviso de indisponibilidade, sempre com link ao perfil.
    await expect(page.getByRole("link", { name: /GitHub/ }).last()).toBeVisible();
    expect(errors).toEqual([]);
  });
});

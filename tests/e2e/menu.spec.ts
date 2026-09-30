import { test, expect } from "./fixtures";

test.use({ viewport: { width: 390, height: 844 } });

test.describe("menu mobile", () => {
  test("abre, prende o foco, fecha com Esc e devolve o foco", async ({ page }) => {
    await page.goto("/blog");
    const trigger = page.getByRole("button", { name: "Abrir menu" });
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: "Menu de navegação" });
    await expect(dialog).toBeVisible();
    await expect(page.getByRole("button", { name: "Fechar menu" })).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("hidden");

    // Percorre todos os focáveis e confirma que o foco nunca sai do diálogo.
    const count = await dialog.locator("a, button").count();
    for (let i = 0; i < count + 2; i++) {
      await page.keyboard.press("Tab");
      expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
    }
    await page.keyboard.press("Shift+Tab");
    expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");
  });

  test("destaca Contato e fecha ao navegar", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Menu de navegação" });
    await dialog.getByRole("link", { name: "Contato" }).click();
    await expect(page).toHaveURL(/\/contato$/);
    await expect(dialog).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");

    await page.getByRole("button", { name: "Abrir menu" }).click();
    await expect(dialog.getByRole("link", { name: "Contato" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("clique no backdrop fecha; clique no conteúdo não", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Menu de navegação" });
    await dialog.getByRole("navigation").click({ position: { x: 10, y: 400 } });
    await expect(dialog).toBeVisible();
    await page.mouse.click(20, 400);
    await expect(dialog).toBeHidden();
  });

  test("fecha ao redimensionar para desktop sem deixar bloqueio", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await expect(page.getByRole("dialog", { name: "Menu de navegação" })).toBeVisible();
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page.getByRole("dialog", { name: "Menu de navegação" })).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");
    await expect(page.getByRole("navigation", { name: "Principal", exact: true })).toBeVisible();
  });

  test("Ctrl+K não abre o terminal por cima do menu", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: /Abrir terminal interativo/ })).toBeAttached();
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await page.keyboard.press("Control+k");
    await expect(page.getByRole("dialog", { name: "Terminal interativo" })).toBeHidden();
  });
});

test.describe("navegação desktop", () => {
  test("Contato presente, ativo e sem sobreposição entre 1024 e 1440px @desktop-only", async ({ page }) => {
    for (const width of [1024, 1180, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/contato");
      const nav = page.getByRole("navigation", { name: "Principal", exact: true });
      await expect(nav.getByRole("link", { name: "Contato" })).toHaveAttribute("aria-current", "page");
      const boxes = await page
        .locator("header a, header button")
        .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().toJSON()));
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i];
          const b = boxes[j];
          const overlap = a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
          expect(overlap, `sobreposição em ${width}px`).toBe(false);
        }
      }
    }
  });
});

import { test, expect } from "./fixtures";

test.describe("diferenciais", () => {
  test("abas completas no desktop @desktop-only", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/#diferenciais");
    const tablist = page.getByRole("tablist", { name: "Diferenciais" });
    const tabs = tablist.getByRole("tab");
    await expect(tabs).toHaveCount(4);
    const panel = page.getByRole("tabpanel");

    await tabs.first().focus();
    await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("ArrowRight");
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(panel).toHaveAccessibleName(/Automação & Agentes de IA/);
    await page.keyboard.press("End");
    await expect(tabs.nth(3)).toBeFocused();
    await expect(panel).toContainText("Visão de Produto");
    await page.keyboard.press("ArrowRight");
    await expect(tabs.first()).toBeFocused();
    await page.keyboard.press("Home");
    await expect(tabs.first()).toHaveAttribute("aria-selected", "true");

    // Hover não troca a seleção.
    await tabs.nth(2).hover();
    await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
  });

  test("cards empilhados e visíveis no mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/#diferenciais");
    await expect(page.getByRole("tablist")).toHaveCount(0);
    const section = page.locator("#diferenciais");
    for (const title of [
      "IA Generativa",
      "Automação & Agentes de IA",
      "Front-end de Alta Performance",
      "Visão de Produto, não só de Código",
    ]) {
      await expect(section.getByRole("heading", { name: title })).toBeVisible();
    }
  });
});

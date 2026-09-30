import { test, expect } from "./fixtures";

test.describe("terminal interativo", () => {
  test("abre pelo botão, foca o input e fecha pelo botão visível", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: /Abrir terminal interativo/ });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Terminal interativo" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("textbox", { name: "Terminal de comandos" })).toBeFocused();
    await dialog.getByRole("button", { name: "Fechar terminal" }).click();
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("atalho Ctrl/Cmd+K abre e Esc fecha", async ({ page }) => {
    await page.goto("/blog");
    // O terminal é carregado sob demanda no cliente; aguarda o acionador.
    await expect(page.getByRole("button", { name: /Abrir terminal interativo/ })).toBeVisible();
    await page.keyboard.press("Control+k");
    const dialog = page.getByRole("dialog", { name: "Terminal interativo" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("preserva histórico entre aberturas e executa comandos", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Abrir terminal interativo/ }).click();
    const input = page.getByRole("textbox", { name: "Terminal de comandos" });
    await input.fill("whoami");
    await input.press("Enter");
    await expect(page.getByRole("log")).toContainText("Renato Bezerra");
    await page.keyboard.press("Escape");

    await page.getByRole("button", { name: /Abrir terminal interativo/ }).click();
    await expect(page.getByRole("log")).toContainText("Renato Bezerra");
    await input.press("ArrowUp");
    await expect(input).toHaveValue("whoami");

    await input.fill("theme dark");
    await input.press("Enter");
    await expect(page.locator("html")).toHaveClass(/dark/);
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.getByRole("button", { name: /Abrir terminal interativo/ }).click();
    await input.fill("cd contato");
    await input.press("Enter");
    await expect(page).toHaveURL(/\/contato$/);
    await expect(page.getByRole("dialog", { name: "Terminal interativo" })).toBeHidden();
  });

  test("comando cv dispara download do PDF", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Abrir terminal interativo/ }).click();
    const input = page.getByRole("textbox", { name: "Terminal de comandos" });
    const downloadPromise = page.waitForEvent("download");
    await input.fill("cv");
    await input.press("Enter");
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("Renato_Bezerra_Curriculo.pdf");
  });

  test("utilizável em 375×667 e em paisagem baixa", async ({ page }) => {
    for (const viewport of [
      { width: 375, height: 667 },
      { width: 667, height: 375 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/");
      await page.getByRole("button", { name: /Abrir terminal interativo/ }).click();
      const dialog = page.getByRole("dialog", { name: "Terminal interativo" });
      const input = dialog.getByRole("textbox", { name: "Terminal de comandos" });
      await input.fill("help");
      await input.press("Enter");
      await expect(input).toBeInViewport();
      await expect(dialog.getByRole("button", { name: "Fechar terminal" })).toBeInViewport();
      const box = await dialog.boundingBox();
      expect(box!.height).toBeLessThanOrEqual(viewport.height);
      const inputBox = await input.boundingBox();
      expect(inputBox!.width).toBeGreaterThan(80);
      await page.keyboard.press("Escape");
    }
  });
});

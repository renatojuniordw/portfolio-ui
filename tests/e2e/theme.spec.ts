import { test, expect, setTheme } from "./fixtures";

const bg = (page: import("@playwright/test").Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test.describe("tema", () => {
  test("sistema escuro + site claro fica claro, inclusive no código @smoke", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await setTheme(page, "light");
    await page.goto("/blog/por-que-seu-prompt-nao-funciona");
    expect(await bg(page)).toBe("rgb(255, 255, 255)");
    const comment = page.locator(".hljs-comment").first();
    if (await comment.count()) {
      await expect(comment).toHaveCSS("color", "rgb(102, 102, 102)");
    }
  });

  test("sistema claro + site escuro fica escuro @smoke", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await setTheme(page, "dark");
    await page.goto("/");
    expect(await bg(page)).toBe("rgb(10, 10, 10)");
    // Borda de card no hover acompanha o tema (não fica preta no escuro).
    const cta = page.getByRole("link", { name: "Ver todos os projetos" }).first();
    await cta.hover();
    const border = await cta.evaluate((el) => getComputedStyle(el).borderColor);
    expect(border).not.toBe("rgb(17, 17, 17)");
  });

  test("toggle descreve a próxima ação e persiste após reload", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Ativar tema escuro" });
    await toggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page.getByRole("button", { name: "Ativar tema claro" })).toBeVisible();
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
    const size = await page.getByRole("button", { name: "Ativar tema claro" }).boundingBox();
    expect(size!.width).toBeGreaterThanOrEqual(44);
    expect(size!.height).toBeGreaterThanOrEqual(44);
  });

  test("sem avisos de hidratação", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error" && /hydrat/i.test(msg.text())) errors.push(msg.text());
    });
    await setTheme(page, "dark");
    await page.goto("/");
    await page.goto("/projetos");
    expect(errors).toEqual([]);
  });
});

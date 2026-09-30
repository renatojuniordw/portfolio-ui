import { test, expect } from "./fixtures";

test.describe("SEO e dados estruturados", () => {
  test("home sem FAQPage, com Person e WebSite", async ({ page }) => {
    await page.goto("/");
    const types = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((els) => els.map((el) => JSON.parse(el.textContent ?? "{}")["@type"]));
    expect(types).toContain("Person");
    expect(types).toContain("WebSite");
    expect(types).not.toContain("FAQPage");
    await expect(page.locator('meta[name="X-Robots-Tag"]')).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://renatobezerra.com.br",
    );
  });

  test("/links é noindex e fica fora do sitemap", async ({ page, request }) => {
    await page.goto("/links");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).not.toContain("/links");
    expect(sitemap).toContain("/blog/por-que-seu-prompt-nao-funciona");
    expect(sitemap).toContain("<lastmod>2026-05-12");
    expect(sitemap).toContain("/projetos/fabia-souza");
  });

  test("case e artigo mantêm canonical e schema próprios", async ({ page }) => {
    await page.goto("/projetos/unificando/med");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://renatobezerra.com.br/projetos/unificando/med",
    );
    await page.goto("/blog/por-que-seu-prompt-nao-funciona");
    const types = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((els) => els.map((el) => JSON.parse(el.textContent ?? "{}")["@type"]));
    expect(types).toEqual(expect.arrayContaining(["Article", "BreadcrumbList"]));
  });
});

test("currículo: download do PDF com nome esperado e resposta válida @smoke", async ({ page, request }) => {
  await page.goto("/curriculo");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: /Baixar Currículo/ }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("Renato_Bezerra_Curriculo.pdf");

  const pdf = await request.get("/Profile.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
});

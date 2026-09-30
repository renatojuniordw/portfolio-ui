import { test, expect } from "./fixtures";

const search = (page: import("@playwright/test").Page) =>
  page.getByRole("searchbox", { name: "Buscar artigos" });

test.describe("busca do blog", () => {
  test("ignora acentos, atualiza a URL sem entrada por letra e limpa", async ({ page }) => {
    await page.goto("/");
    await page.goto("/blog");
    const historyStart = await page.evaluate(() => history.length);
    await expect(page.getByRole("heading", { name: "Em destaque" })).toBeVisible();

    await search(page).pressSequentially("seguranca", { delay: 20 });
    await expect(page.getByRole("status")).toContainText(/artigos? encontrados?/);
    await expect(page.getByRole("heading", { name: "Em destaque" })).toHaveCount(0);
    await expect(page).toHaveURL(/\?q=seguranca$/);
    expect(await page.evaluate(() => history.length)).toBe(historyStart);

    await search(page).press("Enter");
    await expect(page).toHaveURL(/\?q=seguranca$/);

    await page.getByRole("button", { name: "Limpar busca" }).click();
    await expect(search(page)).toHaveValue("");
    await expect(page).toHaveURL(/\/blog$/);
    await expect(page.getByRole("heading", { name: "Em destaque" })).toBeVisible();
  });

  test("estado vazio, link direto e voltar", async ({ page }) => {
    await page.goto("/blog?q=kubernetes-inexistente");
    await expect(search(page)).toHaveValue("kubernetes-inexistente");
    await expect(page.getByText(/Nenhum artigo encontrado/)).toBeVisible();
    await expect(page.getByRole("status")).toHaveText("0 artigos encontrados");

    await page.goto("/blog?q=sharepoint");
    const result = page.getByRole("link", { name: /SharePoint/ }).first();
    await result.click();
    await expect(page).toHaveURL(/\/blog\/pnp-js-vs-sql-crud-sharepoint/);
    await page.goBack();
    await expect(page).toHaveURL(/\?q=sharepoint$/);
    await expect(search(page)).toHaveValue("sharepoint");
  });
});

test.describe("artigo", () => {
  test("sumário com headings duplicados leva ao destino certo @smoke", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/blog/pnp-js-vs-sql-crud-sharepoint");
    const toc = page.getByRole("navigation", { name: "Sumário" });
    const links = toc.getByRole("link", { name: "SQL", exact: true });
    expect(await links.count()).toBeGreaterThan(1);
    const href = await links.nth(2).getAttribute("href");
    expect(href).toBe("#sql-2");
    await links.nth(2).click();
    await expect(page).toHaveURL(/#sql-2$/);
    const target = page.locator("#sql-2");
    await expect(target).toHaveText("SQL");
    await expect(target).toBeInViewport();
    const top = await target.evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBeGreaterThanOrEqual(64); // não fica atrás do cabeçalho fixo
    await expect(page.locator("[id='sql-2']")).toHaveCount(1);
  });

  test("sumário mobile é expansível e artigo curto não tem sumário vazio", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/blog/engenharia-de-prompt-no-terminal");
    const summary = page.locator("summary", { hasText: "Neste artigo" });
    await expect(summary).toBeVisible();
    const firstLink = page.getByRole("link", { name: "O padrão UNIX aplicado a prompt" });
    await expect(firstLink).toBeHidden();
    await summary.click();
    await expect(firstLink).toBeVisible();
    await expect(page.getByRole("link", { name: /cola o texto/ })).toHaveCount(0);
  });

  test("copiar código conserva o texto original", async ({ page, context, browserName }) => {
    test.skip(browserName !== "chromium", "permissões de clipboard só no Chromium");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/blog/engenharia-de-prompt-no-terminal");
    const block = page.locator(".code-block").first();
    const expected = await block.locator("code").textContent();
    await block.getByRole("button", { name: "Copiar código" }).click();
    await expect(block.getByRole("button", { name: "Copiado código" })).toBeVisible();
    await expect(block.getByRole("status")).toHaveText("Código copiado.");
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toBe(expected);
    expect(copied).not.toContain("Copiar");
  });

  test("falha de clipboard não alega sucesso e seleciona o código", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: () => Promise.reject(new Error("negado")) },
      });
    });
    await page.goto("/blog/engenharia-de-prompt-no-terminal");
    const block = page.locator(".code-block").first();
    await block.getByRole("button", { name: "Copiar código" }).click();
    await expect(block.getByRole("status")).toContainText("Não foi possível copiar");
    await expect(block.getByRole("button", { name: "Copiado código" })).toHaveCount(0);
    const selected = await page.evaluate(() => window.getSelection()?.toString() ?? "");
    expect(selected.length).toBeGreaterThan(5);
  });

  test("código inline não recebe botão; datas têm dateTime", async ({ page }) => {
    await page.goto("/blog/prompt-injection-defesa-na-pratica");
    const buttons = await page.getByRole("button", { name: "Copiar código" }).count();
    const blocks = await page.locator(".blog-content pre").count();
    expect(buttons).toBe(blocks);
    await expect(page.locator("header time")).toHaveAttribute("datetime", /^\d{4}-\d{2}-\d{2}$/);
  });

  test("relacionados excluem o artigo atual", async ({ page }) => {
    await page.goto("/blog/por-que-seu-prompt-nao-funciona");
    const section = page.locator("section[aria-labelledby=artigos-relacionados]");
    await expect(section.getByRole("heading", { level: 2 })).toHaveText(/Artigos relacionados|Outros artigos/);
    const hrefs = await section
      .getByRole("link")
      .evaluateAll((links) => links.map((l) => l.getAttribute("href")));
    expect(hrefs.length).toBeGreaterThan(0);
    expect(hrefs.length).toBeLessThanOrEqual(2);
    expect(hrefs).not.toContain("/blog/por-que-seu-prompt-nao-funciona");
  });
});

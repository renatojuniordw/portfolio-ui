import fs from "node:fs";
import path from "node:path";
import { test, expect, type Page } from "@playwright/test";

/*
 * Roda só no projeto "offline" (service workers permitidos, build de produção).
 * Usa o `test` base, sem interceptação de rotas, para não interferir no worker.
 */

async function waitForController(page: Page) {
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise((resolve) =>
        navigator.serviceWorker.addEventListener("controllerchange", resolve, { once: true }),
      );
    }
  });
}

const cacheKeys = (page: Page) => page.evaluate(() => caches.keys());
const cachedUrls = (page: Page) =>
  page.evaluate(async () => {
    const urls: string[] = [];
    for (const key of await caches.keys()) {
      for (const request of await (await caches.open(key)).keys()) urls.push(request.url);
    }
    return urls;
  });

test.describe("offline @offline", () => {
  // O teste de atualização troca o sw.js servido; os demais não podem rodar ao mesmo tempo.
  test.describe.configure({ mode: "serial" });

  test("instala, migra o cache legado e preserva caches alheios", async ({ page }) => {
    // offline.html não registra o worker: prepara caches antes da instalação.
    await page.goto("/offline.html");
    await page.evaluate(async () => {
      await (await caches.open("portfolio-v1")).put("/legado", new Response("x"));
      await (await caches.open("outro-app")).put("/alheio", new Response("y"));
    });

    await page.goto("/");
    await waitForController(page);
    await expect.poll(() => cacheKeys(page)).not.toContain("portfolio-v1");
    const keys = await cacheKeys(page);
    expect(keys).toContain("outro-app");
    expect(keys).toContain("renato-portfolio-offline-v2");
    expect(keys.filter((k) => k.startsWith("renato-portfolio-"))).toEqual(
      expect.arrayContaining(["renato-portfolio-offline-v2"]),
    );
  });

  test("não guarda HTML de rotas, RSC, /_next nem terceiros", async ({ page }) => {
    await page.goto("/");
    await waitForController(page);
    await page.getByRole("link", { name: "Ver projetos" }).click();
    await expect(page).toHaveURL(/\/projetos$/);
    await page.goto("/blog");
    await page.evaluate(() => fetch("/Profile.pdf").then((r) => r.arrayBuffer()));

    const urls = await cachedUrls(page);
    const origin = new URL(page.url()).origin;
    for (const url of urls) {
      expect(url.startsWith(origin), url).toBe(true);
      expect(url, url).not.toMatch(/_rsc=|\/_next\/|googletagmanager|google-analytics/);
    }
    const paths = urls.map((u) => new URL(u).pathname);
    expect(paths).not.toContain("/");
    expect(paths).not.toContain("/blog");
    expect(paths).toContain("/offline.html");
    expect(paths).toContain("/Profile.pdf");
  });

  test("sem rede: fallback para navegação, erro real para recursos, reconexão normal", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await waitForController(page);
    await page.evaluate(() => fetch("/Profile.pdf").then((r) => r.arrayBuffer()));
    await expect.poll(() => cachedUrls(page)).toContainEqual(expect.stringContaining("/Profile.pdf"));

    await context.setOffline(true);
    await page.goto("/blog");
    await expect(page.getByRole("heading", { level: 1, name: "Sem conexão" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Tentar novamente" })).toBeVisible();

    const results = await page.evaluate(async () => {
      const probe = async (url: string) => {
        try {
          const res = await fetch(url);
          return `${res.status} ${res.headers.get("content-type")}`;
        } catch {
          return "network-error";
        }
      };
      return {
        script: await probe("/_next/static/chunks/nao-existe.js"),
        image: await probe("/icon-192.png"),
        pdf: await probe("/Profile.pdf"),
      };
    });
    expect(results.script).toBe("network-error");
    expect(results.image).toBe("network-error");
    expect(results.pdf).toMatch(/^200 application\/pdf/);

    await context.setOffline(false);
    await page.goto("/blog");
    await expect(page.getByRole("heading", { level: 1, name: "Blog" })).toBeVisible();
  });

  test("respostas HTTP legítimas (404) não são trocadas pelo fallback", async ({ page }) => {
    await page.goto("/");
    await waitForController(page);
    const response = await page.goto("/rota-que-nao-existe");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Página não encontrada" })).toBeVisible();
  });

  test("atualização não recarrega a aba e remove só a versão antiga do cache", async ({ page }) => {
    // O servidor standalone lê public/ do disco: publica um sw.js "v3"
    // temporário para simular um release novo e restaura ao final.
    const served = path.join(process.cwd(), ".next/standalone/public/sw.js");
    test.skip(!fs.existsSync(served), "requer o servidor standalone de npm run test:e2e");
    const original = fs.readFileSync(served, "utf-8");

    try {
      await page.goto("/");
      await waitForController(page);
      const marker = await page.evaluate(
        () => ((window as unknown as { __marker: number }).__marker = Date.now()),
      );

      fs.writeFileSync(served, original.replace('const VERSION = "v2";', 'const VERSION = "v3";'));
      await page.evaluate(async () => {
        const registration = await navigator.serviceWorker.getRegistration();
        await registration?.update();
      });
      await expect
        .poll(() => cacheKeys(page), { timeout: 15_000 })
        .toContain("renato-portfolio-offline-v3");
      // A aba antiga continua a mesma (sem reload forçado) e navegável.
      expect(
        await page.evaluate(() => (window as unknown as { __marker: number }).__marker),
      ).toBe(marker);
      await page.getByRole("link", { name: "Ver projetos" }).click();
      await expect(page).toHaveURL(/\/projetos$/);

      // O worker novo ativa assim que o antigo fica ocioso; no máximo, quando
      // a aba antiga fecha. Só então a versão anterior do cache é removida.
      const context = page.context();
      await page.close();
      const fresh = await context.newPage();
      await fresh.goto("/");
      await waitForController(fresh);
      await expect
        .poll(() => cacheKeys(fresh), { timeout: 15_000 })
        .not.toContain("renato-portfolio-offline-v2");
      expect(await cacheKeys(fresh)).toContain("renato-portfolio-offline-v3");
    } finally {
      fs.writeFileSync(served, original);
    }
  });
});

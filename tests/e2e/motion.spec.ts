import { test, expect } from "./fixtures";

test.describe("intro e movimento", () => {
  test.use({ reducedMotion: "no-preference" });

  test("home, blog, case e /links sem tela bloqueadora @smoke", async ({ page }) => {
    for (const path of ["/", "/blog", "/projetos/unificando/med", "/links"]) {
      await page.goto(path);
      const h1 = page.getByRole("heading", { level: 1 });
      await expect(h1).toBeVisible();
      // Nada cobre o conteúdo: o elemento no centro do h1 é o próprio h1 (ou filho).
      const covered = await h1.evaluate((el) => {
        const r = el.getBoundingClientRect();
        const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return !(hit && (el === hit || el.contains(hit)));
      });
      expect(covered, path).toBe(false);
    }
  });

  test("intro decorativa só na primeira visita à home na sessão", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-intro", "1");
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveAttribute("data-intro", "1");
    await page.goto("/blog");
    await expect(page.locator("html")).not.toHaveAttribute("data-intro", "1");
  });

  test("sessionStorage indisponível não quebra a página", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, "sessionStorage", {
        get() {
          throw new Error("storage bloqueado");
        },
      });
    });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: "Ver projetos" })).toBeVisible();
    expect(errors).toEqual([]);
  });
});

test.describe("movimento reduzido", () => {
  test.use({ reducedMotion: "reduce" });

  test("sem animações CSS ativas nem conteúdo oculto", async ({ page }) => {
    await page.goto("/");
    await page.mouse.wheel(0, 4000);
    const state = await page.evaluate(() => ({
      running: document
        .getAnimations()
        .filter((a) => a.playState === "running" && a instanceof CSSAnimation).length,
      pending: document.querySelectorAll(".reveal-pending").length,
    }));
    expect(state.running).toBe(0);
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll(".reveal")].filter(
        (el) => getComputedStyle(el).opacity === "0",
      ).length,
    );
    expect(hidden).toBe(0);
  });
});

test.describe("sem JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  for (const path of ["/", "/projetos", "/blog", "/projetos/unificando/radar", "/contato"]) {
    test(`${path}: headings, links e cards legíveis`, async ({ page }) => {
      await page.goto(path);
      await page.waitForTimeout(800); // animações CSS de entrada terminam
      const invisible = await page.evaluate(() =>
        [...document.querySelectorAll("main h1, main h2, main h3, main a")]
          .filter((el) => {
            let node: Element | null = el;
            while (node) {
              if (getComputedStyle(node).opacity === "0") return true;
              node = node.parentElement;
            }
            return false;
          })
          .map((el) => el.textContent?.trim().slice(0, 40)),
      );
      expect(invisible).toEqual([]);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }
});

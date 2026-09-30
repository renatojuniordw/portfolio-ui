import { test, expect, expectNoAxeViolations, setTheme } from "./fixtures";

const ROUTES = [
  { path: "/", h1: /Renato\s*Bezerra/ },
  { path: "/projetos", h1: "Meus Projetos" },
  { path: "/projetos/unificando/radar", h1: /Radar Unificando/ },
  { path: "/blog", h1: "Blog" },
  { path: "/blog/por-que-seu-prompt-nao-funciona", h1: /Por que seu prompt/ },
  { path: "/curriculo", h1: "Currículo" },
  { path: "/contato", h1: "Vamos Conversar?" },
  { path: "/certificacoes", h1: "Certificações" },
  { path: "/unificando", h1: "Unificando" },
  { path: "/links", h1: "Renato Bezerra" },
];

test.describe("headings e landmarks @smoke", () => {
  for (const route of ROUTES) {
    test(`${route.path}: um h1 com nome, um main e IDs únicos`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.getByRole("heading", { level: 1, name: route.h1 })).toBeVisible();
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.getByRole("main")).toHaveCount(1);

      const problems = await page.evaluate(() => {
        const ids = [...document.querySelectorAll("[id]")].map((el) => el.id);
        const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
        const broken = [...document.querySelectorAll("[aria-labelledby],[aria-controls]")]
          .flatMap((el) =>
            ["aria-labelledby", "aria-controls"].flatMap((attr) =>
              (el.getAttribute(attr) ?? "")
                .split(/\s+/)
                .filter(Boolean)
                .filter((ref) => !document.getElementById(ref))
                .map((ref) => `${attr}=${ref}`),
            ),
          );
        return { duplicates, broken };
      });
      expect(problems.duplicates).toEqual([]);
      expect(problems.broken).toEqual([]);
    });
  }
});

test.describe("axe", () => {
  for (const theme of ["light", "dark"] as const) {
    for (const route of ROUTES) {
      test(`${route.path} sem violações WCAG A/AA detectáveis (tema ${theme})`, async ({ page }) => {
        await setTheme(page, theme);
        await page.goto(route.path);
        await expect(page.locator("html")).toHaveClass(new RegExp(theme));
        await expectNoAxeViolations(page);
      });
    }
  }
});

test("skip link leva o foco ao conteúdo principal", async ({ page, browserName }) => {
  test.skip(browserName === "webkit", "Tab no WebKit não percorre links por padrão");
  await page.goto("/projetos");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Pular para o conteúdo principal" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("links repetidos dos cards são distinguíveis", async ({ page }) => {
  await page.goto("/projetos");
  const names = await page
    .getByRole("link", { name: /^Ver projeto/ })
    .evaluateAll((links) => links.map((l) => (l.textContent ?? "").trim()));
  expect(names.length).toBeGreaterThan(3);
  expect(new Set(names).size).toBe(names.length);
});

test("âncora de seção extra do case aponta para a seção certa", async ({ page }) => {
  await page.goto("/projetos/unificando/radar#architecture-security");
  const section = page.locator("section#architecture-security");
  await expect(section).toHaveAttribute("aria-labelledby", "architecture-security-heading");
  await expect(section).toBeInViewport();
  const top = await section.evaluate((el) => el.getBoundingClientRect().top);
  expect(top).toBeGreaterThanOrEqual(64);
});

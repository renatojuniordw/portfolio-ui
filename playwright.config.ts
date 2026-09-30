import { defineConfig, devices } from "@playwright/test";

/**
 * Testes de navegador contra o build de produção, servido pelo servidor
 * standalone (o mesmo modo do Dockerfile, já que next.config usa
 * `output: "standalone"`).
 *
 * - `npm run test:e2e` gera o build e sobe o servidor na porta E2E_PORT.
 *   Com E2E_SKIP_BUILD=1 reaproveita um `.next` já gerado.
 * - Projetos padrão bloqueiam service workers; o projeto "offline" os permite
 *   e roda só os testes marcados com @offline.
 * - Firefox e WebKit rodam apenas os testes marcados com @smoke.
 */
const PORT = Number(process.env.E2E_PORT ?? 3210);
const BASE_URL = `http://127.0.0.1:${PORT}`;
const build = process.env.E2E_SKIP_BUILD ? "" : "npm run build && ";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
  outputDir: "test-results",
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    serviceWorkers: "block",
    reducedMotion: "reduce",
    locale: "pt-BR",
  },
  webServer: {
    command: `${build}npm run start:standalone`,
    env: { PORT: String(PORT), HOSTNAME: "127.0.0.1" },
    url: BASE_URL,
    timeout: 240_000,
    // Nunca reaproveita um servidor já aberto na porta: ele pode servir um
    // build antigo. Use outra E2E_PORT se a porta estiver ocupada.
    reuseExistingServer: false,
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
      grepInvert: /@offline/,
    },
    {
      name: "chromium-mobile",
      use: { ...devices["Pixel 7"] },
      grepInvert: /@offline|@desktop-only/,
    },
    {
      name: "firefox-smoke",
      use: { ...devices["Desktop Firefox"] },
      grep: /@smoke/,
    },
    {
      name: "webkit-smoke",
      use: { ...devices["Desktop Safari"] },
      grep: /@smoke/,
    },
    {
      name: "offline",
      use: { ...devices["Desktop Chrome"], serviceWorkers: "allow" },
      grep: /@offline/,
    },
  ],
});

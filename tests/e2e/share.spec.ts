import { test, expect } from "./fixtures";

test("compartilhar no WhatsApp não tem destinatário; contato mantém o número", async ({ page }) => {
  await page.goto("/blog/por-que-seu-prompt-nao-funciona");
  const share = page.getByRole("link", { name: /Compartilhar no WhatsApp/ });
  const href = await share.getAttribute("href");
  const url = new URL(href!);
  expect(url.origin + url.pathname).toBe("https://wa.me/");
  expect(url.searchParams.get("text")).toContain(
    "https://renatobezerra.com.br/blog/por-que-seu-prompt-nao-funciona",
  );
  await expect(share).toHaveAttribute("target", "_blank");
  await expect(page.getByRole("link", { name: /Compartilhar no LinkedIn/ })).toBeVisible();

  await page.goto("/contato");
  await expect(
    page.getByRole("link", { name: /Iniciar Conversa/ }),
  ).toHaveAttribute("href", "https://wa.me/5581986986332");
});

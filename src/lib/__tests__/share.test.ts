import { describe, expect, it } from "vitest";
import { SOCIALS } from "../constants";
import { linkedinShareUrl, whatsappShareUrl } from "../share";

describe("whatsappShareUrl", () => {
  const url = "https://renatobezerra.com.br/blog/post";

  it("não inclui número de destinatário", () => {
    const share = new URL(whatsappShareUrl("Título", url));
    expect(share.origin).toBe("https://wa.me");
    expect(share.pathname).toBe("/");
    expect(share.href).not.toContain(SOCIALS.personal.whatsapp.replace("https://wa.me/", ""));
  });

  it("codifica acentos, &, # e quebra de linha uma única vez", () => {
    const text = "Ação & reação #1 — por Renato";
    const share = new URL(whatsappShareUrl(text, url));
    expect(share.searchParams.get("text")).toBe(`${text}\n${url}`);
    expect(share.search).not.toMatch(/%25/);
    expect(share.search).toContain("%0A");
    expect(share.search).toContain("%26");
    expect(share.search).toContain("%23");
  });

  it("mantém o contato pessoal apontando para o número original", () => {
    expect(SOCIALS.personal.whatsapp).toMatch(/^https:\/\/wa\.me\/\d+$/);
  });
});

describe("linkedinShareUrl", () => {
  it("codifica a URL do artigo", () => {
    const share = new URL(linkedinShareUrl("https://site.com/a?b=1&c=2"));
    expect(share.searchParams.get("url")).toBe("https://site.com/a?b=1&c=2");
  });
});

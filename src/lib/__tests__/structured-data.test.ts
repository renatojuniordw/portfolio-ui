import { describe, expect, it } from "vitest";
import { PROFILE } from "../constants";
import {
  breadcrumbJsonLd,
  personJsonLd,
  projectJsonLd,
} from "../structured-data";

describe("structured-data", () => {
  it("personJsonLd expõe nome e rede social", () => {
    const data = personJsonLd();
    expect(data.name).toBe(PROFILE.fullName);
    expect(data.sameAs.length).toBeGreaterThan(0);
  });

  it("breadcrumbJsonLd gera itens com URL absoluta", () => {
    const data = breadcrumbJsonLd([
      { name: "Home", item: "/" },
      { name: "Blog", item: "/blog" },
    ]);
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement).toHaveLength(2);
    expect(data.itemListElement[1].item).toContain("https://");
  });

  it("projectJsonLd representa um CreativeWork", () => {
    const url = "https://renatobezerra.com.br/projetos/18ia";
    const data = projectJsonLd({ name: "18IA", description: "Landing", url });
    expect(data["@type"]).toBe("CreativeWork");
    expect(data.url).toBe(url);
    expect(data.author.name).toBe(PROFILE.name);
  });
});
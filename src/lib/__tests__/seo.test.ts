import { describe, expect, it } from "vitest";
import { PROFILE } from "../constants";
import { buildMetadata } from "../seo";

describe("buildMetadata", () => {
  it("adiciona o nome do perfil ao título quando ausente", () => {
    const metadata = buildMetadata({ title: "Blog" });
    expect(metadata.title).toBe(`Blog | ${PROFILE.name}`);
  });

  it("não duplica o nome do perfil no título", () => {
    const metadata = buildMetadata({ title: `Blog | ${PROFILE.name}` });
    expect(metadata.title).toBe(`Blog | ${PROFILE.name}`);
  });

  it("usa título padrão com nome e cargo quando não informado", () => {
    const metadata = buildMetadata();
    expect(metadata.title).toContain(PROFILE.name);
    expect(metadata.title).toContain("Engenheiro de Software");
  });

  it("define canonical e og:url a partir do path", () => {
    const metadata = buildMetadata({ title: "X", path: "/blog" });
    expect(metadata.alternates?.canonical).toContain("/blog");
    expect(metadata.openGraph?.url).toContain("/blog");
  });
});
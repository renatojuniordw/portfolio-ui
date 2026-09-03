import { describe, expect, it } from "vitest";
import { PROJECT_CASES, getProjectCaseByPath } from "../project-cases";

describe("project-cases", () => {
  it("tem um catálogo não vazio", () => {
    expect(PROJECT_CASES.length).toBeGreaterThan(0);
  });

  it("todos os cases têm id e pathSegments únicos", () => {
    const ids = PROJECT_CASES.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);

    const paths = PROJECT_CASES.map((item) => item.pathSegments?.join("/"));
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("resolve path aninhado dos projetos Unificando", () => {
    const radar = getProjectCaseByPath(["unificando", "radar"]);
    expect(radar.id).toBe("radar-unificando");
  });

  it("resolve o case 18ia", () => {
    const projeto = getProjectCaseByPath(["18ia"]);
    expect(projeto.id).toBe("18ia");
  });

  it("lança erro para path desconhecido", () => {
    expect(() => getProjectCaseByPath(["nao-existe"])).toThrow(/Project not found/);
  });
});
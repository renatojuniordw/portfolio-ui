import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { FEATURED_PROJECT_IDS, PROJECTS, getFeaturedProjects } from "../projects";
import { PROJECT_CASES } from "../project-cases";
import { AREA_FILTERS, PROJECT_AREAS, filterByArea, parseAreaFilter } from "../project-areas";
import { extraSectionIds } from "../projects/helpers";

describe("catálogo de projetos", () => {
  it("cada projeto tem ao menos uma área válida e sem duplicatas", () => {
    for (const project of PROJECTS) {
      expect(project.areas.length, project.id).toBeGreaterThan(0);
      expect(new Set(project.areas).size).toBe(project.areas.length);
      for (const area of project.areas) expect(PROJECT_AREAS).toHaveProperty(area);
    }
  });

  it("links do catálogo coincidem com as rotas geradas", () => {
    const routes = PROJECT_CASES.map((c) => `/projetos/${(c.pathSegments ?? [c.id]).join("/")}`);
    expect(PROJECTS.map((p) => p.link)).toEqual(routes);
  });

  it("DTOs dos cards são serializáveis (sem ReactNode)", () => {
    expect(JSON.parse(JSON.stringify(PROJECTS))).toEqual(PROJECTS);
  });

  it("thumbnails apontam para arquivos existentes e registram a origem", () => {
    for (const project of PROJECTS.filter((p) => p.thumbnail)) {
      const file = path.join(process.cwd(), "public", project.thumbnail!.src);
      expect(fs.existsSync(file), file).toBe(true);
      expect(project.thumbnail!.alt.length).toBeGreaterThan(10);
      expect(project.thumbnail!.source.length).toBeGreaterThan(10);
    }
  });

  it("seções extras têm âncora e heading únicos em cada case", () => {
    for (const projectCase of PROJECT_CASES) {
      const ids = (projectCase.extraSections ?? []).flatMap((section, i) => {
        const { anchor, heading } = extraSectionIds(projectCase.id, section.id, i);
        return [anchor, heading];
      });
      expect(new Set(ids).size, projectCase.id).toBe(ids.length);
    }
  });

  it("gera IDs determinísticos quando a seção não tem id", () => {
    expect(extraSectionIds("radar", undefined, 1)).toEqual({
      anchor: "radar-secao-2",
      heading: "radar-secao-2-heading",
    });
    expect(extraSectionIds("radar", "arquitetura", 0).heading).toBe("arquitetura-heading");
  });
});

describe("projetos em destaque", () => {
  it("resolve três projetos do catálogo na ordem definida", () => {
    const featured = getFeaturedProjects();
    expect(featured.map((p) => p.id)).toEqual([...FEATURED_PROJECT_IDS]);
    expect(featured).toHaveLength(3);
  });
});

describe("filtro por área", () => {
  it("valor ausente ou inválido equivale a Todos", () => {
    expect(parseAreaFilter(null)).toBe("todos");
    expect(parseAreaFilter("")).toBe("todos");
    expect(parseAreaFilter("banana")).toBe("todos");
    expect(parseAreaFilter("toString")).toBe("todos");
    expect(parseAreaFilter("ia")).toBe("ia");
  });

  it("Todos devolve o catálogo inteiro; áreas filtram sem duplicar", () => {
    expect(filterByArea(PROJECTS, "todos")).toHaveLength(PROJECTS.length);
    for (const { value } of AREA_FILTERS.filter((f) => f.value !== "todos")) {
      const result = filterByArea(PROJECTS, value);
      expect(result.length, value).toBeGreaterThan(0);
      expect(result.every((p) => p.areas.includes(value as never))).toBe(true);
      expect(new Set(result.map((p) => p.id)).size).toBe(result.length);
    }
  });

  it("projeto com mais de uma área aparece em cada filtro correspondente", () => {
    const multi = PROJECTS.find((p) => p.areas.length > 1)!;
    for (const area of multi.areas) {
      expect(filterByArea(PROJECTS, area).map((p) => p.id)).toContain(multi.id);
    }
  });
});

describe("fronteira server/client", () => {
  it("componentes client do catálogo não importam os cases completos", () => {
    for (const file of ["src/components/ui/ProjectsClient.tsx", "src/components/ui/ProjectGrid.tsx"]) {
      const source = fs.readFileSync(path.join(process.cwd(), file), "utf-8");
      expect(source, file).not.toMatch(/from "@\/lib\/project-cases"/);
      expect(source, file).not.toMatch(/import \{[^}]*PROJECTS[^}]*\} from "@\/lib\/projects"/);
    }
  });
});

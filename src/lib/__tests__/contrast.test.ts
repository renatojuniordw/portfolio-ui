import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const TOKENS = fs.readFileSync(
  path.join(process.cwd(), "src/styles/tokens.css"),
  "utf-8",
);
const GLOBALS = fs.readFileSync(
  path.join(process.cwd(), "src/app/globals.css"),
  "utf-8",
);

function block(css: string, selector: string): string {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`Bloco ${selector} não encontrado`);
  return css.slice(start, css.indexOf("}", start));
}

function vars(css: string): Record<string, string> {
  return Object.fromEntries(
    [...css.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]),
  );
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const light = vars(block(TOKENS, ":root"));
const dark = { ...light, ...vars(block(TOKENS, ".dark")) };

const TEXT_TOKENS = [
  "text",
  "text-2",
  "muted",
  "accent-tech",
  "accent-ia",
  "accent-barraco",
  "danger",
  "success",
];
const SURFACES = ["bg", "surface-1", "surface-2"];

describe.each([
  ["claro", light],
  ["escuro", dark],
])("contraste do tema %s", (_, theme) => {
  it.each(TEXT_TOKENS)("--%s tem 4,5:1 sobre todas as superfícies", (token) => {
    for (const surface of SURFACES) {
      expect(
        contrast(theme[token], theme[surface]),
        `--${token} sobre --${surface}`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("--on-accent é legível sobre acentos preenchidos", () => {
    for (const fill of ["accent-tech", "danger"]) {
      expect(contrast(theme["on-accent"], theme[fill])).toBeGreaterThanOrEqual(4.5);
    }
  });
});

describe("syntax highlighting", () => {
  const rules = (css: string, prefix: string) =>
    [...css.matchAll(new RegExp(`^${prefix}\\.hljs-[\\w-]+ \\{ color: (#[0-9A-Fa-f]{6})`, "gm"))].map(
      (m) => m[1],
    );

  it("cores do tema claro têm 4,5:1 sobre o fundo do bloco de código", () => {
    const colors = rules(GLOBALS, "");
    expect(colors.length).toBeGreaterThan(5);
    for (const color of colors) {
      expect(contrast(color, light["surface-1"]), color).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("cores do tema escuro seguem a classe .dark e têm 4,5:1", () => {
    expect(GLOBALS).not.toMatch(/prefers-color-scheme/);
    const colors = rules(GLOBALS, "\\.dark ");
    expect(colors.length).toBeGreaterThan(5);
    for (const color of colors) {
      expect(contrast(color, dark["surface-1"]), color).toBeGreaterThanOrEqual(4.5);
    }
  });
});

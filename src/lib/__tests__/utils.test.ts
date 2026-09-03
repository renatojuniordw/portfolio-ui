import { describe, expect, it } from "vitest";
import { cn, EASE_OUT } from "../utils";

describe("cn", () => {
  it("concatena classes simples", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("ignora valores falsy", () => {
    expect(cn("a", false && "b", null, undefined, "c")).toBe("a c");
  });

  it("resolve conflitos do Tailwind via twMerge", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
  });
});

describe("EASE_OUT", () => {
  it("é uma tupla cubic-bezier", () => {
    expect(EASE_OUT).toEqual([0.16, 1, 0.3, 1]);
  });
});
import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchGitHubStats } from "../github";

describe("fetchGitHubStats", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("retorna null quando a API falha", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );

    expect(await fetchGitHubStats()).toBeNull();
  });

  it("agrega estrelas e calcula linguagens dominantes", async () => {
    const repos = [
      { stargazers_count: 10, language: "TypeScript" },
      { stargazers_count: 5, language: "TypeScript" },
      { stargazers_count: 3, language: "Python" },
    ];

    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((url: string) =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve(
              url.includes("repos")
                ? repos
                : { public_repos: 3, followers: 7 },
            ),
        }),
      ),
    );

    const stats = await fetchGitHubStats();
    expect(stats).not.toBeNull();
    expect(stats!.totalStars).toBe(18);
    expect(stats!.followers).toBe(7);
    expect(stats!.topLanguages[0]).toMatchObject({
      name: "TypeScript",
      percentage: 67,
    });
    expect(stats!.topLanguages[1].name).toBe("Python");
  });
});
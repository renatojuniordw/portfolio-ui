export interface GitHubStats {
  publicRepos: number;
  totalStars: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  followers: number;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  HTML: "#E34F26",
  CSS: "#1572B6",
  "C#": "#239120",
  Python: "#3776AB",
  SCSS: "#C6538C",
  Shell: "#89E051",
  Dockerfile: "#384D54",
};

const GH_TIMEOUT = 8_000;

export async function fetchGitHubStats(): Promise<GitHubStats | null> {
  try {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), GH_TIMEOUT);

    const [userRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users/renatojuniordw", { signal: ac.signal }),
      fetch("https://api.github.com/users/renatojuniordw/repos?per_page=100&sort=updated", { signal: ac.signal }),
    ]);
    clearTimeout(timer);

    if (!userRes.ok || !reposRes.ok) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[GitHub API] HTTP ${userRes.status} / ${reposRes.status}`);
      }
      return null;
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    const totalStars = repos.reduce(
      (sum: number, repo: { stargazers_count: number }) =>
        sum + repo.stargazers_count,
      0,
    );

    const langMap = new Map<string, number>();
    for (const repo of repos) {
      if (repo.language) {
        langMap.set(repo.language, (langMap.get(repo.language) || 0) + 1);
      }
    }

    const total = Array.from(langMap.values()).reduce((a, b) => a + b, 0);
    const topLanguages = Array.from(langMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / total) * 100),
        color: LANGUAGE_COLORS[name] || "#666",
      }));

    return {
      publicRepos: user.public_repos,
      totalStars,
      topLanguages,
      followers: user.followers,
    };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[GitHub API]", err);
    }
    return null;
  }
}

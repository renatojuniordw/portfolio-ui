"use client";

import { useEffect, useState } from "react";
import { GitCommit } from "lucide-react";

interface CommitInfo {
  message: string;
  repo: string;
  date: string;
  url: string;
}

export function GitHubStatus() {
  const [commit, setCommit] = useState<CommitInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGitHubStatus() {
      try {
        const res = await fetch("https://api.github.com/users/renatojuniordw/repos?sort=pushed&per_page=1");
        if (!res.ok) {
          if (res.status === 403) {
            throw new Error("Limite de requisições do GitHub atingido.");
          }
          throw new Error(`Erro na API: ${res.status}`);
        }
        const data = await res.json();
        
        if (data && data.length > 0) {
          const latestRepo = data[0];
          setCommit({
            message: latestRepo.description || "Atualização do repositório",
            repo: latestRepo.name,
            date: new Date(latestRepo.pushed_at).toLocaleDateString("pt-BR"),
            url: latestRepo.html_url,
          });
        } else {
          throw new Error("Nenhum repositório público encontrado.");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubStatus();
  }, []);

  if (loading) return <div className="text-xs text-text-secondary">Carregando status do GitHub...</div>;
  if (error) return null; // Ocultar em caso de erro silencioso
  if (!commit) return null;

  return (
    <a
      href={commit.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 text-xs text-text-secondary hover:text-text transition-colors print:hidden bg-surface-1/50 px-4 py-2 rounded-full border border-border"
    >
      <GitCommit size={14} className="text-tech animate-pulse" />
      <span className="truncate max-w-[250px] sm:max-w-[400px]">
        Última atividade: Push em <strong>{commit.repo}</strong> ({commit.date})
      </span>


    </a>
  );
}

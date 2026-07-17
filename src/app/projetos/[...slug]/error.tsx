"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center"
    >
      <div role="alert">
        <h1 className="text-4xl font-display font-light text-text mb-4">
          Projeto indisponível
      </h1>
      <p className="text-text-secondary mb-8 max-w-md">
        Não foi possível carregar os detalhes deste projeto.
      </p>
      </div>
      <div className="flex gap-4">
        <Button onClick={reset} variant="primary" size="lg" className="rounded-full">
          Tentar novamente
        </Button>
        <Button variant="outline" size="lg" className="rounded-full" asChild>
          <Link href="/projetos">
            <ArrowLeft size={18} className="mr-2" />
            Voltar para Projetos
          </Link>
        </Button>
      </div>
    </div>
  );
}

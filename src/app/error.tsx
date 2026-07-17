"use client";

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      role="alert"
      className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center"
    >
      <h1 className="text-6xl font-display font-light text-text mb-6">
        Algo deu errado
      </h1>
      <p className="text-text-secondary mb-8 max-w-md">
        Ocorreu um erro inesperado. Tente novamente ou volte para o início.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset} variant="primary" size="lg" className="rounded-full">
          Tentar novamente
        </Button>
        <Button variant="outline" size="lg" className="rounded-full" asChild>
          <Link href="/">
            <Home size={18} className="mr-2" />
            Início
          </Link>
        </Button>
      </div>
    </div>
  );
}

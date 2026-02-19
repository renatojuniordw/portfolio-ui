"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, Ghost } from "lucide-react";
import { HeroScene } from "@/components/three/HeroSceneWrapper";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden text-center selection:bg-tech selection:text-white">
      {/* Background Interativo com opacidade controlada para não ferir a leitura */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <HeroScene />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-12 z-10 max-w-3xl"
      >
        {/* Visual Impact Component */}
        <div className="relative inline-block cursor-help group">
          <motion.div
            animate={{
              rotate: [0, -5, 5, 0],
              scale: [1, 1.02, 0.98, 1],
            }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <h1 className="text-[12rem] md:text-[18rem] font-display font-black leading-none text-tech/10 select-none">
              404
            </h1>
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center mt-8">
            <motion.div
              whileHover={{ scale: 1.2, rotate: 15 }}
              className="bg-white p-6 rounded-3xl shadow-2xl border-2 border-tech/20"
            >
              <Ghost size={80} className="text-tech" strokeWidth={2.5} />
            </motion.div>
          </div>
        </div>

        {/* Text Area com foco em Acessibilidade */}
        <div className="space-y-6">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-text tracking-tight">
            Ops! Caminho Perdido.
          </h2>
          <p className="text-2xl md:text-3xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
            O recurso que você procura não existe ou foi{" "}
            <strong>movido para uma nova dimensão</strong>. Não se preocupe, o
            caminho de volta é seguro.
          </p>
        </div>

        {/* Actions - Botões Grandes e com Alto Contraste */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 mt-5">
          <Button
            size="lg"
            className="bg-tech text-white px-8 font-bold shadow-xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
            asChild
          >
            <Link href="/">
              <Home size={20} className="mr-2" />
              Início
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="px-8 font-bold border-2 border-tech text-tech hover:bg-tech/5 transition-all w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar
          </Button>
        </div>
      </motion.div>

      {/* Decorative Glitch Effect Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-ia/5 blur-3xl rounded-full" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-tech/5 blur-3xl rounded-full" />
    </div>
  );
}

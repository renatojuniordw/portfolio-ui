// Copia os assets que o `output: "standalone"` não inclui (public/ e
// .next/static), como faz o Dockerfile, para rodar `node .next/standalone/server.js`.
import { cpSync, existsSync } from "node:fs";

const target = ".next/standalone";
if (!existsSync(`${target}/server.js`)) {
  console.error("Build standalone não encontrado. Rode `npm run build` antes.");
  process.exit(1);
}
cpSync("public", `${target}/public`, { recursive: true });
cpSync(".next/static", `${target}/.next/static`, { recursive: true });
console.log("Assets copiados para .next/standalone");

# AI Chatbot — Plano de Implementação

> **Objetivo:** Assistente de IA integrado ao portfólio que responde perguntas sobre trajetória, skills e projetos de Renato Bezerra, além de capturar leads qualificados.

**Status:** Planejamento

---

## 1. Arquitetura Geral

```
[Visitante] → Chat Widget (React) → API Route (Next.js) → OpenAI API (GPT-4o-mini)
                                  ↕                          ↕
                           Portfolio Data            Resposta Streamada
```

- **Frontend**: Widget React flutuante com slide-out panel
- **Backend**: API Route Next.js (`/api/chat`)
- **LLM**: OpenAI GPT-4o-mini (128K contexto, baixo custo)
- **Dados**: Contexto extraído de `src/lib/*` e `src/content/blog/*`
- **Streaming**: Respostas em tempo real via Vercel AI SDK

---

## 2. Stack Técnico

| O que | Tecnologia | Motivo |
|-------|-----------|--------|
| AI SDK | `ai` (Vercel) | Streaming nativo, hook `useChat` |
| LLM Provider | `@ai-sdk/openai` | Provedor oficial do Vercel AI SDK |
| Frontend | React + Framer Motion | Reuso de padrões existentes |
| Ícones | `lucide-react` | Já existe no projeto |

### Dependências a instalar

```bash
npm install ai @ai-sdk/openai
```

---

## 3. Estrutura de Arquivos

```
src/
├── app/
│   └── api/
│       └── chat/
│           └── route.ts          ← API endpoint POST com streaming
├── components/
│   └── chat/
│       ├── ChatButton.tsx         ← Botão flutuante (canto inferior esquerdo)
│       ├── ChatPanel.tsx          ← Slide-out panel com mensagens
│       ├── ChatMessage.tsx        ← Bolha de mensagem individual
│       ├── ChatInput.tsx          ← Campo de input + botão enviar
│       ├── ChatSuggestions.tsx    ← Perguntas sugeridas iniciais
│       └── ChatProvider.tsx       ← Context + hook useChat
├── lib/
│   └── chat-context.ts            ← Monta system prompt com dados do portfólio
└── types/
    └── chat.ts                    ← Tipos específicos do chat
```

---

## 4. Fluxo de Dados

### 4.1 System Prompt

`src/lib/chat-context.ts` monta um prompt com dados reais:

```typescript
import { PROFILE } from "@/lib/constants";
import { EXPERIENCES } from "@/lib/experience";
import { EDUCATIONS, CERTIFICATIONS } from "@/lib/education";
import { getAllPosts } from "@/lib/blog";
import { PROJECT_CASES } from "@/lib/project-cases";

export function buildSystemPrompt(): string {
  // 1. Instruções de comportamento (tom, limites, objetivo)
  // 2. Dados do perfil (nome, título, resumo, PCD)
  // 3. Experiências (empresa, cargo, período, responsabilidades)
  // 4. Formação e certificações
  // 5. Projetos (nome, descrição, tecnologias)
  // 6. Blog posts recentes (título, descrição)
}
```

~22K tokens totais → cabe no GPT-4o-mini (128K). RAG com embeddings é overkill para esse volume.

### 4.2 API Route

`src/app/api/chat/route.ts`:

```typescript
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { buildSystemPrompt } from "@/lib/chat-context";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: buildSystemPrompt(),
    messages,
  });

  return result.toDataStreamResponse();
}
```

### 4.3 Comportamento do Assistente

| Tópico | Fonte de dados |
|--------|---------------|
| Quem é Renato, o que faz | `PROFILE.summary`, `PROFILE.title` |
| Experiência profissional | `EXPERIENCES[]` |
| Formação acadêmica | `EDUCATIONS[]` |
| Certificações | `CERTIFICATIONS[]` |
| Projetos detalhados | `PROJECT_CASES[]` (9 projetos) |
| Tecnologias e stack | Techs de cada projeto |
| Blog e artigos | `getAllPosts()` (7 posts) |
| Informações de contato | `SOCIALS` |

**Regras:**
- Responde em português pt-BR
- Transparente sobre ser IA
- NÃO inventa informações
- NÃO responde perguntas fora do escopo do portfólio
- Detecta intenção de contratação → lead capture

---

## 5. UI / Componentes

### ChatButton
- Fixed **bottom-left** (evita conflito com CommandPalette à direita)
- Ícone `MessageCircle`
- Bounce sutil a cada 30s sem interação
- Badge de notificação

### ChatPanel
- Slide-out: `w-[360px] h-[520px]` desktop, full-width mobile
- `rounded-2xl`, `bg-bg`, `border-border`, `shadow-soft-2`
- Header: "Assistente IA" + botão fechar
- ChatSuggestions (3-4 perguntas sugeridas) quando não há mensagens
- Mensagens com scroll automático
- Input + enviar no footer

### Animações (Framer Motion)
- Botão: `scale 0→1` + bounce periódico
- Painel: `opacity 0→1`, `y 20→0`, `scaleY 0.95→1`
- Mensagens: `opacity 0→1`, `y 10→0` com stagger
- Input focus: borda animada
- Todas respeitam `prefers-reduced-motion`

---

## 6. State Management

`ChatProvider` no `layout.tsx`:

```typescript
interface ChatState {
  isOpen: boolean;
  messages: Message[];
  isStreaming: boolean;
  unreadCount: number;
}
```

Hook `useChat` do Vercel AI SDK gerencia mensagens, streaming e erro automaticamente.

---

## 7. Segurança / Custo

| Medida | Implementação |
|--------|---------------|
| Rate limiting | Verificação de IP |
| Validação | Sanitizar input, limitar tamanho |
| Timeout | AbortController 30s |
| API Key | `OPENAI_API_KEY` via `.env.local` |
| Custo | ~$0.0003/chat (GPT-4o-mini) |

---

## 8. Deploy (Docker)

Atualizar `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - OPENAI_API_KEY=${OPENAI_API_KEY}
```

Criar `.env.example` com a variável documentada.

---

## 9. Tasks de Implementação

| # | Tarefa | Arquivos |
|---|--------|----------|
| 1 | Instalar deps + configurar env | `npm install`, `.env.local`, `.env.example` |
| 2 | Criar chat-context.ts | `src/lib/chat-context.ts` |
| 3 | Criar API route | `src/app/api/chat/route.ts` |
| 4 | Criar tipos | `src/types/chat.ts` |
| 5 | Criar ChatProvider | `src/components/chat/ChatProvider.tsx` |
| 6 | Criar ChatButton | `src/components/chat/ChatButton.tsx` |
| 7 | Criar ChatPanel + ChatMessage + ChatInput + ChatSuggestions | `src/components/chat/*.tsx` |
| 8 | Integrar no layout.tsx | `src/app/layout.tsx` |
| 9 | Atualizar Docker | `docker-compose.yml` |
| 10 | Build + verificar | `npm run build` |

---

## 10. Decisões de Arquitetura

| Decisão | Alternativa | Motivo |
|---------|-------------|--------|
| **GPT-4o-mini** | Modelo local (Ollama) | Custo quase zero, qualidade superior, sem infra extra |
| **Contexto direto** | RAG com embeddings | 22K tokens cabem no contexto, RAG é overkill |
| **Vercel AI SDK** | OpenAI SDK direto | Streaming simplificado, hook useChat pronto |
| **Widget próprio** | Chatbase/Crisp/iframe | Controle total, é case de portfólio, sem custo mensal |
| **Bottom-left** | Bottom-right | Não conflita com CommandPalette já existente |

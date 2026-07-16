# Hero dinâmico com campo de partículas — Design

## Contexto

A home (`src/app/page.tsx`) foi migrada recentemente para um layout de slides em tela cheia com scroll snap (`SnapScrollWrapper` + `SnapIndicator`), removendo de quebra a cena 3D do Hero (`react-three-fiber`, um orb reagindo ao cursor) e a `ArticlesSection` da home.

Essa migração trouxe dois problemas: seções de conteúdo (ex.: `DifferentialsSection`) forçadas a caber em `h-dvh` podem cortar conteúdo em telas menores, e o blog (recém-lançado) ficou sem visibilidade na home. A remoção do orb 3D foi intencional — não deve ser revivida — mas deixou o Hero visualmente estático.

## Objetivo

1. Reverter a home para fluxo de scroll normal (não mais slides em tela cheia), restaurando `AboutSection` e `ArticlesSection`.
2. Manter o Hero em tela cheia (`h-dvh`) como único elemento "slide-like" da página.
3. Substituir o vazio deixado pelo orb 3D por um novo efeito 2D leve: um campo de partículas em canvas que reage ao cursor no Hero.
4. Limpar o código morto deixado pela tentativa anterior.

## Escopo

### 1. Reversão do layout da home

`src/app/page.tsx` volta a renderizar, em fluxo de documento normal (sem wrapper de snap):

```
<HeroSection />
<AboutSection />
<DifferentialsSection />
<ArticlesSection />
<ContactSection />
```

`AboutSection.tsx` e `ArticlesSection.tsx` já existem no repositório e não foram tocados pela tentativa anterior — só precisam voltar a ser importados.

### 2. Limpeza de código morto

Remover, por não terem mais uso após a reversão:

- `src/components/home/SnapScrollWrapper.tsx`
- `src/components/home/SnapIndicator.tsx`
- `src/components/home/AboutSlide.tsx` (duplicata de `AboutSection.tsx` criada na tentativa anterior)

Reverter:

- `src/components/home/DifferentialsSection.tsx`: volta às classes originais (`section-wrapper`, título com `section-title`, sem `h-full`/`flex items-center` forçado).
- `src/components/fx/SmoothScroll.tsx`: remove o early-return condicionado a `pathname === "/"` — o Lenis volta a controlar o smooth scroll da home normalmente, como nas demais páginas.
- `src/app/globals.css`: remove o bloco `.snap-container` (scrollbar hidden / overscroll-behavior) adicionado para o layout de slides.

`src/components/three/HeroScene.tsx` e `HeroSceneWrapper.tsx` permanecem removidos (decisão já tomada: sem 3D no Hero).

### 3. Novo componente: `ParticleField`

`src/components/fx/ParticleField.tsx`, client component, sem props obrigatórias (`className?: string` opcional).

Usado dentro de `HeroSection` como camada de fundo, posicionada atrás do conteúdo existente (foto, texto, links):

```tsx
<section className="h-dvh relative ...">
  <ParticleField className="absolute inset-0 z-0" />
  {/* conteúdo existente do Hero, já com z-10/z-20 */}
</section>
```

**Comportamento desktop** (`matchMedia("(hover: hover) and (pointer: fine)")` verdadeiro e `prefers-reduced-motion: no-preference`):

- Canvas 2D com ~55 partículas distribuídas aleatoriamente dentro dos limites do container.
- Cada partícula tem velocidade própria pequena e quica nas bordas do canvas.
- Partículas próximas (< 90px) são conectadas por uma linha cuja opacidade decresce com a distância.
- O cursor exerce repulsão sobre partículas num raio de ~110px (partículas próximas ao cursor são empurradas para longe, proporcional à proximidade).
- Loop via `requestAnimationFrame`.

**Comportamento mobile/touch ou `prefers-reduced-motion: reduce`**:

- Sem loop de animação e sem listener de mouse — desenha um único frame estático no canvas com uma contagem menor de partículas (ex.: ~20), sem a lógica de repulsão.
- Evita custo de bateria/CPU e respeita a preferência de movimento reduzido.

**Cores**: lidas das CSS custom properties do tema (`--accent-ia` para pontos e linhas), assim o efeito se adapta automaticamente a light/dark sem lógica própria de tema.

**Performance/ciclo de vida**:

- `ResizeObserver` no elemento container para redimensionar o canvas (em vez de tamanho fixo ou recalcular só no mount).
- Pausa o loop de animação via evento `visibilitychange` quando a aba não está visível, retomando ao voltar.
- Cleanup completo (observer, listeners, `cancelAnimationFrame`) no unmount.

## Fora de escopo

- Qualquer efeito 3D/WebGL no Hero (decisão explícita de abandonar).
- Alterações de conteúdo/copy das seções.
- Transições de scroll além do que `ScrollReveal` (já existente, fade + slide-up) já fornece — não há necessidade de um mecanismo novo para isso.
- Alterações em `ContactSection`, `AboutSection` ou `ArticlesSection` além de voltarem a ser renderizadas.

## Teste / validação

Sem suite de testes automatizados aplicável a efeitos visuais deste tipo no projeto. Validação manual:

- Home renderiza Hero + Sobre + Diferenciais + Artigos + Contato em scroll normal, sem cortar conteúdo em nenhuma seção.
- `ParticleField` visível e reagindo ao cursor em desktop, em light e dark mode.
- Em viewport mobile (via devtools) ou com `prefers-reduced-motion` ativado, o canvas renderiza estático, sem consumo contínuo de CPU (verificar via performance profiler que não há loop de rAF rodando).
- Nenhuma referência remanescente a `SnapScrollWrapper`, `SnapIndicator` ou `AboutSlide` no código.

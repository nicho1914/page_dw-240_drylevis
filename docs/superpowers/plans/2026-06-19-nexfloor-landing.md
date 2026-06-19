# Nex Floor Landing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir `nexfloor-landing-wake.html` — uma landing de alta conversão para o piso Nex Floor (Granito Líquido) da Cristal, como fragmento HTML colável no CMS da Wake, fiel às referências MANA/DONE/Eco Fruits/Fresh&press e à identidade Cristal.

**Architecture:** Arquivo único, fragmento HTML (sem `<html>/<head>/<body>`). Todo CSS escopado em `#nxf-root` (custom properties + reset local). Layout fluido responsivo (`clamp()`, flex/grid com `flex-wrap`). JS vanilla sem acento, com guard clauses. Assets via jsDelivr; placeholders até os reais chegarem. Construído seção por seção; cada seção é verificada por render headless antes do commit.

**Tech Stack:** HTML5 fragment, CSS3 (custom properties, clamp, grid/flex, keyframe animations), JavaScript vanilla. Render de verificação via Chrome headless.

## Global Constraints

Copiado verbatim do spec (`docs/superpowers/specs/2026-06-19-nexfloor-landing-design.md`). Vale para TODAS as tasks:

- **Fragmento Wake:** sem `<html>/<head>/<body>`. Estrutura = `<link>` de fontes + `<div id="nxf-root">` contendo `<style>` + markup + `<script>` no fim.
- **CSS escopado:** todo seletor começa com `#nxf-root`. Nada pode vazar para o tema da loja.
- **Cores (CSS vars):** `--roxo:#7B529F` · `--roxo-claro:#af619e` · `--azul:#599ad5` · `--friso-1:#FFCC00` · `--friso-2:#FFED00` · `--ink:#1f1f1f` · `--creme:#f6f3ef` · `--branco:#fff`.
- **Fontes:** AmsiPro Cond **Ultra** (títulos) / **Black** (subtítulos) / **Regular** (texto), via `@font-face`. Até os arquivos chegarem, fallback condensado Google Fonts (Oswald p/ títulos pesados, Archivo Narrow p/ texto) na mesma cascata. Trocar só os `src` depois.
- **Assets:** base `https://cdn.jsdelivr.net/gh/nicho1914/page_dw-240_drylevis@main/Assets/`, prefixo `nexfloor-`. Placeholders neutros até os reais.
- **Texto visível:** acentos via entidades HTML (ex.: `&aacute;`, `&ccedil;`). **Código JS sem acento** (identificadores/comentários ASCII).
- **Idioma:** pt-BR apenas.
- **Responsivo:** sem largura/altura fixas de canvas; reflow real. Container `.wrap{max-width:1432px;margin-inline:auto;padding-inline:clamp(16px,4vw,60px)}`.
- **Reduced motion:** animações respeitam `@media (prefers-reduced-motion:reduce)`.

## Verificação (vale para todas as tasks)

Cada task termina com um render headless + conferência visual. Comando (git-bash):

```bash
mkdir -p render
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1440,4200 --screenshot="render/nexfloor-desktop.png" \
  "file:///c:/Users/marke/Downloads/project-app/nexfloor-landing-wake.html"
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=390,4200 --screenshot="render/nexfloor-mobile.png" \
  "file:///c:/Users/marke/Downloads/project-app/nexfloor-landing-wake.html"
```

Depois ler os PNGs (`render/nexfloor-*.png`) e conferir: (a) a seção bate com o movimento da referência citada; (b) nada quebrou nas seções anteriores; (c) sem overflow horizontal no mobile. **Não rodar `taskkill chrome` — o headless encerra sozinho e mataria o navegador do usuário.** Adicionar `render/` ao `.gitignore` (Task 1) para não commitar PNGs.

> Nota copy/assets: headlines e imagens são placeholders aprováveis; refinamento final de copy e troca pelos assets reais (+ fontes AmsiPro) acontecem com o usuário, fora do caminho crítico.

---

## Task 1: Scaffold + tokens + fonts + reset + container + topbar

**Files:**
- Create: `nexfloor-landing-wake.html` (sobrescreve o placeholder vazio de 0 bytes)
- Create/Modify: `.gitignore` (adicionar `render/`)

**Interfaces:**
- Produces: o root `#nxf-root`, as CSS vars, `.wrap`, a cascata de `@font-face`/fallback e as classes utilitárias que todas as seções seguintes consomem. Classe da topbar: `.nxf-topbar`.

- [ ] **Step 1: Criar o cabeçalho-comentário + link de fontes + shell do root**

Modelar pelo topo de `hold-stone-pro-wake.html` (comentário explicando como colar no Wake, fragmento, escopo, assets). Incluir `<link>` Google Fonts fallback (Oswald + Archivo Narrow) e abrir `<div id="nxf-root">` com `<style>`.

- [ ] **Step 2: Declarar `@font-face` (AmsiPro) + tokens + reset + `.wrap`**

```css
/* AmsiPro Cond — trocar os src pelos arquivos reais quando chegarem.
   Ate la, o fallback condensado abaixo assume. */
@font-face{ font-family:'AmsiPro Cond'; font-weight:900; font-display:swap;
  src:local('Oswald'); } /* placeholder: usa Oswald ate ter o arquivo Ultra */
#nxf-root{
  --roxo:#7B529F; --roxo-claro:#af619e; --azul:#599ad5;
  --friso-1:#FFCC00; --friso-2:#FFED00;
  --ink:#1f1f1f; --creme:#f6f3ef; --branco:#fff;
  --title:'Oswald','AmsiPro Cond',system-ui,sans-serif;
  --body:'Archivo Narrow','AmsiPro Cond',system-ui,sans-serif;
  font-family:var(--body); color:var(--ink); background:var(--branco);
  -webkit-font-smoothing:antialiased; overflow-x:hidden;
}
#nxf-root *,#nxf-root *::before,#nxf-root *::after{ box-sizing:border-box; margin:0; padding:0; }
#nxf-root img{ display:block; max-width:100%; }
#nxf-root a{ color:inherit; text-decoration:none; }
#nxf-root button{ font-family:inherit; cursor:pointer; }
#nxf-root .wrap{ width:100%; max-width:1432px; margin-inline:auto; padding-inline:clamp(16px,4vw,60px); }
```

- [ ] **Step 3: Markup da topbar fina** (*ref: MANA/DONE*)

```html
<div class="nxf-topbar"><div class="wrap nxf-topbar__in">
  <span>Linha Propiso &bull; Cristal</span>
  <span class="nxf-topbar__seal">Piso decorativo que reproduz granito</span>
</div></div>
```
CSS: fundo `var(--roxo)`, texto `#fff`, fonte title em caixa alta, `font-size:clamp(11px,1.4vw,13px)`, padding vertical ~8px, flex space-between; esconder `.nxf-topbar__seal` em `max-width:560px`.

- [ ] **Step 4: Fechar o shell** com `</style>`, um `<!-- secoes entram aqui -->` e `</div>` (o `#nxf-root`). Garantir que o arquivo é válido como fragmento.

- [ ] **Step 5: Adicionar `render/` ao `.gitignore`**

- [ ] **Step 6: Render + verificar** (comando da seção "Verificação"). Esperado: topbar roxa no topo, sem erro de layout, sem scroll horizontal.

- [ ] **Step 7: Commit**

```bash
git add nexfloor-landing-wake.html .gitignore
git commit -m "Nex Floor: scaffold (root escopado, tokens, fontes, container, topbar)"
```

---

## Task 2: Hero "Showroom"  · *ref: MANA headline + Eco Fruits imersão + Fresh&press watermark*

**Files:** Modify `nexfloor-landing-wake.html`

**Interfaces:**
- Consumes: `.wrap`, tokens, `--title`/`--body` (Task 1).
- Produces: classes `.nxf-hero*`; o CTA pill reutilizável `.nxf-cta` (com seta SVG) que as Tasks 8 e 9 reaproveitam.

- [ ] **Step 1: Markup do hero**

Estrutura: seção full-bleed com foto de fundo + overlay; `.wrap` por cima com grid de 2 colunas (conteúdo / produto). Conteúdo: chip de prova social, headline gigante, subhead, CTA pill. Coluna produto: balde flutuando + tags à direita. Watermark de texto atrás (opcional, `aria-hidden`).

```html
<section class="nxf-hero">
  <img class="nxf-hero__bg" src="https://cdn.jsdelivr.net/gh/nicho1914/page_dw-240_drylevis@main/Assets/nexfloor-hero-bg.png" alt="Piso Nex Floor com acabamento granito" />
  <div class="wrap nxf-hero__grid">
    <div class="nxf-hero__col">
      <div class="nxf-chip"><span class="nxf-chip__av"></span>Quem conhece usa e recomenda</div>
      <h1 class="nxf-hero__title">O granito que se<br>aplica como tinta.</h1>
      <p class="nxf-hero__sub">Piso ep&oacute;xi autonivelante que reproduz o granito. Acabamento monol&iacute;tico, decorativo e de alta resist&ecirc;ncia.</p>
      <a class="nxf-cta" href="#nxf-comprar">Onde comprar <svg ...seta.../></a>
    </div>
    <div class="nxf-hero__product">
      <span class="nxf-hero__wm" aria-hidden="true">GRANITO</span>
      <img src="...nexfloor-balde.png" alt="Balde Nex Floor" />
      <ul class="nxf-hero__tags"><li>Ep&oacute;xi bicomponente</li><li>Autonivelante</li><li>Granito</li></ul>
    </div>
  </div>
</section>
```

- [ ] **Step 2: CSS do hero** — `.nxf-hero{position:relative;min-height:clamp(560px,82vh,820px);display:flex;align-items:center}`; `.nxf-hero__bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}` + overlay via `::after` (gradiente escuro/roxo p/ legibilidade). Grid 2 col em desktop, 1 col empilhada no mobile (`grid-template-columns:1.1fr .9fr; gap:clamp(24px,4vw,56px)`; `@media(max-width:860px){grid-template-columns:1fr;text-align:center}`).

- [ ] **Step 3: Tipografia do título** — `.nxf-hero__title{font-family:var(--title);font-weight:900;line-height:.92;text-transform:uppercase;font-size:clamp(44px,8.5vw,118px);color:#fff}`. Subhead `clamp(15px,2vw,22px)`, max-width ~480px.

- [ ] **Step 4: CTA pill + seta** — `.nxf-cta{display:inline-flex;align-items:center;gap:12px;background:var(--friso-1);color:var(--ink);font-family:var(--title);text-transform:uppercase;font-weight:900;padding:14px 26px;border-radius:100px;transition:.18s}` + hover (escurece/translada). Seta SVG inline. Chip, tags e watermark estilizados (tags = pills com borda; watermark = texto gigante translúcido atrás do produto).

- [ ] **Step 5: Render + verificar** (desktop + mobile). Conferir: headline domina o topo, produto legível, sem overflow, empilha certo no mobile.

- [ ] **Step 6: Commit** — `git add -A && git commit -m "Nex Floor: hero showroom (headline gigante, CTA, chip, tags)"`

---

## Task 3: Marquee de benefícios  · *ref: DONE (2 fileiras rolando)*

**Files:** Modify `nexfloor-landing-wake.html`

**Interfaces:**
- Consumes: tokens, `--title`.
- Produces: `.nxf-marquee` + função JS `nxfInitMarquee()` (duplica os nós para loop perfeito).

- [ ] **Step 1: Markup** — duas faixas `.nxf-marquee__row` (uma normal, uma `--reverse`), cada uma com uma `<ul class="nxf-marquee__track">` de pills: Acabamento granito, Autonivelante, Alta resist&ecirc;ncia, Monol&iacute;tico, Baixa espessura, F&aacute;cil limpeza, Decorativo, Resiste a intemp&eacute;ries. Cores alternadas (roxo/amarelo/azul) por `:nth-child`.

- [ ] **Step 2: CSS** — track em `display:flex;gap:14px;width:max-content;animation:nxf-scroll 32s linear infinite`. `@keyframes nxf-scroll{to{transform:translateX(-50%)}}` (funciona porque os nós são duplicados). `--reverse` usa `animation-direction:reverse`. `:hover{animation-play-state:paused}`. Pills: `font-family:var(--title);text-transform:uppercase;padding:10px 22px;border-radius:100px`. Bloco section com fundo `var(--creme)`, padding vertical `clamp(28px,5vw,56px)`, `overflow:hidden`.

- [ ] **Step 3: JS `nxfInitMarquee()`** — para cada `.nxf-marquee__track`, clonar `innerHTML` (append) para o loop de -50% ser contínuo. ASCII puro, guard clause se não houver tracks.

- [ ] **Step 4: Reduced motion** — `@media (prefers-reduced-motion:reduce){#nxf-root .nxf-marquee__track{animation:none}}` (vira lista estática com wrap).

- [ ] **Step 5: Render + verificar** — duas fileiras de pills coloridas; sem overflow vertical estranho.

- [ ] **Step 6: Commit** — `git commit -am "Nex Floor: marquee de beneficios (2 fileiras, DONE-style)"`

---

## Task 4: Galeria de acabamentos  · *ref: MANA "flavors" / Eco Fruits assortment*

**Files:** Modify `nexfloor-landing-wake.html`

**Interfaces:**
- Consumes: `.wrap`, tokens.
- Produces: `.nxf-gallery` + cards `.nxf-acab`.

- [ ] **Step 1: Markup** — header (título "Escolha seu acabamento" + linha de apoio) + grid de 4 cards. Cada card: foto do padrão de granito + label pill (ex.: "Granito Preto", "Granito Cinza", "Granito Bege", "Granito Branco") + cor de fundo do card alternando da paleta.

```html
<section class="nxf-gallery"><div class="wrap">
  <h2 class="nxf-h2">Escolha seu acabamento</h2>
  <div class="nxf-gallery__grid">
    <article class="nxf-acab"><img src="...nexfloor-acab-1.png" alt="..."><span class="nxf-acab__lbl">Granito Preto</span></article>
    <!-- acab-2..4 -->
  </div>
</div></section>
```

- [ ] **Step 2: CSS** — `.nxf-gallery__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(16px,2vw,24px)}` com `@media(max-width:900px){repeat(2,1fr)}` e `@media(max-width:520px){repeat(1,1fr)}`. Card: `border-radius:24px;overflow:hidden;position:relative` + foto `aspect-ratio:3/4;object-fit:cover` + label pill posicionada (`position:absolute;left:16px;bottom:16px`). Hover: leve scale/elevação. `.nxf-h2{font-family:var(--title);text-transform:uppercase;font-size:clamp(30px,5vw,64px);font-weight:900}` (reutilizável nas próximas seções).

- [ ] **Step 3: Render + verificar** — 4 cards alinhados, reflow 4→2→1.

- [ ] **Step 4: Commit** — `git commit -am "Nex Floor: galeria de acabamentos (cards estilo flavors)"`

---

## Task 5: Split lifestyle  · *ref: MANA "Drink your way to happiness"*

**Files:** Modify `nexfloor-landing-wake.html`

**Interfaces:**
- Consumes: `.wrap`, `.nxf-h2`, tokens, frisos.
- Produces: `.nxf-split`, classes de friso/sticker `.nxf-friso`.

- [ ] **Step 1: Markup** — grid 2 colunas: texto à esquerda ("Um piso inteiro. Sem rejunte, sem emenda." + parágrafo) e colagem de fotos à direita (3 imagens sobrepostas: ambiente, detalhe de textura, aplicação) com acentos de friso amarelo (formas SVG/divs).

- [ ] **Step 2: CSS** — grid `1fr 1fr` (empilha no mobile). Colagem: container `position:relative` com imagens em `position:absolute` levemente rotacionadas + uma em destaque; `.nxf-friso` = blocos/zigue-zague amarelo como sticker (SVG inline ou `background`). Garantir que a colagem não estoure no mobile (vira coluna simples empilhada, sem rotação exagerada).

- [ ] **Step 3: Render + verificar** — composição com profundidade no desktop; legível e sem overflow no mobile.

- [ ] **Step 4: Commit** — `git commit -am "Nex Floor: split lifestyle (colagem + frisos)"`

---

## Task 6: Sistema prepara → aplica → resultado  · *ref: Eco Fruits "О нас"*

**Files:** Modify `nexfloor-landing-wake.html`

**Interfaces:**
- Consumes: `.wrap`, `.nxf-h2`, tokens.
- Produces: `.nxf-system` + cards `.nxf-step`.

- [ ] **Step 1: Markup** — header ("Como funciona o sistema Nex Floor") + 3 cards numerados: **1. Nivela & Primer** (prepara: aderência, barreira de vapor, regulariza) → **2. Granito Líquido** (aplica: autonivelante, acabamento granito) → **3. Resultado** (piso monolítico pronto). Cada card: número grande, imagem do produto/etapa, título, descrição curta. Conectores/seta entre passos no desktop.

- [ ] **Step 2: CSS** — grid 3 colunas (`@media(max-width:820px){1fr}`). Número em `var(--title)` gigante com cor da etapa (roxo/azul/amarelo). Cards com `var(--creme)` ou borda. Seta/conector via `::after` no desktop.

- [ ] **Step 3: Render + verificar** — jornada clara 1→2→3; empilha no mobile.

- [ ] **Step 4: Commit** — `git commit -am "Nex Floor: sistema prepara-aplica-resultado (3 passos)"`

---

## Task 7: Bento de benefícios  · *ref: DONE "Your gut knows so does science"*

**Files:** Modify `nexfloor-landing-wake.html`

**Interfaces:**
- Consumes: `.wrap`, `.nxf-h2`, tokens, frisos.
- Produces: `.nxf-bento` + `.nxf-bento__cell` (modificadores de cor/foto).

- [ ] **Step 1: Markup** — pill "BENEF&Iacute;CIOS" + título ("Por que Nex Floor") + grid bento assimétrico: células de cor sólida (roxo/amarelo/azul) com texto curto + células de foto lifestyle. Benefícios: alta resist&ecirc;ncia, acabamento decorativo (granito), monol&iacute;tico sem emendas, f&aacute;cil aplica&ccedil;&atilde;o e limpeza. Um sticker de friso ancorando.

- [ ] **Step 2: CSS** — `display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:minmax(180px,auto);gap:clamp(12px,1.6vw,20px)` com algumas células em `grid-column/row: span 2`. Modificadores: `--roxo`(texto branco), `--amarelo`(texto ink), `--azul`(texto branco), `--foto`(imagem cover). `@media(max-width:820px){grid-template-columns:repeat(2,1fr)}` e `(max-width:520px){1fr; sem spans}`.

- [ ] **Step 3: Render + verificar** — bento com mix de cor+foto, hierarquia clara; colapsa limpo no mobile (sem buracos).

- [ ] **Step 4: Commit** — `git commit -am "Nex Floor: bento de beneficios (mix cor + foto)"`

---

## Task 8: Banda promessa  · *ref: MANA "Turning fantasies into reality"*

**Files:** Modify `nexfloor-landing-wake.html`

**Interfaces:**
- Consumes: `.wrap`, `.nxf-cta` (Task 2), tokens.
- Produces: `.nxf-band`.

- [ ] **Step 1: Markup** — faixa com fundo `var(--roxo)`, produto/imagem nas laterais, headline central forte ("Transforme qualquer piso em granito.") + subtexto + `.nxf-cta`.

- [ ] **Step 2: CSS** — `.nxf-band{background:var(--roxo);color:#fff;border-radius:clamp(20px,3vw,40px);padding:clamp(40px,7vw,96px);margin-block:clamp(48px,8vw,110px);position:relative;overflow:hidden;text-align:center}` + imagens laterais `position:absolute` (escondidas/reduzidas no mobile). Headline em `var(--title)`.

- [ ] **Step 3: Render + verificar** — banda quebra o ritmo claro; CTA visível; mobile sem imagens estourando.

- [ ] **Step 4: Commit** — `git commit -am "Nex Floor: banda promessa (CTA roxo)"`

---

## Task 9: CTA / Lead final  · *ref: Eco Fruits form sobre imagem + PDF Cristal*

**Files:** Modify `nexfloor-landing-wake.html`

**Interfaces:**
- Consumes: `.wrap`, `.nxf-cta`, tokens.
- Produces: `.nxf-lead` com `id="nxf-comprar"` (alvo do CTA do hero).

- [ ] **Step 1: Markup** — seção com foto de fundo + overlay; bloco de conversão: headline "Quer facilitar sua obra?" + subtexto (copy do PDF) + dois botões: **WhatsApp** (`https://wa.me/551140666262`) e **Onde comprar** (`.nxf-cta`). (Default sem form/backend, conforme spec.)

- [ ] **Step 2: CSS** — padrão do hero (bg cover + overlay), conteúdo centralizado em `.wrap`, botões lado a lado (empilham no mobile). `id="nxf-comprar"` com `scroll-margin-top` para o anchor.

- [ ] **Step 3: Render + verificar** — clicar no CTA do hero rola até aqui; botões legíveis sobre a foto.

- [ ] **Step 4: Commit** — `git commit -am "Nex Floor: CTA/lead final (WhatsApp + onde comprar)"`

---

## Task 10: Footer Cristal  · *reproduz o footer do site*

**Files:** Modify `nexfloor-landing-wake.html`

**Interfaces:**
- Consumes: `.wrap`, tokens, frisos.
- Produces: `.nxf-footer`.

- [ ] **Step 1: Markup** — **onda amarela** (SVG inline, friso) no topo do bloco + fundo `var(--roxo)` + colunas de links reproduzindo o footer institucional do PDF: "Cristal e voc&ecirc;" (Sobre, Fale Conosco, Home), "Produtos" (Propiso, Tintas e Acess&oacute;rios, Umi Block), "Contato" (WhatsApp/Telefone (11) 4066-6262, Av. Casa Grande 52 — Diadema/SP), "Cat&aacute;logo". **Logo Cristal** (SVG inline).

- [ ] **Step 2: CSS** — onda SVG full-width no topo; bloco roxo com grid de colunas (`repeat(4,1fr)` → `repeat(2,1fr)` → `1fr`). Texto `#ededed`. Logo posicionada (canto, como no PDF).

- [ ] **Step 3: Render + verificar** — footer fiel ao site Cristal (onda + roxo + colunas + logo); reflow no mobile.

- [ ] **Step 4: Commit** — `git commit -am "Nex Floor: footer Cristal (onda amarela + colunas + logo)"`

---

## Task 11: Polish final — responsivo, consistência e render de fechamento

**Files:** Modify `nexfloor-landing-wake.html`

**Interfaces:** Consumes tudo. Produces nada novo (ajustes).

- [ ] **Step 1: Auditar espaçamento vertical** entre seções (ritmo consistente via `margin-block`/`padding-block` com `clamp`). Padronizar `.nxf-h2` e larguras de seção.

- [ ] **Step 2: Sweep responsivo** em 3 larguras: 1440, 768, 390. Render headless nas três; corrigir qualquer overflow horizontal, texto cortado ou colagem/bento quebrados.

```bash
for w in 1440 768 390; do
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=${w},5200 --screenshot="render/nexfloor-${w}.png" \
  "file:///c:/Users/marke/Downloads/project-app/nexfloor-landing-wake.html"; done
```

- [ ] **Step 3: Checagem de escopo** — confirmar (Grep) que todo seletor CSS no `<style>` começa com `#nxf-root` (nada global vazando). Confirmar JS sem acento.

- [ ] **Step 4: Checagem de fragmento** — sem `<html>/<head>/<body>`; só `<link>` + `#nxf-root`. Cabeçalho-comentário de instruções presente.

- [ ] **Step 5: Render final** (desktop+mobile) e revisão geral contra as referências.

- [ ] **Step 6: Commit** — `git commit -am "Nex Floor: polish responsivo + consistencia (landing completa)"`

---

## Self-Review (preenchido)

**1. Cobertura do spec:** topbar→T1 · hero→T2 · marquee→T3 · galeria→T4 · split→T5 · sistema→T6 · bento→T7 · banda→T8 · CTA/lead→T9 · footer→T10. Tokens/fontes/escopo/responsivo→T1+T11. Interações JS (marquee/guard)→T3+T11. Tudo do spec (10 seções) tem task. Removidos (técnicos/depoimento) corretamente ausentes.

**2. Placeholders:** copy/imagens são placeholders **intencionais e aprováveis** (declarado no spec, fora do caminho crítico). Nenhum "TODO/TBD" estrutural — cada task tem markup, CSS e comando concretos.

**3. Consistência de tipos/nomes:** `.nxf-cta` definido em T2 e reusado em T8/T9. `.nxf-h2` definido em T4 e reusado em T6/T7. `nxfInitMarquee()` só em T3. `#nxf-comprar` produzido em T9 e referenciado pelo CTA do hero em T2. Vars de cor idênticas em todas as tasks (Global Constraints). OK.

## Pendências externas (não bloqueiam o build)
- Arquivos de fonte AmsiPro Cond (Ultra/Black/Regular) → trocar `src` dos `@font-face`.
- Assets reais `nexfloor-*` no repo jsDelivr.
- Copy definitiva (headlines).
- Licença AmsiPro antes de publicar.

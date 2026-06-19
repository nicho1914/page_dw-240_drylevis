# Landing Page — Nex Floor (Granito Líquido) · Cristal / Linha Propiso

**Data:** 2026-06-19
**Arquivo de saída:** `nexfloor-landing-wake.html`
**Tipo:** Fragmento HTML para bloco de conteúdo da Wake (modo código-fonte)

---

## 1. Contexto

A Cristal tem hoje uma página de produto institucional e técnica para o Nex Floor
(linha Propiso) — pouco atrativa e sem foco em conversão. O objetivo é criar uma
**landing moderna, ousada e de alta conversão** que venda o **resultado** do produto:
um piso decorativo que reproduz granito.

Segue o mesmo padrão das landings anteriores do projeto (Hold Stone, Umi Block,
DW240): um único fragmento HTML, **sem `<html>/<head>/<body>`**, com CSS escopado
em um root próprio para não vazar no tema da loja, responsivo de verdade (reflow,
sem canvas fixo), assets via CDN jsDelivr e JS sem acentuação.

### Produto
**Nex Floor Granito Líquido** — piso autonivelante em epóxi bicomponente, de
acabamento fino, que **reproduz o granito**, com excelente resistência. Ideal para
composição decorativa e pisos monolíticos (sem rejunte/emenda). O **Nex Floor
Nivela & Primer** (promotor de aderência, barreira de vapor, regularizador de baixa
espessura) entra como **parte do sistema** de preparo, não como protagonista.

### Posicionamento aprovado
**Foco no Granito Líquido (decorativo).** O hero vende o resultado bonito; o primer
aparece dentro da seção "Sistema".

## 2. Objetivo

Apresentar o Nex Floor de forma desejável e converter (orçamento / onde comprar /
contato), trazendo a energia de landings de produto de consumo para um produto de
construção.

## 3. Referências de composição (fidelidade obrigatória)

A direção é **reproduzir movimentos compositivos específicos** das referências
fornecidas — não reinterpretar livremente nem cair em "card genérico". Mapeamento:

- **MANA** (energy drink): headline central gigante com CTA pill inline; produto
  centralizado; chip de prova social à esquerda + tags à direita; seção "flavors"
  em cards com badge; split lifestyle com colagem + stickers; banda colorida de
  promessa; footer com logo grande.
- **DONE** (protein drink): marquee de tags em 2 fileiras; bento grid misturando
  cards de cor sólida e fotos lifestyle, com sticker gráfico.
- **Eco Fruits / Zest Citrus**: hero imersivo com produto + glow; cards de
  benefício em cores de marca; seção de lead/form sobre imagem de fundo.
- **Fresh&press**: hero com watermark de texto atrás do produto; grid de cards de
  produto.

Tradução: as referências são alimento/bebida; aqui aplicamos a **estrutura e a
energia visual** ao Nex Floor (piso/granito), vestidas na identidade Cristal.

## 4. Identidade visual (tokens)

Definidos como CSS custom properties em `#nxf-root`.

| Token | Hex | Uso |
|---|---|---|
| `--roxo` | `#7B529F` | Cor-mãe Cristal (títulos, CTA, banda) |
| `--roxo-claro` | `#af619e` | Apoio / detalhes |
| `--azul` | `#599ad5` | Linha Propiso (acentos, pills) |
| `--friso-1` | `#FFCC00` | Friso/realce |
| `--friso-2` | `#FFED00` | Friso/realce |
| `--ink` | `~#1f1f1f` | Texto escuro |
| `--creme` | `~#f6f3ef` | Fundo claro |
| `--branco` | `#fff` | Fundo/contraste |

**Tipografia — AmsiPro Condensed** (fonte comercial; o usuário enviará os arquivos
para embutir via `@font-face`):
- Título: **AmsiPro Cond Ultra**
- Subtítulo: **AmsiPro Cond Black**
- Texto: **AmsiPro Cond Regular**

Enquanto os arquivos não chegam, usar **fallback condensado** (ex.: Oswald / Archivo
Narrow via Google Fonts) com os mesmos pesos, declarado na mesma cascata, para o
layout ser aprovável já. A troca para a AmsiPro real é só substituir os `src` do
`@font-face` — sem mexer no resto. (Comprar/validar a licença antes de publicar.)

## 5. Abordagem técnica

- **Fragmento Wake**: nenhum `<html>/<head>/<body>`. `<link>` de fontes + um único
  `<div id="nxf-root">` com `<style>` escopado e `<script>` no fim.
- **CSS escopado**: todo seletor prefixado com `#nxf-root`. Reset local
  (`box-sizing`, reset de margin/padding, `img{display:block;max-width:100%}`).
- **Responsivo**: layout fluido com `clamp()` e fl/grid com `flex-wrap`; sem
  largura/altura fixas de canvas. Container central (`.wrap`, `max-width ~1432px`,
  padding lateral com `clamp`).
- **Assets**: imagens/vídeo via `https://cdn.jsdelivr.net/gh/nicho1914/page_dw-240_drylevis@main/Assets/`
  com prefixo `nexfloor-*`. Placeholders até o usuário commitar os reais.
- **SVGs** (logo Cristal, ícones, seta do CTA, onda do footer) embutidos inline.
- **JS vanilla, sem acento** (comentários/identificadores ASCII): marquee, troca de
  acabamento na galeria (se aplicável), e quaisquer interações leves. Tolerante a
  ausência de elementos (guard clauses).
- **Acentos em entidades HTML** no texto visível (padrão das outras landings).
- Cabeçalho-comentário no topo explicando como colar no Wake e o que ajustar
  (igual hold-stone-pro-wake.html).

## 6. Especificação seção a seção

Ordem final aprovada (10 seções):

### 6.1 Topbar fina  · *ref: MANA/DONE*
Faixa fina no topo (fundo roxo ou creme) com "Linha Propiso • Cristal" + selo/ícone.
Decorativa, reforça marca. Esconde elegante no mobile (texto curto).

### 6.2 Hero "Showroom"  · *ref: MANA headline + Eco Fruits imersão + Fresh&press watermark*
- Fundo: foto **full-bleed de piso granito pronto** (placeholder `nexfloor-hero-bg`),
  com overlay sutil para legibilidade.
- **Headline condensada gigante** (AmsiPro Ultra). Direção de copy:
  "O granito que se aplica como tinta." (a refinar).
- Subhead curto (Black) com a promessa decorativa + resistência.
- **CTA pill com seta** ("Onde comprar →" / "Quero na minha obra →").
- **Chip de prova social** à esquerda (avatar + "Quem conhece usa e recomenda").
- **Tags do produto** à direita: Epóxi bicomponente · Autonivelante · Granito.
- **Balde Nex Floor** flutuando (placeholder `nexfloor-balde`).
- Watermark sutil de texto atrás do produto (toque Fresh&press), opcional.

### 6.3 Marquee de benefícios  · *ref: DONE (2 fileiras rolando)*
Duas fileiras de pills em rolagem contínua (direções opostas), cores da marca
alternadas (roxo/amarelo/azul). Conteúdo: Acabamento granito · Autonivelante ·
Alta resistência · Monolítico · Baixa espessura · Fácil limpeza · Decorativo ·
Resiste a intempéries. Animação CSS; pausa no hover. Respeita
`prefers-reduced-motion`.

### 6.4 Galeria de acabamentos  · *ref: MANA "flavors" / Eco Fruits assortment*
Título ("Escolha seu acabamento") + 3–4 **cards coloridos** com foto do padrão/cor
de granito + label pill (nome do acabamento). Cards com cantos arredondados, leve
elevação, hover. (Sem rating; é piso, não sabor.)

### 6.5 Split lifestyle  · *ref: MANA "Drink your way to happiness"*
Texto à esquerda — "Um piso inteiro. Sem rejunte, sem emenda." + parágrafo de apoio.
À direita, **colagem de fotos** (ambiente acabado, detalhe de textura, aplicação)
com **acentos de friso amarelo** como stickers/elementos gráficos.

### 6.6 Sistema prepara → aplica → resultado  · *ref: Eco Fruits "О нас"*
3 passos em cards/colunas: **1) Nivela & Primer** (prepara — aderência, barreira de
vapor, regulariza) → **2) Granito Líquido** (aplica — autonivelante, acabamento
granito) → **3) Resultado** (piso monolítico pronto). Numeração + ícone/produto por
passo.

### 6.7 Bento de benefícios  · *ref: DONE "Your gut knows so does science"*
Grid **bento** assimétrico misturando cards de **cor sólida da marca** (roxo /
amarelo / azul) com texto curto e cards de **foto lifestyle**. Benefícios: alta
resistência · acabamento decorativo (granito) · monolítico sem emendas · fácil
aplicação e limpeza. Um sticker gráfico (friso) ancorando a composição.

### 6.8 Banda promessa  · *ref: MANA "Turning fantasies into reality"*
Faixa de cor (roxo Cristal) com headline forte ("Transforme qualquer piso em
granito."), produto nas laterais e **CTA**. Quebra o ritmo branco/creme.

### 6.9 CTA / Lead final  · *ref: Eco Fruits form sobre imagem + PDF Cristal*
Faixa com **foto de fundo** (ambiente) e bloco de conversão. Copy do PDF: "Quer
facilitar sua obra ou aumentar o faturamento do seu negócio?". Ação: **form simples
(nome / WhatsApp / mensagem)** OU botões **WhatsApp + Onde comprar** — definir no
plano; default: WhatsApp + Onde comprar (menos fricção, sem backend). Contato base:
(11) 4066-6262, Diadema-SP.

### 6.10 Footer Cristal  · *reproduz o footer do site*
**Onda amarela** (friso, SVG) no topo do bloco + **fundo roxo** + colunas de links
("Cristal e você", "Produtos", "Contato", "Catálogo") + **logo Cristal** (SVG).
Reproduz a estrutura do footer institucional do PDF.

## 7. Interações (JS)

- Marquee contínuo nas duas fileiras (CSS-driven; JS só se precisar duplicar nós).
- Hover/active nos cards da galeria e nos CTAs.
- (Opcional) troca de imagem grande ao clicar num acabamento da galeria.
- Tudo com guard clauses; nenhuma dependência externa; sem acento no código.

## 8. Assets necessários (usuário fornece via repo, prefixo `nexfloor-`)

1. `nexfloor-hero-bg` — foto de piso granito pronto (full-bleed, alta resolução).
2. `nexfloor-balde` — render/foto do balde Nex Floor recortado (PNG transparente).
3. `nexfloor-acab-1..4` — fotos dos padrões/cores de granito (galeria).
4. `nexfloor-colagem-1..3` — fotos lifestyle (ambiente, textura, aplicação).
5. `nexfloor-sistema-1..3` — produtos/passos (primer, granito líquido, resultado).
6. `nexfloor-bento-1..n` — fotos lifestyle para o bento.
7. `nexfloor-cta-bg` — foto de fundo da seção de lead.
8. Logo Cristal (SVG, embutido) — extrair do material da marca.
9. **Arquivos de fonte AmsiPro Cond** (Ultra/Black/Regular) — `.woff2`/`.woff`.

Até a entrega dos reais: placeholders neutros + o balde do PDF.

## 9. Fora de escopo (YAGNI)

- Seção de **dados técnicos** (rendimento/composição/embalagens) — **removida** pelo
  usuário.
- Seção de **depoimento/prova social dedicada** — **removida** (a prova fica só no
  chip do hero).
- Carrinho / add-to-cart / variantes de SKU (isto é landing, não PDP).
- Backend de formulário (se usar form, é só markup; integração fica para depois).
- Internacionalização (pt-BR apenas).

## 10. Itens em aberto (resolver na implementação)

- **Copy** definitiva (headlines/subheads) — direções propostas, refinar com o
  usuário.
- **CTA final**: form vs. WhatsApp+Onde comprar (default: WhatsApp + Onde comprar).
- **Arquivos AmsiPro** e **assets reais** — chegam depois; layout aprovável com
  fallback/placeholder.
- Licença da fonte AmsiPro antes de publicar (mesmo cuidado do caso Cocogoose).

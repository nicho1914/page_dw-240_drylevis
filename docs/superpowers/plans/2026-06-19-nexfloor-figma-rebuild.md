# Nex Floor — Rebuild a partir do Figma (Wireframe oficial)

> Substitui o conteúdo de `nexfloor-landing-wake.html` (versão briefing/MANA-DONE) pela
> reprodução FIEL do wireframe oficial do Figma. Mesma branch `feat/nexfloor`.

**Fonte:** Figma HUB-EOV, node `920:1666` ("Wireframe - Nex Floor", 1512×5874).
**Alvo:** fragmento Wake, CSS escopado em `#nxf-root`, responsivo, assets jsDelivr `nexfloor-*`.
**Decisões do usuário:** substituir a landing atual; adaptar o bloco PDP do rodapé pro Nex Floor.

## Princípio
Reproduzir a COMPOSIÇÃO do Figma fielmente (layout, hierarquia, espaçamentos, cor),
não reinterpretar. O Figma é desktop (1512); a gente reflui para tablet/mobile preservando
a intenção. Reaproveitar scaffold (header-comment, `#nxf-root`, `@font-face`, `.wrap`).

## Tokens (augmentar os existentes)
Já existem: `--roxo:#7B529F` `--roxo-claro:#af619e` `--azul:#599ad5` `--friso-1:#FFCC00`
`--friso-2:#FFED00` `--ink:#1f1f1f` `--creme:#f6f3ef` `--branco:#fff` `--footer-ink:#ededed`.
Adicionar (valores exatos do Figma):
- `--ink2:#242424` (texto títulos/preço dos cards)
- `--gray:#696969` (texto descrição dos cards)
- `--lilas:#f4eff8` (fundo topo dos cards de produto)
- `--navy:#23286b` (blocos azul-marinho do mosaico — aprox. do screenshot; ajustar no render)
- raio padrão dos cards: 25px.
- Fontes: AmsiPro Cond **Ultra** (títulos/preço/botão), **Regular** (labels/descrição) — já no `@font-face` com fallback.

## Assets (prefixo `nexfloor-`, jsDelivr; fallback token enquanto 404)
- `nexfloor-balde.png` — JÁ baixado em `Assets/` (mockup Cristal do Figma). Usar nos 3 cards (placeholder único até ter os 3 reais: prep/primer/granito).
- Hero 3-imagens, mosaico, banda "imagem com produto", carrossel PDP → placeholders com fallback de cor (mesmo padrão das outras landings).
- Selo **Propiso**: recriar em HTML/CSS (3 pontinhos navy + "pro" bold + "piso") — não depende de asset, renderiza sempre, fácil trocar pelo SVG oficial depois.

## Seções (ordem do Figma)

### FA. Scaffold + Hero  (nodes 959:641 headline, 920:1673 selo, 966:753/767/768 imagens)
- Augmentar tokens; remover as seções antigas (marquee/bento-antigo/split/sistema/banda/lead/footer da versão briefing) — manter só header-comment + `#nxf-root` + style base + `.wrap`.
- Hero: headline **"Beleza de pedra, resist&ecirc;ncia de obra."** (AmsiPro Ultra, uppercase, roxo `--roxo`, ~clamp grande) à esquerda; selo **Propiso** no topo direito. Abaixo, **faixa de 3 imagens** grandes (rounded 25px, ~435×461 cada, grid 3col → reflow). Fallback de cor roxo/lilás.

### FB. Título de seção + Galeria bento/mosaico  (rects 966:754-760, 966:755/756/759)
- Título centralizado **"Beleza de pedra, resist&ecirc;ncia de obra."** (AmsiPro Ultra, roxo).
- **Mosaico** de blocos rounded-25 de tamanhos variados, cores navy/cinza/amarelo(`--friso-1`)/roxo, conforme posições do metadata (grid assimétrico). Reflui para 2col/1col no mobile sem buracos.

### FC. Benefícios | Indicação + Banda "imagem com produto"
- Dois títulos lado a lado: **BENEF&Iacute;CIOS** (esq) / **INDICA&Ccedil;&Atilde;O** (dir) (AmsiPro, roxo).
- Chips (fundo claro, rounded, texto cinza/ink), em grid:
  - Benefícios: Aplica&ccedil;&atilde;o com baixa espessura · Autonivelante · F&aacute;cil aplica&ccedil;&atilde;o · Ideal para pisos monol&iacute;ticos · Alta resist&ecirc;ncia · F&aacute;cil limpeza
  - Indica&ccedil;&atilde;o: Prepara&ccedil;&atilde;o para aplica&ccedil;&atilde;o de Pisos Granito L&iacute;quido Nex Floor · Alta resist&ecirc;ncia &agrave; intemp&eacute;ries
- Banda **"imagem com produto"** (Group 252): bloco grande de imagem (rounded) + coluna estreita à direita, com indicador de carrossel (2 dots). Fallback de cor.

### FD. Cards de produto (3) + PDP adaptado
- **3 cards** (nodes 925:1704/1705/1722), EXATOS do design_context:
  - Estrutura: topo `--lilas` h~299 rounded-top-25 com balde centralizado; base branca h~300 rounded-bottom-25, drop-shadow `0 4px .65px rgba(0,0,0,.25)`.
  - Conteúdo (left 51 / top 23, gap 48): label Regular 20px `--ink2`; título Ultra 40px uppercase `--ink2`; descrição Regular 24px `--gray` (w~321); linha preço+botão (gap 92): **"R$ 149,90"** (Ultra, "R$ 149," 32px + "90" 24px) + botão **comprar** bg `--roxo` px34 py12 rounded-25 texto branco Ultra 24px uppercase.
  - Card 1: "Passo 01 - Aglutinante" / **PREP PISO** / "Sela e aglutina superf&iacute;cies porosas, criando a base ideal. 3,5 kg &middot; rende 12 m&sup2;."
  - Card 2: "Passo 02 - Ader&ecirc;ncia" / **NIVELA &amp; PRIMER** / "Promove ader&ecirc;ncia e autonivela a superf&iacute;cie. 4 kg &middot; rende 12 m&sup2;."
  - Card 3: "Passo 03 - Acabamento" / **GRAN&Iacute;TO L&Iacute;QUIDO** / "Acabamento ep&oacute;xi que reproduz o granito, com brilho e resist&ecirc;ncia. 4 kg &middot; rende 1,82 m&sup2;."
  - Grid 3col → 1col mobile.
- **PDP block** (node 966:694) — reproduzir o LAYOUT (grid ~1.32fr / 1fr; esquerda carrossel + 6 thumbs; direita produto), **adaptar conteúdo pro Nex Floor** e harmonizar fontes com a landing:
  - Esquerda: carrossel (imagem grande, badge "02 / 06", setas ‹ ›, título + legenda do ambiente — usar tema "piso/granito", ex.: "Sala de estar" / "Acabamento granito monol&iacute;tico, sem emendas."), fileira de 6 thumbs.
  - Direita: título **"NEX FLOOR"**; descrição adaptada (ex.: "Piso ep&oacute;xi decorativo que reproduz o granito. Acabamento monol&iacute;tico, alta resist&ecirc;ncia, aplica&ccedil;&atilde;o em baixa espessura."); 3 checks adaptados (ex.: "Reproduz o granito com brilho" · "Autonivelante e monol&iacute;tico" · "Alta resist&ecirc;ncia e f&aacute;cil limpeza"); **Embalagem** com chips adaptados ao produto (ex.: kits/baldes: "3,5 kg" · "4 kg" · "Kit completo"); botão **"Comprar agora"** (estilo `--roxo`, harmonizado com os cards); nota FDS adaptada ("Nex Floor &middot; Linha Propiso &middot; Cristal — FDS em linhacristal.com.br").

### FE. Polish + responsivo
- Ritmo vertical entre seções; sweep 1440/768/390 (sem overflow, reflow limpo, sem buraco no mosaico/PDP); checagens: tudo `#nxf-root`-scoped, sem `<html>/<head>/<body>`, JS ASCII, fallbacks 404 intencionais.

## Staging
Commitar SOMENTE `nexfloor-landing-wake.html` (+ `Assets/nexfloor-balde.png` no commit de assets, se desejado). Nunca `git add -A`/`.`/`-am` (há WIP não relacionado).

## Pendências do usuário
- Imagens reais (hero, mosaico, ambientes do carrossel, baldes prep/primer/granito) via repo.
- Fontes AmsiPro Cond reais.
- SVG oficial do selo Propiso (hoje recriado em CSS).
- Preços/embalagens finais (wireframe usa R$ 149,90 igual nos 3).

# Landing Page DW240 (Drylevis) — bloco para a Wake

Landing page do **Selante Adesivo DW240** em HTML/CSS/JS puro, derivada do Figma
(HUB-EOV). Dois arquivos:

| Arquivo | Para quê |
|---|---|
| [`dw240.html`](dw240.html) | **Preview local** standalone (abre direto no navegador). Usa os assets locais da pasta `Assets/`. |
| [`dw240-wake.html`](dw240-wake.html) | **Bloco para colar na Wake.** Fragmento (sem `<html>/<head>/<body>`), sem Bootstrap, CSS escopado em `#dw240-root`, SVGs inline. Imagens/vídeo vêm do GitHub via CDN. |

## Como publicar na Wake

1. Abra o conteúdo HTML do produto/página no admin da Wake (modo **código-fonte**).
2. Copie **todo** o conteúdo de [`dw240-wake.html`](dw240-wake.html) e cole no bloco.
3. Salve. Pronto — não precisa subir nada no Gerenciador de Mídia da Wake.

## Por que os assets vêm do GitHub (jsDelivr)

O Gerenciador de Mídia da Wake **não aceita vídeo (.mp4)**. Para não depender dele,
todos os assets (imagens **e** o vídeo) são servidos do **próprio repositório**
(que precisa ser **público**) pelo CDN **jsDelivr**:

```
https://cdn.jsdelivr.net/gh/nicho1914/page_dw-240_drylevis@main/Assets/<arquivo>
```

- Hoje o bloco usa **`@main`** durante a fase de ajustes (reflete os pushes; se não atualizar, force com purge — ver abaixo). Quando a página estiver finalizada, dá pra **congelar numa tag** (ex.: `@v1`) trocando `@main` pela tag nas URLs.
- Os SVGs (logos, setas, ícones) estão **embutidos** no HTML, então não dependem do CDN.

## Como atualizar

**Mudou só o CSS/HTML/textos do layout?**
Não precisa de tag nova — esse conteúdo mora no bloco colado.
1. Edite os arquivos e dê `git push` (para manter o histórico).
2. **Re-cole** o `dw240-wake.html` atualizado no bloco da Wake.

**Trocou/otimizou/adicionou alguma imagem ou vídeo (arquivos em `Assets/`)?**
Como o bloco está em `@main`:
1. `git add ... && git commit && git push`
2. Se o jsDelivr ainda servir a versão antiga (cache ~7 dias), force o purge:
   `https://purge.jsdelivr.net/gh/nicho1914/page_dw-240_drylevis@main/Assets/<arquivo>`

> Para **congelar** uma versão (cache imutável): `git tag v1 && git push origin v1`
> e troque `@main` por `@v1` nas URLs do `dw240-wake.html`.

## Vídeos: limite e como comprimir

⚠️ O jsDelivr serve arquivos do GitHub até **~20 MB**. Acima disso retorna `403`.
Vídeos full HD/longos passam fácil disso, então **comprima antes de subir**.

Com o [FFmpeg](https://ffmpeg.org/) (instalável no Windows via `winget install Gyan.FFmpeg`):

```bash
ffmpeg -y -i entrada.mp4 -c:v libx264 -preset fast -crf 30 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k saida.mp4
```

- `-crf 30`: qualidade/tamanho. **Maior = menor arquivo** (tente 28–34).
- `-movflags +faststart`: o vídeo começa a tocar antes de baixar tudo (streaming).
- Ainda grande? Reduza a resolução com `-vf "scale=-2:1080"` (ou `:720`).
- Referência: os 3 vídeos da seção saíram de 7,3 / 17,3 / 35,5 MB para **3,4 / 8,7 / 14,9 MB**.

Depois é só substituir o arquivo em `Assets/`, `git push`, **purgar** o cache do jsDelivr
(ver seção acima) e re-colar o bloco na Wake.

## Responsividade (resumo)

- **Hero** e **banner "Compre junto"**: escalam como bloco único (proporção fixa).
- **"O que é o DW240"**: desktop = vídeo à esquerda + texto e cards (2×2) à direita;
  mobile = texto → vídeo → cards (2×2).
- **Cards (Telhas/Tanques/Trincas)** e **vídeos**: 3 lado a lado no desktop, carrossel
  (scroll horizontal) no mobile.
- **"Compre junto"**: layout próprio de mobile (frame 243:4339) abaixo de 640px.

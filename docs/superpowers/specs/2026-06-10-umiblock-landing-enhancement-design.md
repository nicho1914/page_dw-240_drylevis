# Umi Block landing — complemento e polimento (aprovado)

Data: 2026-06-10 · Arquivo alvo: `umiblock-landing.html` (single-file, HTML estático)

## Decisões do usuário
- Seções novas: **Como aplicar** (3 passos), **Embalagens & rendimento** (4 tamanhos), **FAQ + CTA final**.
- **Cortado**: tabela de especificações técnicas / aviso "Onde NÃO aplicar".
- Sem avaliações/prova social (pedido explícito).
- Polimento: **Ousado** — gradientes presentes, foto full-bleed com parallax, animações perceptíveis (sempre com `prefers-reduced-motion`).
- Referência de estilo: páginas de produto Pura Vida (kickers uppercase, passos, FAQ acordeão, claro e generoso).

## Estrutura final
1. Hero (Figma, polido: backdrop em gradiente, glow no card, micro-interações)
2. Faixa Cristal (como está)
3. Benefícios bento (ícones variados ☀️💧✅🔗🌀; dado real "seca com até 4% de umidade")
4. ★ Como aplicar — passos: Prepare (superfície limpa/seca) → Aplique (pincel/rolo, 2–3 demãos) → Cure (3h entre demãos, 24h total); foto `umi block post.png`
5. Aplicações (painel interativo, como está)
6. ★ Embalagens & rendimento — foto `CRISTAL-UMI-BLOCK.jpg` full-bleed parallax + 4 cards: 250ml 0,6–1m² · 500ml 2–3m² · 1L 4–6m² · 3,6L 14–24m² (por demão, mín. 2 demãos)
7. Vídeos (3 placeholders, como está)
8. ★ FAQ acordeão — 6 perguntas da ficha técnica (umidade ≤4%, demãos, cura, onde não usar, limpeza com aguarrás Cristal, rendimento)
9. ★ CTA final — faixa roxa com headline + botão; rodapé mínimo com nota FDS linhacristal.com.br

## Conteúdo
Todo texto técnico vem da ficha `Assets/CRISTAL_UMIBLOCK_IMPERMEABILIZANTE_FICHA_TÉCNICA.pdf` (Abril 2025, v02). Nada inventado.

## Técnica
- Mesmo padrão do arquivo: CSS tokens, Inter, sem dependências.
- Reveal por IntersectionObserver; parallax via `background-attachment`/transform com fallback.
- Acessibilidade: acordeão com `<details>`/botões ARIA, contrastes mantidos.

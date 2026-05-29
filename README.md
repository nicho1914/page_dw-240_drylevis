# Checkout Escuta o Véio — protótipo Wake (Awake)

Protótipo local do checkout customizado para a loja **Escuta o Véio** na Wake Commerce, no template **Awake (Storefront SSR)**. Mira espelhar a estrutura/UX do checkout da Pura Vida com identidade visual própria (a chegar via Figma).

## Estrutura

```
Assets/
  CSS/
    input.css       ← Tailwind + tokens
    output.css      ← gerado por `npm run dev`
  JS/
    checkout.js     ← payment tabs, CEP lookup, eventos GA4
Templates/
  Checkout/
    cart.html
    checkout.html
    confirmation.html
tailwind.config.js
package.json
```

## Rodar localmente

```bash
npm install
npm run dev        # gera Assets/CSS/output.css em watch
# em outro terminal:
npm run preview    # serve a pasta atual em http://localhost:3000
```

Depois abra `Templates/Checkout/checkout.html`.

## Decisões já tomadas

- Stack: **Awake (TailwindCSS + Storefront SDK Wake)** — sem jQuery/Bootstrap 3.
- Pagamentos: **Pagaleve (Pix Parcelado), PIX, Cartão, Boleto**. PayPal fora.
- Checkout como visitante + cadastro opcional na confirmação.
- Sem upsell/cross-sell no carrinho.
- Layout one-page, 2 colunas (formulário esquerda, resumo sticky direita).

## Pendências bloqueantes para subir no repositório oficial

- [ ] Abrir ticket no portal Wake para **habilitar Checkout Storefront** na loja
- [ ] Acesso git ao repositório da loja (`git.fbits.net/stores/...`)
- [ ] Prints/HAR do checkout Pura Vida (para refinar UX)
- [ ] Figma com identidade Escuta o Véio (para substituir tokens placeholder em `tailwind.config.js`)
- [ ] Credenciais Pagaleve ativas no painel Wake

## Próximos passos

1. Validar visualmente cada template (cart → checkout → confirmation).
2. Quando o Figma estiver pronto: substituir paleta em `tailwind.config.js` e fontes em `Templates/*.html`.
3. Quando o ticket de habilitação for processado: clonar o Awake oficial, portar os templates desta pasta para `Templates/Checkout/`, ajustar para o Storefront SDK real (substituir os `TODO` em `Assets/JS/checkout.js`).
4. Configurar GTM com tag GA4 + Clarity + VWO + LinkedIn + New Relic.
5. QA: pedido teste em cada método de pagamento em homologação.

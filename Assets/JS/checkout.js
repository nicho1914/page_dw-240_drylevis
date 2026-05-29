(function () {
  "use strict";

  // ───────── Step 2: identificação por CPF ─────────
  function initIdentificationForm() {
    const form = document.getElementById("form-identification");
    if (!form) return;

    const cpfInput = form.querySelector("#cpf");
    const cpfError = form.querySelector("#cpf-error");

    cpfInput.addEventListener("input", () => {
      cpfInput.value = formatCpf(cpfInput.value);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const digits = cpfInput.value.replace(/\D/g, "");
      const valid = digits.length === 11;
      cpfError.hidden = valid;
      if (!valid) return;

      // TODO: chamar API Storefront Wake para verificar se CPF já tem cadastro.
      // Por enquanto: simula redirecionamento para 2FA.
      window.location.href = "./identification-verify.html";
    });
  }

  function formatCpf(value) {
    return value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  // ───────── Step 2.5: 2FA ano de nascimento ─────────
  function init2FAForm() {
    const form = document.getElementById("form-verify");
    if (!form) return;

    form.querySelectorAll("[data-answer]").forEach((btn) => {
      btn.addEventListener("click", () => {
        // TODO: enviar resposta para API Wake e tratar erro.
        // Sucesso → redireciona para Fechamento.
        window.location.href = "./checkout.html";
      });
    });
  }

  // ───────── Step 3: pagamento (radio) + finalizar ─────────
  function initPaymentRadios() {
    const radios = document.querySelectorAll('input[name="payment"]');
    if (!radios.length) return;

    const panels = document.querySelectorAll("[data-payment-panel]");
    const btnFinish = document.getElementById("btn-finish");

    radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        const selected = radio.value;
        panels.forEach((panel) => {
          panel.hidden = panel.dataset.paymentPanel !== selected;
        });
        if (btnFinish) {
          btnFinish.disabled = false;
          btnFinish.classList.remove("opacity-50", "cursor-not-allowed");
        }
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "add_payment_info", payment_type: selected });
      });
    });
  }

  function initCheckoutSubmit() {
    const form = document.getElementById("checkout-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const payment = form.querySelector('input[name="payment"]:checked');
      if (!payment) return;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "purchase", payment_type: payment.value });

      // TODO: chamar API Wake para criar pedido e obter número.
      window.location.href = `./confirmation.html?method=${payment.value}`;
    });
  }

  // ───────── Banner promocional: copiar cupom ─────────
  function initCouponCopy() {
    document.querySelectorAll("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const code = btn.dataset.copy;
        if (navigator.clipboard) navigator.clipboard.writeText(code);
        const original = btn.textContent;
        btn.textContent = "Copiado!";
        setTimeout(() => (btn.textContent = original), 1500);
      });
    });
  }

  // ───────── Confirmação: troca o painel pelo método ─────────
  function initConfirmationMethodSwitch() {
    const params = new URLSearchParams(window.location.search);
    const method = params.get("method");
    if (!method) return;
    document.querySelectorAll("[data-method]").forEach((el) => {
      el.hidden = el.dataset.method !== method;
    });
  }

  // ───────── GA4: begin_checkout ao entrar no fluxo ─────────
  function initBeginCheckoutEvent() {
    if (!document.querySelector('[aria-current="step"]')) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "begin_checkout" });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initIdentificationForm();
    init2FAForm();
    initPaymentRadios();
    initCheckoutSubmit();
    initCouponCopy();
    initConfirmationMethodSwitch();
    initBeginCheckoutEvent();
  });

  // TODO portar para o Storefront SDK Wake:
  //  - useCart() → resumo do pedido em cart.html
  //  - useCustomer() → verificar CPF, 2FA, atualizar dados
  //  - useShipping() → opções de frete por CEP
  //  - usePayment() → tokenização cartão, gerar PIX, Pagaleve redirect, gerar boleto
  //  - useOrder() → finalizar pedido, número de confirmação
})();

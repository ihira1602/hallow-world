const form = document.getElementById("quote-form");

const yen = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0,
});

function renderResult({ title, subtotal, tax, total }) {
  document.getElementById("out-title").textContent = title || "-";
  document.getElementById("out-subtotal").textContent = yen.format(subtotal);
  document.getElementById("out-tax").textContent = yen.format(tax);
  document.getElementById("out-total").textContent = yen.format(total);
}

function calculateQuote(quantity, unitPrice, taxRate) {
  const subtotal = quantity * unitPrice;
  const tax = Math.round((subtotal * taxRate) / 100);
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const quantity = Number(document.getElementById("quantity").value);
  const unitPrice = Number(document.getElementById("unitPrice").value);
  const taxRate = Number(document.getElementById("taxRate").value);

  const { subtotal, tax, total } = calculateQuote(quantity, unitPrice, taxRate);
  renderResult({ title, subtotal, tax, total });
});

form.dispatchEvent(new Event("submit"));

const porcentajeSeguroDanios = 0.3524;

const factorPagoMillar = {
  5: 21.54,
  10: 13.69,
  15: 1.43,
  20: 10.39,
};

const tasaAnual = {
  5: 0.106,
  10: 0.1085,
  15: 0.111,
  20: 0.111,
};

const detallesCredito = {
  pagoMensual: "",
  tasaMensual: "",
  pagoIntereses: "",
  pagoCapital: "",
  montoCredito: "",
  comisionAdmin: 250,
  mensualidad: "",
  seguroVida: "",
  seguroDamage: "",
};

const creditAmount = document.querySelector(".credit-amount__price");
const product = document.getElementById("product");
const term = document.getElementById("term");
const monthlypayment = document.getElementById("monthlypayment");
const rate = document.getElementById("rate");
const income = document.getElementById("income");

function calcularMensualidad(creditoMonto, plazo) {
  detallesCredito.pagoMensual = factorPagoMillar[plazo] * (creditoMonto / 1000);
  detallesCredito.tasaMensual = tasaAnual[plazo] / 12;
  detallesCredito.pagoIntereses = creditoMonto * detallesCredito.tasaMensual;
  detallesCredito.pagoCapital =
    detallesCredito.pagoMensual - detallesCredito.pagoIntereses;
  detallesCredito.seguroVida = (creditoMonto / 1000) * 0.44;
  detallesCredito.seguroDamage = (creditoMonto * porcentajeSeguroDanios) / 100;
}

function calcularCredito(creditoSolicitado, plazo) {
  calcularMensualidad(creditoSolicitado, plazo);

  const formattingOptions = { style: "currency", currency: "USD" };
  const formatter = new Intl.NumberFormat("en-US", formattingOptions);

  detallesCredito.montoCredito = creditoSolicitado;
  creditAmount.textContent = formatter.format(detallesCredito.montoCredito);

  if (creditoSolicitado < 2000000) {
    product.textContent = "Tradicional";
  } else {
    product.textContent = "Premium";
  }

  term.textContent = `${plazo} años (${plazo * 12} meses)`;

  let suma = 0;

  for (const key in detallesCredito) {
    if (
      key !== "tasaMensual" &&
      key !== "montoCredito" &&
      key !== "mensualidad" &&
      key !== "pagoMensual"
    ) {
      suma += detallesCredito[key];
    }
  }
  detallesCredito.mensualidad = suma;

  const { mensualidad } = detallesCredito;

  monthlypayment.textContent = formatter.format(mensualidad);

  rate.textContent = `${tasaAnual[plazo] * 100}%`;

  income.textContent = formatter.format(mensualidad * 1.5);
}

//calcularCredito(2000000, 20);

//Codigo para que los botones avancen y retrocedan las secciones

function submitButton() {
  console.log("Enviando informacion xd");
}

function handleNextClick(section) {
  const nextElement = section.nextElementSibling;

  if (nextElement) {
    section.style.display = "none";
    nextElement.style.display = "block";
  }
}

function handlePreviousClick(section) {
  const previousElement = section.previousElementSibling;

  if (previousElement) {
    section.style.display = "none";
    previousElement.style.display = "block";
  }
}

//Codigo para validar los inputs

const radioInputs = document.querySelectorAll('.form__input[type="radio"]');
radioInputs.forEach((radioInput) =>
  radioInput.addEventListener("change", validarInput)
);

const formularios = document.querySelectorAll(".form__formulario");
const formFirstSection = formularios[0];
const formSecondSection = formularios[1];
const formThirdSection = formularios[2];

const valorInmueble = formSecondSection.querySelector("#v-inm");
const valorIngreso = formSecondSection.querySelector("#ingreso");
const valorCredito = formSecondSection.querySelector("#credito");

const nombreCompleto = formThirdSection.querySelector("#full-name");
const telefono = formThirdSection.querySelector("#phone-number");
const email = formThirdSection.querySelector("#email");

valorInmueble.addEventListener("blur", validarInput);
valorIngreso.addEventListener("blur", validarInput);
valorCredito.addEventListener("blur", validarInput);

nombreCompleto.addEventListener("blur", validarInput);
telefono.addEventListener("blur", validarInput);
email.addEventListener("blur", validarInput);

const buttons = document.querySelectorAll(".button");
console.log(buttons);

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    validarButton(event, button);
  });
});

function validarButton(e, boton) {
  e.preventDefault();

  const nextButton = boton.classList.contains("btn-next");
  const previousButton = boton.classList.contains("button--previous");
  const actualSection = boton.parentElement.parentElement.parentElement;

  if (nextButton) {
    handleNextClick(actualSection);
  } else if (previousButton) {
    handlePreviousClick(actualSection);
  } else {
    console.log("Es submit");
  }
}

function validarForm(formulario, seccionActual) {
  const inputs = [...formulario.querySelectorAll(".form__input")];
  const noInputsEmpty = inputs.every((input) => input.value !== "");

  const formButton = formulario.querySelector(".button");

  if (!formButton.classList.contains(".button--previous") && noInputsEmpty) {
    console.log(formButton);
  }
}

function validarInput(event) {
  const currentForm = event.target.parentElement.parentElement;
  const currentSection = currentForm.parentElement.parentElement;

  if (currentForm.id === "form-radio") {
    currentForm.querySelector(".btn-next").disabled = false;
    currentForm.addEventListener("click", (e) => {
      e.preventDefault();
      handleNextClick(currentSection);
    });

    return;
  }

  if (event.target.value === "") {
    imprimirAviso("Favor de llenar el campo", event.target.parentElement);
  } else {
    eliminarAviso(event.target.parentElement);
    validarForm(currentForm, currentSection);
  }
}

function imprimirAviso(mensaje, elemento) {
  if (!elemento.lastElementChild.classList.contains("aviso")) {
    const parrafo = document.createElement("p");
    parrafo.textContent = mensaje;
    parrafo.classList.add("aviso");

    elemento.appendChild(parrafo);

    elemento.querySelector(".form__input").classList.add("empty-input");
  }
}

function eliminarAviso(elemento) {
  if (elemento.lastElementChild.classList.contains("aviso")) {
    elemento.lastElementChild.remove();
  }

  elemento.querySelector(".form__input").classList.remove("empty-input");
}

//Codigo para hacer el calculo de los valores llenados en el form
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

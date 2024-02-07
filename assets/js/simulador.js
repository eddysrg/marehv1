//CONSTANTES
//-- SELECTORES EN EL FORMULARIO --
const formularios = document.querySelectorAll(".form__formulario");
const formFirstSection = formularios[0];
const formSecondSection = formularios[1];
const formThirdSection = formularios[2];
const optionAdquisicion = formFirstSection.querySelector("#adq");
const optionMejora = formFirstSection.querySelector("#mh");
const optionLiquidez = formFirstSection.querySelector("#liquidez");
const optionConstruccion = formFirstSection.querySelector("#construccion");
const valorInmueble = formSecondSection.querySelector("#v-inm");
const valorIngreso = formSecondSection.querySelector("#ingreso");
const valorCredito = formSecondSection.querySelector("#credito");
const nombreCompleto = formThirdSection.querySelector("#full-name");
const telefono = formThirdSection.querySelector("#phone-number");
const email = formThirdSection.querySelector("#email");
const buttons = document.querySelectorAll(".button");

//-- SELECTORES PARA EL CALCULO DE HIPOTECA --
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

let montValue = "";

//EVENTOS
//-- EVENTOS EN EL FORMULARIO --
formFirstSection.addEventListener("change", validarInputRadio);

valorInmueble.addEventListener("focus", validationInputCurrencyFocus);
valorInmueble.addEventListener("blur", validationInputCurrency);
valorIngreso.addEventListener("focus", validationInputCurrencyFocus);
valorIngreso.addEventListener("blur", validationInputCurrency);
valorCredito.addEventListener("focus", validationInputCurrencyFocus);
valorCredito.addEventListener("blur", validationInputCurrency);
nombreCompleto.addEventListener("blur", validarInput);
telefono.addEventListener("blur", validationInputPhone);
email.addEventListener("blur", validationInputEmail);

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    validarButton(event, button);
  });
});

//FUNCIONES
//FUNCIONES PARA AVANZAR Y RETROCEDER EL FORMULARIO

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
//FUNCIONES PARA VALIDACIONES EN EL FORMULARIO

function validarInputRadio(e) {
  const actualForm = e.target.parentElement.parentElement;

  if (e.target) {
    actualForm.querySelector(".button").disabled = false;
  }
}

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
    formButton.disabled = false;
  }
}

function validarInput(event) {
  const currentForm = event.target.parentElement.parentElement;
  const currentSection = currentForm.parentElement.parentElement;

  if (event.target.value === "") {
    imprimirAviso("Favor de llenar el campo", event.target.parentElement);
  } else {
    eliminarAviso(event.target.parentElement);
    validarForm(currentForm, currentSection);
  }
}

function validationInputCurrency(event) {
  if (event.target.value !== "") {
    currencyFormat(event.target.value, event);
  }

  validarInput(event);
}

function validationInputCurrencyFocus(event) {
  if (event.target.value !== "") {
    event.target.value = "";
    event.target.type = "number";

    event.target.value = montValue[1]
      ? parseFloat(montValue.join("."))
      : parseInt(montValue[0]);
  }
}

function validationInputPhone(event) {
  const regexNumbers = /[0-9]{10}/g;

  if (event.target.value !== "") {
    if (regexNumbers.test(event.target.value)) {
      validarInput(event);
    } else {
      imprimirAviso(
        "Coloque un numero a 10 digitos valido",
        event.target.parentElement
      );
    }
    return;
  }

  validarInput(event);
}

function validationInputEmail(event) {
  if (event.target.value !== "") {
    eliminarAviso(event.target.parentElement);

    const regexEmail = /^(?:[0-9a-zA-z.]+@[a-zA-Z]{2,}[/.][a-zA-Z]{2,4}|)$/g;

    if (!regexEmail.test(event.target.value)) {
      imprimirAviso("Ingrese un correo valido", event.target.parentElement);
    } else {
      eliminarAviso(event.target.parentElement);
      validarInput(event);
    }

    return;
  }

  validarInput(event);
}

//FUNCIONES PARA AGREGAR/ELIMINAR MENSAJES Y FORMATEAR DATOS

function imprimirAviso(mensaje, elemento) {
  eliminarAviso(elemento);

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

function currencyFormat(currencyNumber, event) {
  const regexCommas = /(\d)(?=(\d{3})+(?!\d))/g;

  const removeChar = currencyNumber.replace(/[^0-9\.]/g, "");

  const arrNumbers = removeChar.split(".");

  montValue = [...arrNumbers];

  arrNumbers[0] = arrNumbers[0].replace(regexCommas, "$1,");

  const finalNumber = arrNumbers[1] ? arrNumbers.join(".") : arrNumbers[0];

  event.target.type = currencyNumber === "" ? "number" : "text";

  event.target.value = `$${finalNumber}`;
}

//FUNCIONES PARA EL CALCULO DE LA HIPOTECA

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

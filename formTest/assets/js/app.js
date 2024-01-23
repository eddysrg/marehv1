//Codigo para que los botones avancen y retrocedan las secciones
const buttons = document.querySelectorAll(".form__button");
console.log(buttons);

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (button.classList.contains("button--previous")) {
      handlePreviousClick(e.target);
    } else if (button.classList.contains("btn-submit")) {
      submitButton();
    } else {
      handleNextClick(e.target);
    }
  });
});

function submitButton() {
  console.log("Enviando informacion xd");
}

function handleNextClick(element) {
  const currentElement = element.parentElement.parentElement;
  const nextElement = currentElement.nextElementSibling;

  if (nextElement) {
    currentElement.style.display = "none";
    nextElement.style.display = "block";
  }
}

function handlePreviousClick(element) {
  const currentElement = element.parentElement.parentElement;
  const previousElement = currentElement.previousElementSibling;

  if (previousElement) {
    currentElement.style.display = "none";
    previousElement.style.display = "block";
  }
}

//Codigo para validar que se seleccionen y/o llenen los inputs
const radioButtons = document.querySelectorAll('.form__input[type="radio"]');

radioButtons.forEach((radioBtn) => {
  radioBtn.addEventListener("click", () => {
    console.log("Hola diste click");
  });
});

const formButtons = document.querySelectorAll(".form__button");

formButtons.forEach((formBtn) => {
  formBtn.addEventListener("click", () => {
    console.log("holeee");
  });
});

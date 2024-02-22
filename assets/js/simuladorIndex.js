let swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  keyboard: {
    enabled: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    reachEnd: function () {
      const contenido = document.querySelectorAll(".contain")[2];

      if (!contenido.querySelector(".button")) {
        const button = document.createElement("a");
        button.classList.add(
          "button",
          "button--flex",
          "button__started",
          "buttonIndex"
        );
        button.textContent = "Comienza ya";

        setTimeout(() => {
          contenido.appendChild(button);
          setTimeout(() => {
            button.style.opacity = 1;
          }, 2);
        }, 2000);
      }
    },
  },
});

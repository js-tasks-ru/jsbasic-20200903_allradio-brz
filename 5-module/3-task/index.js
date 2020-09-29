function initCarousel() {
  const arrowRight = document.querySelector(".carousel__arrow_right");
  const arrowLeft = document.querySelector(".carousel__arrow_left");
  const carouselInner = document.querySelector(".carousel__inner");

  let counter = 0;
  arrowRight.addEventListener("click", () => {
    counter++;
    carouselInner.style.transform = `translateX(${
      -carouselInner.offsetWidth * counter
    }px)`;
    disableArrow();
  });

  arrowLeft.addEventListener("click", () => {
    counter--;
    carouselInner.style.transform = `translateX(${
      -carouselInner.offsetWidth * counter
    }px)`;
    disableArrow();
  });
  disableArrow();

  function disableArrow() {
    counter === carouselInner.children.length - 1
      ? (arrowRight.style.display = "none")
      : (arrowRight.style.display = "");

    counter === 0
      ? (arrowLeft.style.display = "none")
      : (arrowLeft.style.display = "");
  }
}

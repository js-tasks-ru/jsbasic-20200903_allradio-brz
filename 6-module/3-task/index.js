import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
  }

  createCarouselInner() {
    this.carouselInner = document.createElement("div");
    this.carouselInner.classList.add("carousel__inner");
    this.slides.forEach(({ name, price, image, id }) => {
      this.carouselInner.innerHTML += ` 
      <div class="carousel__slide" data-id="${id}">
      <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
      <span class="carousel__price">€${price.toFixed(2)}</span>
      <div class="carousel__title">${name}</div>
      <button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
      </div>
      </div>
      `;
    });
  }

  createArrows() {
    this.arrowRight = document.createElement("div");
    this.arrowLeft = document.createElement("div");
    this.arrowRight.classList.add("carousel__arrow", "carousel__arrow_right");
    this.arrowLeft.classList.add("carousel__arrow", "carousel__arrow_left");
    this.arrowRight.innerHTML =
      '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';
    this.arrowLeft.innerHTML =
      '<img src="/assets/images/icons/angle-left-icon.svg" alt="icon">';

    this.currentSlide = 0;
    this.arrowRight.addEventListener("click", () => {
      this.currentSlide++;
      this.carouselInner.style.transform = `translateX(${
        -this.carouselInner.offsetWidth * this.currentSlide
      }px)`;
      this.disableArrow();
    });

    this.arrowLeft.addEventListener("click", () => {
      this.currentSlide--;
      this.carouselInner.style.transform = `translateX(${
        -this.carouselInner.offsetWidth * this.currentSlide
      }px)`;
      this.disableArrow();
    });
    this.disableArrow();
  }

  disableArrow() {
    this.currentSlide === this.carouselInner.children.length - 1
      ? (this.arrowRight.style.display = "none")
      : (this.arrowRight.style.display = "");

    this.currentSlide === 0
      ? (this.arrowLeft.style.display = "none")
      : (this.arrowLeft.style.display = "");
  }

  customAddProduct() {
    this.carouselInner.addEventListener("click", (e) => {
      if (e.target.closest("button")) {
        e.stopPropagation();
        const prodId = e.target.closest(".carousel__slide").dataset.id;
        const eProductAdd = new CustomEvent("product-add", {
          detail: prodId,
          bubbles: true,
        });
        this.carousel.dispatchEvent(eProductAdd);
      }
    });
  }

  render() {
    this.carousel = document.createElement("div");
    this.carousel.classList.add("carousel");

    this.createCarouselInner();
    this.carousel.append(this.carouselInner);

    this.createArrows();
    this.customAddProduct();
    this.carousel.append(this.arrowRight);
    this.carousel.append(this.arrowLeft);

    return this.carousel;
  }
}

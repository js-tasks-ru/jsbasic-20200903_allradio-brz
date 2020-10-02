import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  constructor(product) {
    this.elem = this.render(product);
  }

  createСardTop({ image, price }) {
    this.cardTop = document.createElement("div");
    this.cardTop.classList.add("card__top");

    this.topImg = document.createElement("img");
    this.topImg.classList.add("card__image");
    this.topImg.setAttribute("src", `/assets/images/products/${image}`);
    this.topImg.setAttribute("alt", "product");
    this.cardTop.append(this.topImg);

    this.span = document.createElement("span");
    this.span.classList.add("card__price");
    this.span.innerHTML = "€" + price.toFixed(2);
    this.cardTop.append(this.span);
  }

  createСardBody({ name }) {
    this.cardBody = document.createElement("div");
    this.cardTitle = document.createElement("div");
    this.cardBtn = document.createElement("button");
    this.cardImg = document.createElement("img");

    this.cardBody.classList.add("card__body");

    this.cardTitle.classList.add("card__title");
    this.cardTitle.innerHTML = name;

    this.cardBtn.classList.add("card__button");
    this.cardBtn.setAttribute("type", "button");

    this.cardImg.setAttribute("alt", "icon");
    this.cardImg.setAttribute("src", "/assets/images/icons/plus-icon.svg");
    this.cardBtn.append(this.cardImg);
    this.cardBody.append(this.cardTitle);
    this.cardBody.append(this.cardBtn);
  }

  addProduct({ id }) {
    this.cardBtn.addEventListener("click", () => {
      this.eventProductAdd = new CustomEvent("product-add", {
        detail: id,
        bubbles: true,
      });
      this.card.dispatchEvent(this.eventProductAdd);
    });
  }

  render(product) {
    this.card = document.createElement("div");
    this.card.classList.add("card");

    this.createСardTop(product);
    this.createСardBody(product);
    this.addProduct(product);
    this.card.append(this.cardTop);
    this.card.append(this.cardBody);

    return this.card;
  }
}

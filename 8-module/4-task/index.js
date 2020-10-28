import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let cardItem = this.cartItems.find((item) => item.product.id == product.id);

    if (cardItem !== undefined) {
      cardItem.count = cardItem.count + 1;
    } else {
      let lengthCardItems = this.cartItems.push({ product: product, count: 1 });
      cardItem = this.cartItems[lengthCardItems - 1];
    }
    this.onProductUpdate(cardItem);
  }

  updateProductCount(productId, amount) {
    let cardItem = this.cartItems.find((item) => item.product.id == productId);

    if (cardItem !== undefined) {
      cardItem.count = cardItem.count + amount;
      if (cardItem.count == 0) {
        let indexCardItem = this.cartItems.indexOf(cardItem);
        this.cartItems.splice(indexCardItem, 1);
      }
    }
    this.onProductUpdate(cardItem);
  }

  isEmpty() {
    for (let i = 0; i < this.cartItems.length; i++) {
      return false;
    }
    return true;
  }

  getTotalCount() {
    let totalCount = 0;
    let cartItems = this.cartItems;

    for (let i = 0; i < cartItems.length; i++) {
      let countItem = cartItems[i].count;
      totalCount += countItem;
    }

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    let cartItems = this.cartItems;

    for (let i = 0; i < cartItems.length; i++) {
      let countItem = cartItems[i].count;
      let priceProduct = cartItems[i].product.price;

      totalPrice += countItem * priceProduct;
    }

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let cart = this;
    let modal = new Modal();

    modal.setTitle("Your order");

    let node = createElement("<div></div>");
    let cartItems = this.cartItems;

    let innerHTML = "";
    for (let i = 0; i < cartItems.length; i++) {
      let cartItem = cartItems[i];
      let divProduct = this.renderProduct(cartItem.product, cartItem.count);
      innerHTML = innerHTML + divProduct.outerHTML;
    }
    let divOrderForm = this.renderOrderForm();
    innerHTML = innerHTML + divOrderForm.outerHTML;
    node.innerHTML = innerHTML;

    modal.setBody(node);

    this.modal = modal;
    modal.open();

    let cartForm = document.querySelector(".cart-form");
    cartForm.addEventListener("submit", () => this.onSubmit(event));

    let cartButtons = document.querySelectorAll(".cart-counter__button");

    for (let cartButton of cartButtons) {
      cartButton.addEventListener("click", () => {
        let classButton = cartButton.classList[1];
        let count = 1;
        if (classButton == "cart-counter__button_minus") {
          count = -count;
        }

        let divCartProduct = cartButton.closest(".cart-product");
        let productId = divCartProduct.dataset.productId;

        cart.updateProductCount(productId, count);
      });
    }
  }

  onProductUpdate(cardItem) {
    let modalBody = document.querySelector(".is-modal-open");

    if (modalBody !== null) {
      let productId = cardItem.product.id;

      if (this.isEmpty()) {
        return this.modal.close();
      }

      let productCount = modalBody.querySelector(
        `[data-product-id="${productId}"] .cart-counter__count`
      );
      productCount.innerHTML = cardItem.count;

      let productPrice = modalBody.querySelector(
        `[data-product-id="${productId}"] .cart-product__price`
      );
      productPrice.innerHTML = `€${(
        cardItem.count * cardItem.product.price
      ).toFixed(2)}`;

      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }
    this.cartIcon.update(this);
  }

  async onSubmit(event) {
    event.preventDefault();

    let cartForm = document.querySelector(".cart-form");
    let button = cartForm.querySelector(".cart-buttons__button");
    button.classList.add("is-loading");

    let formData = new FormData(cartForm);

    let response = await fetch("https://httpbin.org/post", {
      method: "POST",
      body: formData,
    });

    let result = await response;

    if (response.status == 200) {
      this.cartItems = [];
      this.cartIcon.update(this);
      this.modal.setTitle("Success!");
      let innerHTML = `<div class="modal__body-inner">
      <p>
      Order successful! Your order is being cooked :) <br>
      We’ll notify you about delivery time shortly.<br>
      <img src="/assets/images/delivery.gif">
      </p>
      </div>`;
      let divModalBody = createElement(innerHTML);
      this.modal.setBody(divModalBody);
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();

    this.container = document.querySelector(".container");
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart
            .getTotalPrice()
            .toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true }
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }

  updatePosition() {
    let iconCart = this.elem;
    let container = this.container;

    let iconOffsetWidth = iconCart.offsetWidth;
    let iconOffsetHeight = iconCart.offsetHeight;
    let iconHidden = !iconOffsetWidth && !iconOffsetHeight;
    let clientWidth = document.documentElement.clientWidth;
    let clientScrollTop = document.documentElement.scrollTop;

    let containerWidth = container.offsetWidth;
    let containerLeft = container.offsetLeft;

    if (!iconHidden && clientWidth > 767) {
      if (clientScrollTop == 0) {
        iconCart.style.position = "absolute";
        iconCart.style.left = "";
      } else {
        iconCart.style.position = "fixed";
        iconCart.style.top = "50px";

        let widthContainerPlusIcon =
          containerLeft + containerWidth + iconOffsetWidth;

        if (widthContainerPlusIcon + 30 <= clientWidth) {
          iconCart.style.left = containerLeft + containerWidth + 20 + "px";
        } else {
          iconCart.style.left = clientWidth - iconOffsetWidth - 10 + "px";
        }
      }
    }
  }
}

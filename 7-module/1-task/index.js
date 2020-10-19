import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
  }

  createBtn() {
    this.btnLeft = document.createElement("button");
    this.btnRight = document.createElement("button");
    this.btnLeft.classList.add("ribbon__arrow", "ribbon__arrow_left");
    this.btnRight.classList.add(
      "ribbon__arrow",
      "ribbon__arrow_right",
      "ribbon__arrow_visible"
    );

    this.btnLeft.innerHTML =
      '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';
    this.btnRight.innerHTML =
      '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';

    this.btnRight.addEventListener("click", () => {
      this.rInner.scrollBy(350, 0);
    });

    this.btnLeft.addEventListener("click", () => {
      this.rInner.scrollBy(-350, 0);
    });
  }

  createRibbonInner() {
    this.rInner = document.createElement("nav");
    this.rInner.classList.add("ribbon__inner");

    this.categories.forEach((item) => {
      this.rInner.innerHTML += `<a href="#" class="ribbon__item" data-id=${item.id}>${item.name}</a>`;
    });

    this.rInner.addEventListener("scroll", () => {
      let scrollWidth = this.rInner.scrollWidth;
      let scrollLeft = this.rInner.scrollLeft;
      let clientWidth = this.rInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      scrollLeft !== 0
        ? this.btnLeft.classList.add("ribbon__arrow_visible")
        : this.btnLeft.classList.remove("ribbon__arrow_visible");
      scrollRight !== 0
        ? this.btnRight.classList.add("ribbon__arrow_visible")
        : this.btnRight.classList.remove("ribbon__arrow_visible");
    });
  }

  selCategory() {
    this.rInner.addEventListener("click", (e) => {
      e.preventDefault();

      for (let i = 0; i < e.target.closest("nav").children.length; i++) {
        if (
          e.target
            .closest("nav")
            .childNodes[i].classList.contains("ribbon__item_active")
        ) {
          e.target
            .closest("nav")
            .childNodes[i].classList.remove("ribbon__item_active");
        }
        e.target.closest("a").classList.add("ribbon__item_active");
      }

      if (e.target.closest("a")) {
        let event = new CustomEvent("ribbon-select", {
          detail: e.target.closest(".ribbon__item").dataset.id,
          bubbles: true,
        });
        this.rInner.dispatchEvent(event);
      }
    });
  }

  render() {
    this.ribbon = document.createElement("div");
    this.ribbon.classList.add("ribbon");
    this.createBtn();
    this.createRibbonInner();
    this.ribbon.append(this.btnLeft);
    this.ribbon.append(this.rInner);
    this.ribbon.append(this.btnRight);
    this.selCategory();
    return this.ribbon;
  }
}

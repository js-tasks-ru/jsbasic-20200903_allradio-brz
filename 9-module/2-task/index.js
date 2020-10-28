import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {}

  async render() {
    this.carousel = new Carousel(slides);
    let dataCarousel = document.querySelector("[data-carousel-holder]");
    dataCarousel.append(this.carousel.elem);

    this.ribbon = new RibbonMenu(categories);
    let dataRibbon = document.querySelector("[data-ribbon-holder]");
    dataRibbon.append(this.ribbon.elem);

    this.slider = new StepSlider({
      steps: 5,
      value: 3,
    });
    let dataSlider = document.querySelector("[data-slider-holder]");
    dataSlider.append(this.slider.elem);

    this.cartIcon = new CartIcon();
    let dataCartIcon = document.querySelector("[data-cart-icon-holder]");
    dataCartIcon.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    let dataProductsGrid = document.querySelector(
      "[data-products-grid-holder]"
    );
    dataProductsGrid.innerHTML = "";

    let getProductsJson = await fetch("products.json");

    let products = await getProductsJson.json();

    this.productsGrid = new ProductsGrid(products);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.slider.value,
      category: this.ribbon.value,
    });

    dataProductsGrid.append(this.productsGrid.elem);

    this.addEventListeners();

    let promise = new Promise((resolve, reject) => {
      resolve("готово!");
    });

    return promise;
  }

  addEventListeners() {
    document.body.addEventListener("product-add", () => {
      let productId = event.detail;
      let products = this.productsGrid.products;
      let product = products.find((item) => item.id == productId);
      this.cart.addProduct(product);
    });

    document.body.addEventListener("ribbon-select", () => {
      this.productsGrid.updateFilter({
        category: event.detail,
      });
    });

    document.body.addEventListener("slider-change", () => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail,
      });
    });

    let nutsCheckbox = document.getElementById("nuts-checkbox");
    nutsCheckbox.addEventListener("change", () => {
      this.productsGrid.updateFilter({
        noNuts: document.getElementById("nuts-checkbox").checked,
      });
    });

    let vegCheckbox = document.getElementById("vegeterian-checkbox");
    vegCheckbox.addEventListener("change", () => {
      this.productsGrid.updateFilter({
        vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      });
    });
  }
}

import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.updateFilter(this.filters);
  }

  updateFilter(filters) {
    let listProducts = this.products;

    for (let key in filters) {
      this.filters[key] = filters[key];
    }

    for (let key in this.filters) {
      let nameFilter = key;
      let valueFilter = this.filters[key];

      if (Boolean(valueFilter) == true) {
        listProducts = this.filterProducts(
          listProducts,
          nameFilter,
          valueFilter
        );
      }
    }

    let divProductGrid = document.querySelector(".products-grid");

    if (divProductGrid == null) {
      divProductGrid = createElement('<div class="products-grid"></div>');
    }
    divProductGrid.innerHTML = "";

    let innerHTML = '<div class="products-grid__inner"></div>';
    let divProductGridInner = createElement(innerHTML);

    for (let i = 0; i < listProducts.length; i++) {
      let product = listProducts[i];
      let productCard = new ProductCard(product);
      divProductGridInner.append(productCard.elem);
    }

    divProductGrid.append(divProductGridInner);

    this.elem = divProductGrid;
  }

  filterProducts(listProducts, nameFilter, valueFilter) {
    let filterProducts;

    if (nameFilter == "noNuts" && valueFilter == true) {
      nameFilter = "nuts";
      valueFilter = !valueFilter;
      filterProducts = listProducts.filter(
        (item) =>
          item[nameFilter] == valueFilter || item[nameFilter] == undefined
      );
    } else if (nameFilter == "vegeterianOnly" && valueFilter == true) {
      nameFilter = "vegeterian";
      filterProducts = listProducts.filter(
        (item) => item[nameFilter] == valueFilter
      );
    } else if (nameFilter == "maxSpiciness") {
      nameFilter = "spiciness";
      filterProducts = listProducts.filter(
        (item) => item[nameFilter] <= valueFilter
      );
    } else if (nameFilter == "category" || valueFilter !== "") {
      filterProducts = listProducts.filter(
        (item) => item[nameFilter] == valueFilter
      );
    }

    return filterProducts;
  }
}

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cardItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

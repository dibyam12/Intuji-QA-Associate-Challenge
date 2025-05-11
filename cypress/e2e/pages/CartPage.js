class CartPage {
    updateQuantity(index, quantity) {
      cy.get(`input[name="quantity"]`).eq(index).clear().type(quantity);
      cy.get('.btn-default.cart').eq(index).click();
    }
    verifyCartTotal() {
      let total = 0;
      cy.get('.cart_total_price').each(($el, index) => {
        const price = parseFloat($el.text().replace('Rs. ', ''));
        total += price;
      }).then(() => {
        cy.log(total);
      });
    }
    removeProduct(index) {
      cy.get(`a.cart_quantity_delete[data-product-id="${index + 1}"]`).click();
      // cy.get(` .cart_delete`).click();
    }
    proceedToCheckout() {
      cy.get('a').contains('Proceed To Checkout').click();
    }
  }
  export default CartPage;
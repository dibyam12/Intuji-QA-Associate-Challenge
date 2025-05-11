class ProductsPage {
    filterByCategory(category,subCategory) {
      cy.get('#accordian').contains(category).click();
      cy.get('a').contains(subCategory).click();
    }
    // filterByCategory() {
    //   cy.get('#accordian').contains('Women').click();
    //   cy.get('a').contains('Dress').click();
    // }
    verifyFilteredProducts(subCategory) {
      cy.get('.productinfo p').each(($el) => {
        cy.wrap($el).should('contain', subCategory);
      });
    }
    goToProductDetails(index) {
        cy.get(`.productinfo a[data-product-id="${index + 1}"]`);
        cy.get('.choose').contains("View Product").click();
    // product.contains("View Product").click();
    }
  }
  export default ProductsPage;
class HomePage {
    navigateToProducts() {
      // if(cy.get('a[href="/products"]')){
      //   cy.visit("/products")
      // }
      cy.get('a[href="/products"]').click();
    }
    verifyLoggedIn(username) {
      cy.get('a').contains(`Logged in as ${username}`).should('be.visible');
    }
    
    logout() {
      cy.get('a').contains("Logout").should('be.visible');
      cy.get('a').contains("Logout").click();

      // Optional: Clear session explicitly if needed
      Cypress.session.clearCurrentSessionData();
      
    }
  }
  export default HomePage;
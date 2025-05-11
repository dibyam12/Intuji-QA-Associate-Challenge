export default class CheckoutPage {
    fillPaymentDetails() {
      cy.get('input[data-qa="card-number"]').type('4242424242424242');
      cy.get('input[data-qa="name-on-card"]').type('Test User');
      cy.get('input[data-qa="expiry-month"]').type('12');
      cy.get('input[data-qa="expiry-year"]').type('2025');
      cy.get('input[data-qa="cvc"]').type('123');
      cy.get('button[data-qa="pay-button"]').click();
    }
    placeOrder() {
      cy.get('a.check_out').contains('Place Order').click();
    }
  }
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage"
import ProductsPage from "../pages/ProductsPage";

describe('Automation Assessment', () => {
  const homePage = new HomePage();
  // const productsPage = new ProductsPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();

  const productId1 = 2;
  const productId2 = 32;

  const category1 = 'Women';
  const subCategory1 = 'Dress';
  const category2 = 'Men';
  const subCategory2 = 'Jeans';

  // SESSION-BASED TEST
  context('User flow using session', () => {
    before(() => {
      Cypress.session.clearAllSavedSessions();
      cy.session('userSession', () => {
        cy.registerUser().then((user) => {
          Cypress.env('user', user);
        });
      });
    });

    it('Complete user flow with session', () => {
      const user = Cypress.env('user');
      cy.visit('/');

      // Verify logged in
      homePage.verifyLoggedIn(user.name);

      // Add products to cart
      cy.addProductToCart(category1, subCategory1, productId1, 'Sleeveless Dress', 'Rs. 1000');
      cy.addProductToCart(category2, subCategory2, productId2, 'Soft Stretch Jeans', 'Rs. 799');

        //PROBLEM:- AUTOMATICALLY LOGS OUT AFTER PRODUCT URL IS TRIGGERED  

        // Log in if there is no usename visible
      cy.get('body').then(($body) => {
        if ($body.find(`a:contains("${user.name}")`).length === 0) {
          cy.login(user.email, user.password);
        }
      });
         
      cy.visit('/view_cart');
      cartPage.verifyCartTotal();
      cartPage.removeProduct(productId2);


      // Checkout
      cartPage.proceedToCheckout();
      checkoutPage.placeOrder();
      checkoutPage.fillPaymentDetails();

      // Logout and re-login
      homePage.logout();
      cy.login(user.email, user.password);
      homePage.verifyLoggedIn(user.name);
    });
  });

  // LOCAL STORAGE-BASED TEST
  context('User flow using localStorage', () => {
    before(() => {
      cy.registerUser();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
          
      cy.saveLocalStorage();
    });

    it('Complete user flow with localStorage', () => {
      cy.fixture('user').then((user) => {
        // Verify logged in
        homePage.verifyLoggedIn(user.name);

        // Add products to cart
        cy.addProductToCart(category1, subCategory1, productId1, 'Sleeveless Dress', 'Rs. 1000');
        cy.addProductToCart(category2, subCategory2, productId2, 'Soft Stretch Jeans', 'Rs. 799');

        // Check if logged in by checking for user name
        cy.get('body').then(($body) => {
          if ($body.find(`a:contains("${user.name}")`).length === 0) {
            cy.login(user.email, user.password);
          }
        });

        cy.visit('/view_cart');
        cartPage.verifyCartTotal();

        // IF want to REMOVE THE PRODUCT 
        cartPage.removeProduct(productId2);
        cartPage.verifyCartTotal();
    
        // Checkout
        cartPage.proceedToCheckout();
        checkoutPage.placeOrder();
        checkoutPage.fillPaymentDetails();
    
        // Logout and re-login
        homePage.logout();
        cy.login(user.email, user.password);
        homePage.verifyLoggedIn(user.name);
      });
    });
  });

  // NEGATIVE TEST
  it('Should fail with invalid login', () => {
    cy.visit('/');
    cy.login('invalidMail@email.com', 'invalidPassword');
    cy.get('p').contains('Your email or password is incorrect!').should('be.visible');
  });
});
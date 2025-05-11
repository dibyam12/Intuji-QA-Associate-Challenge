// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { faker } from '@faker-js/faker';
import ProductsPage from '../e2e/pages/ProductsPage';
import HomePage from '../e2e/pages/HomePage';


Cypress.Commands.add('registerUser', () => {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(10),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    zip: faker.location.zipCode(),
    phone: faker.phone.number(),
  };

  cy.visit('/signup');
  cy.get('input[data-qa="signup-name"]').type(user.name);
  cy.get('input[data-qa="signup-email"]').type(user.email);
  cy.get('button[data-qa="signup-button"]').click();

  // Handle email already exists
  cy.get('body').then(($body) => {
    if ($body.find('p:contains("Email Address already exist!")').length) {
      user.email = faker.internet.email();
      cy.get('input[data-qa="signup-email"]').clear().type(user.email);
      cy.get('button[data-qa="signup-button"]').click();
    }
  });

  // Fill registration form
  cy.get('#id_gender1').check();
  cy.get('input[data-qa="password"]').type(user.password);
  cy.get('input[data-qa="first_name"]').type(user.firstName);
  cy.get('input[data-qa="last_name"]').type(user.lastName);
  cy.get('input[data-qa="address"]').type(user.address);
  cy.get('input[data-qa="city"]').type(user.city);
  cy.get('select[data-qa="country"]').select("India");
  cy.get('input[data-qa="state"]').type(user.state);
  cy.get('input[data-qa="zipcode"]').type(user.zip);
  cy.get('input[data-qa="mobile_number"]').type(user.phone);
  cy.get('button[data-qa="create-account"]').click();
  cy.get('[data-qa="continue-button"]').click();

  // Store user data
  cy.writeFile('cypress/fixtures/user.json', user);
  return cy.wrap(user);
});

Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login');
    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(password);
    cy.get('button[data-qa="login-button"]').click();
  });
  
  Cypress.Commands.add('addToCart', (productIndex) => {
    cy.get(`.productinfo a[data-product-id="${productIndex + 1}"]`).click();
    cy.get('.btn-success').contains('Continue Shopping').click();
  });

  Cypress.Commands.add('addToCartFromDetail', () => {
    cy.get(`.cart`).click();
    cy.get('.btn-success').contains('Continue Shopping').click();
  });
  
  Cypress.Commands.add('verifyProductDetails', (productName, price) => {
    cy.get('.product-information h2').should('contain', productName);
    cy.get('.product-information span').should('contain', price);
    cy.get('.product-information p').should('contain', 'In Stock');
  });


  Cypress.Commands.add('addProductToCart', (category, subCategory, productId, productName, productPrice) => {
    const productsPage = new ProductsPage();
    const homePage = new HomePage();

    homePage.navigateToProducts();
    productsPage.filterByCategory(category,subCategory);
    productsPage.verifyFilteredProducts(subCategory);
    productsPage.goToProductDetails(productId);
    cy.verifyProductDetails(productName, productPrice); 
    cy.addToCartFromDetail(productId); 
});
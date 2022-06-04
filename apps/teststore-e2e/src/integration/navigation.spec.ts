import { products } from '../fixtures/products.constant';

//TEST SUITE 1 - NAVIGATION
describe('Navigation E2E UI Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/products', {
      body: products,
      statusCode: 200,
    });
    cy.visit('/products');
  });

  //TEST CASE 1
  it('should redirect to checkout page and change route to /checkout after the checkout button is pressed', () => {
    cy.get('[data-cy=checkout-button-test]').contains('Checkout').click();
    cy.url().should('include', '/checkout');
  });

  //TEST CASE 2
  it('should redirect to products page and change route to /products after the products button is pressed', () => {
    cy.visit('/checkout');
    cy.get('[data-cy=products-button-test]').contains('Products').click();
    cy.url().should('include', '/products');
  });

  //TEST CASE 3
  it('should redirect to the teststore github repo page from "/products" and change route after the TESTSTORE logo is pressed', () => {
    cy.get('[data-cy=logo-test]').contains('TESTSTORE').click();
    cy.url().should('include', 'https://github.com/Kwandes/teststore');
  });

  //TEST CASE 4
  it('should redirect to the teststore github repo page from "/checkout" and change route after the TESTSTORE logo is pressed', () => {
    cy.visit('/checkout');
    cy.get('[data-cy=logo-test]').contains('TESTSTORE').click();
    cy.url().should('include', 'https://github.com/Kwandes/teststore');
  });

  //TEST CASE 5
  it('should redirect to the default products page and change route after the user enters an incorrect route', () => {
    cy.visit('/random');
    cy.url().should('include', '/products');
  });
});

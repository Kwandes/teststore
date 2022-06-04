import { products } from '../fixtures/products.constant';

//TEST SUITE 1 - PRODUCTS PAGE
describe('Products Page E2E UI Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/products', {
      body: products,
      statusCode: 200,
    });
    cy.visit('/products');
  });

  //TEST CASE 1
  it('should make sure the URL is correct and that the page shown is the Products page', () => {
    cy.visit('/checkout');
    cy.visit('/products');
    cy.url().should('include', '/products');
  });

  //TEST CASE 2
  it('should make sure the URL is correct and that the page shows "PRODUCTS" text in the header element', () => {
    cy.url().should('include', '/products');
    cy.get('[data-cy=header-products-test]').contains('Products');
  });

  //TEST CASE 3
  it('should fill the items/products list on the "/products" route page and load at least 2 items', () => {
    cy.url().should('include', '/products');
    cy.get('[data-cy=products-product-item]').should(
      'have.length.greaterThan',
      1
    );
  });
});

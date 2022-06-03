import * as products from '../fixtures/products.constant';

//TEST FOR CHECKOUT BUTTON REDIRECTION
describe('teststore - go to checkout page', () => {
  beforeEach(() => {
    cy.visit('/products');
    cy.intercept('GET', '/api/products', {
      body: products,
      statusCode: 200,
    });
  });

  it('should redirect to checkout page and change route to /checkout after the checkout button is pressed', () => {
    //REDIRECTION ON BUTTON PRESSED
    cy.get('[data-cy=checkout-button-test]').contains('Checkout').click();
    cy.url().should('include', '/checkout');
  });
});

//TEST FOR PRODUCTS BUTTON REDIRECTION
describe('teststore - go to products page', () => {
  beforeEach(() => {
    cy.visit('/checkout');
    cy.intercept('GET', '/api/products', {
      body: products,
      statusCode: 200,
    });
    //MOCKING OF THE SESSION STORAGE BASKET
  });

  it('should redirect to products page and change route to /products after the products button is pressed', () => {
    //REDIRECTION ON BUTTON PRESSED
    cy.get('[data-cy=products-button-test]').contains('Products').click();
    cy.url().should('include', '/products');
  });
});

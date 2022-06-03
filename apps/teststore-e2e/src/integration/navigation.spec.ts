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

//TEST FOR TESTSTORE LOGO REDIRECTION TO GIT FROM PRODUCTS PAGE
describe('teststore - go to teststore github repository from /products', () => {
  beforeEach(() => {
    cy.visit('/products');
    cy.intercept('GET', '/api/products', {
      body: products,
      statusCode: 200,
    });
  });

  it('should redirect to the teststore github repo page and change route after the TESTSTORE logo is pressed', () => {
    //REDIRECTION ON BUTTON PRESSED
    cy.get('[data-cy=logo-test]').contains('TESTSTORE').click();
    cy.url().should('include', 'https://github.com/Kwandes/teststore');
  });
});

//TEST FOR TESTSTORE LOGO REDIRECTION TO GIT FROM CHECKOUT PAGE
describe('teststore - go to teststore github repository from /checkout', () => {
  beforeEach(() => {
    cy.visit('/checkout');
    cy.intercept('GET', '/api/products', {
      body: products,
      statusCode: 200,
    });
  });

  it('should redirect to the teststore github repo page and change route after the TESTSTORE logo is pressed', () => {
    //REDIRECTION ON BUTTON PRESSED
    cy.get('[data-cy=logo-test]').contains('TESTSTORE').click();
    cy.url().should('include', 'https://github.com/Kwandes/teststore');
  });
});

//TEST FOR DEFAULT REDIRECTION TO '/products' FROM ANY PAGE WHEN HIT ROUTE IS NOT CHECKOUT/PRODUCTS
describe('teststore - go to /products by default if entered route is not /products or /checkout', () => {
  beforeEach(() => {
    cy.visit('/checkout');
    cy.intercept('GET', '/api/products', {
      body: products,
      statusCode: 200,
    });
  });

  it('should redirect to the default products page and change route after the user enters an incorrect route', () => {
    cy.visit('/random');
    //REDIRECTS TO DEFAULT - '/products' PAGE
    cy.url().should('include', '/products');
  });
});

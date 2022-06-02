import * as products from '../fixtures/products.constant';

describe('teststore', () => {
    beforeEach(() => {
        cy.visit('/products');

        cy.intercept('GET', '/api/products', {
            body: products,
            statusCode: 200
        });
    });
    
    it('should redirect to checkout page and change route to /checkout', () => {
      // Custom command example, see `../support/commands.ts` file
      //cy.login('my-email@something.com', 'myPassword');
      //REDIRECTION ON BUTTON PRESSED
      cy.get('[data-cy=checkout-button-test]').contains('Checkout').click()
      //
      cy.url().should('include', '/checkout')

      // Function helper example, see `../support/app.po.ts` file
      //getGreeting().contains('Welcome teststore');
    });
  });
import * as products from '../fixtures/products.constant';

describe('Checkout page E2E UI Tests', () => {
  beforeEach(() => {
    //TO DO: Set up the
    cy.visit('/checkout');
  });

  describe('Checkout page load', () => {
    it('should have the correct URL', () => {
      cy.visit('/products');
      cy.visit('/checkout');
      cy.url().should('include', '/checkout');
    });

    it('should show the Checkout text', () => {
      cy.url().should('include', '/checkout');
      cy.get('[data-cy=header-checkout]').contains('Checkout');
    });
  });

  describe('Your email input element', () => {
    it('should exist, have label and placeholder', () => {
      cy.contains('label', 'Your email')
        .invoke('attr', 'for')
        .should('equal', 'email-input');

      cy.get('[data-cy=checkout-email-input]')
        .should('be.visible')
        .invoke('attr', 'placeholder')
        .should('contain', 'example@email.com');
    });
  });
});


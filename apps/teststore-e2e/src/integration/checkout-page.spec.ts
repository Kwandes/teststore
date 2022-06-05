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

describe('Checkout page E2E UI Tests', () => {
  beforeEach(() => {
    //TO DO: Set up the
    cy.visit('/checkout');
  });

  describe('The delivery type element', () => {
    it('should exist, have a label and a default option for Home Delivery', () => {
      cy.contains('label', 'Delivery method')
        .invoke('attr', 'for')
        .should('equal', 'checkout-delivery-method-select');

      cy.get('select[id="delivery-method-select"]')
        .select(0)
        .should('have.value', 'home_delivery');
    });
  });   
  
  describe('The delivery type element Pick-up Point', () => {
    it('should exist, have a label and placeholder', () => {
      cy.contains('label', 'Delivery method')
        .invoke('attr', 'for')
        .should('equal', 'checkout-delivery-method-select');

      cy.get('select[id="delivery-method-select"]')
        .select(1)
        .should('have.value', 'pickup_point');
    });
  });  
    it('should have delivery price of 25DKK', () => {
      cy.get('select[id="delivery-method-select"]')
        .select(1)
        .should('have.value', 'pickup_point');

      cy.get('[data-cy=checkout-order-price-delivery-price]')
        .contains('Delivery price: 25.00 DKK')
        .should('be.visible')
    });
});
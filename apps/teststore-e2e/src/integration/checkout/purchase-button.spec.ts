import { DeliveryTypeEnum, IOrder } from '@interfaces';
import { products } from '../../fixtures/products.constant';

const mockOrder: IOrder = {
  orderId: 'ceddebe5-d502-4b19-8dea-32623fab7846',
  email: 'example@email.com',
  items: [1, 2],
  total: 182.25,
  subtotal: 132.55,
  deliveryType: DeliveryTypeEnum.homeDelivery,
};

describe('Checkout page E2E UI Tests', () => {
  beforeEach(() => {
    // Clear session storage of the actual test instance
    cy.window().then((window) => {
      window.sessionStorage.clear();
    });
    // Set session storage basket to containt two different products
    // Get the session stroage from the actual browser instance window (the cypress instance has its own session storage independant from the test window)
    cy.window().then((window) => {
      window.sessionStorage.setItem(
        'basket',
        JSON.stringify([products[0], products[1]])
      );
    });
    cy.visit('/checkout');
  });

  describe('Purchase button section', () => {
    it('should verify that once the checkout page is visited, the purhcase button is disabled by default', () => {
      cy.get('[data-cy=checkout-purchase-btn]').should('be.disabled');
    });

    it('should verify that once the checkout page is visited, the email input field has a value and the item list is filled, the purchase button is enabled', () => {
      cy.get('[data-cy=checkout-email-input]')
        .type('example@email.com')
        .should('be.visible');
      cy.get('[data-cy=checkout-product-item]')
        .should('have.length', 2)
        .should('be.visible');
      cy.get('[data-cy=checkout-purchase-btn]').should('be.enabled');
    });

    it('should verify that once the checkout page is visited, the email input field has an invalid value and the item list is filled, the purchase button is disabled', () => {
      cy.get('[data-cy=checkout-email-input]')
        .type('oopsy-daisy')
        .should('be.visible');
      cy.get('[data-cy=checkout-product-item]')
        .should('have.length', 2)
        .should('be.visible');
      cy.get('[data-cy=checkout-purchase-btn]').should('be.disabled');
    });

    it('should verify that once the checkout page is visited, the email input field has a value and the item list is empty, the purchase button is disabled', () => {
      //CLEARING THE SESSION STORAGE SO THAT THE ITEM LIST IS EMPTY
      cy.window().then((window) => {
        window.sessionStorage.clear();
      });
      // Refresh the page
      cy.visit('/checkout');
      cy.get('[data-cy=checkout-product-item]').should('not.exist');
      cy.get('[data-cy=checkout-email-input]')
        .type('example@email.com')
        .should('be.visible');
      cy.get('[data-cy=checkout-purchase-btn]').should('be.disabled');
    });

    it('should verify that once the checkout page is visited, all info is filled correctly and the purchase button is pressed, all other elements get disabled', () => {
      //MOCK FOR A SUCCESSFULLY CREATED ORDER
      cy.intercept('POST', '/api/orders', {
        body: mockOrder,
        statusCode: 200,
      });
      cy.get('[data-cy=checkout-email-input]')
        .type('example@email.com')
        .should('be.visible');
      cy.get('[data-cy=checkout-product-item]')
        .should('have.length', 2)
        .should('be.visible');
      cy.get('[data-cy=checkout-purchase-btn]').should('be.enabled').click();
      //FOLLOWING ELEMENTS, AFTER CLICK, SHOULD BE DISABLED
      cy.get('[data-cy=checkout-purchase-btn]').should('be.disabled');
      cy.get('[data-cy=checkout-email-input]').should('be.disabled');
      cy.get('[data-cy=checkout-delivery-method-select]').should('be.disabled');
      cy.get('[data-cy=checkout-discount-input]').should('be.disabled');
      cy.get('[data-cy=checkout-discount-apply-btn]').should('be.disabled');
    });

    it('should verify that once the checkout page is visited, all info is filled correctly and the purchase button is pressed, the order creation is successful and an order confirmation rectangle is created on the bottom of the screen', () => {
      //MOCK FOR A SUCCESSFULLY CREATED ORDER
      cy.intercept('POST', '/api/orders', {
        body: mockOrder,
        statusCode: 200,
      });
      cy.get('[data-cy=checkout-email-input]')
        .type('example@email.com')
        .should('be.visible');
      cy.get('[data-cy=checkout-product-item]')
        .should('have.length', 2)
        .should('be.visible');
      cy.get('[data-cy=checkout-purchase-btn]').should('be.enabled').click();
      cy.get('[data-cy=checkout-alert]')
        .contains('Order placed')
        .should('be.visible');
      cy.get('[data-cy=checkout-alert]')
        .contains('ceddebe5-d502-4b19-8dea-32623fab7846')
        .should('be.visible');
    });

    it('should verify that once the checkout page is visited, all info is filled correctly and the purchase button is pressed, the order creation is unsuccessful and an order confirmation rectangle says failed to place order', () => {
      //MOCK FOR AN UNSUCCESSFULLY CREATED ORDER
      cy.intercept('POST', '/api/orders', {
        body: mockOrder,
        statusCode: 404,
      });
      cy.get('[data-cy=checkout-email-input]')
        .type('example@email.com')
        .should('be.visible');
      cy.get('[data-cy=checkout-product-item]')
        .should('have.length', 2)
        .should('be.visible');
      cy.get('[data-cy=checkout-purchase-btn]').should('be.enabled').click();
      cy.get('[data-cy=checkout-alert-text]')
        .contains('Failed to place order')
        .should('be.visible');
    });
  });
});

import { products } from '../../fixtures/products.constant';

describe('Checkout page E2E UI Tests', () => {
  beforeEach(() => {
    // Clear session storage of the actual test instance
    cy.window().then((window) => {
      window.sessionStorage.clear();
    });
    // Set session storage basket to containt wo different products
    // Get the session stroage from the actual browser instance window (the cypress instance has its own session storage independant from the test window)
    cy.window().then((window) => {
      window.sessionStorage.setItem(
        'basket',
        JSON.stringify([products[0], products[1]])
      );
    });
    cy.visit('/checkout');
  });

  describe('Your order section', () => {
    it('should be empty if there are no items in the basket', () => {
      // Remove any products fromt he sessionStorage basket
      cy.window().then((window) => {
        window.sessionStorage.clear();
      });
      // Refresh the page
      cy.visit('/checkout');
      // Check that the list contains no items
      cy.get('[data-cy=checkout-product-item]').should('not.exist');
    });
    it('should contain two product items if there are two items in the basket', () => {
      cy.get('[data-cy=checkout-product-item]').should('have.length', 2);
    });
    it('should a product item with a name, price and a delete button', () => {
      cy.get('[data-cy=checkout-product-item]')
        .first()
        .within(() => {
          cy.get('[data-cy=checkout-product-item-title]');
          cy.get('[data-cy=checkout-product-item-price]');
          cy.get('[data-cy=checkout-product-item-remove-btn]');
        });
    });
    it('should remove a product item when its delete button is pressed', () => {
      cy.get('[data-cy=checkout-product-item]')
        .first()
        .within(() => {
          cy.get('[data-cy=checkout-product-item-remove-btn]').click();
        });
      cy.get('[data-cy=checkout-product-item]').should('have.length', 1);
    });
  });
});

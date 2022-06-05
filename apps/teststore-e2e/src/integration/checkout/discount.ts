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

  describe('Discount section', () => {
    it(`should contain an input field with a placeholder and a label, and pricing information includes ´You Save: 0 DKK´`, () => {
      cy.get('[data-cy=checkout-discount-input]').should(
        'have.attr',
        'placeholder',
        'ExampleDiscount'
      );
    });

    describe('should display an alert ot the user and clear any discount information when', () => {
      it('the discount contains invalid characters', () => {});

      it(`the discount has no remaning uses`, () => {});

      it(`the discount isn't active yet`, () => {});

      it(`the discount is expired`, () => {});

      it(`the discount isn't enabled`, () => {});

      it(`the discount doesn't exist in the database`, () => {});
    });

    it('should display an alert and update the pricing information when valid discount is inputted', () => {});

    it('should clear any discount information when a invalid discount is applied after a sucecssful one', () => {});
  });
});

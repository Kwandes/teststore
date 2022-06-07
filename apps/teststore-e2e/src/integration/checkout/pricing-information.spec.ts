import { products } from '../../fixtures/products.constant';
import { DiscountTypeEnum, IDiscount } from '@interfaces';

const mockDiscount: IDiscount = {
  discountId: '',
  code: '',
  amount: 100,
  type: DiscountTypeEnum.amount,
  remainingUses: 100,
  startsAt: new Date(),
  isEnabled: true,
};

describe('Checkout page E2E UI Tests', () => {
  beforeEach(() => {
    // Clear session storage of the actual test instance
    cy.window().then((window) => {
      window.sessionStorage.clear();
    });
  });

  describe('Your order section', () => {
    it('should contain two product items with prices 109.95 and 22.30', () => {
      // Set session storage basket to containt two different products
      // Get the session stroage from the actual browser instance window (the cypress instance has its own session storage independant from the test window)
      cy.window().then((window) => {
        window.sessionStorage.setItem(
          'basket',
          JSON.stringify([products[0], products[1]])
        );
      });
      cy.visit('/checkout');
      cy.get('[data-cy=checkout-product-item]')
        .should('have.length', 2)
        .first()
        .within(() => {
          cy.get('[data-cy=checkout-product-item-price]');
        });
      cy.get('[data-cy=checkout-product-item]').should('have.length', 2);
      cy.get('[data-cy=checkout-product-item]')
        .first()
        .next()
        .within(() => {
          cy.get('[data-cy=checkout-product-item-price]');
        });
    });
    it('should contain subtotal of 132,25DKK and delivery price of 50.00 DKK', () => {
      cy.get('[data-cy=checkout-order-price-subtotal]').contains(
        'Subtotal: 132.25 DKK'
      );
      cy.get('[data-cy="checkout-order-price-delivery-price"]').contains(
        'Delivery price: 50.00 DKK'
      );
    });
    it('should display the You save field to be zero and the total to be 182.25 DKK', () => {
      cy.get('[data-cy=checkout-order-price-you-save]').contains(
        'You save: 0.00 DKK'
      );
      cy.get('[data-cy="checkout-order-price-total"]').contains(
        'Total: 182.25 DKK'
      );
    });
    it('should apply a discount type of amount of 100 and a total of 82.25 DKK', () => {
      cy.intercept('GET', '/api/discounts/*', {
        body: { ...mockDiscount },
        statusCode: 200,
      });
      cy.get('[data-cy=checkout-discount-input]').type('100');
      cy.get('[data-cy=checkout-discount-apply-btn]').click();
      cy.get('[data-cy=checkout-order-price-you-save]').should(
        'contain',
        `You save: ${mockDiscount.amount}.00 DKK`
      );
      cy.get('[data-cy="checkout-order-price-total"]').contains(
        'Total: 82.25 DKK'
      );
    });
  });
  describe('Your order section', () => {
    it('should be empty if there are no items in the basket', () => {
      // Remove any products fromt he sessionStorage basket
      cy.window().then((window) => {
        window.sessionStorage.clear();
      });
      //Refresh the page
      cy.visit('/checkout');
    });
    it('should display the You save field to be zero and the total to be 50 DKK', () => {
      cy.get('[data-cy=checkout-order-price-you-save]').contains(
        'You save: 0.00 DKK'
      );
      cy.get('[data-cy="checkout-order-price-total"]').contains(
        'Total: 50.00 DKK'
      );
    });
    it('should display the You save field to be zero and the total to be 50 DKK, when discount of 100 DKK is applied', () => {
      cy.intercept('GET', '/api/discounts/*', {
        body: { ...mockDiscount },
        statusCode: 200,
      });
      cy.get('[data-cy=checkout-discount-input]').type('100');
      cy.get('[data-cy=checkout-discount-apply-btn]').click();
      cy.get('[data-cy=checkout-order-price-you-save]').should(
        'contain',
        `You save: 0.00 DKK`
      );
      cy.get('[data-cy="checkout-order-price-total"]').contains(
        'Total: 50.00 DKK'
      );
      cy.get('[data-cy=checkout-order-price-you-save]').contains(
        'You save: 0.00 DKK'
      );
    });
  });
});

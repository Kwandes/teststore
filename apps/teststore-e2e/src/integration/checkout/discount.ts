import { DiscountTypeEnum, IDiscount } from '@interfaces';
import { products } from '../../fixtures/products.constant';

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

    describe('should display an alert to the user and clear any discount information when', () => {
      beforeEach(() => {
        // Create a reference to the alert
        cy.window().then((window) => {
          cy.spy(window, 'alert').as('alert');
        });
      });

      it('the discount contains invalid characters', () => {
        // Validate input field colors for invalid text
        cy.get('[data-cy=checkout-discount-input]')
          .should('have.css', 'background-color', 'rgb(255, 255, 255)')
          .type('ExampleDiscount#')
          .should('have.css', 'background-color', 'rgb(255, 204, 203)')
          .clear()
          .type('ExampleDiscount!')
          .should('have.css', 'background-color', 'rgb(255, 204, 203)')
          .clear()
          .type('ExampleDiscount*')
          .should('have.css', 'background-color', 'rgb(255, 204, 203)')
          .clear();
        // Validate the text of the alert.
        // Does not validate that the alert appears
        cy.on('window:alert', (text) => {
          expect(text).to.contains('Discount Invalid');
        });
        // Try to apply an invalid discount
        cy.get('[data-cy=checkout-discount-input]').type('ExampleDiscount*');
        cy.get('[data-cy=checkout-discount-apply-btn]')
          .click()
          .then(() => {
            // TODO - figure out if the alert should show or if the button should be disabled
            // Assert that the alert was shown
            cy.get('@alert').should('have.been.called');
          });
      });

      it(`the discount has no remaning uses`, () => {
        // Create a startsAt date for the mock
        const startsAtDate = new Date();
        startsAtDate.setDate(new Date().getDate() - 5); // set the date to 5 days behind the current date
        // Mock the API call for applying the discount
        cy.intercept('GET', '/api/discounts/*', {
          body: { ...mockDiscount, startsAt: startsAtDate, remainingUses: 0 },
          statusCode: 200,
        });
        // Validate the alert contents
        cy.on('window:alert', (text) => {
          expect(text).to.contains('Discount Invalid');
        });
        // Apply the discount
        cy.get('[data-cy=checkout-discount-input]').type('UsedUpDiscount');
        cy.get('[data-cy=checkout-discount-apply-btn]')
          .click()
          .then(() => {
            // Assert that the alert was shown
            cy.get('@alert').should('have.been.called');
          });
        // Validate that the pricing information contain valid discount information
        cy.get('[data-cy=checkout-order-price-you-save]').should(
          'contain',
          'You save: 0.00 DKK'
        );
      });

      it(`the discount isn't active yet`, () => {
        // Create a startsAt date for the mock
        const startsAtDate = new Date();
        startsAtDate.setDate(new Date().getDate() - 5); // set the date to 5 days behind the current date
        // Mock the API call for applying the discount
        cy.intercept('GET', '/api/discounts/*', {
          body: { ...mockDiscount, startsAt: startsAtDate },
          statusCode: 200,
        });
        // Validate the alert contents
        cy.on('window:alert', (text) => {
          expect(text).to.contains('Discount Invalid');
        });
        // Apply the discount
        cy.get('[data-cy=checkout-discount-input]').type('InvactiveDiscount');
        cy.get('[data-cy=checkout-discount-apply-btn]')
          .click()
          .then(() => {
            // Assert that the alert was shown
            cy.get('@alert').should('have.been.called');
          });
        // Validate that the pricing information contain valid discount information
        cy.get('[data-cy=checkout-order-price-you-save]').should(
          'contain',
          'You save: 0.00 DKK'
        );
      });

      it(`the discount is expired`, () => {
        // Create a startsAt date for the mock
        const startsAtDate = new Date();
        startsAtDate.setDate(new Date().getDate() - 5); // set the date to 5 days behind the current date
        // Mock the API call for applying the discount
        cy.intercept('GET', '/api/discounts/*', {
          body: {
            ...mockDiscount,
            startsAt: startsAtDate,
            expiresAt: startsAtDate,
          },
          statusCode: 200,
        });
        // Validate the alert contents
        cy.on('window:alert', (text) => {
          expect(text).to.contains('Discount Invalid');
        });
        // Apply the discount
        cy.get('[data-cy=checkout-discount-input]').type('ExpiredDiscount');
        cy.get('[data-cy=checkout-discount-apply-btn]')
          .click()
          .then(() => {
            // Assert that the alert was shown
            cy.get('@alert').should('have.been.called');
          });
        // Validate that the pricing information contain valid discount information
        cy.get('[data-cy=checkout-order-price-you-save]').should(
          'contain',
          'You save: 0.00 DKK'
        );
      });

      it(`the discount isn't enabled`, () => {
        // Create a startsAt date for the mock
        const startsAtDate = new Date();
        startsAtDate.setDate(new Date().getDate() - 5); // set the date to 5 days behind the current date
        // Mock the API call for applying the discount
        cy.intercept('GET', '/api/discounts/*', {
          body: { ...mockDiscount, startsAt: startsAtDate, isEnabled: false },
          statusCode: 200,
        });
        // Validate the alert contents
        cy.on('window:alert', (text) => {
          expect(text).to.contains('Discount Invalid');
        });
        // Apply the discount
        cy.get('[data-cy=checkout-discount-input]').type('DisabledDiscount');
        cy.get('[data-cy=checkout-discount-apply-btn]')
          .click()
          .then(() => {
            // Assert that the alert was shown
            cy.get('@alert').should('have.been.called');
          });
        // Validate that the pricing information contain valid discount information
        cy.get('[data-cy=checkout-order-price-you-save]').should(
          'contain',
          'You save: 0.00 DKK'
        );
      });

      it(`the discount doesn't exist in the database`, () => {
        // Mock the API call for applying the discount
        cy.intercept('GET', '/api/discounts/*', {
          statusCode: 404,
        });
        // Validate the alert contents
        cy.on('window:alert', (text) => {
          expect(text).to.contains('Discount Invalid');
        });
        // Apply the discount
        cy.get('[data-cy=checkout-discount-input]').type('NonexistentDiscount');
        cy.get('[data-cy=checkout-discount-apply-btn]')
          .click()
          .then(() => {
            // Assert that the alert was shown
            cy.get('@alert').should('have.been.called');
          });
        // Validate that the pricing information contain valid discount information
        cy.get('[data-cy=checkout-order-price-you-save]').should(
          'contain',
          'You save: 0.00 DKK'
        );
      });
    });

    it('should display an alert and update the pricing information when valid discount is inputted', () => {
      // Create a reference to the alert
      cy.window().then((window) => {
        cy.spy(window, 'alert').as('alert');
      });

      // Create a startsAt date for the mock
      const startsAtDate = new Date();
      startsAtDate.setDate(new Date().getDate() - 5); // set the date to 5 days behind the current date
      // Mock the API call for applying the discount
      cy.intercept('GET', '/api/discounts/*', {
        body: { ...mockDiscount, startsAt: startsAtDate },
        statusCode: 200,
      });
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Discount Applied');
      });
      cy.get('[data-cy=checkout-discount-input]').type('ExampleDiscount');
      cy.get('[data-cy=checkout-discount-apply-btn]')
        .click()
        .then(() => {
          // Assert that the alert was shown
          cy.get('@alert').should('have.been.called');
        });
      cy.get('[data-cy=checkout-order-price-you-save]').should(
        'contain',
        `You save: ${mockDiscount.amount}.00 DKK`
      );
    });

    it('should clear any discount information when a invalid discount is applied after a sucecssful one', () => {
      let testState: 'discountApplied' | 'discountInvalid' = 'discountApplied'; // Used to get a reference to the state of the test and what text the allert should have
      // Create a reference to the alert
      cy.window().then((window) => {
        cy.spy(window, 'alert').as('alert');
      });

      // Create a startsAt date for the mock
      const startsAtDate = new Date();
      startsAtDate.setDate(new Date().getDate() - 5); // set the date to 5 days behind the current date
      // Mock the API call for applying the discount
      cy.intercept('GET', '/api/discounts/*', {
        body: { ...mockDiscount, startsAt: startsAtDate },
        statusCode: 200,
        times: 1,
      }).as('applyDiscountValid');
      // Depending on in which part of the test the alert is shown, validate the alert text
      cy.on('window:alert', (text) => {
        expect(text).to.contains(
          testState === 'discountApplied'
            ? 'Discount Applied'
            : 'Discount Invalid'
        );
      });
      cy.get('[data-cy=checkout-discount-input]').type('ValidDiscount');
      cy.get('[data-cy=checkout-discount-apply-btn]')
        .click()
        .then(() => {
          // Assert that the alert was shown
          cy.get('@alert').should('have.been.called');
        });
      cy.get('[data-cy=checkout-order-price-you-save]').should(
        'contain',
        `You save: ${mockDiscount.amount}.00 DKK`
      );

      // Apply the discount again
      // Mock the API call for applying the discount but this time return 404
      cy.intercept('GET', '/api/discounts/*', {
        statusCode: 404,
        times: 1,
      }).as('applyDiscountInvalid');
      cy.get('[data-cy=checkout-discount-input]')
        .clear()
        .type('InvalidDiscount')
        .then(() => {
          // Change of the state has to be set via the .then() method otherwise cypress will apply it out of order
          testState = 'discountInvalid';
        });
      cy.get('[data-cy=checkout-discount-apply-btn]')
        .click()
        .then(() => {
          // Assert that the alert was shown
          cy.get('@alert').should('have.been.called');
        });
      cy.get('[data-cy=checkout-order-price-you-save]').should(
        'contain',
        `You save: 0.00 DKK`
      );
    });
  });
});

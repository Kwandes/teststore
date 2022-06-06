describe('Checkout page E2E UI Tests', () => {
  beforeEach(() => {
    cy.visit('/checkout');
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

    it('should have white background when using a valid email', () => {
      cy.get('[data-cy=checkout-email-input')
        .type('example-email@example')
        .should('have.css', 'background-color', 'rgb(255, 255, 255)')
        .clear()
        .type('e@e')
        .should('have.css', 'background-color', 'rgb(255, 255, 255)')
        .clear()
        .type('e@example.com')
        .should('have.css', 'background-color', 'rgb(255, 255, 255)');
    });

    it('should have white background when using a valid email that is between 3 and 254 characters', () => {
      cy.get('[data-cy=checkout-email-input')
        .type('e@e')
        .should('have.css', 'background-color', 'rgb(255, 255, 255)')
        .clear()
        .type(
          'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc.ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
        )
        .should('have.css', 'background-color', 'rgb(255, 255, 255)');
    });

    it('should have red background when using an invalid email', () => {
      //rgb(255, 204, 203) is #ffcccb but cypress doesn't like hex codes
      cy.get('[data-cy=checkout-email-input')
        .type('example')
        .should('have.css', 'background-color', 'rgb(255, 204, 203)')
        .clear()
        .type('example@')
        .should('have.css', 'background-color', 'rgb(255, 204, 203)')
        .clear()
        .type('@example')
        .should('have.css', 'background-color', 'rgb(255, 204, 203)')
        .clear();
    });

    it('should have red background when using an invalid email with a length below 3', () => {
      //Testing 255 characters is impossible since the element does not allow that many characters.
      cy.get('[data-cy=checkout-email-input')
        .type('@e')
        .should('have.css', 'background-color', 'rgb(255, 204, 203)');
    });
  });
});

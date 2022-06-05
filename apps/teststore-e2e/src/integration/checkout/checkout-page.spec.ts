describe('Checkout page E2E UI Tests', () => {
  beforeEach(() => {
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
});

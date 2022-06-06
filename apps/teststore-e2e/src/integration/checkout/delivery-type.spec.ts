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
      .should('be.visible');
  });
});

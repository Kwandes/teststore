import { products } from '../fixtures/products.constant';

//TEST SUITE 1 - PRODUCTS PAGE
describe('Products Page E2E UI Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/products', {
      body: products,
      statusCode: 200,
    });
    // Clear session storage of the actual test instance
    cy.window().then((window) => {
      window.sessionStorage.clear();
    });
    cy.visit('/products');
  });

  //TEST CASE 1
  it('should make sure the URL is correct and that the page shown is the Products page', () => {
    cy.visit('/checkout');
    cy.visit('/products');
    cy.url().should('include', '/products');
  });

  //TEST CASE 2
  it('should make sure the URL is correct and that the page shows "PRODUCTS" text in the header element', () => {
    cy.url().should('include', '/products');
    cy.get('[data-cy=header-products-test]').contains('Products');
  });

  //TEST CASE 3
  it('should fill the items/products list on the "/products" route page and load at least 2 items', () => {
    cy.url().should('include', '/products');
    cy.get('[data-cy=products-product-item]').should(
      'have.length.greaterThan',
      1
    );
  });

  //TEST CASE 4 - SHOULD BE REFACTORED?
  it('should get an item with a title, price, picture, description and add-to-basket button', () => {
    cy.url().should('include', '/products');
    cy.get('[data-cy=products-product-item-title]')
      .first()
      .should('be.visible');
    cy.get('[data-cy=products-product-item-price]')
      .first()
      .contains('Price: 109.95 DKK')
      .should('be.visible');
    cy.get('[data-cy=products-product-item-image]')
      .first()
      .should('be.visible');
    cy.get('[data-cy=products-product-item-description]')
      .first()
      .should('be.visible');
    cy.get('[data-cy=products-product-item-add-to-basket-btn]')
      .first()
      .contains('Add to basket')
      .should('be.visible');
  });

  it('should add the product item to session storage when the add to basket button is pressed', () => {
    cy.url().should('include', '/products');
    // Add an item to basket aka sessionStorage
    cy.get('[data-cy=products-product-item-add-to-basket-btn]').first().click();

    // Get the session stroage from the actual browser instance window (the cypress instance has its own session storage independant from the test window)
    cy.window().then((window) => {
      const itemsInSessionStorage = JSON.parse(
        window.sessionStorage.getItem('basket') || '[]'
      );
      expect(itemsInSessionStorage.length).equal(1);
    });

    // Add two more item to basket aka sessionStorage
    cy.get('[data-cy=products-product-item-add-to-basket-btn]').first().click();
    cy.get('[data-cy=products-product-item-add-to-basket-btn]').first().click();
    cy.window().then((window) => {
      const itemsInSessionStorage = JSON.parse(
        window.sessionStorage.getItem('basket') || '[]'
      );
      expect(itemsInSessionStorage.length).equal(3);
    });
  });

  it('should display an alert when the user tries to add product items to the basket totalling over 666666 in price', () => {
    // Create the list of items that totals 666.993,33 in price
    const basketItems = Array(666).fill(products[13]); // products[13] corresponds to the item with the highest price of 999,99
    // Set the product items to session storage to a list of items that is right at the limit of 666666
    // Get the session stroage from the actual browser instance window (the cypress instance has its own session storage independant from the test window)
    cy.window().then((window) => {
      window.sessionStorage.setItem('basket', JSON.stringify(basketItems));
      cy.spy(window, 'alert').as('alert');
    });
    // Validate the text of the alert.
    // Does not validate that the alert appears
    cy.on('window:alert', (text) => {
      expect(text).to.contains('You have exceeded the maximum purchase amount');
    });
    // Add an extra product, going over the total price limit and triggering an alert
    cy.get('[data-cy=products-product-item-add-to-basket-btn]')
      .eq(13) // corresponds to products[14] aka the most expensive item
      .click()
      .then(() => {
        // Assert that the alert was shown
        cy.get('@alert').should('have.been.calledOnce');

        // Check that no extra items were added to the basket
        const itemsInSessionStorage = JSON.parse(
          window.sessionStorage.getItem('basket') || '[]'
        );
        expect(itemsInSessionStorage.length).equal(666);
      });
  });
});

const ingredient = '[data-cy="ingredient-link-item"]';
const modal = '[data-cy="modal"]';
const modalOverlay = '[data-cy="modal-overlay"';
const burgerConstructor = '[data-cy="constructor"]';

describe('Burger builder and order flow', () => {
  beforeEach(() => {
    localStorage.setItem('refreshToken', JSON.stringify('refresh_token_mock'));
    cy.setCookie('accessToken', JSON.stringify('access_token_mock'));
    cy.intercept('GET', `api/ingredients`, {
      fixture: 'ingredients.json'
    }).as('fetchIngredients');
    cy.intercept('GET', `api/auth/user`, { fixture: 'user.json' }).as(
      'fetchUserData'
    );
    cy.intercept('POST', `api/orders`, { fixture: 'order.json' }).as(
      'createOrder'
    );
    cy.visit('');
    cy.wait('@fetchUserData');
    cy.wait('@fetchIngredients');
  });

  describe('Burger constructor interactions', () => {
    it('Add an ingredient to the constructor', () => {
      cy.get(ingredient).first().next().click({ force: true });
      cy.get(burgerConstructor).as('constructor');
      cy.get('@constructor').should('contain', 'Краторная булка N-200i');
    });

    it('Open and close ingredient modal', () => {
      cy.get(ingredient).first().click({ force: true });
      cy.get(modal).as('modal');
      cy.get('@modal').should('exist');
      cy.get('[data-cy="close-button"]').click({ force: true });
      cy.get('@modal').should('not.be.visible');
    });

    it('Close ingredient modal using overlay click', () => {
      cy.get(ingredient).first().click({ force: true });
      cy.get(modal).as('modal');
      cy.get('@modal').should('exist');
      cy.get(modalOverlay).click('top', { force: true });
      cy.get('@modal').should('not.exist');
    });

    it('Create an order and verifies modal behavior', () => {
      cy.get(burgerConstructor).as('constructor');
      cy.get(ingredient).first().next().click({ force: true });
      cy.get(ingredient).eq(2).next().click({ force: true });
      cy.get('[data-cy="create-order-button"]').click({ force: true });
      cy.wait('@createOrder');
      cy.get(modal).as('modal');
      cy.get('@modal').should('exist');
      cy.get('@modal').should('contain', '2598');
      cy.get('@modal').should('exist');
      cy.get(modalOverlay).click('top', { force: true });
      cy.get('@modal').should('not.exist');
      cy.get('@constructor').should('contain', '');
    });
  });
});
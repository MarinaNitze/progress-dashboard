/// <reference types="cypress" />

describe('Home page', () => {
  it('should successfully display text.', () => {
    // first visit the site
    cy.visit('');
    cy.get('.usa-nav__link').first().should('have.text', 'Topics');
  });
});

/// <reference types="cypress" />

describe('Home page', () => {
  it('should successfully display text.', () => {
    // first visit the site
    cy.visit('');
    cy.get('header').should('have.text', 'Progress Dashboard');
  });
});

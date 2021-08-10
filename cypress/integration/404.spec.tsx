/// <reference types="cypress" />

describe('State page', () => {
  it('should successfully navigate to Washington state page', () => {
    cy.visit('/state/not-a-real-param');

    cy.get('header').should('have.text', 'Progress Dashboard');
    cy.get('[data-cy=404-heading]').should('have.text', '404');
    cy.get('[data-cy=404-text]').should('have.text', 'Not found');
  });
});

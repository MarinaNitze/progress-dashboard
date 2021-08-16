/// <reference types="cypress" />

describe('State page', () => {
  it('should successfully navigate to Washington state page', () => {
    cy.visit('/state/wa');

    cy.get('[data-cy=state-text]').should('have.text', 'Washington');
  });
});

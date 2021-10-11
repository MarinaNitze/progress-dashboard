/// <reference types="cypress" />

describe('Topics page', () => {
  it('should successfully navigate to topics page', () => {
    cy.visit('/topic/extended-foster-care');

    cy.get('[data-cy=about-this-topic]').contains('h2', 'About this topic');

    cy.get('[data-cy=why-this-matters]').contains('h2', 'Why this matters');

    cy.get('[data-cy=what-we-can-do]').contains('h2', 'What we can do');

    cy.get('[data-cy=topic-recommendation-table]').contains(
      'tr',
      'Recommendations',
    );
  });
});

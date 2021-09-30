/// <reference types="cypress" />

describe('Home page', () => {
  it('should successfully display text.', () => {
    // first visit the site
    cy.visit('');
    cy.get('.usa-nav__primary-item').first().should('have.text', 'Topics');

    cy.get('[data-cy=lg-feature-home]')
      .get('.usa-card__header')
      .first()
      .should('have.text', 'Full width feature');

    cy.get('[data-cy=topics-button-home]').should(
      'have.text',
      'View all Topics',
    );

    cy.get('[data-cy=mission-hero-home]')
      .get('.mission-title')
      .should('have.text', 'Our mission');
  });
});

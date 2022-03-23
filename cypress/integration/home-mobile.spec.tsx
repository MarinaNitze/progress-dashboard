/// <reference types="cypress" />

describe('Mobile header', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(320, 480);
    cy.viewport('iphone-5');
  });

  it('should navigate through menu nav links area', () => {
    cy.get('[data-cy=cwp-header-menu-button-image-wrapper]').should(
      'have.not.class',
      'close',
    );

    cy.get('[data-cy=cwp-header]')
      .get('[data-cy=cwp-header-menu-button]')
      .click();

    cy.get('[data-cy=cwp-header-menu-button-image-wrapper]').should(
      'have.class',
      'close',
    );

    cy.get('[data-cy=cwp-menu-title]').should(
      'have.text',
      'child welfare playbook',
    );

    cy.get('[data-cy=cwp-nav-topic-link]').should('have.text', 'Topics');

    cy.get('[data-cy=cwp-nav-recommendation-link]').should(
      'have.text',
      'Recommendations',
    );

    cy.get('[data-cy=cwp-nav-compare-link]').should('have.text', 'Compare');

    cy.get('[data-cy=cwp-header]')
      .get('[data-cy=cwp-header-menu-button]')
      .click();
  });

  it('should navigate through search nav area', () => {
    // data-testid is the built in e2e attribute from uswds. Was not able to custom include our
    // own data-cy attribute
    cy.get('[data-testid=navMenuButton]').then(buttons => {
      buttons[1].click();
      cy.get('[data-testid=textInput]')
        .invoke('attr', 'placeholder')
        .should('contain', 'Search the playbook')
        .then(() => {
          buttons[1].click();
        });
    });
  });
});

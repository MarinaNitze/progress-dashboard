/// <reference types="cypress" />

it('viewport test', () => {
  cy.visit('/');
  cy.viewport(320, 480);
  cy.viewport('iphone-5');

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
});

// https://github.com/bahmutov/next-and-cypress-example/blob/master/cypress/integration/spec.js
/// <reference types="Cypress" />

describe('Dashboard', () => {
  before(() => {
    cy.visit('/');
  });

  it('should render.', () => {
    cy.contains('h6', 'Rustic Medico');
  });
});

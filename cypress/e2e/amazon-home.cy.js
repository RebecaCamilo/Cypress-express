/// <reference types="cypress" />

import {faker} from '@faker-js/faker';

describe("home", () => {
    it("should search for an item", () => {
      var productName = faker.commerce.product();

        cy.visit("https://www.amazon.com/");

        cy.get('input[aria-label="Search Amazon"]')
          .type(productName);

        cy.get('#nav-search-submit-button').click();

        cy.contains('div[data-index]', productName).should('be.visible');
    });
});

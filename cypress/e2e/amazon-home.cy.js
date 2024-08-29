/// <reference types="cypress" />

import {faker} from '@faker-js/faker';

describe("home", () => {
    it("should search for an item", () => {
        cy.visit("https://www.amazon.com/");

        cy.get('input[aria-label="Search Amazon"]')
          .type(faker.commerce.product());

        cy.get('#nav-search-submit-button').click();        
    });
});

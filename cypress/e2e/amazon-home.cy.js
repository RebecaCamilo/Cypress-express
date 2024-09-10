/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

describe("home", () => {
  it("should search for an item", () => {
    var productName = faker.commerce.product();

    cy.visit("https://www.amazon.com/");

    cy.get('input[aria-label="Search Amazon"]').type(productName);

    cy.get("#nav-search-submit-button").click();

    cy.contains("div[data-index]", productName).should("be.visible");

    var cont = 0;

    cy.get("div .s-result-list > div")
      .each(($row) => {
        // Dentro de cada linha, encontra o h2 e então o span
        const productName = $row.find("h2 span").text().toLowerCase();

        // Verifica se o span é visível
        cy.wrap($row.find("h2 span")).should("be.visible"); //.title-recipe

        // Verifica se o texto do span contém "chair"
        if (productName.includes(productName)) {
          cont++;
        }
      })
      .then(() => {
        cy.log(`Total de itens com ${productName}: ` + cont);
      });
  });
});

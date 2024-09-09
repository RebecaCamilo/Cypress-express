/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

describe("home", () => {
  it("should search for an item", () => {
    var productName = faker.commerce.product();

    cy.visit("https://www.amazon.com/");

    cy.get('input[aria-label="Search Amazon"]').type(productName);

    cy.get("#nav-search-submit-button").click();

    cy.contains('div[data-index]', productName)
      .should('be.visible');

    var cont = 0;


//     cy.get('div .s-result-list').each(($row) => { //div[data-index][data-uuid]
// //se contiver h2 ????
//       if ($row.find('h2').eq(0).text() == 'Skate2.0') {
//         $row.find('td').eq(5).children('div').children('.btn-danger').console.log();
//       }
//     })

    cy.get('div .s-result-list > div').each(($row) => { 
      // Dentro de cada linha, encontra o h2 e então o span
      const productName = $row.find('h2 span').text().toLowerCase();
      
      // Verifica se o texto do span contém "chair"
      if (productName.includes(productName)) {
          cont++;
      }
  }).then(() => {
      cy.log(`Total de itens com ${productName}: ` + cont);
  });

    // Seleciona todos os produtos da lista e valida se o nome do produto está presente em cada um
    // cy.get("div[data-index]").should("have.length.greaterThan", 0); // Espera até que haja pelo menos um item na lista
    // cy.get("div[data-index]").each(($el) => {
    //   cy.wrap($el)
    //     .contains(productName, { timeout: 10000 })
    //     .should("be.visible");
        
    // });
  });
});

class AnazonHomePage {
  selectorsList() {
    return {
      baseUrl: 'https://www.amazon.com/',
      searchField: 'input[placeholder="Search Amazon"]',
      searchButton: "#nav-search-submit-button",
      listOfProducts: "div .s-result-list > div",
      singleProduct: '[data-cy="title-recipe"] > h2 > a > span'
    };
  }

  accessHomePage() {
    cy.visit(this.selectorsList().baseUrl);
  }

  searchProduct(productName) {
    cy.get(this.selectorsList().searchField).type(productName);
    cy.get(this.selectorsList().searchButton).click();
  }

  verifyListOfProduct(productName) {
    cy.get(this.selectorsList().listOfProducts).each(($row) => {
      // Dentro de cada linha, encontra o [data-cy="title-recipe"] > h2 > a > span
      const productText = $row.find(this.selectorsList().singleProduct).text();

      // Verifica se o productText tem conteúdo
      if (productText.trim().length > 0) {
        // Se tiver texto, deve conter o productName
        cy.wrap($row.find(this.selectorsList().singleProduct)).should("include.text", productName);
      }
    });
  }
  
}

export default AnazonHomePage

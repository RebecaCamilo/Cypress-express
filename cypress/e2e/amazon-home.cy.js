/// <reference types="cypress" />

import { faker } from "@faker-js/faker";
import AmazonHomePage from "../pages/amazonHomePage"

const amazonHomePage = new AmazonHomePage();

describe("home", () => {
  it("should search for an item", () => {
    var productName = faker.commerce.product();
    amazonHomePage.accessHomePage();
    amazonHomePage.searchProduct(productName);
    amazonHomePage.verifyListOfProduct(productName);
  });
});

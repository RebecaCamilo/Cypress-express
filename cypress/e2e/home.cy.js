import home from "../fixtures/home.json"

describe('home', () => {
  it('webapp should be online', () => {
    cy.visit('http://localhost:3000')

    cy.title('eq', home.title)
  })
})
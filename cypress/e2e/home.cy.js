import home from "../fixtures/home.json"

describe('home', () => {
  it('webapp should be online', () => {
    cy.visit('/')

    cy.title('eq', home.title)
  })
})
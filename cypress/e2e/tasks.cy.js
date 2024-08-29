/// <reference types="cypress" />

describe("tasks", () => {
    it("deve cadastrar uma nova tarefa", () => {
        cy.visit("http://localhost:3000");

        cy.get('input[placeholder="Add a new Task"]')
          .type("Walk the dogs");

        //xpath: '//button[contains(text(), "Create")]'
        cy.contains('button', 'Create').click();
        
    });
});

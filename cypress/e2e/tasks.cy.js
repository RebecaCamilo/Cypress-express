/// <reference types="cypress" />

describe("tasks", () => {
  it("deve cadastrar uma nova tarefa", () => {
    var taskDescription = "Walk the dog";

    cy.request({
      url: "http://localhost:3333/helper/tasks/",
      method: "DELETE",
      body: { name: taskDescription },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
    cy.visit("http://localhost:3000");

    cy.get('input[placeholder="Add a new Task"]').type(taskDescription);

    //xpath: '//button[contains(text(), "Create")]'
    cy.contains("button", "Create").click();

    cy.contains('main p', taskDescription).should('be.visible');
  });
});

/// <reference types="cypress" />

describe("tasks", () => {
  it("deve cadastrar uma nova tarefa", () => {
    const taskDescription = "Walk the dog";

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

  it("não deve permitir tarefa duplicada", () => {
    const task = {
      name: 'Estudar inglês', 
      is_done: false
    };

    cy.request({
      url: "http://localhost:3333/helper/tasks/",
      method: "DELETE",
      body: { name: task.name },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });''

    cy.request({
      url: "http://localhost:3333/tasks/",
      method: "POST",
      body: task,
    }).then(response => {
      expect(response.status).to.eq(201);
    });

    cy.visit("http://localhost:3000");

    // cy.get('input[placeholder="Add a new Task"]').type(taskDescription);    
    // cy.contains("button", "Create").click();

    cy.get('input[placeholder="Add a new Task"]').type(task.name);    
    cy.contains("button", "Create").click();

    cy.get('.swal2-html-container')
      .should('be.visible')
      .should('have.text', 'Task already exists!');
  });
});

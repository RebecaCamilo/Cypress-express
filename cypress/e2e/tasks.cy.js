/// <reference types="cypress" />

describe("tasks", () => {
  it("deve cadastrar uma nova tarefa", () => {
    const taskDescription = "Walk the dog";

    cy.removeTaskByDescription(taskDescription);

    cy.createTask(taskDescription);

    cy.contains('main p', taskDescription).should('be.visible');
  });

  it("não deve permitir tarefa duplicada", () => {
    const task = {
      name: 'Estudar inglês', 
      is_done: false
    };

    cy.removeTaskByDescription(task.name);

    cy.postTask(task);

    cy.createTask(task.name);

    cy.get('.swal2-html-container')
      .should('be.visible')
      .should('have.text', 'Task already exists!');
  });
});

Cypress.Commands.add('createTask', (taskDescription) => {
  cy.visit("http://localhost:3000");

    cy.get('input[placeholder="Add a new Task"]').type(taskDescription);

    //xpath: '//button[contains(text(), "Create")]'
    cy.contains("button", "Create").click();
});

Cypress.Commands.add('removeTaskByDescription', (taskDescription, status) => {
  cy.request({
    url: "http://localhost:3333/helper/tasks/",
    method: "DELETE",
    body: { name: taskDescription },
  }).then((response) => {
    expect(response.status).to.eq(204);
  });
});

Cypress.Commands.add('postTask', (task) => {
  cy.request({
      url: "http://localhost:3333/tasks/",
      method: "POST",
      body: task,
    }).then(response => {
      expect(response.status).to.eq(201);
    });
});

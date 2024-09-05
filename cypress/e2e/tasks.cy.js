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

  it.only("não deve permitir tarefa vazia", () => {
    
    cy.createTask();

  });

});

/// <reference types="cypress" />

describe("tasks", () => {

  let testData;

  before(() => {
    cy.fixture('tasks').then(t => {
      testData = t;
    })
  })

  context('cadastro', () => {
    it("deve cadastrar uma nova tarefa", () => {
      const taskDescription = "Walk the dog";
  
      cy.removeTaskByDescription(taskDescription);
      cy.createTask(taskDescription);
  
      cy.contains('main p', taskDescription)
        .should('be.visible');
    });
  
    it("não deve permitir tarefa duplicada", () => {
      const task = testData.dup
  
      cy.removeTaskByDescription(task.name);
      cy.postTask(task);
      cy.createTask(task.name);
  
      cy.get('.swal2-html-container')
        .should('be.visible')
        .should('have.text', 'Task already exists!');
    });
  
    it("não deve permitir tarefa vazia", () => {      
      cy.createTask();
      cy.isRequired('This is a required field');
    });
  })

  context("atualização", () => {
    it("deve marcar tarefa como concluída", () => {
      const task = {
        name: 'estudar automação', 
        is_done: false
      };

      cy.removeTaskByDescription(task.name);
      cy.postTask(task);

      cy.visit("/");
      
      cy.contains('p', task.name)
        .parent()
        .find('button[class*=ItemToggle]')
        .click();
      
      cy.contains('p', task.name)
        .should('have.css', 'text-decoration-line', 'line-through');
    })
  })

  context("exclusão", () => {
    it("deve remover uma tarefa", () => {
      const task = {
        name: 'Estudar javascript', 
        is_done: false
      };
      
      cy.removeTaskByDescription(task.name);
      cy.postTask(task);

      cy.visit("/");
      
      cy.contains('p', task.name)
        .parent()
        .find('button[class*=ItemDelete]')
        .click();
      
      cy.contains('p', task.name)
        .should('not.exist');
    })
  })
});

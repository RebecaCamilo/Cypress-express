// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('createTask', (taskDescription = '') => {
    cy.visit("http://localhost:3000");

    if(taskDescription !== '') {
      cy.get('input[placeholder="Add a new Task"]').type(taskDescription);
    }

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

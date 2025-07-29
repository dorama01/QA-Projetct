class TodoPage {
  enterNewTodo(text) {
    cy.get('input[placeholder="New todo"]').type(text);
  }

  addTodo() {
    cy.contains('Add').click();
  }

  editTodo(oldText, newText) {
    cy.contains('li', oldText).within(() => {
      cy.contains('Edit').click();
    });
    cy.get('input[name="editItem"]').clear().type(newText);
    cy.contains('Save').click();
  }

  deleteTodo(text) {
  cy.get('li').contains(text).parents('li').within(() => {
    cy.contains('Delete').click();
  });
  cy.get('ul').should('not.contain.text', text);
}


  assertTodoExists(text) {
    cy.contains(text).should('exist');
  }

  assertTodoNotExists(text) {
    cy.contains(text).should('not.exist');
  }
}

export default new TodoPage();

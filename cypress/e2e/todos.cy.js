import LoginPage from '../pages/LoginPage';
import TodoPage from '../pages/TodoPage';

describe('Todo Functional Tests', () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login('test@example.com', '1234');
  });

  it('Create todo', () => {
    TodoPage.enterNewTodo('Buy Milk');
    TodoPage.addTodo();
    TodoPage.assertTodoExists('Buy Milk');
  });

  it('Edit todo', () => {
    TodoPage.enterNewTodo('Old Todo');
    TodoPage.addTodo();
    TodoPage.editTodo('Old Todo', 'Updated Todo');
    TodoPage.assertTodoExists('Updated Todo');
  });

  it('Delete todo', () => {
    TodoPage.enterNewTodo('test');
    TodoPage.addTodo();
    TodoPage.deleteTodo('test');
    TodoPage.assertTodoNotExists('test');
  });
});

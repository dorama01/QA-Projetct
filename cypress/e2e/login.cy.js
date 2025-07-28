import LoginPage from '../pages/LoginPage';

describe('Login Tests', () => {
  it('Valid credentials', () => {
    LoginPage.visit();
    LoginPage.login('test@example.com', '1234');
    cy.contains('Todo List');
  });

  it('Invalid credentials', () => {
    LoginPage.visit();
    LoginPage.login('wrong@example.com', 'wrong');
    cy.on('window:alert', txt => expect(txt).to.contains('Login failed'));
  });
});
class LoginPage {
  visit() {
    cy.visit('http://localhost:3002');
  }
  fillEmail(email) {
    cy.get('input[name=email]').type(email);
  }
  fillPassword(password) {
    cy.get('input[name=password]').type(password);
  }
  submit() {
    cy.get('button[type=submit]').click();
  }
  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }
}
export default new LoginPage();
describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  // El formulario se renderice
  it("renders the login form", () => {
    cy.contains("Iniciar sesión").should("exist");
    cy.get('[data-testid="email-input"]').should("exist");
    cy.get('[data-testid="password-input"]').should("exist");
    cy.get('[data-testid="login-button"]').should("exist");
  });

  // Simula inicio de sesion
  it("logs in successfully with valid credentials", () => {
    cy.get('[data-testid="email-input"]').type("user@example.com");
    cy.get('[data-testid="password-input"]').type("securepassword");
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="success-message"]').should(
      "contain",
      "¡Inicio de sesión exitoso!"
    );
  });

  // Simula cierre de sesion
  it("logs out successfully", () => {
    cy.get('[data-testid="email-input"]').type("user@example.com");
    cy.get('[data-testid="password-input"]').type("securepassword");
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="logout-button"]').click();

    cy.get('[data-testid="login-button"]').should("exist");
  });
});

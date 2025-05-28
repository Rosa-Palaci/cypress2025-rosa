describe("Form Page", () => {
  beforeEach(() => {
    cy.visit("/form");
  });

  // Verifica que el formulario se renderice correctamente
  it("renders form fields and labels", () => {
    cy.contains("Agregar una Película").should("exist");

    cy.get('[data-testid="test-form-name-label"]').should("contain", "Título");
    cy.get('[data-testid="test-title-form"]').should("exist");

    cy.get('[data-testid="test-form-release-label"]').should(
      "contain",
      "Fecha de estreno"
    );
    cy.get('[data-testid="test-form-release-date"]').should("exist");

    cy.get('[data-testid="test-form-message-label"]').should(
      "contain",
      "Género"
    );
    cy.get('[data-testid="test-form-message-input"]').should("exist");

    cy.get('[data-testid="test-form-overview-input"]').should("exist");

    cy.get('[data-testid="test-submit-button"]').should("contain", "Enviar");
  });

  // Enviar el formulario correctamente
  it("validates and submits the form successfully", () => {
    cy.get('[data-testid="test-title-form"]').type("Rosa");
    cy.get('[data-testid="test-form-release-date"]').type("2025-05-27");

    cy.get('[data-testid="test-form-message-input"]').click();
    cy.get('div[role="option"]').contains("Acción").click({ force: true });

    cy.get('[data-testid="test-form-overview-input"]').type(
      "Película de prueba."
    );

    cy.get('[data-testid="test-submit-button"]').click();

    cy.get('[data-testid="success-message"]', { timeout: 10000 }).should(
      "contain",
      "Película enviada exitosamente"
    );

    cy.get('[data-testid="add-another-button"]').should(
      "contain",
      "Agregar otra película"
    );
  });

  // Mostrar error si faltan campos requeridos
  it("shows error when required fields are missing", () => {
    cy.get('[data-testid="test-submit-button"]').click();
    cy.get('[data-testid="form-error"]').should(
      "contain",
      "Por favor completa todos los campos."
    );
  });
});

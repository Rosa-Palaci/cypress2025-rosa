describe("Interactions Page", () => {
  beforeEach(() => {
    cy.visit("/interactions");
  });

  // Simula escritura en un campo de texto
  it("simulates typing interaction", () => {
    cy.get('[data-testid="input-texto"]').type("Cypress test");
    cy.get('[data-testid="texto-escrito"]').should("contain", "Cypress test");
  });

  // Simula encender el switch y verifica estado
  it("simulates switch interaction", () => {
    cy.get('[data-testid="switch-modo"]').click();
    cy.get('[data-testid="estado-switch"]').should("contain", "Activado");
  });

  // Marca tarea como completada y verifica el tachado
  it("simulates checkbox/task interaction", () => {
    cy.get('[data-testid="boton-completar-tarea"]').click();
    cy.get('[data-testid="tarea"] p').should("have.class", "line-through");
  });

  // Simula doble clic y muestra confirmación
  it("simulates double click interaction", () => {
    cy.get('[data-testid="boton-doble-click"]').dblclick();
    cy.get('[data-testid="doble-click-confirmado"]').should("exist");
  });

  // Incrementa el contador
  it("simulates counter interaction", () => {
    cy.get('[data-testid="boton-incrementar"]').click();
    cy.get('[data-testid="contador-valor"]').should("contain", "1");
  });

  // Muestra y oculta texto con toggle
  it("simulates show/hide text", () => {
    cy.get('[data-testid="boton-toggle-texto"]').click();
    cy.get('[data-testid="texto-visible"]').should("exist");
    cy.get('[data-testid="boton-toggle-texto"]').click();
    cy.get('[data-testid="texto-visible"]').should("not.exist");
  });
});

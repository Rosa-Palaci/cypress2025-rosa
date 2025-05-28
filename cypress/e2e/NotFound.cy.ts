describe("Página 404", () => {
  beforeEach(() => {
    cy.visit("/inexistente", { failOnStatusCode: false });
  });

  // Renderiza el titulo y descripcion de la pagina 404
  it("muestra el mensaje de página no encontrada", () => {
    cy.get('[data-testid="notfound-title"]').should(
      "contain",
      "404 - Página no encontrada"
    );
    cy.get('[data-testid="notfound-description"]').should(
      "contain",
      "Lo sentimos, no pudimos encontrar la página que estás buscando."
    );
  });

  // El boton redirige al home
  it("redirige al inicio al hacer clic en 'Volver al inicio'", () => {
    cy.get('[data-testid="go-home"]').click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});

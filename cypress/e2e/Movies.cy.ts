describe("Movies Page", () => {
  beforeEach(() => {
    cy.visit("/movies"); // visite la pagina movies
  });

  // Verifica que se rendericen las películas en tendencia del día
  it("renders trending movies of the day", () => {
    cy.get('[data-testid="test-hoy"]')
      .should("have.attr", "data-state", "active")
      .and("contain", "Hoy");

    cy.get('[data-testid="test-movie-card"]').should(
      "have.length.greaterThan",
      0
    );
  });

  // Verifica que al hacer clic en "Esta semana" cambien las peliculas en tendencia
  it("renders switch to weekly trending movies", () => {
    cy.get('[data-testid="test-semana"]')
      .should("contain", "Esta Semana")
      .click();

    cy.get('[data-testid="test-semana"]').should(
      "have.attr",
      "data-state",
      "active"
    );

    cy.get('[data-testid="test-movie-card"]').should(
      "have.length.greaterThan",
      0
    );
  });

  // Verifica que la busqueda de peliculas funcione correctamente
  it("shows search results", () => {
    cy.get('[data-testid="test-search-input"]')
      .should(
        "have.attr",
        "placeholder",
        "Buscar película, programa o persona..."
      )
      .type("Spider");

    cy.get('[data-testid="test-search-button"]')
      .should("contain", "Buscar")
      .click();

    cy.contains("Spider").should("exist");
  });
});

describe("Home tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("renders the homepage title and description", () => {
    cy.get('[data-testid="homepage-title"]').should(
      "contain",
      "Bienvenido al sitio de pruebas"
    );
    cy.get('[data-testid="homepage-description"]').should(
      "contain",
      "Esta aplicación contiene varias páginas"
    );
  });
  it("shows navigations cards with correct links", () => {
    cy.get('[data-testid="nav-cards"] > div').should("have.length", 4);

    cy.get('[data-testid="go-to-movies"]')
      .should("contain", "Ir a Películas")
      .click();
    cy.url().should("contain", "/movies");
    cy.go("back");

    //Form
    cy.get('[data-testid="go-to-form"]')
      .should("contain", "Ir al Formulario")
      .click();
    cy.url().should("contain", "/form");
    cy.go("back");

    //Interactions
    cy.get('[data-testid="go-to-interactions"]')
      .should("contain", "Ir a Interacciones")
      .click();
    cy.url().should("contain", "/interactions");
    cy.go("back");

    //Not found
    cy.get('[data-testid="go-to-404"]').should("contain", "Ir a 404").click();
    cy.url().should("contain", "/lo-que-sea");
    cy.go("back");
  });
});

//Header
describe("Header Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should render the header", () => {
    cy.get('[data-testid="header"]').should("exist");
    cy.contains("Cypress Test");
  });

  it("should show nav links on desktop", () => {
    cy.viewport(1024, 768);
    cy.get('[data-testid="nav-desktop"]').should("be.visible");

    const navLabels = ["Inicio", "Películas", "Interacciones", "404"];

    navLabels.forEach((label) => {
      cy.get('[data-testid="nav-desktop"]')
        .contains(label)
        .should("have.attr", "href");
    });
  });
});

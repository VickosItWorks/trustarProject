export class HomePage {
  doProjectSearch(projectName) {
    cy.get(".searchQuery").type(`${projectName}{enter}`);
  }
}

export const onHomePage = new HomePage();

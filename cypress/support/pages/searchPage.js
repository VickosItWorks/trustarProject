export class SearchPage {
  checkProjectAmount(amount) {
    cy.get("div.data-count").then((element) => {
      expect(element).to.have.prop("innerText", amount);
    });
  }

  checkProjectList(matchType, number) {
    matchType = matchType === "exact" ? "eq" : "be.gt";
    cy.get("div.box.search-result").its("length").should(matchType, number);
  }
}

export const onSearchPage = new SearchPage();

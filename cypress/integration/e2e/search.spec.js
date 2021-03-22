/// <reference types="cypress" />
import { onHomePage } from "../../support/pages/homePage";
import { onSearchPage } from "../../support/pages/searchPage";
const cases = require("../../support/e2eCases/searchCases");

describe("Use the search engine", () => {
  beforeEach(() => {
    cy.visit("/home");
  });
  it("Search a Specific Term", () => {
    onHomePage.doProjectSearch(cases.exactMatch.term);
    onSearchPage.checkProjectAmount(`${cases.exactMatch.matchingNumber}`);
    onSearchPage.checkProjectList(
      cases.exactMatch.matchType,
      cases.exactMatch.matchingNumber
    );
  });

  it("Search a Term With Multiple Results", () => {
    onHomePage.doProjectSearch(cases.aproxMatch.term);
    onSearchPage.checkProjectList(
      cases.aproxMatch.matchType,
      cases.aproxMatch.matchingNumber
    );
  });
});

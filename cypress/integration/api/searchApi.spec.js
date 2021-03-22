const cases = require("../../support/apiCases/searchApiCases");
const greatBenches = require("../../support/apiCases/searchApiCasesBench");

describe("TechPort Search API testing", () => {
  cases.success.forEach((testCase) => {
    it("Positive Test: " + testCase.testName, () => {
      cy.request({
        method: "GET",
        url: Cypress.env("apiBase") + Cypress.env("apiKey") + testCase.params,
      }).then((response) => {
        expect(response.status).to.equal(200);
        response.body.projects.forEach((uniqueProject, i) => {
          expect(uniqueProject.title).to.equal(
            testCase.bench.projects[i].title
          );
          expect(uniqueProject.id).to.equal(testCase.bench.projects[i].id);
          expect(uniqueProject.description).to.equal(
            testCase.bench.projects[i].description
          );
        });
      });
    });
  });

  cases.negative.forEach((testCase) => {
    it("Negative Test: " + testCase.testName, () => {
      cy.request({
        method: "GET",
        url: Cypress.env("apiBase") + Cypress.env("apiKey") + testCase.params,
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  });

  cases.errorCodes.forEach((testCase) => {
    it("Error Code Test: " + testCase.testName, () => {
      cy.request({
        method: testCase.method,
        url: Cypress.env("apiBase") + testCase.urlParams,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(testCase.statusCode);
      });
    });
  });
});

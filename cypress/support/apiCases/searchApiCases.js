const allBenchs = require("./searchApiCasesBench");

let cases = {};

cases.success = [
  {
    testName: "Search With Object ID Only",
    params: "&objectId=8137",
    bench: allBenchs.objectIdOnlyBench,
  },
  {
    testName: "Search by Known Mission Directorate",
    params: "&missionDirectorate=ARMD",
    bench: allBenchs.knownMissionDirectoryBench,
  },
  {
    testName: "Search Unique Known Term",
    params: "&searchQuery=DYNACULT",
    bench: allBenchs.uniqueTerm,
  },
  {
    testName: "Search Unique Term in Lowercase",
    params: "&searchQuery=dynacult",
    bench: allBenchs.uniqueTerm,
  },
  {
    testName: "Combine all 3 Params",
    params: "&missionDirectorate=SMD&objectId=94311&searchQuery=polarization",
    bench: allBenchs.allMatching,
  },
  {
    testName: "Known Project ID and Term",
    params: "&objectId=94311&searchQuery=polarization",
    bench: allBenchs.allMatching,
  },
  {
    testName: "Known Mission Directorate and Term: multiple Results",
    params: "&missionDirectorate=HEOMD&searchQuery=Atom",
    bench: allBenchs.knownMissionAndTerm,
  },
  {
    testName: "Known Project ID and Mission Directorate",
    params: "&missionDirectorate=SMD&objectId=94311",
    bench: allBenchs.allMatching,
  },
  {
    testName: "Search by Term multiple Results",
    params: "&searchQuery=Cytometer",
    bench: allBenchs.termMultipleResults,
  },
];

cases.negative = [
  {
    testName: "No Params",
    params: "",
  },
  {
    testName: "Empty Params",
    params: "&missionDirectorate=&objectId=&searchQuery=",
  },
  {
    testName: "Matching Project Id and Term, different Mission Directorate",
    params: "&objectId=94311&searchQuery=polarization&missionDirectorate=ARMD",
  },
  {
    testName: "Matching Project Id and Mission Directorate, different term",
    params: "&objectId=94311&searchQuery=DYNACULT&missionDirectorate=ARMD",
  },
  {
    testName: "Matching Term and Mission Directorate, different Project Id",
    params: "&objectId=93223&searchQuery=DYNACULT&missionDirectorate=ARMD",
  },
  {
    testName: "LowerCase for MissionDirectorate",
    params: "&missionDirectorate=armd",
  },
  {
    testName: "Multiple Valid Object IDs",
    params: "&objectId=93223 96547",
  },
  {
    testName: "Include Letters With ObjectID",
    params: "&objectId=93223ab",
  },
  {
    testName: "Request Duplicating ObjectID ",
    params: "&objectId=93223&objectId=93142",
  },
  {
    testName: "Request Duplicating SearchQuery ",
    params:
      "&missionDirectorate=SMD&searchQuery=polarization&searchQuery=Balloon",
  },
];

cases.errorCodes = [
  {
    testName: "Request Should Not Be Allowed",
    method: "PUT",
    urlParams:
      Cypress.env("apiKey") +
      "&missionDirectorate=SMD&searchQuery=polarization",
    statusCode: 405,
  },
  {
    testName: "Request Should Not Be Authorized",
    method: "POST",
    urlParams:
      Cypress.env("apiKey") +
      "&missionDirectorate=SMD&searchQuery=polarization",
    statusCode: 401,
  },
  {
    testName: "Request With Wrong Path ",
    method: "GET",
    urlParams:
      "/search" +
      Cypress.env("apiKey") +
      "&missionDirectorate=SMD&searchQuery=polarization",
    statusCode: 404,
  },
  {
    testName: "Request With Wrong Key ",
    method: "GET",
    urlParams:
      "?api_key=anykey&missionDirectorate=SMD&searchQuery=polarization",
    statusCode: 403,
  },
  {
    testName: "Request With Missing Key ",
    method: "GET",
    urlParams: "?missionDirectorate=SMD&searchQuery=polarization",
    statusCode: 403,
  },
  {
    testName: "Request Duplicating Mission Directorate ",
    method: "GET",
    urlParams:
      Cypress.env("apiKey") + "&missionDirectorate=SMD&missionDirectorate=SMD",
    statusCode: 400,
  },
  {
    testName: "Request Adding Multiple Mission Directorates in the same Param",
    method: "GET",
    urlParams: Cypress.env("apiKey") + "&missionDirectorate=AMS HEOMD",
    statusCode: 400,
  },
];

module.exports = cases;

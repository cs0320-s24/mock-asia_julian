import {
  MOCK_CSV_1,
  MOCK_CSV_2,
  MOCK_CSV_MALFORMED,
  MOCK_CSV_SEARCH_NO_HEADERS,
  MOCK_CSV_UNFOUND_VALUE,
} from "./Constants";

export function loadCSVs() {
  const myCSVs = new Map();

  myCSVs.set("partners.csv", MOCK_CSV_1);

  myCSVs.set("children.csv", MOCK_CSV_2);
  myCSVs.set("malformed.csv", MOCK_CSV_MALFORMED);

  return myCSVs;
}

export function searchCSVs() {
  const myCSVs = new Map();
  myCSVs.set("rowWithoutHeaders.csv", MOCK_CSV_SEARCH_NO_HEADERS);

  myCSVs.set("unfoundValue.csv", MOCK_CSV_UNFOUND_VALUE);

  return myCSVs;
}

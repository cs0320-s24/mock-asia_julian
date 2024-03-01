import {
  MOCK_CSV_1,
  MOCK_CSV_2,
  MOCK_CSV_MALFORMED,
  MOCK_CSV_SEARCH_NO_HEADERS,
  MOCK_CSV_UNFOUND_VALUE,
} from "./Constants";

/**
 * A class that sets mocked CSVs to their data.
 * 
 * @returns a map of the CSVs and their data.
 */

/**
 * A function that creates a map for the loaded CSVs.
 * 
 * @returns the map with the loaded CSVs and their data.
 */
export function loadCSVs() {
  const myCSVs = new Map();

  myCSVs.set("partners.csv", MOCK_CSV_1);

  myCSVs.set("children.csv", MOCK_CSV_2);

  myCSVs.set("malformed.csv", MOCK_CSV_MALFORMED);

  return myCSVs;
}

/**
 * A function that creates a map for the results of search.
 * 
 * @returns the map with the search results and their data.
 */
export function searchCSVs() {
  const myCSVs = new Map();

  myCSVs.set("rowWithoutHeaders.csv", MOCK_CSV_SEARCH_NO_HEADERS);

  myCSVs.set("unfoundValue.csv", MOCK_CSV_UNFOUND_VALUE);

  return myCSVs;
}

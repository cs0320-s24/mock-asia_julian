import {
  MOCK_CSV_1,
  MOCK_CSV_2,
  MOCK_CSV_3,
  MOCK_CSV_4,
  MOCK_CSV_EMPTY,
  MOCK_CSV_MALFORMED,
  MOCK_CSV_SEARCH_HEADERS,
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

  myCSVs.set("numbers.csv", MOCK_CSV_3);

  myCSVs.set("malformed.csv", MOCK_CSV_MALFORMED);

  myCSVs.set("empty.csv", MOCK_CSV_EMPTY);

  myCSVs.set("withHeaders.csv", MOCK_CSV_4);

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

  myCSVs.set("withHeaders.csv", MOCK_CSV_SEARCH_HEADERS);

  return myCSVs;
}

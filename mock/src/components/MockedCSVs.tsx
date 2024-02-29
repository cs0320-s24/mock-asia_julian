import { MOCK_CSV_1, MOCK_CSV_2 } from "./Constants";

export function loadCSVs() {
    const myCSVs = new Map();

    myCSVs.set("partners.csv", MOCK_CSV_1);

    myCSVs.set("children.csv", MOCK_CSV_2);

    return myCSVs;
}

export function searchCSVs() {
    const myCSVs = new Map();
    myCSVs.set("rowWithoutHeaders.csv", [
      ["Julian", "Yellow", "Monkey", "Bananas"]]);

    //  myCSVs.set("rowWithoutHeaders.csv", MOCK_CSV_2);

    myCSVs.set("unfoundValue.csv", "Could not find specified value.");

    myCSVs.set("malformed.csv", "");
    return myCSVs;
}
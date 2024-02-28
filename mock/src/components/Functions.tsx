import { MOCK_CSV_1 } from "./Constants";
import { REPLFunction } from "./REPLFunction";

export const loadFunction: REPLFunction = (args: string[]) => {
    return "The file " + args[1] + " was loaded!";
}

export const viewFunction: REPLFunction = (args: string[]) => {
    const myCSVs : { [key: string]: string[][] } = {
        "partners.csv": MOCK_CSV_1
    }
    
    return myCSVs["partners.csv"];
}

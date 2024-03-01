import { MOCK_CSV_1, MOCK_CSV_2 } from "../MockedData/Constants";
import { REPLFunction } from "../REPLClasses/REPLFunction";
import { loadCSVs, searchCSVs } from "../MockedData/MockedCSVs";
import { useState } from "react";
import { useEffect } from "react";

/**
 * A class that includes all the built in functions.
 * @returns a map that maps the name of the function to the function itself.
 */
export function Functions() {
  const [file, setFile] = useState<string>("");
  const myFunction = new Map();
  const loadCSV = loadCSVs();
  const searchCSV = searchCSVs();

  /**
   * A function that handles loading files.
   * @param args the file name.
   * @returns a success or error message.
   */
  const loadFunction: REPLFunction = (args: string[]) => {
    if (loadCSV.get(args[0]) != undefined) {
      setFile(args[0]);
      return "The file " + [args[0]] + " was loaded!";
    } else {
      return "Invalid file.";
    }
  };

/**
 * A function that handles viewing the file that was previously loaded.
 * @param args arguments to the function, for view specifically there are none.
 * @returns an error message or the file to be viewed.
 */
  const viewFunction: REPLFunction = (args: string[]) => {
    if (file == undefined) {
      return "File was not loaded";
    } else {
      return loadCSV.get(file);
    }
  };

  /**
   * A function that handles searching through a file for a specified value.
   * @param args the value to be searched for and/or the column to search through.
   * @returns the appropriate error message or the row with the value.
   */
  const searchFunction: REPLFunction = (args: string[]) => {
    if (args[0] == undefined) { //no value
      return "Value was not specified";
    } else {
      if (args[1] == undefined) { //no header
        if (args[0] == "unfoundValue") {
          return searchCSV.get("unfoundValue.csv");
        } else if (file == "malformed.csv") {
          return "Unable to search due to malformed rows.";
        } else {
          return searchCSV.get("rowWithoutHeaders.csv");
        }
      } else { //header
        if (parseInt(args[1]) < 0 || parseInt(args[1]) > loadCSV.get(file)[0].length) { //check range
          return "Column is out of range.";
        } else {
          return searchCSV.get("rowWithoutHeaders.csv");
        }
      }
    }
  };

  myFunction.set("load", loadFunction);
  myFunction.set("view", viewFunction);
  myFunction.set("search", searchFunction);

  return myFunction;
}

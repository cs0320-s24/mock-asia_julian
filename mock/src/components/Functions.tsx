import { MOCK_CSV_1, MOCK_CSV_2 } from "./Constants";
import { REPLFunction } from "./REPLFunction";
import { loadCSVs, searchCSVs } from "./MockedCSVs";
import { useState } from "react";
import { useEffect } from "react";

export function Functions() {
  const [file, setFile] = useState<string>("");
  const myFunction = new Map();
  const loadCSV = loadCSVs();
  const searchCSV = searchCSVs();

  const loadFunction: REPLFunction = (args: string[]) => {
    if (loadCSV.get(args[0]) != undefined) {
      setFile(args[0]);
      return "The file " + [args[0]] + " was loaded!";
    } else {
      return "Invalid file.";
    }
  };

  const viewFunction: REPLFunction = (args: string[]) => {
    if (file == undefined) {
      return "File was not loaded";
    } else {
      return loadCSV.get(file);
    }
  };

  const searchFunction: REPLFunction = (args: string[]) => {
    if (args[0] == undefined) {
      return "Value was not specified";
    } else {
      if (args[1] == undefined) {//no header
        return searchCSV.get("rowWithoutHeaders.csv");
      } else {
        return searchCSV.get("rowWithoutHeaders.csv");
      }
    }
  };

  myFunction.set("load", loadFunction);
  myFunction.set("view", viewFunction);
  myFunction.set("search", searchFunction);

  return myFunction;
}
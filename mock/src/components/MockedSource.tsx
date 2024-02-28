import "../styles/main.css";
import { useState } from "react";
import { MOCK_CSV_1 } from "./Constants";

interface MockedProps {
    command: string[];
}

export function MockedSource(props: MockedProps) {
    const myDict: { [key: string]: any } = {
        "partners.csv": MOCK_CSV_1,
      };

    const [currentCSV, setCurrentCSV] = useState<string[][]>();

    // commands[0] contains a string like "load csv.csv"
    function parseCommand(){

    }

    if (props.command[0] == "load") {
        //setCurrentCSV(myDict['partners.csv'])
        return (
            <text>Tried to load {props.command[1]} lowkey.</text>
            );
    }

    if (props.command[0] == "view") {
        return (
            <text>{MOCK_CSV_1}</text>
            );
    }

    else{
        return (
            <text>Tried to do something else lowkey.</text>
        );
    }
}
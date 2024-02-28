import "../styles/main.css";
import { useState } from "react";
import { MOCK_CSV_1 } from "./Constants";
import { REPLFunction } from "./REPLFunction";

interface MockedProps {
    command: string[];
    functions: {[key: string]: REPLFunction}
}

export function MockedSource(props: MockedProps) {
    const [currentCSV, setCurrentCSV] = useState<string[][]>();

    if (props.functions[props.command[0]] != null) {
        const result = props.functions[props.command[0]](props.command);

        if (typeof result === 'string') {
            return (
                <text>{result}</text>
                );
        }
        else {
            // it is an array of strings
            return (
                <text>A stylized array will go here!</text>
            );
        }
    }

    else{
        return (
            <text>Command not found.</text>
        );
    }
}
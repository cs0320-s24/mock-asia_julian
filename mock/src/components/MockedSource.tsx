import "../styles/main.css";
import { useState } from "react";
import { REPLFunction } from "./REPLFunction";

interface MockedProps {
    command: string[];
    functions: {[key: string]: REPLFunction}
}

export function MockedSource(props: MockedProps) {
    const [currentCSV, setCurrentCSV] = useState<string[][]>();

    if (props.functions[props.command[0]] != null) {

        if (typeof props.functions[props.command[0]](props.command) === 'string') {
            return (
                <div>
                <text>{props.functions[props.command[0]](props.command)}</text>
                </div>
                );
        }
        else {
            // it is an array of strings
            return (
                <div className="table-container">
                <table>
                    {(props.functions[props.command[0]](props.command) as string[][]).map((item) => (
                        <tr>
                            {item.map((datum) => (
                                <td>{datum}</td>
                            ))}
                        </tr>
                    ))}
                </table>
                </div>
            );
        }
    }

    else{
        return (
            <text>Command not found.</text>
        );
    }
}
import "../styles/main.css";
import { useState } from "react";
import { REPLFunction } from "./REPLFunction";

interface MockedProps {
  command: string;
  arguments: string | string[];
  functions: Map<string, REPLFunction>;
}

export function MockedSource(props: MockedProps) {
  if (props.functions.has(props.command)) {
    const myFunction = props.functions.get(props.command);
    if (myFunction != undefined) {
        const result = myFunction(props.arguments as string[]); 
        if (typeof result === "string") {
      return (
        <div>
          <text>{result}</text>
        </div>
      );
    } else {
        return (
          <div className="table-container">
            <table>
              {(
                result as string[][]).map((item) => (
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
}  else {
    return <text>Command not found.</text>;
  }
} else {
    return <text>Command not found.</text>;
}
}

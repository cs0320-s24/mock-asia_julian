import "../styles/main.css";
import { useState } from "react";
import { MockedSource } from "./MockedSource";
import { REPLFunction } from "./REPLFunction";

interface REPLHistoryProps {
  commands: string[][];
  mode: string;
  functions: {[key: string]: REPLFunction}
}
export function REPLHistory(props: REPLHistoryProps) {
  if (props.mode == "brief") {
    return (
      <div className="repl-history">
        {props.commands.map((item, index) => (
          <div>
            <MockedSource command={item} functions={props.functions}/>
          </div>
        ))}
      </div>
    );
  } else if (props.mode == "verbose") {
    return (
      <div className="repl-history">
        {props.commands.map((item, index) => (
          <div>
          <text className="history-item">
            Command: 
            {item.map((word, index) => (
              <text> {word}</text>
            ))}
            <br></br>
            Output:
            <br></br>
          </text>
          <MockedSource command={item} functions={props.functions}/>
          <text>------------------------</text>
          
          </div>
        ))}
      </div>
    );
  } else {
    return <div className="repl-history">Invalid mode: {props.mode}</div>;
  }
}

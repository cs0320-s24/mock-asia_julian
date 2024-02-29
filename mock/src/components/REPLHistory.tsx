import "../styles/main.css";
import { useState } from "react";

interface REPLHistoryProps {
  commands: string[][];
  mode: string;
}
export function REPLHistory(props: REPLHistoryProps) {

  
        if (props.mode == "brief") {
          return (
            <div className="repl-history">
              {props.commands.map((item, index) => (
                <text className="history-item">
                  {item[1]}
                  <br></br>
                </text>
              ))}
            </div>
          );
        } else if (props.mode == "verbose") {
          return (
            <div className="repl-history">
              {props.commands.map((item, index) => (
                <text className="history-item">
                  {item}
                  <br></br>
                </text>
              ))}
            </div>
          );
        } else {
          return <div className="repl-history">Invalid mode: {props.mode}</div>;
        }
    }

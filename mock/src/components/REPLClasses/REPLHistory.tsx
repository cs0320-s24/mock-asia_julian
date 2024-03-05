import "../../styles/main.css";
import { REPLFunction } from "./REPLFunction";

/**
 * A class that represents the REPL history.
 */

// Includes the commands and view mode.
interface REPLHistoryProps {
  commands: [string, string | string[][]][];
  mode: string;
}

/**
 * Handles the generation and formatting of the REPLHistory element which contains
 * the commands and their outputs.
 * 
 * @param props the commands list and view mode.
 * @returns the formatted history of commands and outputs in either verbose or brief mode.
 */
export function REPLHistory(props: REPLHistoryProps) {

  /**
   * A helper function that formats the result.
   * 
   * @param output the result of running a command.
   * @returns a formatted result based on if it is a string or an array of strings.
   */
  function result(output: string | string[][]) {
    if (typeof output === "string") { //string
      return output;
    } else { //array of strings
      return (
        <table className="table-container" aria-label="table">
          <tbody>
            {output.map((row) => (
              <tr>
                {row.map((col) => (
                  <td>{col}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }

  if (props.mode == "brief") { //brief mode
    return (
      <div className="repl-history" aria-label="history">
        {props.commands.map((item, index) => (
          <p> {result(item[1])} </p>
        ))}
      </div>
    );
  } else if (props.mode == "verbose") { //verbose mode
    return (
      <div className="repl-history" aria-label ="history">
        {props.commands.map((item, index) => (
          <p>
            <b>{"Command:"}</b> {item[0]} <br></br>
            <b>{"Output:"}</b> {result(item[1])}
          </p>
        ))}
      </div>
    );
  } else {
    return (
      <div className="repl-history" aria-label="history">
        Invalid mode: {props.mode}
      </div>
    );
  }
}

import "../../styles/main.css";
import { REPLFunction } from "./REPLFunction";

/**
 * A class that represents the REPL history.
 */

interface REPLHistoryProps {
  commands: [string, string | string[][]][];
  mode: string;
  functions: Map<string, REPLFunction>;
}

export function REPLHistory(props: REPLHistoryProps) {

  /**
   * A helper function that formats the result.
   * @param output the result of running a command.
   * @returns a formatted result based on if it is a string or an array of strings.
   */
  function result(output: string | string[][]) {
    if (typeof output === "string") { //string
      return output;
    } else { //array of strings
      return (
        <table className="table-container">
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
      <div className="repl-history">
        {props.commands.map((item, index) => (
          <p> {result(item[1])} </p>
        ))}
      </div>
    );
  } else if (props.mode == "verbose") { //verbose mode
    return (
      <div className="repl-history">
        {props.commands.map((item, index) => (
          <p>
            <b>{"Command:"}</b> {item[0]} <br></br>
            <b>{"Output:"}</b> {result(item[1])}
          </p>
        ))}
      </div>
    );
  } else {
    return <div className="repl-history">Invalid mode: {props.mode}</div>;
  }
}

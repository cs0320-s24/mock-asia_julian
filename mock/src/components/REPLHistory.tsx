import "../styles/main.css";
import { REPLFunction } from "./REPLFunction";

interface REPLHistoryProps {
  commands: [string, string | string[][]][];
  mode: string;
  functions: Map<string,REPLFunction>;

}
export function REPLHistory(props: REPLHistoryProps) {

    function result(output: string | string[][]) {
        if (typeof output === "string") {
            return (
                output
            );
        } else {
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

  if (props.mode == "brief") {
         return (
           <div className="repl-history">
             {props.commands.map((item, index) => (
               <p> {result(item[1])} </p>
             ))}
           </div>
         );
  } else if (props.mode == "verbose") {
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
    return (
        <div className="repl-history">
        Invalid mode: {props.mode}</div>
    );
  }
}

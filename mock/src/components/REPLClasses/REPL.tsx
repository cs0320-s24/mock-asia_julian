import { useState } from "react";
import "../../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { Functions } from "../BackendFunctionality/Functions";

/**
 * A top level class for the REPL component.
 * 
 * @returns the rendered and updated state for the web front-end.
 */
export default function REPL() {
  const [myCommands, setCommands] = useState<[string, string | string[][]][]>([]);
  const [mode, setMode] = useState<string>("brief");

  return (
    <div className="repl">
      <REPLHistory commands={myCommands} mode={mode}/>
      <div className="spacer"></div>
      <REPLInput
        commands={myCommands}
        setCommands={setCommands}
        mode={mode}
        setMode={setMode}
        addCommands={new Map<string, REPLFunction>}
        removeCommands={["bananas"]}
      />
    </div>
  );
}

import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { COMMAND_BOX_LEGEND, REPL_BOX_PROMPT } from "./Constants";


interface REPLInputProps {
  commands: string[][];
  setCommands: Dispatch<SetStateAction<string[][]>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");

  function setModeCommand(): string {
    if (commandString == "mode brief") {
      props.setMode("brief");
      return "mode succesfully changed to brief"
    }
    if (commandString == "mode verbose") {
      props.setMode("verbose");
      return "mode succesfully changed to verbose";
    } else {
      return "";
    }
  }

  function load() {
    const file = props.commands[0][1];
    return (
      <div className="repl-history">
        <text className="history-item">
          {commandString}
        </text>

      </div>
    )
    //get mapped dataset
  }

  function handleSubmit() {
    if (!isStringAllSpaces(commandString)) {
      const modeStatement = setModeCommand();
      const newList = [
        ...props.commands,
        ["command: " + "<" + commandString + ">", " <output>"]
      ];
      props.setCommands(newList);
      setCommandString("");
    }
  }
  /**
   * Function uses a regex to check if the string contains all spaces.
   *
   * @param str is the string to check.
   * @returns true if all spaces, false otherwise.
   */
  function isStringAllSpaces(str: string): boolean {
    // Use a regular expression to check if the string consists only of whitespace characters.
    return /^\s*$/.test(str);
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>{COMMAND_BOX_LEGEND}</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command Prompt"}
        />
      </fieldset>
      <div className="spacer">
      </div>
      <button onClick={handleSubmit}> Submit Command! </button>
    </div>
  );
}

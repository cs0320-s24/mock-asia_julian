import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { COMMAND_BOX_LEGEND, REPL_BOX_PROMPT } from "./Constants";

//2d array first array hold command: command second hold output only index into one or both for brief and verbose
interface REPLInputProps {
  commands: string[][];
  setCommands: Dispatch<SetStateAction<string[][]>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");

  function setModeCommand() {
    if (commandString == "mode brief") {
      props.setMode("brief");
    }
    if (commandString == "mode verbose") {
      props.setMode("verbose");
    }
  }

  function handleSubmit() {
    if (!isStringAllSpaces(commandString)) {
      setModeCommand();
      const newList = [
        ...props.commands,
        commandString.split(" ")];
      props.setCommands(newList);
      setCommandString("");
    }
  }
  /**
   * Function uses a regex to check if the string contains all spaces.
   *
   * Credit to ChatGPT.
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
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>{COMMAND_BOX_LEGEND}</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command Prompt"}
        />
      </fieldset>
      <div className="spacer"></div>
      <button onClick={handleSubmit}> Submit Command! </button>
    </div>
    
  );
}

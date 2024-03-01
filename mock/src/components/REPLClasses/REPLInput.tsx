import "../../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "../ControlledInput";
import { COMMAND_BOX_LEGEND, REPL_BOX_PROMPT } from "../MockedData/Constants";
import { Functions } from "../BackendFunctionality/Functions";

/**
 * A class that handles the REPL input.
 */
interface REPLInputProps {
  commands: [string, string | string[][]][];
  setCommands: Dispatch<SetStateAction<[string, string | string[][]][]>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  const functionMap = Functions();

  /**
   * A helper function that sets the mode variable.
   * @param mode the arguments of the command.
   * @returns true if it was changed to a valid mode, false otherwise.
   */
  function setModeCommand(mode: string[]): boolean {
    if (mode[0] == "brief") {
      props.setMode("brief");
      return true;
    }
    if (mode[0] == "verbose") {
      props.setMode("verbose");
      return true;
    }
    return false;
  }
  /**
   * A function that handles submitting commands.
   */
  function handleSubmit() {
    const commandInput = commandString.trim().split(" ");
    const command = commandInput[0];
    const commandArgs = commandInput.slice(1);

    if (command == undefined) {
      //put in an actual command
      props.setCommands([...props.commands, [command, "Invalid command"]]);
    } else {
      if (functionMap.get(command) != undefined) {
        //if the command exists in the function map
        const result = functionMap.get(command)(commandArgs);
        props.setCommands([...props.commands, [commandString.trim(), result]]);
      } else if (command == "mode") {
        //if the command was to change modes
        if (setModeCommand(commandArgs)) {
          props.setCommands([
            ...props.commands,
            [
              commandString.trim(),
              "Mode has been changed to " + commandArgs[0] + ".",
            ],
          ]);
        } else {
          props.setCommands([
            ...props.commands,
            [commandString.trim(), "Mode specified does not exist."],
          ]);
        }
      } else {
        //if the command isn't valid
        props.setCommands([
          ...props.commands,
          [commandString.trim(), "Command not found."],
        ]);
      }
    }
    setCommandString("");
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
      <div className="spacer"></div>
      <button aria-label={'Submit Command!'} onClick={handleSubmit}> Submit Command! </button>
    </div>
  );
}

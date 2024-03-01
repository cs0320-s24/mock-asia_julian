import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";
import { REPL_BOX_PROMPT } from "./MockedData/Constants";

/**
 * Contains the arguments for the input box element function.
 */
interface ControlledInputProps {
  value: string;
  
  // This type comes from React+TypeScript. VSCode can suggest these.
  // Concretely, this means "a function that sets a state containing a string"
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

/**
 * Input boxes contain state. We want to make sure React is managing that state,
 * so we have a special component that wraps the input box.
 * 
 * @param param0 the value input into the box and its setter, as well as the aria label.
 * @returns a formatted input element.
 */
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  return (
    <input
      type="text"
      className="repl-command-box"
      value={value}
      placeholder={REPL_BOX_PROMPT}
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
    ></input>
  );
}

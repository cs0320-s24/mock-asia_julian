import '../styles/main.css';
import { Dispatch, SetStateAction, useState} from 'react';
import { ControlledInput } from './ControlledInput';
import { COMMAND_BOX_LEGEND, REPL_BOX_PROMPT } from './Constants';

interface REPLInputProps{
  commands: string[];
  setCommands: Dispatch<SetStateAction<string[]>>
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props : REPLInputProps) {
    // Remember: let React manage state in your webapp. 
    // Manages the contents of the input box
    const [commandString, setCommandString] = useState<string>('');

    
    function handleSubmit(){
      if (!isStringAllSpaces(commandString)){
        const newList = [...props.commands, commandString];
        props.setCommands(newList);
        setCommandString("")
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
              <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={'Command Prompt'}/>
            </fieldset>
            <div className="spacer"></div>
            <button onClick={handleSubmit}> Submit Command! </button>
        </div>
    );
  }
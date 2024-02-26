import '../styles/main.css';
import { Dispatch, SetStateAction, useState} from 'react';
import { ControlledInput } from './ControlledInput';
import { COMMAND_BOX_LEGEND, REPL_BOX_PROMPT } from './Constants';

interface REPLInputProps{
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  commands: string[];
  setCommands: Dispatch<SetStateAction<string[]>>
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props : REPLInputProps) {
    // Remember: let React manage state in your webapp. 
    // Manages the contents of the input box
    const [commandString, setCommandString] = useState<string>('');
    // TODO WITH TA : add a count state
    const [counter, setCounter] = useState<number>(0);
    
    // TODO WITH TA: build a handleSubmit function called in button onClick
    function handleSubmit(){
      setCounter(counter + 1);
      const newList = [...props.commands, commandString];
      props.setCommands(newList);
      setCommandString("")
    }
    // TODO: Once it increments, try to make it push commands... Note that you can use the `...` spread syntax to copy what was there before
    // add to it with new commands.
    /**
     * We suggest breaking down this component into smaller components, think about the individual pieces 
     * of the REPL and how they connect to each other...
     */
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
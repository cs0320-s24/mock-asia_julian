import { useState } from 'react';
import '../styles/main.css';
import { REPLHistory } from './REPLHistory';
import { REPLInput } from './REPLInput';
import { REPLFunction } from './REPLFunction';
import { loadFunction, viewFunction } from './Functions';

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

/**
 * This function defines which functions are available to use in the scope of this repl.
 * 
 * @returns a map of the functions available for use.
 */
function getFunctions(){
  return{
    "load": loadFunction,
    "view": viewFunction
  };
}

export default function REPL() {

  const [myCommands, setCommands] = useState<string[][]>([]);
  const [mode, setMode] = useState<string>('brief');
  const functions = getFunctions();

  return (
    <div className="repl">  
      {/*This is where your REPLHistory might go... You also may choose to add it within your REPLInput 
      component or somewhere else depending on your component organization. What are the pros and cons of each? */}
      {/* TODO: Update your REPLHistory and REPLInput to take in new shared state as props */}
      <REPLHistory commands={myCommands} mode={mode} functions={functions}/>
      <div className="spacer"></div>
      <REPLInput commands={myCommands} setCommands={setCommands} mode={mode} setMode={setMode}/>
    </div>
  );
}

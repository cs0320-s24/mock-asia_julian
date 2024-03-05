import { useState } from "react";
import "../styles/App.css";
import { PAGE_TITLE } from "./MockedData/Constants";
import { LoginButton } from "./LoginButton";
import REPL from "./REPLClasses/REPL";

/**
 * This is the highest level component! If logged in, includes the repl element.
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="App">
      <p className="App-header">
        <h1>{PAGE_TITLE}</h1>
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </p>

      {isLoggedIn && <REPL />}
    </div>
  );
}

export default App;

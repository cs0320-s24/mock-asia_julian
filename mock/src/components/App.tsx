import { useState } from 'react';
import '../styles/App.css';
import { PAGE_TITLE } from './Constants';
import { LoginButton } from './LoginButton';
import REPL from './REPL';

/**
 * This is the highest level component!
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="App">
      <p className="App-header">
        <h1>{PAGE_TITLE}</h1>
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </p>

      { isLoggedIn && <REPL /> }
    </div>
  );
}

export default App;
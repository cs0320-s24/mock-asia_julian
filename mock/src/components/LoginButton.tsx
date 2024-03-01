import { Dispatch, SetStateAction } from 'react';

// Contains a logged in boolean.
interface loginProps {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

/**
 * Returns the login button element and handles click functionality.
 * 
 * @param props a boolean for if logged in and its setter.
 * @returns the button at the correct state.
 */
export function LoginButton(props: loginProps) {

  const authenticate = () => {
    const newValue = !props.isLoggedIn
    props.setIsLoggedIn(newValue)
    return newValue
  }

  if (props.isLoggedIn) {
    return (
      <button aria-label='Sign Out' onClick={authenticate}>Sign out</button>
    )
  } else {
    return (
      <button aria-label='Login' onClick={authenticate}>Login</button>
    )
  }
}
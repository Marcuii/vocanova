import { useState } from 'react'
import LoggedLayout from './layouts/LoggedLayout';
import NotLoggedLayout from './layouts/NotLoggedLayout';
import Context from './Context';


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState(null)

  //login states
  const [inEmail, setInEmail] = useState("")
  const [inEmailError, setInEmailError] = useState("")
  const [inPassword, setInPassword] = useState("")
  const [inPasswordError, setInPasswordError] = useState("")

  //register states
  const [upName, setUpName] = useState("")
  const [upNameError, setUpNameError] = useState("")
  const [upEmail, setUpEmail] = useState("")
  const [upEmailError, setUpEmailError] = useState("")
  const [upPassword, setUpPassword] = useState("")
  const [upPasswordError, setUpPasswordError] = useState("")
  const [upCPassword, setUpCPassword] = useState("")
  const [upConfirmPasswordError, setUpConfirmPasswordError] = useState("")

  //recovery states
  const [inRecoveryEmail, setInRecoveryEmail] = useState("")
  const [inRecoveryEmailError, setInRecoveryEmailError] = useState("")

  return (
    <Context.Provider value={
      {
        //login
        inEmail,
        setInEmail,
        inEmailError,
        setInEmailError,
        inPassword,
        setInPassword,
        inPasswordError,
        setInPasswordError,
        //register
        upName,
        setUpName,
        upNameError,
        setUpNameError,
        upEmail,
        setUpEmail,
        upEmailError,
        setUpEmailError,
        upPassword,
        setUpPassword,
        upPasswordError,
        setUpPasswordError,
        upCPassword,
        setUpCPassword,
        upConfirmPasswordError,
        setUpConfirmPasswordError,
        //recovery
        inRecoveryEmail,
        setInRecoveryEmail,
        inRecoveryEmailError,
        setInRecoveryEmailError,
      }
    }>
      <div className='flex flex-col justify-evenly font-inter min-h-screen bg-vnbg'>
        {loggedIn ? (
          <LoggedLayout />
        ) : (
          <NotLoggedLayout />
        )}
      </div>
    </Context.Provider>
  )
}

export default App

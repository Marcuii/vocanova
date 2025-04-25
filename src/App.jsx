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
  const [loginError, setLoginError] = useState("")

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

  //login function
  
  const handleLogin = async () => {
    // Perform login logic here
    try {
      const response = await fetch(env.VITE_BASE_URL+"/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inEmail,
          password: inPassword,
        }),
      })
      if (response.status === 401) {
        setLoginError("Invalid email or password")
      } else if (response.status === 500) {
        setLoginError("Server error, please try again later")
      } else if (response.status === 200) {
        setLoginError("")
      }
      return response.json()
    }
    catch (error) {
      // Handle error here
      console.error("Error during login:", error)
    }
  }

  return (
    <Context.Provider value={
      {
        //app login
        handleLogin,
        //login
        inEmail,
        setInEmail,
        inEmailError,
        setInEmailError,
        inPassword,
        setInPassword,
        inPasswordError,
        setInPasswordError,
        loginError,
        setLoginError,
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

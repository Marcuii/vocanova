import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import NotLoggedDB from './pages/notlogged/NotLoggedDB'
import Login from './pages/notlogged/Login'
import Register from './pages/notlogged/Register'
import Recovery from './pages/notlogged/Recovery'

import ProfileSetup from './pages/firstlogged/ProfileSetup'

import LoggedDB from './pages/logged/LoggedDB'

import Context from './Context';
import EmailConfirm from './pages/notlogged/EmailConfirm'
import ResetPassword from './pages/notlogged/ResetPassword'


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [firstLogin, setFirstLogin] = useState(false)
  const [token, setToken] = useState(null)
  const [userData, setUserData] = useState(null)

  //login states
  const [inEmail, setInEmail] = useState("")
  const [inEmailError, setInEmailError] = useState("")
  const [inPassword, setInPassword] = useState("")
  const [inPasswordError, setInPasswordError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loginError, setLoginError] = useState("")

  //register states
  const [upName, setUpName] = useState("")
  const [upNameError, setUpNameError] = useState("")
  const [upLastName, setUpLastName] = useState("")
  const [upLastNameError, setUpLastNameError] = useState("")
  const [upEmail, setUpEmail] = useState("")
  const [upEmailError, setUpEmailError] = useState("")
  const [upPassword, setUpPassword] = useState("")
  const [upPasswordError, setUpPasswordError] = useState("")
  const [upCPassword, setUpCPassword] = useState("")
  const [upConfirmPasswordError, setUpConfirmPasswordError] = useState("")
  const [registerError, setRegisterError] = useState("")
  const [registerSuccess, setRegisterSuccess] = useState(false)

  //recovery states
  const [inRecoveryEmail, setInRecoveryEmail] = useState("")
  const [inRecoveryEmailError, setInRecoveryEmailError] = useState("")
  const [inRecoveryEmailSuccess, setInRecoveryEmailSuccess] = useState(false)

  //first login states
  const [upCode, setUpCode] = useState("");
  const [upCodeError, setUpCodeError] = useState("");
  const [upPhoneNumber, setUpPhoneNumber] = useState("");
  const [upPhoneNumberError, setUpPhoneNumberError] = useState("");
  const [upDOB, setUpDOB] = useState("");
  const [upDOBError, setUpDOBError] = useState("");
  const [upCountry, setUpCountry] = useState("");
  const [upCountryError, setUpCountryError] = useState("");
  const [upCity, setUpCity] = useState("");
  const [upCityError, setUpCityError] = useState("");
  const [personalDone, setPersonalDone] = useState(false);

  const [upDegree, setUpDegree] = useState("");
  const [upDegreeError, setUpDegreeError] = useState("");
  const [upUniversity, setUpUniversity] = useState("");
  const [upUniversityError, setUpUniversityError] = useState("");
  const [upGraduationDate, setUpGraduationDate] = useState("");
  const [upGraduationDateError, setUpGraduationDateError] = useState("");
  const [upJobTitle, setUpJobTitle] = useState("");
  const [upJobTitleError, setUpJobTitleError] = useState("");
  const [upCompany, setUpCompany] = useState("");
  const [upCompanyError, setUpCompanyError] = useState("");
  const [upMinSalary, setUpMinSalary] = useState("");
  const [upMinSalaryError, setUpMinSalaryError] = useState("");
  const [upMaxSalary, setUpMaxSalary] = useState("");
  const [upMaxSalaryError, setUpMaxSalaryError] = useState("");
  const [experienceDone, setExperienceDone] = useState(false);

  const [hardSkills, setHardSkills] = useState([]);
  const [hardSkillsError, setHardSkillsError] = useState("");
  const [softSkills, setSoftSkills] = useState([]);
  const [softSkillsError, setSoftSkillsError] = useState("");
  const [skillsDone, setSkillsDone] = useState(false);

  const [avatar, setAvatar] = useState(null)
  const [avatarDone, setAvatarDone] = useState(false)

  const [resume, setResume] = useState(null)
  const [resumeError, setResumeError] = useState("")
  const [resumeDone, setResumeDone] = useState(false)


  //check if user is logged in
  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true" || sessionStorage.getItem("loggedIn") === "true") {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }
  , [])

  //update user data
  useEffect(() => {
    if (loggedIn && token) {
      getUserData()
    }
  }, [loggedIn , token])

  //login function
  const handleLogin = async () => {
    // Perform login logic here
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "/auth/login", {
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
        const data = await response.json()
        setToken(data.token)
        if (rememberMe) {
          localStorage.setItem("token", data.token)
          localStorage.setItem("loggedIn", true)
        } else {
          sessionStorage.setItem("token", data.token)
          sessionStorage.setItem("loggedIn", true)
        }
        setLoggedIn(true)
      }
      return 
    }
    catch (error) {
      // Handle error here
      console.error("Error during login:", error)
    }
  }

  //register function
  const handleRegister = async () => {
    // Perform register logic here
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: upEmail,
          password: upPassword,
          fullname: upName+ " " + upLastName,
        }),
      })
      if (response.status === 409) {
        setRegisterError("Email already exists")
      } else if (response.status === 500) {
        setRegisterError("Server error, please try again later")
      } else if (response.status === 200) {
        setRegisterError("")
        setRegisterSuccess(true)
      }
      return 
    }
    catch (error) {
      // Handle error here
      console.error("Error during register:", error)
    }
  }

  //recovery function
  const handleRecovery = async () => {
    // Perform recovery logic here
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "/auth/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inRecoveryEmail,
        }),
      })
      if (response.status === 401) {
        setInRecoveryEmailError("Email not found")
      } else if (response.status === 500) {
        setInRecoveryEmailError("Server error, please try again later")
      }
      else if (response.status === 200) {
        setInRecoveryEmailError("")
        setInRecoveryEmailSuccess(true)
      }
      return 
    }
    catch (error) {
      // Handle error here
      console.error("Error during recovery:", error)
    }
  }

  //get user data function
  const getUserData = async () => {
    // Perform get user data logic here
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Postman-Token": `${token}`,
        },
      }) 
      if (response.status === 401) {
        setLoggedIn(false)
        setFirstLogin(false)
      }
      else if (response.status === 500) {
        setLoggedIn(false)
        setFirstLogin(false)
      }
      else if (response.status === 200) {
        const data = await response.json()
        setLoggedIn(true)
        setUserData(data)
        console.log(data)
      }
      return 
    } catch (error) {
      // Handle error here
      console.error("Error during get user data:", error)
    }
  }


  //profile setup function
  

  return (
    <Context.Provider value={
      {
        //App states ----------------------------
        loggedIn,
        setLoggedIn,
        firstLogin,
        setFirstLogin,
        token,
        setToken,
        userData,
        setUserData,

        //NotLogged Layout ----------------------------
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
        rememberMe,
        setRememberMe,
        loginError,
        setLoginError,
        //app register
        handleRegister,
        //register
        upName,
        setUpName,
        upNameError,
        setUpNameError,
        upLastName,
        setUpLastName,
        upLastNameError,
        setUpLastNameError,
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
        registerError,
        setRegisterError,
        registerSuccess,
        setRegisterSuccess,
        //app recovery
        handleRecovery,
        //recovery
        inRecoveryEmail,
        setInRecoveryEmail,
        inRecoveryEmailError,
        setInRecoveryEmailError,
        inRecoveryEmailSuccess,
        setInRecoveryEmailSuccess,

        //FirstLogin Layout ----------------------------
        //personal
        upCode,
        setUpCode,
        upCodeError,
        setUpCodeError,
        upPhoneNumber,
        setUpPhoneNumber,
        upPhoneNumberError,
        setUpPhoneNumberError,
        upDOB,
        setUpDOB,
        upDOBError,
        setUpDOBError,
        upCountry,
        setUpCountry,
        upCountryError,
        setUpCountryError,
        upCity,
        setUpCity,
        upCityError,
        setUpCityError,
        personalDone,
        setPersonalDone,
        //education
        upDegree,
        setUpDegree,
        upDegreeError,
        setUpDegreeError,
        upUniversity,
        setUpUniversity,
        upUniversityError,
        setUpUniversityError,
        upGraduationDate,
        setUpGraduationDate,
        upGraduationDateError,
        setUpGraduationDateError,
        //experience
        upJobTitle,
        setUpJobTitle,
        upJobTitleError,
        setUpJobTitleError,
        upCompany,
        setUpCompany,
        upCompanyError,
        setUpCompanyError,
        upMinSalary,
        setUpMinSalary,
        upMinSalaryError,
        setUpMinSalaryError,
        upMaxSalary,
        setUpMaxSalary,
        setUpMaxSalary,
        upMaxSalaryError,
        setUpMaxSalaryError,
        experienceDone,
        setExperienceDone,
        //skills
        hardSkills,
        setHardSkills,
        hardSkillsError,
        setHardSkillsError,
        softSkills,
        setSoftSkills,
        softSkillsError,
        setSoftSkillsError,
        skillsDone,
        setSkillsDone,
        //avatar
        avatar,
        setAvatar,
        avatarDone,
        setAvatarDone,
        //resume
        resume,
        setResume,
        resumeError,
        setResumeError,
        resumeDone,
        setResumeDone,
        
      }
    }>
      <div className='flex flex-col justify-evenly font-inter min-h-screen h-fit bg-vnbg'>
        <Routes>
          <Route path="/" element={loggedIn ? <LoggedDB /> : <NotLoggedDB />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/auth/email-confirm" element={<EmailConfirm />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/profile-complete" element={<ProfileSetup />} />
        </Routes>
      </div>
    </Context.Provider>
  )
}

export default App

import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

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
  //App states
  const [loggedIn, setLoggedIn] = useState(false)
  const [firstLogin, setFirstLogin] = useState(false)
  const [token, setToken] = useState(null)
  const [userData, setUserData] = useState({})
  const [jobApplications, setJobApplications] = useState([])

  //NotLogged Layout -----------------------------------
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

  //FirstLogged Layout -----------------------------------
  //personal states
  const [upCode, setUpCode] = useState("");
  const [upCodeError, setUpCodeError] = useState("");
  const [upPhoneNumber, setUpPhoneNumber] = useState("");
  const [upPhoneNumberError, setUpPhoneNumberError] = useState("");
  const [upGender, setUpGender] = useState("");
  const [upGenderError, setUpGenderError] = useState("");
  const [upDOB, setUpDOB] = useState("");
  const [upDOBError, setUpDOBError] = useState("");
  const [upCountry, setUpCountry] = useState("");
  const [upCountryError, setUpCountryError] = useState("");
  const [upCity, setUpCity] = useState("");
  const [upCityError, setUpCityError] = useState("");
  const [personalDone, setPersonalDone] = useState(false);
  //experience states
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
  const [upExperienceYears, setUpExperienceYears] = useState("");
  const [upExperienceYearsError, setUpExperienceYearsError] = useState("");
  const [upExpectedSalary, setUpExpectedSalary] = useState("");
  const [upExpectedSalaryError, setUpExpectedSalaryError] = useState("");
  const [experienceDone, setExperienceDone] = useState(false);
  //skills states
  const [hardSkills, setHardSkills] = useState([]);
  const [hardSkillsError, setHardSkillsError] = useState("");
  const [softSkills, setSoftSkills] = useState([]);
  const [softSkillsError, setSoftSkillsError] = useState("");
  const [skillsDone, setSkillsDone] = useState(false);
  //avatar states
  const [avatar, setAvatar] = useState(null)
  const [avatarDone, setAvatarDone] = useState(false)
  //resume states
  const [resume, setResume] = useState(null)
  const [resumeError, setResumeError] = useState("")
  const [resumeDone, setResumeDone] = useState(false)
  //submit profile states
  const [submitProfileError, setSubmitProfileError] = useState("")
  //Logged Layout -----------------------------------
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)


  const navigate = useNavigate()

  //check if user is logged in
  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true" || sessionStorage.getItem("loggedIn") === "true") {
      if (localStorage.getItem("token") !== null) {
        setLoggedIn(true)
        setToken(localStorage.getItem("token"))
      } else if (sessionStorage.getItem("token") !== null) {
        setLoggedIn(true)
        setToken(sessionStorage.getItem("token"))
      } else {
        localStorage.removeItem("loggedIn")
        localStorage.removeItem("token")
        sessionStorage.removeItem("loggedIn")
        sessionStorage.removeItem("token")
        setLoggedIn(false)
        setToken(null)
      }
    } else {
      localStorage.removeItem("loggedIn")
      localStorage.removeItem("token")
      sessionStorage.removeItem("loggedIn")
      sessionStorage.removeItem("token")
      setLoggedIn(false)
      setToken(null)
    }
  }
  , [])

  //update user data
  useEffect(() => {
    if (loggedIn && token) {
      getUserData()
    }
  }, [loggedIn , token , firstLogin])

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
          "Authorization": `Bearer ${token}`,
        },
      }) 
      if (response.status !== 200) {
        setLoggedIn(false)
        setFirstLogin(false)
        if (localStorage.getItem("loggedIn") === "true") {
          localStorage.removeItem("token")
          localStorage.removeItem("loggedIn")
        }
        if (sessionStorage.getItem("loggedIn") === "true") {
          sessionStorage.removeItem("token")
          sessionStorage.removeItem("loggedIn")
        }
      } else {
        const data = await response.json()
        setLoggedIn(true)
        if (data.jobTitle === null) {
          setFirstLogin(true)
        } else {
          setFirstLogin(false)
          setUserData({...data, hardSkills: data.hardSkills[0].split(",") , softSkills: data.softSkills[0].split(",")})
          getJobApplications()
        }
        console.log(data)
      }
      return 
    } catch (error) {
      // Handle error here
      console.error("Error during get user data:", error)
    }
  }

  //get job applications function
  const getJobApplications = async () => {
    // Perform get job applications logic here
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "/JobApplication", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
      if (response.status !== 200) {
        setLoggedIn(false)
        setFirstLogin(false)
        if (localStorage.getItem("loggedIn") === "true") {
          localStorage.removeItem("token")
          localStorage.removeItem("loggedIn")
        }
        if (sessionStorage.getItem("loggedIn") === "true") {
          sessionStorage.removeItem("token")
          sessionStorage.removeItem("loggedIn")
        }
      } else {
        const data = await response.json()
        setJobApplications(data)
        console.log(data)
      }
      return 
    } catch (error) {
      // Handle error here
      console.error("Error during get job applications:", error)
    }
  }

  //profile setup function
  const handleProfileSetup = async () => {
    const formData = new FormData()
    formData.append("PhoneNumber", upCode + upPhoneNumber)
    formData.append("Gender", upGender)
    formData.append("DateOfBirth", upDOB)
    formData.append("Country", upCountry)
    formData.append("City", upCity)
    formData.append("Degree", upDegree)
    formData.append("University", upUniversity)
    formData.append("GraduationYear", upGraduationDate)
    formData.append("JobTitle", upJobTitle)
    formData.append("Company", upCompany)
    formData.append("ExperienceYears", upExperienceYears)
    formData.append("SalaryExpectations", upExpectedSalary)
    formData.append("HardSkills", hardSkills)
    formData.append("SoftSkills", softSkills)
    formData.append("ProfilePicture", avatar)
    formData.append("ResumeFile", resume)

    // Perform profile setup logic here
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "/me/add-profile-data", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      })
      if (response.status !== 204) {
        setSubmitProfileError("Server error, please try again later")
        console.log(response.status)
      } else if (response.status === 204) {
        setSubmitProfileError("")
        setFirstLogin(false)
      }
      return
    }
    catch (error) {
      // Handle error here
      console.error("Error during profile setup:", error)
    }
  }

  //handle logout function
  const handleLogout = () => {
    setLoggedIn(false)
    setFirstLogin(false)
    setToken(null)
    setUserData({})
    navigate("/")
    if (localStorage.getItem("loggedIn") === "true") {
      localStorage.removeItem("token")
      localStorage.removeItem("loggedIn")
    }
    if (sessionStorage.getItem("loggedIn") === "true") {
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("loggedIn")
    }
  }

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
        jobApplications,
        setJobApplications,
        //app functions
        getUserData,
        getJobApplications,

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
        upGender,
        setUpGender,
        upGenderError,
        setUpGenderError,
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
        upExperienceYears,
        setUpExperienceYears,
        upExperienceYearsError,
        setUpExperienceYearsError,
        upExpectedSalary,
        setUpExpectedSalary,
        upExpectedSalaryError,
        setUpExpectedSalaryError,
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
        //submit profile
        submitProfileError,
        setSubmitProfileError,
        //app profile setup
        handleProfileSetup,

        //Logged Layout ----------------------------
        //app logout
        handleLogout,
        
        isSidebarOpen,
        setIsSidebarOpen,
        
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

          <Route path="/job-recommendation" element={<LoggedDB />} />
          <Route path="/job-applications" element={<LoggedDB />} />
          <Route path="/resume-analysis" element={<LoggedDB />} />
          <Route path="/mockup-interview" element={<LoggedDB />} />
          <Route path="/profile" element={<LoggedDB />} />
          <Route path="/settings" element={<LoggedDB />} />
        </Routes>
      </div>
    </Context.Provider>
  )
}

export default App

import { useLocation, useNavigate } from 'react-router'
import Context from '../../Context'
import { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/logged/Sidebar'
import { Typography, Button, Avatar } from '@material-tailwind/react'
import React from 'react'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import JobRecommendation from './../../components/logged/JobRecommendation';
import JobApplications from './../../components/logged/JobApplications';
import JobApplication from './../../components/logged/JobApplication';
import ResumeAnalysis from './../../components/logged/ResumeAnalysis';
import MockupInterview from './../../components/logged/MockupInterview';
import Profile from './../../components/logged/Profile';
import Settings from './../../components/logged/Settings';

const LoggedDB = () => {
  const [name, setName] = useState("")

  const {
    //App states
    loggedIn,
    setLoggedIn,
    firstLogin,
    setFirstLogin,
    userData,
    setUserData,

    //Logged Layout -----------------------------
    //app logout
    handleLogout,

    isSidebarOpen,
    setIsSidebarOpen,
  } = useContext(Context)

  // Navigate to different pages
  const location = useLocation();
  const path = location.pathname;

  const renderStep = () => {
    if (path === "/job-recommendation") return <JobRecommendation />;
    if (path === "/job-applications") return <JobApplications />;
    if (path.startsWith("/job-application/")) return <JobApplication />;
    if (path === "/resume-analysis") return <ResumeAnalysis />;
    if (path === "/mockup-interview") return <MockupInterview />;
    if (path === "/profile") return <Profile />;
    if (path === "/settings") return <Settings />;
    return <JobRecommendation />;
  }


  const navigate = useNavigate()

  // Redirect to home or profile-complete page if logged in
  useEffect(() => {
    if (loggedIn) {
      if (firstLogin) {
        navigate("/profile-complete")
      }
    } else {
      navigate("/")
    }
  }, [loggedIn, firstLogin])

  useEffect(() => {
    if (userData.fullName) {
      setName(userData.fullName.split(" ")[0])
    } else {
      setName("")
    }
  } , [userData])

  return (
    <div className="w-full min-h-screen flex flex-col justify-start gap-5">
      {/* Navbar */}
      <div className="sticky top-0 z-10 w-full flex items-center justify-between rounded-none px-4 py-2 shadow-md">
        <Typography
          as="a"
          href="#"
          className="cursor-pointer font-bold text-2xl text-primary"
        >
          VocaNova
        </Typography>
        <div className="flex flex-row justify-center items-center gap-4">
          <Button
            variant="text"
            size="sm"
            className="rounded-full"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              withBorder={true}
              className="p-0.5"
            />
          </Button>
          <div className="hidden sm:block">Hi, {name}</div>
          <Button
            variant="text"
            size="sm"
            onClick={() => handleLogout()}
            className="hidden sm:block rounded-full text-error"
          >
            <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <Sidebar />
      {renderStep()}
    </div>
  )
}

export default LoggedDB
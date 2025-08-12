import { useLocation, useNavigate } from 'react-router'
import Context from '../../Context'
import { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/logged/Sidebar'
import { Typography, Button, Avatar } from '@material-tailwind/react'
import React from 'react'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import JobRecommendation from './../../components/logged/JobRecommendation';
import JobApplications from './../../components/logged/JobApplications';
import ResumeAnalysis from './../../components/logged/ResumeAnalysis';
import MockupInterview from './../../components/logged/MockupInterview';
import Profile from './../../components/logged/Profile';
import Settings from './../../components/logged/Settings';
import ChangePassword from '../../components/logged/ChangePassword'

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
    if (path === "/job-recommendation") {
      document.title = "Vocanova | Job Recommendations";
      return <JobRecommendation />
    };
    if (path === "/job-applications") {
      document.title = "Vocanova | Job Applications";
      return <JobApplications />
    };
    if (path === "/resume-analysis") {
      document.title = "Vocanova | Resume Analysis";
      return <ResumeAnalysis />
    };
    if (path === "/mockup-interview") {
      document.title = "Vocanova | Mockup Interview";
      return <MockupInterview />
    };
    if (path === "/profile") {
      document.title = "Vocanova | Profile";
      return <Profile />
    };
    if (path === "/settings") {
      document.title = "Vocanova | Settings";
      return <Settings />
    };
    if (path === "/change-password") {
      document.title = "Vocanova | Change Password";
      return <ChangePassword />
    };
    document.title = "Vocanova | Job Recommendations";
    return <JobRecommendation />;
  }


  const navigate = useNavigate()

  // Redirect to home or profile-complete page if logged in
  useEffect(() => {
    if (loggedIn) {
      if (firstLogin) {
        navigate("/profile-complete")
      }
    } else if (localStorage.getItem("loggedIn") !== "true" && sessionStorage.getItem("loggedIn") !== "true") {
      navigate("/")
    }
  }, [loggedIn, firstLogin])

  useEffect(() => {
    if (userData.fullName) {
      setName(userData.fullName.split(" ")[0])
    } else {
      setName("")
    }
  }, [userData])

  return (
    <div className="w-full min-h-screen flex flex-col justify-start gap-5">
      {/* Navbar */}
      <div className="sticky top-0 z-50 w-full flex items-center justify-between rounded-none px-4 py-2 shadow-md bg-white">
        <Typography
          onClick={() => navigate("/")}
          className="cursor-pointer font-bold text-2xl text-primary hover:cursor-pointer"
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
              src={userData.profilePictureUrl ? userData.profilePictureUrl : "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
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

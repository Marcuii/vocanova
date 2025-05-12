import React, { use, useContext, useEffect, useState } from 'react'
import Context from '../../Context'
import { DocumentIcon } from '@heroicons/react/24/outline'
import { Spinner } from '@material-tailwind/react'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true)
  const {
    userData
  } = useContext(Context)

  useEffect(() => {
    if (userData.fullName !== undefined) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [userData])

  if (isLoading === false) {
    return (
      <div className='w-full min-h-screen flex flex-col gap-3 justify-center items-center'>
        <h1 className='text-2xl font-semibold text-primary'>Loading...</h1>
        <Spinner className="h-16 w-16 text-primary" />
      </div>
    )
  } else {

    return (

      <div className='w-full min-h-screen flex flex-col justify-start items-center gap-5 p-4 lg:px-8 lg:flex-row lg:justify-between lg:items-start'>
        <div className='w-11/12 lg:hidden flex flex-col justify-center items-center'>
          <img src={userData.profilePictureUrl ? userData.profilePictureUrl : "https://static-00.iconduck.com/assets.00/profile-major-icon-512x512-xosjbbdq.png"} alt="" className='rounded-full h-40 w-40 lg:h-60 lg:w-60' />
        </div>
        <div className='lg:w-7/12 w-11/12 flex flex-col justify-start items-start gap-5'>
          <div className='w-full flex flex-col justify-start items-start gap-2'>
            <h2 className='text-xl font-semibold text-primary'>Personal Information</h2>
            <p>First Name: {userData.fullName.split(' ')[0]}</p>
            <p>Last Name: {userData.fullName.split(' ')[1]}</p>
            <p>Email: {userData.email}</p>
            <p>Phone Number: {userData.phoneNumber}</p>
            <p>Gender: {userData.gender}</p>
            <p>Date of Birth: {userData.dateOfBirth.split('T')[0]}</p>
            <p>Country: {userData.country}</p>
            <p>City: {userData.city}</p>
          </div>
          <hr className='w-full border-t-2 border-gray-300' />
          <div className='w-full flex flex-col justify-start items-start gap-2'>
            <h2 className='text-xl font-semibold text-secondary'>Experience</h2>
            <p>Job Title: {userData.jobTitle}</p>
            <p>Company: {userData.company}</p>
            <p>Years of Experience: {userData.experienceYears}</p>
            <p>Expected Salary: {userData.salaryExpectations}</p>
          </div>
          <hr className='w-full border-t-2 border-gray-300' />
          <div className='w-full flex flex-col justify-start items-start gap-2'>
            <h2 className='text-xl font-semibold text-primary'>Education</h2>
            <p>Degree: {userData.degree}</p>
            <p>University: {userData.university}</p>
            <p>Graduation Year: {userData.graduationYear}</p>
          </div>
          <hr className='w-full lg:hidden border-t-2 border-gray-300' />
          <div className='w-full lg:hidden flex flex-col justify-start items-start gap-2'>
            <h2 className='text-xl font-semibold text-secondary'>Skills</h2>
            <p className='flex flex-wrap gap-2 justify-center items-center'>Hard Skills: {userData.hardSkills.map((skill, index) => <span className='rounded-lg bg-primary p-2' key={index}>{skill}</span>)}</p>
            <p className='flex flex-wrap gap-2 justify-center items-center'>Soft Skills: {userData.softSkills.map((skill, index) => <span className='rounded-lg bg-secondary p-2' key={index}>{skill}</span>)}</p>
          </div>
          <hr className='w-full lg:hidden border-t-2 border-gray-300' />
          <div className='w-full flex lg:hidden flex-col justify-start items-start gap-2'>
            <h2 className='text-xl font-semibold text-primary'>Resume</h2>
            <p className='flex flex-wrap gap-2 justify-center items-center'>Resume: <DocumentIcon className='h-6 w-6 text-primary' onClick={() => window.open(userData.resumeFileUrl, "_blank")} /></p>
          </div>
        </div>

        <div className='w-1/3 hidden lg:flex flex-col justify-center items-center gap-5'>
          <img src={userData.profilePictureUrl ? userData.profilePictureUrl : "https://static-00.iconduck.com/assets.00/profile-major-icon-512x512-xosjbbdq.png"} alt="" className='rounded-full h-fit w-2/3' />
          <hr className='w-full hidden lg:block border-t-2 border-gray-300' />
          <div className='w-full hidden lg:flex flex-col justify-start items-start gap-2'>
            <h2 className='text-xl font-semibold text-secondary'>Skills</h2>
            <p className='flex flex-wrap gap-2 justify-start items-center'>Hard Skills: {userData.hardSkills.map((skill, index) => <span className='rounded-lg bg-primary p-2' key={index}>{skill}</span>)}</p>
            <p className='flex flex-wrap gap-2 justify-start items-center'>Soft Skills: {userData.softSkills.map((skill, index) => <span className='rounded-lg bg-secondary p-2' key={index}>{skill}</span>)}</p>
          </div>
          <hr className='w-full hidden lg:block border-t-2 border-gray-300' />
          <div className='w-full hidden lg:flex flex-col justify-start items-start gap-2'>
            <h2 className='text-xl font-semibold text-primary'>Resume</h2>
            <p className='flex flex-wrap gap-2 justify-center items-center'>Resume: <DocumentIcon className='h-6 w-6 text-primary' onClick={() => window.open(userData.resumeFileUrl, "_blank")} /></p>
          </div>
        </div>

      </div>
    )
  }
}

export default Profile
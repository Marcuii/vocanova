import React, { useContext } from 'react'
import Context from '../../Context'
import { DocumentIcon } from '@heroicons/react/24/outline'

const Profile = () => {
  const {
    userData
  } = useContext(Context)

  return (
    <div className='w-full min-h-screen flex flex-col justify-start items-center gap-5 p-4'>
      <div className='w-11/12 flex flex-col justify-center items-center'>
        <img src={userData.profilePictureUrl} alt="" className='rounded-full h-fit w-1/3'/>
      </div>
      <div className='w-w-11/12 flex flex-col justify-start items-start gap-5'>
        <div className='w-full flex flex-col justify-start items-start gap-2 text-primary'>
          <h2 className='text-xl font-semibold'>Personal Information</h2>
          <p>First Name: {userData.fullName.split(' ')[0]}</p>
          <p>Last Name: {userData.fullName.split(' ')[1]}</p>
          <p>Email: {userData.email}</p>
          <p>Phone Number: {userData.phoneNumber}</p>
          <p>Gender: {userData.gender}</p>
          <p>Date of Birth: {userData.dateOfBirth}</p>
          <p>Country: {userData.country}</p>
          <p>City: {userData.city}</p>
        </div>
        <hr className='w-full border-t-2 border-gray-300'/>
        <div className='w-full flex flex-col justify-start items-start gap-2 text-secondary'>
          <h2 className='text-xl font-semibold'>Experience</h2>
          <p>Job Title: {userData.jobTitle}</p>
          <p>Company: {userData.company}</p>
          <p>Years of Experience: {userData.experienceYears}</p>
          <p>Expected Salary: {userData.salaryExpectations}</p>
        </div>
        <hr className='w-full border-t-2 border-gray-300'/>
        <div className='w-full flex flex-col justify-start items-start gap-2'>
          <h2 className='text-xl font-semibold'>Education</h2>
          <p>Degree: {userData.degree}</p>
          <p>University: {userData.university}</p>
          <p>Graduation Year: {userData.graduationYear}</p>
        </div>
        <hr className='w-full border-t-2 border-gray-300'/>
        <div className='w-full flex flex-col justify-start items-start gap-2'>
          <h2 className='text-xl font-semibold'>Skills</h2>
          <p className='flex flex-wrap gap-2'>Hard Skills: {userData.hardSkills.map ((skill, index) => <span className='rounded-lg bg-primary p-2' key={index}>{skill}</span>)}</p>
          <p className='flex flex-wrap gap-2'>Soft Skills: {userData.softSkills.map ((skill, index) => <span className='rounded-lg bg-secondary p-2' key={index}>{skill}</span>)}</p>  
        </div>
        <hr className='w-full border-t-2 border-gray-300'/>
        <div className='w-full flex flex-col justify-start items-start gap-2'>
          <h2 className='text-xl font-semibold'>Resume</h2>
          <p>Resume: <DocumentIcon className='h-6 w-6' onClick={() => window.open(userData.resume, "_blank")} /></p>
        </div>
      </div>

    </div>
  )
}

export default Profile
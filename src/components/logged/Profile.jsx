import React, { useContext } from 'react'
import Context from '../../Context'

const Profile = () => {
  const {
    userData
  } = useContext(Context)

  return (
    <div className='w-full min-h-screen flex flex-col justify-start items-center gap-5 p-4'>
      <div className='w-11/12 flex flex-col justify-center items-center'>
        <img src={userData.profilePictureUrl} alt="" className='rounded-full h-fit'/>
      </div>
      <div className='w-w-11/12 flex flex-col justify-start items-start gap-5'>
        <div className='w-full flex flex-col justify-start items-start gap-2'>
          <h2 className='text-xl font-semibold'>Personal Information</h2>
          <p><strong>First Name:</strong> {userData.fullName.split(' ')[0]}</p>
          <p><strong>Last Name:</strong> {userData.fullName.split(' ')[1]}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
          <p><strong>Gender:</strong> {userData.gender}</p>
          <p><strong>Date of Birth:</strong> {userData.dateOfBirth}</p>
          <p><strong>Country:</strong> {userData.country}</p>
          <p><strong>City:</strong> {userData.city}</p>
        </div>
        <div className='w-full flex flex-col justify-start items-start gap-2'>
          <h2 className='text-xl font-semibold'>Experience</h2>
          <p><strong>Job Title:</strong> {userData.jobTitle}</p>
          <p><strong>Company:</strong> {userData.company}</p>
          <p><strong>Years of Experience:</strong> {userData.experienceYears}</p>
          <p><strong>Expected Salary:</strong> {userData.salaryExpectations}</p>
        </div>
        <div className='w-full flex flex-col justify-start items-start gap-2'>
          <h2 className='text-xl font-semibold'>Education</h2>
          <p><strong>Degree:</strong> {userData.degree}</p>
          <p><strong>University:</strong> {userData.university}</p>
          <p><strong>Graduation Year:</strong> {userData.graduationYear}</p>
        </div>
        <div className='w-full flex flex-col justify-start items-start gap-2'>
          <h2 className='text-xl font-semibold'>Skills</h2>
          <p className='flex flex-wrap gap-2'><strong>Hard Skills:</strong> {userData.hardSkills.map ((skill, index) => <span className='bg-primary p-2' key={index}>{skill}</span>)}</p>
          <p className='flex flex-wrap gap-2'><strong>Soft Skills:</strong> {userData.softSkills.map ((skill, index) => <span className='bg-secondary p-2' key={index}>{skill}</span>)}</p>  
        </div>
      </div>

    </div>
  )
}

export default Profile
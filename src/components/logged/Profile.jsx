import React, { useContext } from 'react'
import Context from '../../Context'

const Profile = () => {
  const {
    userData
  } = useContext(Context)

  return (
    <div className='w-full min-h-screen flex flex-col lg:flex-row justify-start items-center lg:justify-center lg:items-start gap-5 p-4'>
      <div className='w-full lg:w-1/3 flex flex-col justify-start items-start gap-5'>
        <h1 className='text-2xl font-bold'>Profile</h1>
        <div className='w-full flex flex-col justify-start items-start gap-2'>
          <h2 className='text-xl font-semibold'>Personal Information</h2>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Last Name:</strong> {userData.lastName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Job Title:</strong> {userData.jobTitle}</p>
        </div>
      </div>

    </div>
  )
}

export default Profile
import React from 'react'
import Calendar from 'react-calendar'

const JobApplications = () => {
  return (
    <div className='w-full min-h-screen flex flex-row justify-start gap-5 p-4'>
      <div className='w-2/3 flex flex-wrap items-center justify-center gap-4 p-4'>
        <h1 className='text-2xl text-center text-primary'>
          Job Applications
        </h1>
        <div className='w-full flex flex-row items-center justify-around gap-4 p-4'>
          <div className='w-1/3 flex flex-col items-center justify-center gap-4 p-4'>
            <h2 className='text-xl text-center text-secondary'>
              Application 1
            </h2>
            <p className='text-lg text-center text-gray-700'>
              Status: Pending
            </p>
          </div>
          <div className='w-1/3 flex flex-col items-center justify-center gap-4 p-4'>
            <h2 className='text-xl text-center text-secondary'>
              Application 2
            </h2>
            <p className='text-lg text-center text-gray-700'>
              Status: Accepted
            </p>
          </div>
        </div>
      </div>
      <Calendar
        value={new Date()}
        navigationLabel={null}
        className="text-center w-2/3 h-fit rounded-lg shadow-md"
        tileClassName={({ date, view }) => {
          // Highlight specific dates
          if (view === 'month') {
            const dateString = date.toDateString()
            if (dateString === new Date().toDateString()) {
              return 'highlighted-date'
            }
          }
          return null
        } 
        }
        
        
         // Apply custom class for highlighted days
      />
    </div>
  )
}

export default JobApplications
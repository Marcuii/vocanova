import React, { useContext, useEffect, useState } from 'react'
import Context from '../../Context';

const JobRecommendation = () => {
  const [foundJobs, setFoundJobs] = useState([])
  const {
    userData,
  } = useContext(Context);

  async function fetchJobs(jobTitle) {
    const response = await fetch("https://nour83-job.hf.space/get-jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ job_title: jobTitle })
    });
  
    const data = await response.json();
    return data.jobs;
  }

  useEffect(() => {
    const fetchData = async () => {
      const jobTitle = userData.jobTitle || "Software Engineer"; // Default to "Software Engineer" if jobTitle is not available
      const jobs = await fetchJobs(jobTitle);
      setFoundJobs(jobs);
    }
    fetchData();
  }, [userData.jobTitle]);
  

  return (
    <div className='w-full min-h-screen flex flex-col lg:flex-row justify-start items-center lg:justify-center lg:items-start gap-5 p-4'>
      <div className='w-11/12 flex flex-wrap items-center justify-center gap-4 p-4'>
      <h1 className='w-full text-primary text-2xl text-center'>Job Applications</h1>
      {foundJobs.length > 0 ? (
          foundJobs.map((job, index) => (
            <div key={index} className='w-11/12 sm:w-5/12 flex flex-col items-start justify-start gap-3 p-4 bg-vnbg shadow-md rounded-lg hover:shadow-lg transition duration-300'>
              <h2 className='text-xl font-bold text-primary mb-3'>{job.title}</h2>
              <button>{job.link}</button>              
            </div>
          ))
        ) : (
          <p className='text-2xl text-vnblack1'>No recommended jobs found.</p>
        )}
      </div>
      </div>
  )
}

export default JobRecommendation
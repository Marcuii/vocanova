import React, { useContext, useEffect, useState } from 'react'
import Context from '../../Context';
import { use } from 'react';
import JobCard from './JobCard';

const JobRecommendation = () => {
  const [foundJobs, setFoundJobs] = useState([])
  const [loading, setLoading] = useState(true);
  const [jobsError, setJobsError] = useState("");
  const {
    userData,
  } = useContext(Context);

  async function fetchJobs(userData) {
    const splitJobTitle = userData.jobTitle.split(' ');
    const jobTitle = splitJobTitle.join('%20');
    const url = `https://jsearch.p.rapidapi.com/search?query=${jobTitle}&date_posted=week`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': `${import.meta.env.VITE_JOB_SEARCH_TOKEN}`,
        'x-rapidapi-host': `${import.meta.env.VITE_RAPID_API_HOST}`,
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      return JSON.parse(result).data
    } catch (error) {
      setJobsError("Error fetching jobs. Please try again later.");
    }
  }

    useEffect(() => {
      if (!userData.jobTitle) return;
      const fetchData = async () => {
        setJobsError("");
        const jobs = await fetchJobs(userData);
        setFoundJobs(jobs);
        setLoading(false);
      }
      fetchData();
    }, [userData]);


    return (
      <div className='w-full min-h-screen flex flex-col lg:flex-row justify-start items-center lg:justify-center lg:items-start gap-5 p-4'>
        <div className='w-11/12 flex flex-wrap items-center justify-center gap-4 p-4'>
          <h1 className='w-full text-primary text-2xl text-center'>Recommended Jobs</h1>
          {jobsError != "" && <p className='w-full text-center text-lg text-red-500'>{jobsError}</p>}
          {loading ? (
            <p className='text-2xl text-vnblack1'>Loading...</p>
          ) : ( foundJobs.length > 0 ? (
            foundJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))
          ) : (
            <p className='text-2xl text-vnblack1'>No recommended jobs found.</p>
          ))}
        </div>
      </div>
    )
  }

  export default JobRecommendation
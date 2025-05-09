import React, { useContext, useEffect, useState } from 'react'
import Context from '../../Context';
import { use } from 'react';

const JobRecommendation = () => {
  const [foundJobs, setFoundJobs] = useState([])
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
        'x-rapidapi-key': '62b39a02c1mshdfb3cfafe57d9d3p191ccajsn22b3dc592be1',
        'x-rapidapi-host': 'jsearch.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
      return JSON.parse(result).data
    } catch (error) {
      console.error(error);
    }
  }

    useEffect(() => {
      if (!userData.jobTitle) return;
      const fetchData = async () => {
        const jobs = await fetchJobs(userData);
        setFoundJobs(jobs);
      }
      fetchData();
    }, [userData]);


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
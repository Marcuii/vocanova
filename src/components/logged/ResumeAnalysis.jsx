import { useContext, useEffect, useState } from 'react'
import Context from '../../Context'
import { Button, Spinner } from '@material-tailwind/react';
import { MdError } from 'react-icons/md';

const MockupInterview = () => {
  const [actButton, setActButton] = useState(false)
  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  const [done, setDone] = useState(false)

  const [curFile, setCurFile] = useState([])

  const [feedback, setFeedback] = useState(null)

  const {
    userData,
  } = useContext(Context)

  //Activate Button
  useEffect(() => {
    if (userData.jobTitle) {
      setLoading(false)
      if (curFile) {
        setActButton(true)
      } else {
        setActButton(false)
      }
    } else {
      setLoading(true)
    }
  }, [userData])

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCurFile(file);
  };

  // Function to fetch mockup interview questions from the API
  const analyzeResume = async () => {
    setLoading(true)
    try {
      const response = await fetch(import.meta.env.VITE_ANALYSIS_API + "/analyze_resume", {
        method: 'POST',
        body: JSON.stringify({
          job_role: userData.jobTitle,
        })
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setFeedback(response)
      setDone(true)
      setError('')

    } catch (error) {
      setError('Failed to analyze resume. Please try again later.')
    }
    setLoading(false)
  }

  return (
    <div className='w-full min-h-screen flex flex-col justify-start items-center gap-5 p-4'>
      <div className='w-11/12 flex flex-wrap items-center justify-center gap-4 p-4'>
        <h1 className='w-full text-primary text-2xl text-center'>Resume Analyze</h1>
        {error != "" && <p className='w-full text-center text-lg text-red-500'>{error}</p>}
        { done ?
        (!loading ?
          (
            <div className='w-full lg:w-11/12 flex flex-col items-center justify-center gap-4 p-4'>
              <p className='text-2xl text-vnblack1 text-center w-full'>Loading...</p>
              <Spinner className="h-16 w-16 text-primary" />
            </div>
          ) :
          (
            <div className='w-full lg:w-11/12 flex flex-col items-center justify-center gap-4 p-4 border-vngrey4 border rounded-lg'>
              <h2 className={` w-full text-vnblack1 text-xl text-center`}>Upload your resume</h2>
              <input
                type='file'
                accept='.pdf'
                onChange={handleFileChange}
                className={`w-full p-2 border text-vnblack1 rounded-md min-h-40`}
              />
              <Button onClick={() => analyzeResume()} disabled={!actButton} className={`flex w-11/12 font-medium normal-case flex-row items-center justify-center text-xl bg-primary text-vnwhite rounded-lg hover:bg-vngrey3 transition duration-300 ease-in-out`}>
                Analyze Resume
              </Button>
            </div>
          )
        ) : null
        }
        {feedback &&
          <div className="w-full flex flex-col items-start justify-start gap-2 p-4 border border-vngrey4 rounded-lg bg-white shadow-sm">
            <p className="text-success w-full text-sm lg:text-xl">
              Overall Rating: <span className="text-vnblack2 font-medium">{response["Overall Rating"]}</span>
            </p>

            <p className="text-success w-full text-sm lg:text-base">
              Summary: <span className="text-vnblack2">{response["Summary"]}</span>
            </p>

            <p className="text-success w-full text-sm lg:text-base">
              Strengths:
              <ul className="list-disc list-inside text-vnblack2 mt-1 ml-3">
                {response["Strengths"].map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </p>

            <p className="text-success w-full text-sm lg:text-base">
              Weaknesses:
              <ul className="list-disc list-inside text-vnblack2 mt-1 ml-3">
                {response["Weaknesses"].map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </p>

            <p className="text-success w-full text-sm lg:text-base">
              ATS Compatibility Analysis:{" "}
              <span className="text-vnblack2">{response["ATS Compatibility Analysis"]}</span>
            </p>

            <p className="text-success w-full text-sm lg:text-base">
              Formatting and Readability:{" "}
              <span className="text-vnblack2">{response["Formatting and Readability"]}</span>
            </p>

            <p className="text-success w-full text-sm lg:text-base">
              Content and Impact:{" "}
              <span className="text-vnblack2">{response["Content and Impact"]}</span>
            </p>

            <p className="text-success w-full text-sm lg:text-base">
              Grammar and Clarity:{" "}
              <span className="text-vnblack2">{response["Grammar and Clarity"]}</span>
            </p>
          </div>
        }
      </div>
    </div>
  )
}

export default MockupInterview
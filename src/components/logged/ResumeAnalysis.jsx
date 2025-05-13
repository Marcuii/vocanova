import { useContext, useEffect, useState } from 'react'
import Context from '../../Context'
import { Button, Spinner } from '@material-tailwind/react';
import { MdError } from 'react-icons/md';

const MockupInterview = () => {
  const [actButton, setActButton] = useState(false)
  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

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
      console.log(data)
      setFeedback(data)
      setError('')

    } catch (error) {
      setError('Failed to get questions. Please try again later.')
    }
    setLoading(false)
  }

  return (
    <div className='w-full min-h-screen flex flex-col justify-start items-center gap-5 p-4'>
      <div className='w-11/12 flex flex-wrap items-center justify-center gap-4 p-4'>
        <h1 className='w-full text-primary text-2xl text-center'>Resume Analyze</h1>
        {error != "" && <p className='w-full text-center text-lg text-red-500'>{error}</p>}
        {loading ?
            (
              <div className='w-full lg:w-11/12 flex flex-col items-center justify-center gap-4 p-4'>
                <p className='text-2xl text-vnblack1 text-center w-full'>Loading...</p>
                <Spinner className="h-16 w-16 text-primary" />
              </div>
            ) :
            (
              <div className='w-full lg:w-11/12 flex flex-col items-center justify-center gap-4 p-4 border-vngrey4 border rounded-lg'>
                <h2 className={`${questions.length === curQuestion ? "hidden" : "block"} w-full text-vnblack1 text-xl text-center`}>{questions[curQuestion]}</h2>
                {error != "" && <p className='flex flex-row gap-2 items-center text-start w-full text-red-500 text-sm -mb-3'><MdError />{error}</p>}
                <input
                  type='file'
                  accept='.pdf'
                  value={curFile}
                  onChange={handleFileChange}
                  className={`w-full p-2 border text-vnblack1 rounded-md min-h-40`}
                />
                <Button onClick={() => analyzeResume()} disabled={!actButton} className={`flex w-11/12 font-medium normal-case flex-row items-center justify-center text-xl bg-primary text-vnwhite rounded-lg hover:bg-vngrey3 transition duration-300 ease-in-out`}>
                  Analyze Resume
                </Button>
              </div>
            )
        }
        {feedback &&
          <div className='w-full lg:w-11/12 flex flex-col items-center justify-center gap-4 p-4 border-vngrey4 border rounded-lg'>
            <h2 className='w-full text-vnblack1 text-xl text-center'>Feedback</h2>
              <div className='w-full flex flex-col items-start justify-start gap-2 p-4 border-vngrey4 border rounded-lg'>
                <p className='text-success w-full text-sm lg:text-lg'>Question: <span className='text-vnblack2'>1</span></p>
                <p className='text-success w-full text-sm lg:text-base'>Answer: <span className='text-vnblack2'>2</span></p>
                <p className='text-success w-full text-sm lg:text-xl'>Feedback: <span className='text-vnblack2'>3</span></p>
                <p className='text-success w-full text-sm lg:text-xl'>Rate: <span className='text-vnblack2'>    4</span></p>
              </div>
          </div>
        }
      </div>
    </div>
  )
}

export default MockupInterview
import { useContext, useEffect, useState } from 'react'
import Context from '../../Context'

const MockupInterview = () => {
  const [questions, setQuestions] = useState([])

  const {
    userData,
  } = useContext(Context)

  // Function to fetch mockup interview questions from the API
  const fetchQuestions = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_INTERVIEW_API + "/start_interview", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          job_role: userData.jobTitle,
        })
    })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setQuestions(data)
      console.log('Mockup interview questions:', data)
    } catch (error) {
      console.error('Error fetching questions:', error)
    }
  }

  fetchQuestions()
  return (
    <div>MockupInterview</div>
  )
}

export default MockupInterview
import { useEffect, useState } from 'react'

const MockupInterview = () => {
  const [questions, setQuestions] = useState([])

  // Function to fetch mockup interview questions from the API
  const fetchQuestions = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_INTERVIEW_API + "/evaluate-answer", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_INTERVIEW_API_TOKEN}`,
          'x-ms-model-mesh-model-name': `${import.meta.env.VITE_INTERVIEW_API_MODEL}`,
        },
        body: {
          "question": "What is overfitting in machine learning?",
  "answer": "Overfitting happens when the model learns the training data too well..."
        },
    })
      const data = await response.json()
      setQuestions(data)
      console.log('Mockup interview questions:', data)
    } catch (error) {
      console.error('Error fetching questions:', error)
    }
  }

  return (
    <div>MockupInterview</div>
  )
}

export default MockupInterview
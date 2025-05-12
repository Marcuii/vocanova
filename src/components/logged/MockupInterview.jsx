import { useContext, useEffect, useState } from 'react'
import Context from '../../Context'
import { Button, Spinner } from '@material-tailwind/react';
import { MdError } from 'react-icons/md';

const MockupInterview = () => {
  const [questions, setQuestions] = useState(0)
  const [actButton, setActButton] = useState(false)
  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")
  const [started, setStarted] = useState(false)

  const [curQuestion, setCurQuestion] = useState(0)
  const [curAnswer, setCurAnswer] = useState("")
  const [answerError, setAnswerError] = useState("")
  const [actButton2, setActButton2] = useState(false)

  const [feedbacks, setFeedbacks] = useState([])

  const {
    userData,
  } = useContext(Context)

  //Activate Button
  useEffect(() => {
    if (userData.jobTitle) {
      setActButton(true)
      setLoading(false)
    } else {
      setActButton(false)
      setLoading(true)
    }
  }, [userData])

  //Activate Loading
  useEffect(() => {
    if (questions === 0) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [questions])

  //Activate Answer Button
  useEffect(() => {
    if (curAnswer === "" || answerError !== "") {
      setActButton2(false)
    } else {
      setActButton2(true)
    }
  }, [curAnswer, answerError])

  const handleChangeAnswer = (val) => {
    setCurAnswer(val)
    if (val === "") {
      setAnswerError("Please provide an answer.");
    } else if (val.trim().length < 30) {
      setAnswerError("Please provide a more detailed answer.");
    } else if (/^([a-zA-Z])\1{4,}$/.test(val.trim())) {
      setAnswerError("Your answer contains repeated characters. Try writing something meaningful.");
    } else if (/^[0-9\s!@#$%^&*(),.?\":{}|<>[\]\\\-=_+`~]+$/.test(val.trim())) {
      setAnswerError("Answer must include words, not just numbers or symbols.");
    } else if (!/[a-zA-Z]/.test(val.trim())) {
      setAnswerError("Answer must contain at least one letter.");
    } else if (val.trim() === val.trim().toUpperCase() && /[A-Z]/.test(val.trim())) {
      setAnswerError("Avoid writing in all caps.");
    } else {
      setAnswerError("");
    }
  }

  // Function to fetch mockup interview questions from the API
  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const response = await fetch(import.meta.env.VITE_INTERVIEW_API + "/start-interview", {
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
      setQuestions(data.questions)
      setStarted(true)
      setError('')

    } catch (error) {
      setError('Failed to get questions. Please try again later.')
    }
    setLoading(false)
  }

  // Function to fetch the next question
  const fetchNextQuestion = async () => {
    setLoading(true)
    try {
      const response = await fetch(import.meta.env.VITE_INTERVIEW_API + "/submit-answer", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          answer: curAnswer,
          question: questions[curQuestion]
        })
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setFeedbacks([...feedbacks, { ...data, question: questions[curQuestion], answer: curAnswer }])
      setCurQuestion(curQuestion + 1)
      setCurAnswer("")
      setError("")
    } catch (error) {
      setError('Failed to submit answer. Please try again later.')
    }
    setLoading(false)
  }

  return (
    <div className='w-full min-h-screen flex flex-col justify-start items-center gap-5 p-4'>
      <div className='w-11/12 flex flex-wrap items-center justify-center gap-4 p-4'>
        <h1 className='w-full text-primary text-2xl text-center'>Mock-Up Interview</h1>
        {error != "" && <p className='w-full text-center text-lg text-red-500'>{error}</p>}
        <Button onClick={() => fetchQuestions()} disabled={!actButton} className={`${started ? "hidden" : "flex"} w-11/12 font-medium normal-case flex-row items-center justify-center text-xl bg-primary text-vnwhite rounded-lg hover:bg-vngrey3 transition duration-300 ease-in-out`}>
          Start Interview
        </Button>
        {started ?
          (loading ?
            (
              <div className='w-full lg:w-11/12 flex flex-col items-center justify-center gap-4 p-4'>
                <p className='text-2xl text-vnblack1 text-center w-full'>Loading...</p>
                <Spinner className="h-16 w-16 text-primary" />
              </div>
            ) :
            (questions.length > 0 ?
              (
                <div className='w-full lg:w-11/12 flex flex-col items-center justify-center gap-4 p-4 border-vngrey4 border rounded-lg'>
                  <h2 className={`${questions.length === curQuestion ? "hidden" : "block"} w-full text-vnblack1 text-xl text-center`}>{questions[curQuestion]}</h2>
                  {answerError != "" && <p className='flex flex-row gap-2 items-center text-start w-full text-red-500 text-sm -mb-3'><MdError />{answerError}</p>}
                  <textarea
                    value={curAnswer}
                    onChange={(e) => handleChangeAnswer(e.target.value)}
                    className={`${questions.length === curQuestion ? "hidden" : "block"} w-full p-2 border text-vnblack1 rounded-md min-h-40`}
                    rows="4"
                  ></textarea>
                  <Button onClick={() => fetchNextQuestion()} disabled={!actButton2} className={`${questions.length === curQuestion ? "hidden" : "flex"} w-11/12 font-medium normal-case flex-row items-center justify-center text-xl bg-primary text-vnwhite rounded-lg hover:bg-vngrey3 transition duration-300 ease-in-out`}>
                    Submit
                  </Button>
                  {questions.length === curQuestion && <p className='text-2xl text-success text-center w-full'>You have completed the interview!</p>}
                </div>
              ) :
              (<p className='text-2xl text-vnblack1 text-center w-full'>No questions found.</p>)
            )
          ) :
          (<p className='text-2xl text-vnblack1 text-center w-full'>Click the button to start the interview.</p>)
        }
        {feedbacks.length > 0 &&
          <div className='w-full lg:w-11/12 flex flex-col items-center justify-center gap-4 p-4 border-vngrey4 border rounded-lg'>
            <h2 className='w-full text-vnblack1 text-xl text-center'>Feedback</h2>
            {feedbacks.map((feedback, index) => (
              <div key={index} className='w-full flex flex-col items-start justify-start gap-2 p-4 border-vngrey4 border rounded-lg'>
                <p className='text-success w-full text-sm lg:text-lg'>Question: <span className='text-vnblack2'>{feedback.question}</span></p>
                <p className='text-success w-full text-sm lg:text-base'>Answer: <span className='text-vnblack2'>{feedback.answer}</span></p>
                <p className='text-success w-full text-sm lg:text-xl'>Feedback: <span className='text-vnblack2'>{feedback.feedback}</span></p>
                <p className='text-success w-full text-sm lg:text-xl'>Rate: <span className='text-vnblack2'>{feedback.rating}</span></p>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default MockupInterview
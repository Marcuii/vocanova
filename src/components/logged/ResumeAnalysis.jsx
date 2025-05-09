import React, { useState } from 'react'

const ResumeAnalysis = () => {
  const [resume, setResume] = useState(null)
  const [resumeError, setResumeError] = useState("")

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'application/pdf') {
      setResume(file)
    } else {
      setResumeError("Please select a valid PDF file")
    }
  }

  const handleResumeAnalysis = async () => {
    const formData = new FormData()
    formData.append('file', resume)

    try {
      const response = await fetch(import.meta.env.VITE_ANALYSIS_API + "/analyze", {
        method: "POST",
        body: formData,
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      // Handle the response data as needed
      console.log(data)  
      console.log("Resume analyzed successfully")
    } catch (error) {
      setResumeError("Error analyzing resume. Please try again.")
    }
  }
  return (
    <div className='w-full min-h-screen flex flex-col lg:flex-row justify-start items-center lg:justify-center lg:items-start gap-5 p-4'>
      <div className='w-11/12 lg:w-2/3 flex flex-wrap items-center justify-center gap-4 p-4'>
        <h1 className='text-2xl font-bold text-center'>Resume Analysis</h1>
        {resumeError && <p className='text-red-500'>{resumeError}</p>}
        <p className='text-center'>Upload your resume and get instant feedback on how to improve it.</p>
        <p className='text-center'>Accept only PDF</p>
        <input onChange={handleFileChange} type="file" accept=".pdf" className='border border-gray-300 rounded p-2' />
        <button disabled={resume ? false : true} onClick={handleResumeAnalysis} className='bg-blue-500 text-white rounded p-2'>Analyze</button>

      </div>
    </div>
  )
}

export default ResumeAnalysis
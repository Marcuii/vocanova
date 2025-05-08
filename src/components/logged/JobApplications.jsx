import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { use, useContext, useEffect, useState } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { FaPlus } from 'react-icons/fa6';
import Context from "../../Context";
import { DocumentIcon } from "@heroicons/react/24/outline";

const JobApplications = () => {
  const [appJobTitle, setAppJobTitle] = useState("")
  const [appJobTitleError, setAppJobTitleError] = useState("")
  const [appCompanyName, setAppCompanyName] = useState("")
  const [appCompanyNameError, setAppCompanyNameError] = useState("")
  const [appSource, setAppSource] = useState("")
  const [appSourceError, setAppSourceError] = useState("")
  const [appStatus, setAppStatus] = useState("")
  const [appStatusError, setAppStatusError] = useState("")
  const [appDate, setAppDate] = useState(new Date())
  const [appDateError, setAppDateError] = useState("")
  const [appNotes, setAppNotes] = useState("")
  const [appAttachments, setAppAttachments] = useState([])

  const {
    token,
    jobApplications,
    getJobApplications,
    handleLogout,
  } = useContext(Context)

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const [curApp, setCurApp] = useState({})
  const [actButton, setActButton] = useState(true)
  const [dates, setDates] = useState([])

  // Calendar highlight dates
  useEffect(() => {
    const dates = jobApplications.map((application) => {
      return new Date(application.applicationDate).toLocaleDateString()
    })
    setDates(dates)
  }, [jobApplications])
  // Calendar functions
  

  // Drawer functions
  const handleopen = () => {
    if (open) {
      setOpen(false)
      setAppJobTitle("")
      setAppCompanyName("")
      setAppSource("")
      setAppStatus("")
      setAppDate(new Date())
      setAppNotes("")
      setAppAttachments([])
      setAppJobTitleError("")
      setAppCompanyNameError("")
      setAppSourceError("")
      setAppStatusError("")
      setAppDateError("")
    }
    else {
      setOpen(true)
    }
  }

  const handleopenEdit = () => {
    if (openEdit) {
      setCurApp({})
      setAppJobTitle("")
      setAppCompanyName("")
      setAppSource("")
      setAppStatus("")
      setAppDate(new Date())
      setAppNotes("")
      setAppAttachments([])
      setAppJobTitleError("")
      setAppCompanyNameError("")
      setAppSourceError("")
      setAppStatusError("")
      setAppDateError("")
      setOpenEdit(false)
    }
    else {
      setOpenEdit(true)
    }
  }

  useEffect(() => {
    if (openEdit) {
      setAppJobTitle(curApp.jobTitle)
      setAppCompanyName(curApp.companyName)
      setAppSource(curApp.applicationSource)
      setAppStatus(curApp.status)
      setAppDate(new Date(curApp.applicationDate))
      setAppNotes(curApp.notes)
      //setAppAttachments(curApp.attachment)
    }
  }, [openEdit])

  // Validation functions
  const handleJobTitleChange = (e) => {
    setAppJobTitle(e.target.value)
    checkJobTitle(e)
  }
  const checkJobTitle = (e) => {
    const jobTitle = e.target.value
    if (jobTitle.length < 3) {
      setAppJobTitleError("Job title must be at least 3 characters long")
    } else if (jobTitle.length > 50) {
      setAppJobTitleError("Job title must be less than 50 characters long")
    } else if (!/^[a-zA-Z0-9 ]+$/.test(jobTitle)) {
      setAppJobTitleError("Job title can only contain letters, numbers, and spaces")
    } else {
      setAppJobTitleError("")
    }
  }

  const handleCompanyNameChange = (e) => {
    setAppCompanyName(e.target.value)
    checkCompanyName(e)
  }
  const checkCompanyName = (e) => {
    const companyName = e.target.value
    if (companyName.length < 3) {
      setAppCompanyNameError("Company name must be at least 3 characters long")
    } else if (companyName.length > 50) {
      setAppCompanyNameError("Company name must be less than 50 characters long")
    } else if (!/^[a-zA-Z0-9 ]+$/.test(companyName)) {
      setAppCompanyNameError("Company name can only contain letters, numbers, and spaces")
    } else {
      setAppCompanyNameError("")
    }
  }

  const handleSourceChange = (e) => {
    setAppSource(e.target.value)
    checkSource(e)
  }
  const checkSource = (e) => {
    const source = e.target.value
    if (source.length < 3) {
      setAppSourceError("Source must be at least 3 characters long")
    } else {
      setAppSourceError("")
    }
  }

  const handleStatusChange = (e) => {
    setAppStatus(e.target.value)
    checkStatus(e)
  }
  const checkStatus = (e) => {
    const status = e.target.value
    if (status === "") {
      setAppStatusError("Status is required")
    } else {
      setAppStatusError("")
    }
  }

  const handleDateChange = (date) => {
    setAppDate(date)
    checkDate(date)
  }
  const checkDate = (date) => {
    const today = new Date()
    if (date > today) {
      setAppDateError("Date cannot be in the future")
    } else {
      setAppDateError("")
    }
  }

  // Check if any of the fields are empty or have errors
  useEffect(() => {
    if (appJobTitleError || appCompanyNameError || appSourceError || appStatusError || appDateError || appDate == "" || appStatus == "" || appJobTitle == "" || appCompanyName == "" || appSource == "") {
      setActButton(true)
    } else {
      setActButton(false)
    }
  }, [appJobTitleError, appCompanyNameError, appSourceError, appStatusError, appDateError, appJobTitle, appCompanyName, appSource, appStatus, appDate])

  // Backend functions
  const submitApplication = async () => {
    // formData
    const formData = new FormData()
    formData.append("jobTitle", appJobTitle)
    formData.append("companyName", appCompanyName)
    formData.append("ApplicationSource", appSource)
    formData.append("status", appStatus)
    formData.append("applicationDate", appDate.toISOString())
    formData.append("notes", appNotes)
    formData.append("attachment", appAttachments)

    // Handle form submission logic here
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + "/JobApplication", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      })
      if (response.status === 201) {
        getJobApplications()
        window.location.reload()
      } else if (response.status === 401) {
        handleLogout()
      } else {
        const data = await response.json()
        console.error("Error during form submission:", data)
      }
      return
    } catch (error) {
      // Handle error here
      console.error("Error during get user data:", error)
    }
  }
  const handleDelete = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + `/JobApplication/${curApp.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      if (response.status === 204) {
        getJobApplications()
        window.location.reload()
      } else if (response.status === 401) {
        handleLogout()
      }
      return
    }
    catch (error) {
      // Handle error here
      console.error("Error during get user data:", error)
    }
  }
  const handleEdit = async () => {
    // formData
    const formData = new FormData()
    formData.append("jobTitle", appJobTitle)
    formData.append("companyName", appCompanyName)
    formData.append("ApplicationSource", appSource)
    formData.append("status", appStatus)
    formData.append("applicationDate", appDate.toISOString())
    if (appNotes !== "") {
      formData.append("notes", appNotes)
    }

    // Handle form submission logic here
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL + `/JobApplication/${curApp.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      })
      if (response.status === 204) {
        getJobApplications()
        window.location.reload()
      } else if (response.status === 401) {
        handleLogout()
      } else {
        const data = await response.json()
        console.error("Error during form submission:", data)
      }
      return
    } catch (error) {
      // Handle error here
      console.error("Error during get user data:", error)
    }
  }

  return (
    <div className='w-full min-h-screen flex flex-col lg:flex-row justify-start items-center lg:justify-center lg:items-start gap-5 p-4'>
      <div className='w-11/12 lg:w-2/3 flex flex-wrap items-center justify-center gap-4 p-4'>
        <div className='w-full flex flex-row items-center justify-between gap-4 p-4'>
          <h1 className='text-2xl text-center'>
            Job Applications
          </h1>
          <button onClick={handleopen} className='bg-primary text-white px-4 py-2 rounded-full h-12 shadow-md hover:bg-secondary transition duration-300'>
            <FaPlus />
          </button>
        </div>
        {jobApplications.length > 0 ? (
          jobApplications.map((application, index) => (
            <div key={index} onClick={() => { setCurApp(application), handleopenEdit() }} className='w-5/12 lg:w-3/12 flex flex-col items-start justify-start gap-3 p-4 bg-vnbg shadow-md rounded-lg hover:shadow-lg transition duration-300'>
              <h2 className='text-xl font-bold text-primary mb-3'>{application.jobTitle}</h2>
              <p className='text-md text-vngrey2 flex flex-row'>Company: <span className="ml-2 text-vnblack1"> {application.companyName}</span></p>
              <p className='text-md text-vngrey2 flex flex-col items-start sm:flex-row sm:items-center'>Status: 
                {application.status === "Offered" && <span className="ml-2 bg-vngrey1 p-2 rounded-lg"> {application.status}</span>}
                {application.status === "Applied" && <span className="ml-2 bg-secondary p-2 rounded-lg"> {application.status}</span>}
                {application.status === "Interviewed" && <span className="ml-2 bg-primary p-2 rounded-lg"> {application.status}</span>}
                {application.status === "Rejected" && <span className="ml-2 bg-error p-2 rounded-lg"> {application.status}</span>}
                {application.status === "Accepted" && <span className="ml-2 bg-success p-2 rounded-lg"> {application.status}</span>}
              </p>
            </div>
          ))
        ) : (
          <p className='text-2xl text-vnblack1'>No job applications found.</p>
        )}


      </div>
      <div className='w-11/12 lg:w-1/3 p-4 flex flex-col items-center justify-center gap-4 h-full'>
        <h1 className='text-2xl text-center'>Calendar</h1>
        <Calendar
          className='w-full p-4 rounded-xl bg-white shadow-lg'
          value={new Date()}
          tileClassName={({ date, view }) => {
          const dateString = date.toLocaleDateString()
          if (view === 'month' && dates.includes(dateString)) {
            return 'rounded-lg bg-secondary';
          }
          if (view === 'month' && date === new Date()) {
            return 'rounded-lg bg-primary text-white';
          }
        }}
        />
        <hr className='w-full border-vngrey1' />
        <h1 className='text-xl text-center'>Important Dates</h1>
        {jobApplications.length > 0 ? (
          jobApplications.map((application, index) => (
              <div key={index} className='w-full flex flex-col items-start justify-start gap-3 p-4 bg-vnbg shadow-md rounded-lg hover:shadow-lg transition duration-300'>
                <h2 className='text-xl font-bold text-primary mb-3'>{application.jobTitle}</h2>
                <p className='text-md text-vngrey2'>Company: <span className="text-vnblack1">{application.companyName}</span></p>
                <p className='text-md text-vngrey2'>Date: <span className="text-vnblack1">{new Date(application.applicationDate).toLocaleDateString()}</span></p>
              </div>
            ))) : (
          <p className='text-2xl text-vnblack1'>No important dates found.</p>
        )}

      </div>

      <Dialog open={open} handler={handleopen}>
        <DialogHeader>Add new job application</DialogHeader>
        <DialogBody className="flex flex-col gap-4 w-full max-h-[65vh] overflow-y-auto">
          <label className="text-md font-medium text-vngrey2 mt-5">Job Title</label>
          <input
            type="text"
            value={appJobTitle}
            onChange={(e) => handleJobTitleChange(e)}
            className={`w-full p-2 border text-vnblack1 rounded-md ${appJobTitleError ? 'border-red-500' : 'border-gray-300'}`}
          />
          {appJobTitleError && <p className="text-red-500 text-sm">{appJobTitleError}</p>}

          <label className="text-md font-medium text-vngrey2 mt-5">Company Name</label>
          <input
            type="text"
            value={appCompanyName}
            onChange={(e) => handleCompanyNameChange(e)}
            className={`w-full p-2 border text-vnblack1 rounded-md ${appCompanyNameError ? 'border-red-500' : 'border-gray-300'}`}
          />
          {appCompanyNameError && <p className="text-red-500 text-sm">{appCompanyNameError}</p>}

          <label className="text-md font-medium text-vngrey2 mt-5">Source</label>
          <input
            type="text"
            value={appSource}
            onChange={(e) => handleSourceChange(e)}
            className={`w-full p-2 border text-vnblack1 rounded-md ${appSourceError ? 'border-red-500' : 'border-gray-300'}`}
          />
          {appSourceError && <p className="text-red-500 text-sm">{appSourceError}</p>}

          <label className="text-md font-medium text-vngrey2 mt-5">Status</label>
          <select
            value={appStatus}
            onChange={(e) => handleStatusChange(e)}
            className={`w-full p-2 border text-vnblack1 rounded-md ${appStatusError ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select status</option>
            <option value="Offered">Offered</option>
            <option value="Applied">Applied</option>
            <option value="Interviewed">Interviewed</option>
            <option value="Rejected">Rejected</option>
            <option value="Accepted">Accepted</option>
          </select>
          {appStatusError && <p className="text-red-500 text-sm">{appStatusError}</p>}

          <label className="text-md font-medium text-vngrey2 mt-5">Date</label>
          <input
            type="date"
            min={new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0]}
            max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}
            value={appDate.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(new Date(e.target.value))}
            className={`w-full p-2 border text-vnblack1 rounded-md ${appDateError ? 'border-red-500' : 'border-gray-300'}`}
          />
          {appDateError && <p className="text-red-500 text-sm">{appDateError}</p>}

          <label className="text-md font-medium text-vngrey2 mt-5">Notes</label>
          <textarea
            value={appNotes}
            onChange={(e) => setAppNotes(e.target.value)}
            className="w-full p-2 border text-vnblack1 rounded-md min-h-16"
            rows="4"
          ></textarea>

          <label className="text-md font-medium text-vngrey2 mt-5">Attachments</label>
          <input
            type="file"
            onChange={(e) => setAppAttachments(e.target.files[0])}
            accept=".doc, .docx, .pdf"
            className="w-full p-2 border text-vnblack1 rounded-md"
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleopen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button disabled={actButton} onClick={submitApplication} variant="gradient" color="green">
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={openEdit} handler={handleopenEdit}>
        <DialogHeader>Edit job application</DialogHeader>
        <DialogBody className="flex flex-col gap-4 w-full max-h-[65vh] overflow-y-auto">
          <label className="text-md font-medium text-vngrey2 mt-5">Job Title</label>
          <input
            type="text"
            value={appJobTitle}
            onChange={(e) => handleJobTitleChange(e)}
            className={`w-full p-2 border text-vnblack1 rounded-md ${appJobTitleError ? 'border-red-500' : 'border-gray-300'}`}
          />
          {appJobTitleError && <p className="text-red-500 text-sm">{appJobTitleError}</p>}

          <label className="text-md font-medium text-vngrey2 mt-5">Company Name</label>
          <input
            type="text"
            value={appCompanyName}
            onChange={(e) => handleCompanyNameChange(e)}
            className={`w-full p-2 border text-vnblack1 rounded-md ${appCompanyNameError ? 'border-red-500' : 'border-gray-300'}`}
          />
          {appCompanyNameError && <p className="text-red-500 text-sm">{appCompanyNameError}</p>}

          <label className="text-md font-medium text-vngrey2 mt-5">Source</label>
          <input
            type="text"
            value={appSource}
            onChange={(e) => handleSourceChange(e)}
            className={`w-full p-2 border text-vnblack1 rounded-md ${appSourceError ? 'border-red-500' : 'border-gray-300'}`}
          />
          {appSourceError && <p className="text-red-500 text-sm">{appSourceError}</p>}

          <label className="text-md font-medium text-vngrey2 mt-5">Status</label>
          <select
            value={appStatus}
            onChange={(e) => handleStatusChange(e)}
            className={`w-full p-2 border text-vnblack1 rounded-md ${appStatusError ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select status</option>
            <option value="Offered">Offered</option>
            <option value="Applied">Applied</option>
            <option value="Interviewed">Interviewed</option>
            <option value="Rejected">Rejected</option>
            <option value="Accepted">Accepted</option>
          </select>
          {appStatusError && <p className="text-red-500 text-sm">{appStatusError}</p>}

          <label className="text-md font-medium text-vngrey2 mt-5">Date</label>
          <input
            type="date"
            min={new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0]}
            max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}
            value={appDate.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(new Date(e.target.value))}
            className={`w-full p-2 border text-vnblack1 rounded-md ${appDateError ? 'border-red-500' : 'border-gray-300'}`}
          />
          {appDateError && <p className="text-red-500 text-sm">{appDateError}</p>}

          <label className="text-md font-medium text-vngrey2 mt-5">Notes</label>
          <textarea
            value={appNotes}
            onChange={(e) => setAppNotes(e.target.value)}
            className="w-full p-2 border text-vnblack1 rounded-md min-h-16"
            rows="4"
          ></textarea>

          <label className="text-md font-medium text-vngrey2 mt-5">Attachments</label>
          <p className='flex flex-wrap gap-2 justify-center items-center'>Files: {curApp.attachmentUrl ? <DocumentIcon className='h-6 w-6 text-primary' onClick={() => window.open(curApp.attachmentUrl, "_blank")} /> : "None"}</p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleopenEdit}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button onClick={handleDelete} variant="gradient" color="red" className="mr-1" >
            <span>Delete</span>
          </Button>
          <Button disabled={actButton} onClick={handleEdit} variant="gradient" color="green">
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>

    </div>
  )
}

export default JobApplications
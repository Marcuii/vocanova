import { useState, useEffect, useContext, use } from "react";
import universityData from "../universities.json";
import Context from "../../Context";
import { MdError } from "react-icons/md";

const degreeOptions = [
  "High School Diploma",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate (Ph.D.)",
  "Professional Degree (MD, JD, etc.)",
  "Certificate/Diploma"
]

function Experience() {
  // Country states
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [countryError, setUpCountryError] = useState("");
  const [universities, setUniversities] = useState(universityData.filter(uni => uni.country === country));

  const {
    //education
    upDegree,
    setUpDegree,
    upDegreeError,
    setUpDegreeError,
    upUniversity,
    setUpUniversity,
    upUniversityError,
    setUpUniversityError,
    upGraduationDate,
    setUpGraduationDate,
    upGraduationDateError,
    setUpGraduationDateError,
    //experience
    upJobTitle,
    setUpJobTitle,
    upJobTitleError,
    setUpJobTitleError,
    upCompany,
    setUpCompany,
    upCompanyError,
    setUpCompanyError,
    upExperienceYears,
    setUpExperienceYears,
    upExperienceYearsError,
    setUpExperienceYearsError,
    upExpectedSalary,
    setUpExpectedSalary,
    upExpectedSalaryError,
    setUpExpectedSalaryError,

    experienceDone,
    setExperienceDone,
  } = useContext(Context);

  const handleDegreeChange = (val) => {
    setUpDegree(val);
    checkDegree(val);
  };
  const checkDegree = (val) => {
    if (val === "") {
      setUpDegreeError("Please select a degree");
    } else {
      setUpDegreeError("");
    }
  };

  const handleCountryChange = (val) => {
    setCountry(val);
    checkCountry(val);
  };
  const checkCountry = (val) => {
    if (val === "") {
      setUpCountryError("Please select a country");
    } else {
      setUpCountryError("");
    }
  };

  const handleUniversityChange = (val) => {
    setUpUniversity(val);
    checkUniversity(val);
  };
  const checkUniversity = (val) => {
    if (val === "") {
      setUpUniversityError("Please select a university");
    } else {
      setUpUniversityError("");
    }
  };

  const handleGraduationDateChange = (val) => {
    setUpGraduationDate(val);
    checkGraduationDate(val);
  };
  const checkGraduationDate = (val) => {
    if (val === "") {
      setUpGraduationDateError("Please select a graduation date");
    } else {
      setUpGraduationDateError("");
    }
  };

  const handleJobTitleChange = (val) => {
    setUpJobTitle(val);
    checkJobTitle(val);
  };
  const checkJobTitle = (val) => {
    if (val === "") {
      setUpJobTitleError("Please enter a job title");
    } else if (val.length < 2) {
      setUpJobTitleError("Job title must be at least 2 characters long");
    } else if (val.length > 50) {
      setUpJobTitleError("Job title must be less than 50 characters long");
    } else if (!/^[a-zA-Z0-9\s]+$/.test(val)) {
      setUpJobTitleError("Job title can only contain letters, numbers, and spaces");
    } else {
      setUpJobTitleError("");
    }
  };

  const handleCompanyChange = (val) => {
    setUpCompany(val);
    checkCompany(val);
  };
  const checkCompany = (val) => {
    if (val === "") {
      setUpCompanyError("Please enter a company name");
    } else if (val.length < 2) {
      setUpCompanyError("Company name must be at least 2 characters long");
    } else if (val.length > 50) {
      setUpCompanyError("Company name must be less than 50 characters long");
    } else if (!/^[a-zA-Z0-9\s]+$/.test(val)) {
      setUpCompanyError("Company name can only contain letters, numbers, and spaces");
    } else {
      setUpCompanyError("");
    }
  };

  const handleExperienceYearsChange = (val) => {
    setUpExperienceYears(val);
    checkExperienceYears(val);
  };
  const checkExperienceYears = (val) => {
    if (val === "") {
      setUpExperienceYearsError("Please enter years of experience");
    } else if (isNaN(val)) {
      setUpExperienceYearsError("Years of experience must be a number");
    } else if (parseInt(val) < 0) {
      setUpExperienceYearsError("Years of experience cannot be negative");
    } else if (parseInt(val) > 50) {
      setUpExperienceYearsError("Years of experience cannot exceed 50 years");
    } else {
      setUpExperienceYearsError("");
    }
  };

  const handleExpectedSalaryChange = (val) => {
    setUpExpectedSalary(val);
    checkExpectedSalary(val);
  };
  const checkExpectedSalary = (val) => {
    if (val === "") {
      setUpExpectedSalaryError("Please enter a maximum salary");
    } else if (isNaN(val)) {
      setUpExpectedSalaryError("Maximum salary must be a number");
    } else if (parseInt(val) < 0) {
      setUpExpectedSalaryError("Maximum salary cannot be negative");
    } else if (parseInt(val) > 1000000) {
      setUpExpectedSalaryError("Maximum salary cannot exceed 1,000,000");
    } else {
      setUpExpectedSalaryError("");
    }
  };

  useEffect(() => {
    if (
      upDegreeError === "" &&
      countryError === "" &&
      upUniversityError === "" &&
      upGraduationDateError === "" &&
      upJobTitleError === "" &&
      upCompanyError === "" &&
      upExperienceYearsError === "" &&
      upExpectedSalaryError === "" &&
      upDegree !== "" &&
      country !== "" &&
      upUniversity !== "" &&
      upGraduationDate !== "" &&
      upJobTitle !== "" &&
      upCompany !== "" &&
      upExperienceYears !== "" &&
      upExpectedSalary !== ""
    ) {
      setExperienceDone(true);
    } else {
      setExperienceDone(false);
    }
  }, [
    upDegreeError,
    countryError,
    upUniversityError,
    upGraduationDateError,
    upJobTitleError,
    upCompanyError,
    upExperienceYearsError,
    upExpectedSalaryError,
    upDegree,
    country,
    upUniversity,
    upGraduationDate,
    upJobTitle,
    upCompany,
    upExperienceYears,
    upExpectedSalary,
  ]);

  // Fetch universities based on selected country
  useEffect(() => {
    const filteredUniversities = universityData.filter(uni => uni.country === country);
    setUniversities(filteredUniversities);
  }, [country]);

  // Fetch all countries when the component mounts
  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/positions");
        const data = await response.json();
        if (data && data.data) {
          const countryNames = data.data.map((item) => item.name);
          setCountries(countryNames);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }

    fetchCountries();
  }, []);

  return (
    <div className='w-full flex flex-col items-center justify-center gap-7 mt-[6rem]'>
      <h1 className='text-start w-full -ml-3 text-vngrey1 text-2xl'>Education</h1>

      <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Degree</p>
      {upDegreeError != "" && <p className='flex flex-row gap-2 items-center text-start w-full text-red-500 text-sm -mb-5'><MdError />{upDegreeError}</p>}
      <select
        className="w-full p-4 border-2 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out"
        onChange={(e) => handleDegreeChange(e.target.value)}
        value={upDegree}
      >
        <option value="">Select Degree</option>
        {degreeOptions.map((degree, idx) => (
          <option key={idx} value={degree}>
            {degree}
          </option>
        ))}
      </select>

      <p className='text-start w-full text-vngrey2 text-lg -mb-5'>University Country</p>
      {countryError != "" && <p className='flex flex-row gap-2 items-center text-start w-full text-red-500 text-sm -mb-5'><MdError />{countryError}</p>}
      <select value={country} onChange={(e) => handleCountryChange(e.target.value)} className="w-full p-4 border-2 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out">
        <option value="">Select Country</option>
        {countries.map((country, idx) => (
          <option key={idx} value={country}>
            {country}
          </option>
        ))}
      </select>

      <p className='text-start w-full text-vngrey2 text-lg -mb-5'>University</p>
      {upUniversityError != "" && <p className='flex flex-row gap-2 items-center text-start w-full text-red-500 text-sm -mb-5'><MdError />{upUniversityError}</p>}
      <select
        className="w-full p-4 border-2 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out"
        value={upUniversity}
        disabled={country === "" || countryError !== ""}
        onChange={(e) => handleUniversityChange(e.target.value)}
      >
        <option value="">Select</option>
        {universities.map((uni, idx) => (
          <option key={idx} value={uni.name}>
            {uni.name}
          </option>
        ))}
      </select>

      <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Graduation Year</p>
      {upGraduationDateError != "" && <p className='flex flex-row gap-2 items-center text-start w-full text-red-500 text-sm -mb-5'><MdError />{upGraduationDateError}</p>}
      <select
        className="w-full p-4 border-2 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out"
        value={upGraduationDate}
        onChange={(e) => handleGraduationDateChange(e.target.value)}
      >
        <option value="">Select Graduation Year</option>
        {Array.from({ length: 50 }, (_, i) => {
          const year = (new Date().getFullYear() + 5) - i;
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>


      <h1 className='text-start w-full -ml-3 text-vngrey1 text-2xl'>Experience</h1>

      <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Job title</p>
      {upJobTitleError != "" && <p className='flex flex-row gap-2 items-center text-start w-full text-red-500 text-sm -mb-5'><MdError />{upJobTitleError}</p>}
      <input
        type="text"
        placeholder="Enter your job title"
        className="w-full h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out"
        value={upJobTitle}
        onChange={(e) => handleJobTitleChange(e.target.value)}
      />

      <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Company</p>
      {upCompanyError != "" && <p className='flex flex-row gap-2 items-center text-start w-full text-red-500 text-sm -mb-5'><MdError />{upCompanyError}</p>}
      <input
        type="text"
        placeholder="Enter your company name"
        className="w-full h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out"
        value={upCompany}
        onChange={(e) => handleCompanyChange(e.target.value)}
      />

      <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Years of Experience</p>
      {upExperienceYearsError != "" && <p className='flex flex-row gap-2 items-center text-start w-full text-red-500 text-sm -mb-5'><MdError />{upExperienceYearsError}</p>}
      <input
        type="number"
        placeholder="Enter your years of experience"
        className="w-full h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out"
        value={upExperienceYears}
        onChange={(e) => handleExperienceYearsChange(e.target.value)}
      />

      <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Expected Salary</p>
      {upExpectedSalaryError != "" && <p className='flex flex-row gap-2 items-center text-start w-full text-red-500 text-sm -mb-5'><MdError />{upExpectedSalaryError}</p>}
      <input
        type="number"
        placeholder="Enter your maximum salary"
        className="w-full h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out"
        value={upExpectedSalary}
        onChange={(e) => handleExpectedSalaryChange(e.target.value)}
      />

    </div>
  );
}

export default Experience;

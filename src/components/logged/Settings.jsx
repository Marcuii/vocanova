import React, { use, useContext, useEffect, useState } from 'react';
import universityData from '../firstlogged/universities.json';
import Context from '../../Context';
import { FaPlus } from 'react-icons/fa';
import { MdError, MdRemove } from 'react-icons/md';
import { CiCircleRemove } from 'react-icons/ci';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Button, Spinner } from '@material-tailwind/react';

const degreeOptions = [
  "High School Diploma",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate (Ph.D.)",
  "Professional Degree (MD, JD, etc.)",
  "Certificate/Diploma"
]

const Settings = () => {
  const [editFullName, setEditFullName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const {
    userData,

    upPhoneNumber,
    setUpPhoneNumber,
    upPhoneNumberError,
    setUpPhoneNumberError,
    upGender,
    setUpGender,
    upGenderError,
    setUpGenderError,
    upDOB,
    setUpDOB,
    upDOBError,
    setUpDOBError,
    upCountry,
    setUpCountry,
    upCountryError,
    setUpCountryError,
    upCity,
    setUpCity,
    upCityError,
    setUpCityError,
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
    //skills
    hardSkills,
    setHardSkills,
    hardSkillsError,
    setHardSkillsError,
    softSkills,
    setSoftSkills,
    softSkillsError,
    setSoftSkillsError,
    //avatar
    avatar,
    setAvatar,
    //resume
    resume,
    setResume,

    //save changes
    submitProfileError,
    setSubmitProfileError,

    handleProfileUpdate,
  } = useContext(Context);

  useEffect(() => {
    if (userData.dateOfBirth === undefined) {
      setLoading(true);
    } else {
      setEditFullName(userData.fullName);
      setEditEmail(userData.email);
      setUpPhoneNumber(userData.phoneNumber);
      setUpGender(userData.gender);
      setUpDOB(userData.dateOfBirth.split("T")[0]);
      setUpCountry(userData.country);
      setUpCity(userData.city);
      setUpDegree(userData.degree);
      setUpUniversity(userData.university);
      setUpGraduationDate(userData.graduationYear);
      setUpJobTitle(userData.jobTitle);
      setUpCompany(userData.company);
      setUpExperienceYears(userData.experienceYears);
      setUpExpectedSalary(userData.salaryExpectations);
      setHardSkills(userData.hardSkills);
      setSoftSkills(userData.softSkills);
      setLoading(false);
    }
  }, [userData]);

  const [actButton, setActButton] = useState(false);
  const [loading, setLoading] = useState(true);

  // Country and city states
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const [universities, setUniversities] = useState(universityData.filter(uni => uni.country === upCountry));

  // Hard and soft skills states
  const [curHardSkill, setCurHardSkill] = useState("");
  const [curSoftSkill, setCurSoftSkill] = useState("");

  const [preview, setPreview] = useState(null);

  // Max date for date input
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split("T")[0];

  const handlePhoneNumberChange = (val) => {
    setUpPhoneNumber(val);
    checkPhoneNumber(val);
  };
  const checkPhoneNumber = (val) => {
    const phoneNumberRegex = /^\d+$/;
    if (val === "") {
      setUpPhoneNumberError("Please enter a phone number");
    } else if (!phoneNumberRegex.test(val)) {
      setUpPhoneNumberError("Please enter a valid phone number");
    } else {
      setUpPhoneNumberError("");
    }
  };

  const handleGenderChange = (val) => {
    setUpGender(val);
    checkGender(val);
  };
  const checkGender = (val) => {
    if (val === "") {
      setUpGenderError("Please select a Gender");
    } else {
      setUpGenderError("");
    }
  };

  const handleDOBChange = (val) => {
    setUpDOB(val);
    checkDOB(val);
  };
  const checkDOB = (val) => {
    const today = new Date();
    const dob = new Date(val);
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      // age is constant
      age - 1;
    }
    if (val === "") {
      setUpDOBError("Please enter a date of birth");
    } else if (age < 18) {
      setUpDOBError("You must be at least 18 years old");
    } else {
      setUpDOBError("");
    }
  };

  const handleCountryChange = (val) => {
    setUpCountry(val);
    checkCountry(val);
  };
  const checkCountry = (val) => {
    if (val === "") {
      setUpCountryError("Please select a country");
    } else {
      setUpCountryError("");
    }
  };

  const handleCityChange = (val) => {
    setUpCity(val);
    checkCity(val);
  };
  const checkCity = (val) => {
    if (val === "") {
      setUpCityError("Please select a city");
    } else {
      setUpCityError("");
    }
  };

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
    } else if (!/[a-zA-Z]/.test(val)) {
      setUpJobTitleError("Job title must include at least one letter");
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

  // Function to handle adding hard skills
  const handleAddHardSkill = () => {
    if (curHardSkill !== "") {
      if (hardSkills.length < 7) {
        // Check if the skill already exists
        if (hardSkills.includes(curHardSkill)) {
          setHardSkillsError("This hard skill already exists.");
        } else if (!/^[a-zA-Z\s]+$/.test(curHardSkill)) {
          setHardSkillsError("Please enter a valid hard skill (letters and spaces only).");
        } else {
          setHardSkills([...hardSkills, curHardSkill]);
          setHardSkillsError("");
          checkHardSkill();
        }
      } else {
        setHardSkillsError("You can only add up to 7 hard skills.");
      }
    } else if (curHardSkill.length > 20) {
      setHardSkillsError("Please enter a hard skill with less than 20 characters.");
    } else if (curHardSkill.length < 2) {
      setHardSkillsError("Please enter a hard skill with more than 2 characters.");
    } else {
      setHardSkillsError("Please enter a hard skill.");
    }
  };
  const checkHardSkill = () => {
    if (hardSkills.length < 3) {
      setHardSkillsError("Please enter at least 3 hard skills.");
    } else {
      setHardSkillsError("");
    }
  };

  // Function to handle removing hard skills
  const handleRemoveHardSkill = (index) => {
    const newHardSkills = [...hardSkills];
    newHardSkills.splice(index, 1);
    setHardSkills(newHardSkills);
    checkHardSkill();
  };

  // Function to handle adding soft skills
  const handleAddSoftSkill = () => {
    if (curSoftSkill !== "") {
      if (softSkills.length < 7) {
        // Check if the skill already exists
        if (softSkills.includes(curSoftSkill)) {
          setSoftSkillsError("This soft skill already exists.");
        } else if (!/^[a-zA-Z\s]+$/.test(curSoftSkill)) {
          setSoftSkillsError("Please enter a valid soft skill (letters and spaces only).");
        } else {
          setSoftSkills([...softSkills, curSoftSkill]);
          setSoftSkillsError("");
          checkSoftSkill();
        }
      } else {
        setSoftSkillsError("You can only add up to 7 soft skills.");
      }
    } else if (curSoftSkill.length > 20) {
      setSoftSkillsError("Please enter a soft skill with less than 20 characters.");
    } else if (curSoftSkill.length < 2) {
      setSoftSkillsError("Please enter a soft skill with more than 2 characters.");
    } else {
      setSoftSkillsError("Please enter a soft skill.");
    }
  };
  const checkSoftSkill = () => {
    if (softSkills.length < 3) {
      setSoftSkillsError("Please enter at least 3 soft skills.");
    } else {
      setSoftSkillsError("");
    }
  };

  // Function to handle removing soft skills
  const handleRemoveSoftSkill = (index) => {
    const newSoftSkills = [...softSkills];
    newSoftSkills.splice(index, 1);
    setSoftSkills(newSoftSkills);
    checkSoftSkill();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleResFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  useEffect(() => {
    if (avatar) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // base64 preview
      };
      reader.readAsDataURL(avatar);
    } else {
      setPreview(null);
    }
  }, [avatar]);



  useEffect(() => {
    checkHardSkill();
    checkSoftSkill();
  }, [hardSkills, softSkills]);

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

  // Fetch cities when a country is selected
  useEffect(() => {
    async function fetchCities() {
      if (!upCountry) return;
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: upCountry })
        });
        const data = await response.json();
        if (data && data.data) {
          setCities(data.data);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }

    fetchCities();
  }, [upCountry]);

  useEffect(() => {
    const filteredUniversities = universityData.filter(uni => uni.country === upCountry);
    setUniversities(filteredUniversities);
  }, [upCountry]);

  useEffect(() => {
    if (upPhoneNumberError === "" && upGenderError === "" && upDOBError === "" && upCountryError === "" && upCityError === "" && upDegreeError === "" && upUniversityError === "" && upGraduationDateError === "" && upJobTitleError === "" && upCompanyError === "" && upExperienceYearsError === "" && upExpectedSalaryError === "" && hardSkills.length >= 3 && softSkills.length >= 3) {
      setActButton(true);
    } else {
      setActButton(false);
    }
  }, [
    upPhoneNumberError,
    upGenderError,
    upDOBError,
    upCountryError,
    upCityError,
    upDegreeError,
    upUniversityError,
    upGraduationDateError,
    upJobTitleError,
    upCompanyError,
    upExperienceYearsError,
    upExpectedSalaryError,
    hardSkills,
    softSkills,
  ]);

  if (loading) {
    return (
      <div className='w-full min-h-screen flex flex-col gap-3 justify-center items-center'>
        <h1 className='text-2xl font-semibold text-primary'>Loading...</h1>
        <Spinner className="h-16 w-16 text-primary" />
      </div>
    )
  } else {
    return (
      <div className='w-full min-h-screen flex flex-col justify-start items-center gap-5 p-8'>
        <h2 className="text-xl font-semibold text-primary">Edit Personal Information</h2>
        {submitProfileError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{submitProfileError}</p>}
        <div className="relative w-40 h-40 lg:h-60 lg:w-60">
          <img
            src={
              preview
                ? preview
                : userData.profilePictureUrl
                  ? userData.profilePictureUrl
                  : "https://static-00.iconduck.com/assets.00/profile-major-icon-512x512-xosjbbdq.png"
            }
            alt="Profile Preview"
            className="rounded-full object-cover w-full h-full border border-gray-300 shadow-sm"
          />

          {/* Upload Pencil Icon */}
          <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <PencilIcon className="w-5 h-5 text-gray-700" />
          </label>

          {/* Optional: Remove Button */}
          {preview && (
            <button
              onClick={() => {
                setPreview(null);
                setAvatar(null);
              }}
              className="absolute top-2 right-2 bg-error text-white p-1 rounded-full hover:bg-red-700 transition"
            >
              <CiCircleRemove className="w-5 h-5" />
            </button>
          )}
        </div>
        <h1 className='text-start w-full -ml-3 text-vngrey1 text-2xl'>Personal</h1>
        <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Full Name</p>
        <input name="fullName" value={editFullName} disabled className="w-full p-4 border-2 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" placeholder="Full Name" />
        <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Email</p>
        <input name="email" value={editEmail} disabled className="w-full p-4 border-2 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" placeholder="Email" />
        <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Phone Number</p>
        {upPhoneNumberError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{upPhoneNumberError}</p>}
        <input
          type="tel"
          placeholder="Phone number"
          value={upPhoneNumber}
          className="w-full p-4 border-2 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out"
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
        />

        <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Gender</p>
        {upGenderError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{upGenderError}</p>}
        <select value={upGender} onChange={(e) => handleGenderChange(e.target.value)} className="w-full p-4 border-2 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Date of Birth</p>
        {upDOBError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{upDOBError}</p>}
        <input
          type="date"
          value={upDOB}
          min={"1930-01-01"}
          max={maxDate}
          onChange={(e) => handleDOBChange(e.target.value)}
          className="h-fit w-full p-4 border-2 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out"
        />

        <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Country</p>
        {upCountryError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{upCountryError}</p>}
        <select value={upCountry} onChange={(e) => handleCountryChange(e.target.value)} className="w-full p-4 border-2 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out">
          <option value="">Select Country</option>
          {countries.map((country, idx) => (
            <option key={idx} value={country}>
              {country}
            </option>
          ))}
        </select>

        <p className='text-start w-full text-vngrey2 text-lg -mb-5'>City</p>
        {upCityError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{upCityError}</p>}
        <select disabled={upCountry === ""} value={upCity} onChange={(e) => handleCityChange(e.target.value)} className="w-full p-4 border-2 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out">
          <option value="">Select City</option>
          {cities.map((city, idx) => (
            <option key={idx} value={city}>
              {city}
            </option>
          ))}
        </select>
        <hr className='w-full border-t-2 border-gray-300' />
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

        <p className='text-start w-full text-vngrey2 text-lg -mb-5'>University</p>
        {upUniversityError != "" && <p className='flex flex-row gap-2 items-center text-start w-full text-red-500 text-sm -mb-5'><MdError />{upUniversityError}</p>}
        <select
          className="w-full p-4 border-2 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out"
          value={upUniversity}
          disabled={upCountry === "" || upCountryError !== ""}
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

        <hr className='w-full border-t-2 border-gray-300' />
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
        <hr className='w-full border-t-2 border-gray-300' />
        <h1 className='text-start w-full -ml-3 text-vngrey1 text-2xl'>Skills</h1>
        <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Hard Skills</p>
        {hardSkillsError != "" && <p className='flex flex-row gap-2 items-center text-start w-full text-red-500 text-sm -mb-5'><MdError />{hardSkillsError}</p>}
        <div className='flex flex-row relative items-center justify-between w-full'>
          <input
            onChange={(e) => { setCurHardSkill(e.target.value) }}
            className="w-full p-4 border-2 z-0 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out"
          />
          <button
            className="absolute h-full right-0 z-10 w-12 text-center p-4 bg-vngrey3 text-vnwhite rounded-lg hover:bg-vnblack2 transition duration-300 ease-in-out"
            onClick={() => handleAddHardSkill()}
          >
            <FaPlus />
          </button>
        </div>

        <div className='w-11/12 flex flex-wrap items-center justify-start gap-4'>
          {hardSkills.map((skill, idx) => (
            <div key={idx} className='flex flex-row bg-primary rounded-xl p-2 items-center justify-center gap-2'>
              <p className='text-vngrey5 text-lg'>{skill}</p>
              <button
                className="text-center p-2 bg-error text-vnwhite rounded-xl hover:bg-vnblack2 transition duration-300 ease-in-out"
                onClick={() => handleRemoveHardSkill(idx)}
              >
                <MdRemove />
              </button>
            </div>
          ))}
        </div>

        <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Soft Skills</p>
        {softSkillsError != "" && <p className='flex flex-row gap-2 items-center text-start w-full text-red-500 text-sm -mb-5'><MdError />{softSkillsError}</p>}
        <div className='flex flex-row relative items-center justify-between w-full'>
          <input
            onChange={(e) => { setCurSoftSkill(e.target.value) }}
            className="w-full p-4 border-2 z-0 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out"
          />
          <button
            className="absolute h-full right-0 z-10 w-12 text-center p-4 bg-vngrey3 text-vnwhite rounded-lg hover:bg-vnblack2 transition duration-300 ease-in-out"
            onClick={() => handleAddSoftSkill()}
          >
            <FaPlus />
          </button>
        </div>

        <div className='w-11/12 flex flex-wrap items-center justify-start gap-4'>
          {softSkills.map((skill, idx) => (
            <div key={idx} className='flex flex-row bg-secondary rounded-xl p-2 items-center justify-center gap-2'>
              <p className='text-vngrey2 text-lg'>{skill}</p>
              <button
                className="text-center p-2 bg-error text-vnwhite rounded-xl hover:bg-vnblack2 transition duration-300 ease-in-out"
                onClick={() => handleRemoveSoftSkill(idx)}
              >
                <MdRemove />
              </button>
            </div>
          ))}
        </div>
        <hr className='w-full border-t-2 border-gray-300' />

        <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Resume</p>
        <div className="w-full flex items-center justify-between relative">
          <button
            onClick={() => {
              setResume(null);
            }}
            className="absolute right-0 top-0 z-10 text-center p-2 bg-error text-vnwhite rounded-lg hover:bg-vnblack2 transition duration-300 ease-in-out">
            <CiCircleRemove />

          </button>
          <input
            className="w-full p-20 border border-gray-300 rounded-lg"
            type="file"
            accept=".doc, .docx, .pdf"
            onChange={handleResFileChange} />
        </div>


        <Button onClick={() => handleProfileUpdate()} disabled={!actButton} className="w-11/12 font-medium normal-case flex flex-row items-center justify-center text-xl bg-primary text-vnwhite rounded-lg hover:bg-vngrey3 transition duration-300 ease-in-out">
          Save Changes
        </Button>
      </div>
    )
  };
};

export default Settings;
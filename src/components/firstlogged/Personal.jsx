import { useContext, useEffect, useState } from "react";
import Context from "../../Context";
import { MdError } from "react-icons/md";

const Personal = () => {
    // Country code state
    const [myCountries, setMyCountries] = useState([]);
    
    // Country and city states
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    // Max date for date input
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split("T")[0];
    
    const {
        upCode,
        setUpCode,
        upCodeError,
        setUpCodeError,
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
        personalDone,
        setPersonalDone,
    } = useContext(Context);

    const handleCodeChange = (val) => {
        setUpCode(val);
        checkCode(val);
    };
    const checkCode = (val) => {
        if (val === "") {
            setUpCodeError("Please select a country code");
        } else {
            setUpCodeError("");
        }
    };

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
            age -1;
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

    useEffect(() => {
        if (upCode !== "" && upPhoneNumber !== "" && upDOB !== "" && upCountry !== "" && upCity !== "" && upCodeError === "" && upPhoneNumberError === "" && upDOBError === "" && upCountryError === "" && upCityError === "" && upGender !== "" && upGenderError === "") {
            setPersonalDone(true);
        }
        else {
            setPersonalDone(false);
        }
    }, [upCode, upPhoneNumber, upDOB, upCountry, upCity, upCodeError, upPhoneNumberError, upDOBError, upCountryError, upCityError, upGender, upGenderError]);


    // Fetch country codes when the component mounts
    useEffect(() => {
        async function fetchCountries() {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();

            const countryData = data.map((country) => {
                return {
                    name: country.name.common,
                    code: country.idd?.root
                        ? country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '')
                        : null
                };
            }).filter(c => c.code !== null);

            // Sort countries alphabetically by name
            countryData.sort((a, b) => a.name.localeCompare(b.name));

            setMyCountries(countryData);
        }

        fetchCountries();
    }, []);

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

    return (
        <div className='w-full flex flex-col items-center justify-center gap-7 mt-[6rem]'>
            <p className='text-start w-full text-vngrey2 text-lg -mb-5'>Phone Number</p>
            {upCodeError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{upCodeError}</p>}
            {upPhoneNumberError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{upPhoneNumberError}</p>}
            <div className="w-full flex flex-row items- gap-4">
                <select value={upCode} onChange={(e) => handleCodeChange(e.target.value)} className="h-fit w-1/3 p-4 border-2 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out">
                    <option value="">Country</option>
                    {myCountries.map((c, idx) => (
                        <option key={idx} value={c.code}>
                            {c.name} ({c.code})
                        </option>
                    ))}
                </select>
                <input
                    type="tel"
                    placeholder="Phone number"
                    disabled={upCode === ""}
                    value={upPhoneNumber}
                    className="h-fit w-2/3 p-4 border-2 border-vngrey3 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out"
                    onChange={(e) => handlePhoneNumberChange(e.target.value)}
                />
            </div>

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

        </div>
    )
}

export default Personal
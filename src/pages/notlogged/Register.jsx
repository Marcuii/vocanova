import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Button, Dialog, DialogBody, DialogHeader } from '@material-tailwind/react'
import { FcGoogle } from "react-icons/fc";
import { SiLinkedin } from "react-icons/si";
import { MdError, MdMarkEmailUnread } from "react-icons/md";
import { FaArrowLeft } from 'react-icons/fa6';
import Context from '../../Context';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Register = () => {
    const [actButton, setActButton] = useState(true)
    const [popUp, setPopUp] = useState(false)
    const [counter, setCounter] = useState(0)
    const [resendMailError, setResendMailError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const {
        //App states
        loggedIn,
        firstLogin,

        //app register
        handleRegister,
        //register
        upName,
        setUpName,
        upNameError,
        setUpNameError,
        upLastName,
        setUpLastName,
        upLastNameError,
        setUpLastNameError,
        upEmail,
        setUpEmail,
        upEmailError,
        setUpEmailError,
        upPassword,
        setUpPassword,
        upPasswordError,
        setUpPasswordError,
        upCPassword,
        setUpCPassword,
        upConfirmPasswordError,
        registerError,
        setRegisterError,
        registerSuccess,
        setRegisterSuccess,

        setUpConfirmPasswordError } = useContext(Context)

    const navigate = useNavigate()

    // Redirect to home or profile-complete page if logged in
    useEffect(() => {
        if (loggedIn && !firstLogin) {
            navigate("/")
        } else if (loggedIn && firstLogin) {
            navigate("/profile-complete")
        }
    }, [loggedIn, firstLogin])

    const handleNameChange = (e) => {
        setUpName(e.target.value)
        checkName(e)
    }
    const checkName = (e) => {
        const name = e.target.value
        if (name.length < 3) {
            setUpNameError("First Name must be at least 3 characters long")
        } else if (name.length > 20) {
            setUpNameError("First Name must be at most 20 characters long")
        } else if (!/^[a-zA-Z]+$/.test(name)) {
            setUpNameError("First Name must only contain letters")
        } else {
            setUpNameError("")
        }
    }
    const handleLastNameChange = (e) => {
        setUpLastName(e.target.value)
        checkLastName(e)
    }
    const checkLastName = (e) => {
        const lastName = e.target.value
        if (lastName.length < 3) {
            setUpLastNameError("Last Name must be at least 3 characters long")
        } else if (lastName.length > 20) {
            setUpLastNameError("Last Name must be at most 20 characters long")
        } else if (!/^[a-zA-Z]+$/.test(lastName)) {
            setUpLastNameError("Last Name must only contain letters")
        } else {
            setUpLastNameError("")
        }
    }
    const handleEmailChange = (e) => {
        setUpEmail(e.target.value)
        checkEmail(e)
    }
    const checkEmail = (e) => {
        const email = e.target.value
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setUpEmailError("Please enter a valid email address")
        } else {
            setUpEmailError("")
        }
    }
    const handlePasswordChange = (e) => {
        setUpPassword(e.target.value)
        checkPassword(e)
    }
    const checkPassword = (e) => {
        const password = e.target.value
        if (password.length < 8) {
            setUpPasswordError("Password must be at least 8 characters long")
        } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
            setUpPasswordError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
        } else if (password.length > 20) {
            setUpPasswordError("Password must be at most 20 characters long")
        } else if (password.includes(" ")) {
            setUpPasswordError("Password must not contain spaces")
        } else {
            setUpPasswordError("")
        }
    }
    const handleCPasswordChange = (e) => {
        setUpCPassword(e.target.value)
        checkCPassword(e)
    }
    const checkCPassword = (e) => {
        const cpassword = e.target.value
        if (cpassword != upPassword) {
            setUpConfirmPasswordError("Passwords do not match")
        } else {
            setUpConfirmPasswordError("")
        }
    }

    const resendMail = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_BASE_URL + "/auth/resend-confirmation-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: upEmail
                }),
            })
            if (response.status === 409) {
                setResendMailError("Email already exists")
            } else if (response.status === 500) {
                setResendMailError("Server error, please try again later")
            } else if (response.status === 200) {
                setResendMailError("")
                setCounter(60)
            }
            return
        }
        catch (error) {
            // Handle error here
            console.error("Error during register:", error)
        }
    }

    useEffect(() => {
        setActButton(true)
        setUpName("")
        setUpNameError("")
        setUpLastName("")
        setUpLastNameError("")
        setUpEmail("")
        setUpEmailError("")
        setUpPassword("")
        setUpPasswordError("")
        setUpCPassword("")
        setUpConfirmPasswordError("")
    }, [])

    useEffect(() => {
        setActButton(true)
        if (upNameError == "" && upLastNameError == "" && upEmailError == "" && upPasswordError == "" && upConfirmPasswordError == "" && upName != "" && upLastName != "" && upEmail != "" && upPassword != "" && upCPassword != "") {
            setActButton(false)
        }
    }, [upNameError, upLastNameError, upEmailError, upPasswordError, upConfirmPasswordError, upName, upLastName, upEmail, upPassword, upCPassword])

    useEffect(() => {
        setPopUp(registerSuccess)
        setCounter(60)
    }, [registerSuccess])

    useEffect(() => {
        if (counter > 0) {
            const timer = setTimeout(() => {
                setCounter(counter - 1)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [counter])


    return (
        <div className='w-full flex flex-col items-center justify-center gap-5 p-4'>
            <div className="w-full flex flex-row items-center justify-around gap-4 p-4">
                <div className='w-5/6 lg:w-1/3 flex flex-col items-center text-start gap-7'>
                    <div className='w-full flex flex-row items-center justify-start'>
                        <Button onClick={() => navigate("/")} className='bg-vnblack2 text-vnwhite hover:text-primary transition duration-300 ease-in-out' size="lg">
                            <FaArrowLeft />
                        </Button>
                    </div>
                    <h1 className='w-full text-3xl'>Create New Account</h1>
                    <p className='w-full text-vngrey3 font-thin'>Help us get to know you from the information you provide to get free access to VocaNova.</p>
                    <Button className="w-11/12 font-medium normal-case flex flex-row items-center justify-center text-xl bg-vnwhite text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-vnwhite transition duration-300 ease-in-out">
                        <SiLinkedin className="mr-2" />
                        Sign up with LinkedIn
                    </Button>
                    <Button className="w-11/12 font-medium normal-case flex flex-row items-center justify-center text-xl bg-vnwhite text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-vnwhite transition duration-300 ease-in-out">
                        <FcGoogle className="mr-2" />
                        Sign up with Google
                    </Button>
                    <div className='w-full flex flex-row items-center justify-center gap-2 text-vngrey3 '>
                        <hr className="border-vngrey3 border-1 w-full" />
                        <p className='font-extralight text-sm min-w-fit'>Or sign up with email</p>
                        <hr className="border-vngrey3 border-1 w-full" />
                    </div>
                    {registerError != "" && <p className='flex flex-row gap-2 justify-center items-center w-11/12 text-red-500 text-base'><MdError />{registerError}</p>}
                    <p className='text-start w-11/12 text-vngrey2 text-lg -mb-5'>First Name</p>
                    {upNameError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{upNameError}</p>}
                    <input onChange={handleNameChange} name='name' type="text" placeholder="Enter your first name" autoComplete='given-name' className="w-11/12 h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" />
                    <p className='text-start w-11/12 text-vngrey2 text-lg -mb-5'>Last Name</p>
                    {upLastNameError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{upLastNameError}</p>}
                    <input onChange={handleLastNameChange} name='lastName' type="text" placeholder="Enter your last name" autoComplete='family-name' className="w-11/12 h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" />
                    <p className='text-start w-11/12 text-vngrey2 text-lg -mb-5'>Email</p>
                    {upEmailError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{upEmailError}</p>}
                    <input onChange={handleEmailChange} name='email' type="email" placeholder="xxx@gmail.com" autoComplete='email' className="w-11/12 h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" />

                    <div className="relative w-11/12">
                        <p className="text-start text-vngrey2 text-lg -mb-5">Password</p>
                        {upPasswordError && (
                            <p className="flex flex-row gap-2 items-center text-start text-red-500 text-sm -mb-5">
                                <MdError />
                                {upPasswordError}
                            </p>
                        )}
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            onChange={handlePasswordChange}
                            className="w-full h-12 px-4 pr-12 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-[38px] right-3 text-gray-500 hover:text-primary transition"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="w-5 h-5" />
                            ) : (
                                <EyeIcon className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    <p className='text-start w-11/12 text-vngrey2 text-lg -mb-5'>Confirm Password</p>
                    {upConfirmPasswordError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{upConfirmPasswordError}</p>}
                    <input onChange={handleCPasswordChange} name='confirmPassword' type="password" placeholder="********" className="w-11/12 h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" />
                    <Button onClick={handleRegister} disabled={actButton} className="w-11/12 font-medium normal-case flex flex-row items-center justify-center text-xl bg-primary text-vnwhite rounded-lg hover:bg-vngrey3 transition duration-300 ease-in-out">
                        Sign Up
                    </Button>
                    <p className='w-full text-center text-vngrey3 font-thin'>Already a member? <span onClick={() => navigate("/login")} className='text-primary cursor-pointer hover:underline'>Login Now</span></p>
                </div>

                <img className='hidden lg:block ' src="./assets/reg.png" alt="register" />
            </div>
            <p className='mt-3 font-[10] text-sm text-vngrey4'>By continuing, you agree to VocaNova Term of Use and confirm that you have read Privacy Policy</p>

            <Dialog open={popUp}>
                <DialogHeader className='text-success'>Confirmation Mail has been sent successfully </DialogHeader>
                <DialogBody className='text-center flex flex-col items-center justify-center gap-2'>
                    <span className='text-2xl'> <MdMarkEmailUnread /></span>
                    <p>
                        We've sent a confirmation email to <span className='font-semibold'>{upEmail}</span>. Please check your inbox and click the link to confirm your email address.
                    </p>
                    {resendMailError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{resendMailError}</p>}
                    <p className='text-vngrey3 font-thin text-sm'>Resend confirmation email in {counter} seconds</p>
                    <Button onClick={resendMail} disabled={counter > 0} className="bg-primary text-vnwhite rounded-lg hover:bg-vngrey3 transition duration-300 ease-in-out">
                        Resend
                    </Button>
                </DialogBody>
            </Dialog>
        </div>
    )
}

export default Register
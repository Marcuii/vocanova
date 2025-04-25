import { Button } from '@material-tailwind/react'
import { FcGoogle } from "react-icons/fc";
import { SiLinkedin } from "react-icons/si";
import { MdError } from "react-icons/md";
import { useNavigate } from 'react-router';
import { useContext } from 'react'
import Context from '../Context';
import { FaArrowLeft } from 'react-icons/fa6';

const Register = () => {
    const {
        upName,
        setUpName,
        upNameError,
        setUpNameError,
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
        setUpConfirmPasswordError } = useContext(Context)

    const navigate = useNavigate()

    const handleNameChange = (e) => {
        setUpName(e.target.value)
    }
    const checkName = (e) => {
        const name = e.target.value
        if (name.length < 3) {
            setUpNameError("Name must be at least 3 characters long")
        } else {
            setUpNameError("")
        }
    }
    const handleEmailChange = (e) => {
        setUpEmail(e.target.value)
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
    }
    const checkPassword = (e) => {
        const password = e.target.value
        if (password.length < 8) {
            setUpPasswordError("Password must be at least 8 characters long")
        } else {
            setUpPasswordError("")
        }
    }
    const handleCPasswordChange = (e) => {
        setUpCPassword(e.target.value)
    }
    const checkCPassword = (e) => {
        const cpassword = e.target.value
        if (cpassword != upPassword) {
            setUpConfirmPasswordError("Passwords do not match")
        } else {
            setUpConfirmPasswordError("")
        }
    }

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
                    <p className='text-start w-11/12 text-vngrey2 text-lg -mb-5'>Full Name</p>
                    {upNameError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{upNameError}</p>}
                    <input onBlur={checkName} onChange={handleNameChange} name='name' type="text" placeholder="Enter your full name" autoComplete='name' className="w-11/12 h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" />
                    <p className='text-start w-11/12 text-vngrey2 text-lg -mb-5'>Email</p>
                    {upEmailError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{upEmailError}</p>}
                    <input onBlur={checkEmail} onChange={handleEmailChange} name='email' type="email" placeholder="xxx@gmail.com" autoComplete='email' className="w-11/12 h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" />
                    <p className='text-start w-11/12 text-vngrey2 text-lg -mb-5'>Password</p>
                    {upPasswordError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{upPasswordError}</p>}
                    <input onBlur={checkPassword} onChange={handlePasswordChange} name='password' type="password" placeholder="********" className="w-11/12 h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" />
                    <p className='text-start w-11/12 text-vngrey2 text-lg -mb-5'>Confirm Password</p>
                    {upConfirmPasswordError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{upConfirmPasswordError}</p>}
                    <input onBlur={checkCPassword} onChange={handleCPasswordChange} name='confirmPassword' type="password" placeholder="********" className="w-11/12 h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" />
                    <Button className="w-11/12 font-medium normal-case flex flex-row items-center justify-center text-xl bg-primary text-vnwhite rounded-lg hover:bg-vngrey3 transition duration-300 ease-in-out">
                        Sign Up
                    </Button>
                    <p className='w-full text-center text-vngrey3 font-thin'>Already a member? <span onClick={() => navigate("/login")} className='text-primary cursor-pointer hover:underline'>Login Now</span></p>
                </div>

                <img className='hidden lg:block ' src="./assets/reg.png" alt="register" />
            </div>
            <p className='mt-3 font-[10] text-sm text-vngrey4'>By continuing, you agree to VocaNova Term of Use and confirm that you have read Privacy Policy</p>
        </div>
    )
}

export default Register
import { Button, Checkbox, Typography } from '@material-tailwind/react'
import { FcGoogle } from "react-icons/fc";
import { SiLinkedin } from "react-icons/si";
import { MdError } from "react-icons/md";
import { useNavigate } from 'react-router';
import { useContext } from 'react'
import Context from '../Context';
import { FaArrowLeft } from 'react-icons/fa6';

const Login = () => {
    const {
        inEmail,
        setInEmail,
        inEmailError,
        setInEmailError,
        inPassword,
        setInPassword,
        inPasswordError,
        setInPasswordError, } = useContext(Context)

    const navigate = useNavigate()

    const handleEmailChange = (e) => {
        setInEmail(e.target.value)
    }
    const checkEmail = (e) => {
        const email = e.target.value
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setInEmailError("Please enter a valid email address")
        } else {
            setInEmailError("")
        }
    }
    const handlePasswordChange = (e) => {
        setInPassword(e.target.value)
    }
    const checkPassword = (e) => {
        const password = e.target.value
        if (password.length < 8) {
            setInPasswordError("Password must be at least 8 characters long")
        } else {
            setInPasswordError("")
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
                    <h1 className='w-full text-3xl'>Welcome to VocaNova</h1>
                    <p className='w-full text-vngrey3 font-thin'>Continue with google or enter your VocaNova account.</p>
                    <Button className="w-11/12 font-medium normal-case flex flex-row items-center justify-center text-xl bg-vnwhite text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-vnwhite transition duration-300 ease-in-out">
                        <SiLinkedin className="mr-2" />
                        Login with LinkedIn
                    </Button>
                    <Button className="w-11/12 font-medium normal-case flex flex-row items-center justify-center text-xl bg-vnwhite text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-vnwhite transition duration-300 ease-in-out">
                        <FcGoogle className="mr-2" />
                        Login with Google
                    </Button>
                    <div className='w-full flex flex-row items-center justify-center gap-2 text-vngrey3 '>
                        <hr className="border-vngrey3 border-1 w-full" />
                        <p className='font-extralight text-sm min-w-fit'>Or login with VocaNova account</p>
                        <hr className="border-vngrey3 border-1 w-full" />
                    </div>
                    <p className='text-start w-11/12 text-vngrey2 text-lg -mb-5'>Email</p>
                    {inEmailError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{inEmailError}</p>}
                    <input onBlur={checkEmail} onChange={handleEmailChange} name='email' type="email" placeholder="xxx@gmail.com" autoComplete='email' className="w-11/12 h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" />
                    <p className='text-start w-11/12 text-vngrey2 text-lg -mb-5'>Password</p>
                    {inPasswordError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{inPasswordError}</p>}
                    <input onBlur={checkPassword} onChange={handlePasswordChange} name='password' type="password" placeholder="********" className="w-11/12 h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" />
                    <div className='w-11/12 flex flex-row items-center justify-between'>
                        <Checkbox label={<p className='text-primary font-thin text-sm'>Remember me?</p>} color='blue' />
                        <Typography onClick={() => navigate("/recovery")} className='text-primary font-thin text-sm cursor-pointer hover:underline'>Forgot password?</Typography>
                    </div>
                    <Button className="w-11/12 font-medium normal-case flex flex-row items-center justify-center text-xl bg-primary text-vnwhite rounded-lg hover:bg-vngrey3 transition duration-300 ease-in-out">
                        Login
                    </Button>
                    <p className='w-full text-center text-vngrey3 font-thin'>Join with us? <span onClick={() => navigate("/register")} className='text-primary cursor-pointer hover:underline'>Create account it’s free</span></p>
                </div>

                <img className='hidden lg:block ' src="./assets/log.png" alt="login" />
            </div>
            <p className='mt-3 font-[10] text-sm text-vngrey4'>By continuing, you agree to VocaNova Term of Use and confirm that you have read Privacy Policy</p>
        </div>
    )
}

export default Login
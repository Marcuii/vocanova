import { Button, Checkbox, Typography } from '@material-tailwind/react'
import { MdError } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router';
import { useContext } from 'react'
import Context from '../Context';

const Recovery = () => {
    const { 
        inRecoveryEmail,
        setInRecoveryEmail,
        inRecoveryEmailError,
        setInRecoveryEmailError } = useContext(Context)

    const navigate = useNavigate()

    const handleEmailChange = (e) => {
        setInRecoveryEmail(e.target.value)
    }
    const checkEmail = (e) => {
        const email = e.target.value
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setInRecoveryEmailError("Please enter a valid email address")
        } else {
            setInRecoveryEmailError("")
        }
    }

    return (
        <div className='w-full flex flex-col items-center justify-center gap-5 p-4'>
            <div className="w-full flex flex-row items-center justify-around gap-4 p-4">
                <div className='w-5/6 lg:w-1/3 flex flex-col items-center text-start gap-7'>
                    <Button>
                        <FaArrowLeft className="mr-2" onClick={() => navigate("/login")} />
                    </Button>
                    <h1 className='w-full text-3xl'>Recovery Password</h1>
                    <p className='w-full text-vngrey3 font-thin'>We will send a new password to your account from email, to help recover your account.</p>
                    <p className='text-start w-11/12 text-vngrey2 text-lg -mb-5'>Email</p>
                    {inRecoveryEmailError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{inRecoveryEmailError}</p>}
                    <input onBlur={checkEmail} onChange={handleEmailChange} name='email' type="email" placeholder="xxx@gmail.com" autoComplete='email' className="w-11/12 h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" />
                    <Button className="w-11/12 font-medium normal-case flex flex-row items-center justify-center text-xl bg-primary text-vnwhite rounded-lg hover:bg-vngrey3 transition duration-300 ease-in-out">
                        Submit
                    </Button>
                    <p className='w-full text-center text-vngrey3 font-thin'>Remember password? <span onClick={() => navigate("/login")} className='text-primary cursor-pointer hover:underline'>Login</span></p>
                </div>
                <img className='hidden lg:block ' src="../src/assets/reg.png" alt="recovery" />
            </div>
            <p className='mt-3 font-[10] text-sm text-vngrey4'>By continuing, you agree to VocaNova Term of Use and confirm that you have read Privacy Policy</p>
        </div>
      )
    }

export default Recovery
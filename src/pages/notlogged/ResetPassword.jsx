import { Button, Dialog, DialogBody, DialogHeader } from '@material-tailwind/react'
import React, { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { MdError, MdOutlineCheckCircle } from 'react-icons/md'
import { useNavigate, useSearchParams } from 'react-router'

const ResetPassword = () => {
    const [actButton, setActButton] = useState(true)
    const [popUp, setPopUp] = useState(false)
    const [error, setError] = useState("")

    const [searchParams] = useSearchParams()

    const email = searchParams.get("email")
    const code = searchParams.get("code")

    const [resetPass, setResetPass] = useState("")
    const [resetPassError, setResetPassError] = useState("")
    const [resetCPassword, setResetCPassword] = useState("")
    const [resetCPasswordError, setResetCPasswordError] = useState("")
    const [resetPassSuccess, setResetPassSuccess] = useState(false)

    const navigate = useNavigate()

    // Redirect to home or profile-complete page if logged in
    useEffect(() => {
        if (!email && !code) {
            navigate("/")
        } 
    }, [])

    useEffect(() => {
        setPopUp(resetPassSuccess)
    }, [resetPassSuccess])


    const handlePasswordChange = (e) => {
        setResetPass(e.target.value)
        checkPassword(e)
    }
    const checkPassword = (e) => {
        const password = e.target.value
        if (password.length < 8) {
            setResetPassError("Password must be at least 8 characters long")
            setActButton(true)
            return
        } else {
            setResetPassError("")
            setActButton(false)
            return
        }
    }
    const handleCPasswordChange = (e) => {
        setResetCPassword(e.target.value)
        checkCPassword(e)
    }
    const checkCPassword = (e) => {
        const cpassword = e.target.value
        if (cpassword != resetPass) {
            setResetCPasswordError("Passwords do not match")
            setActButton(true)
            return
        } else {
            setResetCPasswordError("")
            setActButton(false)
            return
        }
    }

    useEffect(() => {
        if (resetPassError == "" && resetCPasswordError == "" && resetPass != "" && resetCPassword != "") {
            setActButton(false)
        }
        else {
            setActButton(true)
        }
    }, [resetPassError, resetCPasswordError, resetPass, resetCPassword])

    const handleReset = () => {
        fetch(`${import.meta.env.VITE_BASE_URL}/auth/reset-password`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                code: code,
                newPassword: resetPass,
            }),
        })
            .then((response) => {
                if (response.status !== 200) {
                    setError("Invalid or expired confirmation link")
                    return
                } else {
                    setResetPassSuccess(true)
                    setPopUp(true)
                    return
                }
            })
            .catch((error) => {
                console.error("Error during email confirmation:", error)
            })
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
                        {error != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{error}</p>}
                        <p className='text-start w-11/12 text-vngrey2 text-lg -mb-5'>New Password</p>
                        {resetPassError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{resetPassError}</p>}
                        <input onChange={handlePasswordChange} name='password' type="password" placeholder="********" className="w-11/12 h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" />
                        <p className='text-start w-11/12 text-vngrey2 text-lg -mb-5'>Confirm New Password</p>
                        {resetCPasswordError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{resetCPasswordError}</p>}
                        <input onChange={handleCPasswordChange} name='confirmPassword' type="password" placeholder="********" className="w-11/12 h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" />
                        <Button onClick={handleReset} disabled={actButton} className="w-11/12 font-medium normal-case flex flex-row items-center justify-center text-xl bg-primary text-vnwhite rounded-lg hover:bg-vngrey3 transition duration-300 ease-in-out">
                            Reset Password
                        </Button>
                    </div>
    
                    <img className='hidden lg:block ' src="./assets/reg.png" alt="register" />
                </div>
                <p className='mt-3 font-[10] text-sm text-vngrey4'>By continuing, you agree to VocaNova Term of Use and confirm that you have read Privacy Policy</p>
    
                <Dialog open={popUp}>
                    <DialogHeader className='text-success'>Password has been reset successfully </DialogHeader>
                    <DialogBody className='text-center flex flex-col items-center justify-center gap-2'>
                        <span className='text-2xl'> <MdOutlineCheckCircle /></span>
                        <p>
                            Password has been reset successfully. You can now login to your account with the new password.
                        </p>
                        <Button onClick={() => navigate("/login")} className="bg-primary text-vnwhite rounded-lg hover:bg-vngrey3 transition duration-300 ease-in-out">
                            Login
                        </Button>
                    </DialogBody>
                </Dialog>
            </div>
  )
}

export default ResetPassword
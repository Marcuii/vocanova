import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Button, Dialog, DialogBody, DialogHeader } from '@material-tailwind/react'
import React, { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { MdError, MdOutlineCheckCircle } from 'react-icons/md'
import { useNavigate, useSearchParams } from 'react-router'

const ResetPassword = () => {
    const [actButton, setActButton] = useState(true)
    const [popUp, setPopUp] = useState(false)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showCPassword, setShowCPassword] = useState(false)

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
        document.title = "Vocanova | Reset Password"
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
        } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
            setResetPassError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
        } else if (password.length > 20) {
            setResetPassError("Password must be at most 20 characters long")
        } else if (password.includes(" ")) {
            setResetPassError("Password must not contain spaces")
        } else {
            setResetPassError("")
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
        } else {
            setResetCPasswordError("")
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
                    <div className='w-11/12 relative'>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-primary transition"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="w-5 h-5" />
                            ) : (
                                <EyeIcon className="w-5 h-5" />
                            )}
                        </button>
                        <input onChange={handlePasswordChange} name='password' type={showPassword ? "text" : "password"} placeholder="********" className="w-full h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" />
                    </div>
                    <p className='text-start w-11/12 text-vngrey2 text-lg -mb-5'>Confirm New Password</p>
                    {resetCPasswordError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{resetCPasswordError}</p>}
                    <div className='w-11/12 relative'>
                        <button
                            type="button"
                            onClick={() => setShowCPassword(!showCPassword)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-primary transition"
                        >
                            {showCPassword ? (
                                <EyeSlashIcon className="w-5 h-5" />
                            ) : (
                                <EyeIcon className="w-5 h-5" />
                            )}
                        </button>
                        <input onChange={handleCPasswordChange} name='confirmPassword' type={showCPassword ? "text" : "password"} placeholder="********" className="w-full h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" />
                    </div>
                    <Button onClick={handleReset} disabled={actButton} className="w-11/12 font-medium normal-case flex flex-row items-center justify-center text-xl bg-primary text-vnwhite rounded-lg hover:bg-vngrey3 transition duration-300 ease-in-out">
                        Reset Password
                    </Button>
                </div>

                <img className='hidden lg:block ' src="https://vocanova.vercel.app/assets/reg.png" alt="register" />
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
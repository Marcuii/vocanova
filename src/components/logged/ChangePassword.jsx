import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import React, { use, useEffect, useState } from 'react'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import { MdError } from 'react-icons/md'

const ChangePassword = () => {
    const [curPassword, setCurPassword] = useState("")
    const [curPasswordError, setCurPasswordError] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordError, setNewPasswordError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const [changePasswordError, setChangePasswordError] = useState("")
    const [changePasswordSuccess, setChangePasswordSuccess] = useState("")

    const [showCurPassword, setShowCurPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showCPassword, setShowCPassword] = useState(false)

    const [actButton, setActButton] = useState(true)

    const handleCurPasswordChange = (e) => {
        setCurPassword(e.target.value)
        checkCurPassword(e)
    }
    const checkCurPassword = (e) => {
        const password = e.target.value
        if (password.length < 8) {
            setCurPasswordError("Password must be at least 8 characters long")
        } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
            setCurPasswordError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
        } else if (password.length > 20) {
            setNewPasswordError("Password must be at most 20 characters long")
        } else if (password.includes(" ")) {
            setCurPasswordError("Password must not contain spaces")
        } else {
            setCurPasswordError("")
        }
    }
    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value)
        checkPassword(e)
    }
    const checkPassword = (e) => {
        const password = e.target.value
        if (password.length < 8) {
            setNewPasswordError("Password must be at least 8 characters long")
        } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
            setNewPasswordError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
        } else if (password.length > 20) {
            setNewPasswordError("Password must be at most 20 characters long")
        } else if (password.includes(" ")) {
            setNewPasswordError("Password must not contain spaces")
        } else {
            setNewPasswordError("")
        }
    }
    const handleCPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
        checkCPassword(e)
    }
    const checkCPassword = (e) => {
        const cpassword = e.target.value
        if (cpassword != upPassword) {
            setConfirmPasswordError("Passwords do not match")
        } else {
            setConfirmPasswordError("")
        }
    }

    useEffect(() => {
        if (curPasswordError != "" || newPasswordError != "" || confirmPasswordError != "" || curPassword == "" || newPassword == "" || confirmPassword == "") {
            setActButton(true)
        } else {
            setActButton(false)
        }
    }, [curPasswordError, newPasswordError, confirmPasswordError, curPassword, newPassword, confirmPassword])


    // Function to handle change password
    const handleChangePassword = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + '/me/change-password', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    currentPassword: curPassword,
                    newPassword: newPassword,
                })
            })
            const data = await response.json()
            if (response.status == 200) {
                setChangePasswordSuccess("Password changed successfully")
                setChangePasswordError("")
                setCurPassword("")
                setNewPassword("")
                setConfirmPassword("")
                setCurPasswordError("")
                setNewPasswordError("")
                setConfirmPasswordError("")
                setActButton(true)
            } else {
                setChangePasswordError(data.message)
            }
        } catch (error) {
            console.log(error)
            setChangePasswordError("Something went wrong. Please try again later.")
        }
    }
    return (
        <div className='w-full flex flex-col items-center justify-center gap-5 p-5'>
            <h1 className='text-3xl font-bold text-vngrey1'>Change Password</h1>
            <p className='text-vngrey2 text-lg'>Change your password to keep your account secure.</p>
            {changePasswordError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-xl -mb-5'><MdError />{changePasswordError}</p>}
            {changePasswordSuccess != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-green-500 text-xl -mb-5'><IoMdCheckmarkCircle />{changePasswordSuccess}</p>}
            <div className='w-11/12 flex flex-col items-center text-start gap-7'>

                <p className='text-start w-11/12 text-vngrey2 text-lg -mb-5'>Current Password</p>
                {curPasswordError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{curPasswordError}</p>}
                <div className='w-11/12 relative'>
                    <button
                        type="button"
                        onClick={() => setShowCurPassword(!showCurPassword)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-primary transition"
                    >
                        {showCurPassword ? (
                            <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                            <EyeIcon className="w-5 h-5" />
                        )}
                    </button>
                    <input onChange={handleCurPasswordChange} name='password' type={showCurPassword ? "text" : "password"} placeholder="********" className="w-full h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" value={curPassword} />
                </div>
                <p className='text-start w-11/12 text-vngrey2 text-lg -mb-5'>New Password</p>
                {newPasswordError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{newPasswordError}</p>}
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
                    <input onChange={handlePasswordChange} name='password' type={showPassword ? "text" : "password"} placeholder="********" className="w-full h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" value={newPassword} />
                </div>
                <p className='text-start w-11/12 text-vngrey2 text-lg -mb-5'>Confirm New Password</p>
                {confirmPasswordError != "" && <p className='flex flex-row gap-2 items-center text-start w-11/12 text-red-500 text-sm -mb-5'><MdError />{confirmPasswordError}</p>}
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
                    <input onChange={handleCPasswordChange} name='confirmPassword' type={showCPassword ? "text" : "password"} placeholder="********" className="w-full h-12 px-4 border-2 border-vngrey5 rounded-lg focus:outline-none focus:border-primary transition duration-300 ease-in-out" value={confirmPassword} />
                </div>

                <Button onClick={handleChangePassword} disabled={actButton} className="w-11/12 font-medium normal-case flex flex-row items-center justify-center text-xl bg-primary text-vnwhite rounded-lg hover:bg-vngrey3 transition duration-300 ease-in-out">
                    Change Password
                </Button>

            </div>
        </div>
    )
}

export default ChangePassword
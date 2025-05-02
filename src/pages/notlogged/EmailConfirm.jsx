import { useEffect, useState } from 'react'
import { Button } from '@material-tailwind/react'
import { useNavigate, useSearchParams } from 'react-router'
import { MdError, MdOutlineCheckCircle } from 'react-icons/md'

const EmailConfirm = () => {
    const [searchParams] = useSearchParams()
    const [error, setError] = useState("")

    const id = searchParams.get("userId")
    const code = searchParams.get("code")

    const navigate = useNavigate()

    // Redirect to home or profile-complete page if logged in
    useEffect(() => {
        if (!id && !code) {
            navigate("/")
        } else {
            fetch(`${import.meta.env.VITE_BASE_URL}/auth/confirm-email`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: id,
                    code: code,
                }),
            })
                .then((response) => {
                    if (response.status !== 200) {
                        setError("Invalid or expired confirmation link")
                        return
                    }
                })
                .catch((error) => {
                    console.error("Error during email confirmation:", error)
                })
        }
    }, [])



    return (
        <>
            {error != "" ?
                <div className='w-full flex flex-col items-center justify-center gap-5 p-4'>
                    <MdError className='text-error text-4xl' />
                    <h1 className='text-2xl text-center text-error'>
                        {error}
                    </h1>
                    <p className='text-lg text-center text-vngrey3'>
                        Please try again or contact support.
                    </p>
                </div>
                :
                <div className='w-full flex flex-col items-center justify-center gap-5 p-4'>
                    <MdOutlineCheckCircle className='text-success text-4xl' />
                    <h1 className='text-2xl text-center text-success'>
                        Email Confirmed
                    </h1>
                    <p className='text-lg text-center text-vngrey3'>
                        Your email has been confirmed. You can now log in to your account.
                    </p>
                    <Button onClick={() => navigate('/login')} className="normal-case text-lg bg-primary text-vnwhite rounded-lg hover:bg-vngrey3 transition duration-300 ease-in-out">
                        Login
                    </Button>
                </div>
            }
        </>

    )
}

export default EmailConfirm
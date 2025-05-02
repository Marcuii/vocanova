import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const NotLoggedDB = () => {
    const navigate = useNavigate();

  return (
    <div className='w-full min-h-screen flex flex-col justify-start gap-5 p-4'>
        <div className="w-full flex flex-row items-center justify-around gap-4 p-4">
            <h1 className='text-2xl text-center text-primary'>
                VocaNova
            </h1>
            <div className='flex flex-row items-center justify-center gap-4'>
                <Button onClick={() => navigate('/login')} className="normal-case text-lg bg-primary text-vnwhite rounded-lg hover:bg-vngrey3 transition duration-300 ease-in-out">
                    Login
                </Button>
                <Button onClick={() => navigate('/register')} className="normal-case text-lg bg-secondary text-vnwhite rounded-lg hover:bg-vngrey3 transition duration-300 ease-in-out">
                    Register
                </Button>
            </div>
        </div>
    </div>
  )
}

export default NotLoggedDB
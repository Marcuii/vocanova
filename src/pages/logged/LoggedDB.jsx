import { useNavigate } from 'react-router'
import Context from '../../Context'
import { useContext, useEffect } from 'react'

const LoggedDB = () => {
  const {
    //App states
    loggedIn,
    setLoggedIn,
    firstLogin,
    setFirstLogin,
  } = useContext(Context)

  const navigate = useNavigate()

  // Redirect to home or profile-complete page if logged in
  useEffect(() => {
    if (loggedIn) {
      if (firstLogin) {
        navigate("/profile-complete")
      }
    } else {
      navigate("/")
    }
  }, [loggedIn, firstLogin])

  return (
    <div>LoggedDB</div>
  )
}

export default LoggedDB
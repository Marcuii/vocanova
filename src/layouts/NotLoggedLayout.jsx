import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Recovery from '../pages/Recovery'

const NotLoggedLayout = () => {
  return (
      <Routes>
        <Route path="/" element={<h1>Not logged in</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recovery" element={<Recovery />} />
      </Routes>
  )
}

export default NotLoggedLayout
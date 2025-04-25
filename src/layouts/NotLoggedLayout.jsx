import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Recovery from '../pages/Recovery'
import NotLoggedDB from '../pages/NotLoggedDB'

const NotLoggedLayout = () => {
  return (
      <Routes>
        <Route path="/" element={<NotLoggedDB />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recovery" element={<Recovery />} />
      </Routes>
  )
}

export default NotLoggedLayout
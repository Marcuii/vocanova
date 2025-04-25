import { Routes, Route } from 'react-router-dom'

const LoggedLayout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>Logged in</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
        <Route path="/settings" element={<h1>Settings</h1>} />
        <Route path="/logout" element={<h1>Logout</h1>} />
      </Routes>
    </div>
  )
}

export default LoggedLayout
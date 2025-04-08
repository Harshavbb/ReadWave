// App.jsx
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
//import Login from './pages/Login'
//import Register from './pages/Register'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Add other routes here */}
      </Routes>
    </>
  )
}

export default App

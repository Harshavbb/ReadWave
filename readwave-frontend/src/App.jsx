import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
//import Login from './pages/Login'
//import Register from './pages/Register'
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import EditBookForm from './pages/EditBookForm'; // Import your EditBookForm component

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        {/* Add the EditBookForm route */}
        <Route
          path="/edit-book/:id"
          element={
            <ProtectedRoute>
              <EditBookForm />
            </ProtectedRoute>
          }
        />
        {/* Add other routes here */}
      </Routes>
    </>
  );
}

export default App;

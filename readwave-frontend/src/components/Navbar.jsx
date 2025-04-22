import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ detects route changes

  // ✅ Check token whenever route changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]); // reruns whenever URL changes

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); // update state manually
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl font-bold text-blue-600">📚 Readwave</h1>

      <div className="space-x-4 flex items-center">
        <Link to="/" className="text-gray-600 hover:text-blue-600">
          Home
        </Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login" className="text-gray-600 hover:text-blue-600">
              Login
            </Link>
            <Link to="/register" className="text-gray-600 hover:text-blue-600">
              Register
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-blue-600"
              title="Dashboard"
            >
              <User size={22} />
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-500"
              title="Logout"
            >
              <LogOut size={22} />
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

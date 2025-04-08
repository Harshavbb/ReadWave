import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl font-bold text-blue-600">📚 Readwave</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
        <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
        <Link to="/register" className="text-gray-600 hover:text-blue-600">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;

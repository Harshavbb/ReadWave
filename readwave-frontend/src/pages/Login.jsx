import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Img from '../assets/login1.svg';
import API from '../utils/axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      
      // Access token and user from res.data
      const { token, user } = res.data;
  
      // Store them in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
  
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || 'Login failed');
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">
        
        {/* Illustration side */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-purple-200 to-purple-300 p-6">
          <img src={Img} alt="Library Illustration" className="w-3/4" />
        </div>

        {/* Login form */}
        <div className="p-8 sm:p-12">
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">Welcome Back</h2>
          <p className="text-gray-600 mb-8">Login to access your account and explore more.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500 hover:text-indigo-600"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-lg transition duration-200"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline font-medium">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

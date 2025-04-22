import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Img from '../assets/register.svg';
import API from '../utils/axios'; // Make sure this points to your axios instance

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rollNo: '',
    section: '',
    year: '',
    department: '',
    role: 'student',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'year' ? parseInt(value) || '' : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', formData);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">
        
        {/* Illustration */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-purple-200 to-purple-300 p-6">
          <img src={Img} alt="Library Illustration" className="w-4/5" />
        </div>

        {/* Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-purple-700 mb-6">Create Your Account</h2>
          <p className="text-gray-600 mb-8">Join us and start exploring today!</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-12"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500 hover:text-purple-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              <input
                type="text"
                name="rollNo"
                placeholder="Roll Number"
                value={formData.rollNo}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
              <input
                type="text"
                name="section"
                placeholder="Section"
                value={formData.section}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
              <input
                type="number"
                name="year"
                placeholder="Year (1-4)"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                min="1"
                max="4"
                required
              />
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 col-span-full"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold shadow-lg transition duration-200"
            >
              Register
            </button>
          </form>

          {/* Already have account */}
          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

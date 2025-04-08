import React from 'react';
import { Link } from 'react-router-dom';
import HeroImg from '../assets/hero-book.svg';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-teal-100 text-gray-800">
      <main className="flex flex-col md:flex-row items-center justify-between px-10 py-24 gap-10">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h2 className="text-5xl font-extrabold leading-tight mb-6 text-indigo-800">Reimagine your Library Experience</h2>
          <p className="text-lg mb-8 text-gray-600">
            Manage books, track borrowings, and explore a world of knowledge. A complete digital library system built for students and admins.
          </p>
          <div className="space-x-4">
            <Link to="/register" className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition">
              Get Started
            </Link>
            <Link to="/login" className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition">
              Login
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2">
          <img
            src={HeroImg}
            alt="Library illustration"
            className="w-full max-w-lg mx-auto"
          />
        </div>
      </main>

      <footer className="text-center text-gray-500 py-6 border-t mt-10">
        &copy; {new Date().getFullYear()} ReadWave. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;

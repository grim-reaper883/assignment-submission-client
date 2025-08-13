import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Sign in data:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-cyan-500 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white text-black rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">

            <h1 className="text-5xl font-bold text-gray-800 mb-2">Log In</h1>

          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-b from-blue-900 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Sign In
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm">Or continue with</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social Login */}
          <div className="flex justify-center mb-8">
            <button className="p-4 px-8 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
              <FaGoogle className="text-black text-xl mx-auto group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to='/signup'>
              <button className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                Sign Up
              </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
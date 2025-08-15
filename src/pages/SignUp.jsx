import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create user with email and password
      const userCredential = await createUser(formData.email, formData.password);

      // Update user profile with name
      await updateUserProfile(formData.name);

      // Extract user info from credentials
      const { user } = userCredential; // Destructure the user object

      // Save user to your database
      try {
        const userInfo = {
          name: formData.name,
          email: user.email, // Use the actual email from Firebase
          role: 'student'
        };

        await axiosPublic.post('/users', userInfo);
        console.log('user saved to database successfully');

        // Now generate JWT token
        await axiosPublic.post('/jwt', { email: user.email });
        console.log('JWT token generated successfully');

      } catch (error) {
        console.error('error saving user to database', error);
        setError('Failed to save user data. Please try again.');
      }

      navigate(from, { replace: true });
    } catch (error) {
      console.error('Sign up error:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      // Sign in with Google
      const result = await googleSignIn();
      const user = result.user;

      // Save user to your database
      try {
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: 'student'
        };
        await axiosPublic.post('/users', userInfo);
        console.log('Google user saved to database successfully');

        // Generate JWT token
        await axiosPublic.post('/jwt', { email: user.email });
        console.log('JWT token generated successfully');

      } catch (error) {
        console.error('error saving Google user to database', error);
        setError('Failed to save user data. Please try again.');
      }

      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google sign up error:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled. Please contact support';
      case 'auth/popup-closed-by-user':
        return 'Google sign-up was cancelled';
      default:
        return 'An error occurred during sign up';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-cyan-500 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white text-black rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-2">Create Account</h1>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
                disabled={loading}
              />
            </div>

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
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
                disabled={loading}
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-b from-blue-900 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm">Or continue with</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social Login */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="p-4 px-8 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaGoogle className="text-black text-xl mx-auto group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to='/signin'>
                <button className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                  Log In
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
import React from 'react';
import { FaFileAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="text-center text-white mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to AssignHub
          </h1>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-orange-400 rounded-full flex items-center justify-center mr-6">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'} 
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <FaUser size={32} className="text-white" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {user.displayName || user.email?.split('@')[0] || 'User'}
              </h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Assignments Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Assignments</h3>
              <p className="text-gray-600 mb-6">
                View and manage your course assignments
              </p>
              <Link to="/assignment">
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                  View Assignments
                </button>
              </Link>
            </div>
          </div>

          {/* Submissions Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaFileAlt size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Submissions</h3>
              <p className="text-gray-600 mb-6">
                Submit and track your assignment submissions
              </p>
              <Link to="/submission">
                <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                  View Submissions
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;



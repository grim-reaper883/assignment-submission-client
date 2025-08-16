import { FaCalendarAlt, FaCreditCard, FaFileAlt, FaPlus, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Outlet } from 'react-router-dom';
import { Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { MdReviews } from "react-icons/md";

const Main = () => {
  const { user, userRole, logOut } = useAuth();
  const isInstructor = userRole === 'instructor';

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (logoutError) {
      console.error('Logout error:', logoutError);
    }
  };



  return (
    <div className="flex">
      <div>
        <div className="w-64 h-screen bg-gradient-to-b from-blue-900 to-cyan-500 text-white flex flex-col">
          {/* Header */}
          <div className="p-6">
            <div className="text-center mb-10">
              <h1 className="text-xl font-semibold">AssignHub</h1>
            </div>

            {/* User Profile */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mb-3">
                <FaUser size={24} className="text-white" />
              </div>
              <h2 className="text-lg font-semibold mb-1 text-center">
                {user.displayName || user.email?.split('@')[0] || 'User'}
              </h2>
              <p className="text-sm text-blue-100 text-center">
                {user.email}
              </p>
              <p className="text-xs text-blue-200 text-center mt-1 capitalize">
                {userRole || 'User'}
              </p>
            </div>
          </div>



          {/* Navigation Menu */}
          <nav className="flex-1 px-6">
            <ul className="space-y-2">
              {
                isInstructor ? <>
                  {/* instructor ui */}
                  <li>
                    <Link to='/'>
                      <div className="flex items-center py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
                        <FaUser size={20} className="mr-3" />
                        <span>Home</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to='/manageAssignments'>
                      <div className="flex items-center py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
                        <FaCalendarAlt size={20} className="mr-3" />
                        <span>Manage Assignments</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to='/addAssignment'>
                      <div className="flex items-center py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
                        <FaPlus size={20} className="mr-3" />
                        <span>Add Assignments</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to='/reviewSubmissions'>
                      <div className="flex items-center py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
                        <MdReviews size={20} className="mr-3" />
                        <span>Review Submissions</span>
                      </div>
                    </Link>
                  </li>
                </> : <>
                  {/* student ui */}
                  <li>
                    <Link to='/'>
                      <div className="flex items-center py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
                        <FaUser size={20} className="mr-3" />
                        <span>Home</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to='/assignment'>
                      <div className="flex items-center py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
                        <FaCalendarAlt size={20} className="mr-3" />
                        <span>Assignment</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to='/submission'>
                      <div className="flex items-center py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
                        <FaFileAlt size={20} className="mr-3" />
                        <span>Submission</span>
                      </div>
                    </Link>
                  </li></>
              }
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center py-3 px-4 rounded-lg hover:bg-white/10 transition-colors text-left"
            >
              <FaSignOutAlt size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
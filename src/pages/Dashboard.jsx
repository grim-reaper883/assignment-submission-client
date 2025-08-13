import { FaCalendarAlt, FaCreditCard, FaFileAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
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
          <h2 className="text-lg font-semibold mb-1">Aman</h2>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 px-6">
        <ul className="space-y-2">
          <li>
           <Link to='/assignment'>
            <div href="#" className="flex items-center py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
              <FaCalendarAlt size={20} className="mr-3" />
              <span>Assignment</span>
            </div>
           </Link>
          </li>
          <li>
            <Link to='/submission'>
            <div href="#" className="flex items-center py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
              <FaFileAlt size={20} className="mr-3" />
              <span>Submission</span>
            </div>
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* Logout */}
      <div className="p-6">
        <a href="#" className="flex items-center py-3 px-4 rounded-lg hover:bg-white/10 transition-colors">
          <FaSignOutAlt size={20} className="mr-3" />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
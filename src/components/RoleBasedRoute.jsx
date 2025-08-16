import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleBasedRoute;

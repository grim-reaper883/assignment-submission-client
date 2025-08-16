import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const useUserRole = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setUserRole(null);
        setLoading(false);
        return;
      }

      try {
        const response = await axiosPublic.get(`/users/${user.email}`);
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user, axiosPublic]);

  return { userRole, loading };
};

export default useUserRole;

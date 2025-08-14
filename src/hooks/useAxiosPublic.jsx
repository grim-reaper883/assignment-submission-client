import { useMemo } from 'react';

const useAxiosPublic = () => {
  const axiosPublic = useMemo(() => {
    // Create a simple axios-like object for basic functionality
    // You can replace this with actual axios if you install it
    return {
      post: async (url, data) => {
        // For now, just return a mock response
        // You can implement actual HTTP requests here later
        console.log('Mock POST request to:', url, 'with data:', data);
        return {
          data: { token: 'mock-jwt-token' }
        };
      }
    };
  }, []);

  return axiosPublic;
};

export default useAxiosPublic;


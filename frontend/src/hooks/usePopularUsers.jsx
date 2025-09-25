import { useQuery } from '@tanstack/react-query';
import { endpoints } from '../utils/endpoints';

const usePopularUsers = () => {
  return useQuery({
    queryKey: ['popularUsers'],
    queryFn: async () => {
      const response = await fetch(endpoints.users);
      if (!response.ok) {
        throw new Error('Failed to fetch popular users');
      }
      const data = await response.json();
      
      // Ensure we return an array
      if (Array.isArray(data)) {
        return data;
      } else if (data && Array.isArray(data.results)) {
        return data.results;
      } else {
        console.warn('API returned non-array data:', data);
        return [];
      }
    },
    refetchInterval: 300000, // 5 minutes
    staleTime: 120000, // 2 minutes
    cacheTime: 600000, // 10 minutes
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    onError: (error) => {
      console.error('Error fetching popular users:', error);
      return [];
    }
  });
};

export { usePopularUsers };
export default usePopularUsers;
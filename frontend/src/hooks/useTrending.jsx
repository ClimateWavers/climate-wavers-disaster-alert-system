import { useQuery } from '@tanstack/react-query';
import { client } from '../api';
import { endpoints } from '../utils/endpoints';

const useTrending = () => {
  return useQuery({
    queryKey: ['trending'],
    queryFn: async () => {
      try {
        const response = await client.run('get', '/api/v1/post/trending/', {}, true);
        return response;
      } catch (error) {
        console.error('Error fetching trending data:', error);
        throw error;
      }
    },
    refetchInterval: 30000, // 30 seconds
    staleTime: 15000, // 15 seconds
    cacheTime: 60000, // 1 minute
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 3,
    retryDelay: 1000,
  });
};

export { useTrending };
export default useTrending;
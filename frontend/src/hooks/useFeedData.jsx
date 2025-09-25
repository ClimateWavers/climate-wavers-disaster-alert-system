import { useQuery } from '@tanstack/react-query';
import { endpoints } from '../utils/endpoints';

const useFeedData = (feedType) => {
  const feedHashtags = {
    'Climate Action': '#ClimateAction',
    'Alerts': '#ClimateAlert',
    'Disasters': '#DisasterAlert'
  };

  return useQuery({
    queryKey: ['feedData', feedType],
    queryFn: async () => {
      let url;
      
      if (feedType === 'Trending') {
        url = `${endpoints.post}trending/`;
      } else {
        const hashtag = feedHashtags[feedType];
        if (!hashtag) {
          throw new Error(`Unknown feed type: ${feedType}`);
        }
        
        const params = new URLSearchParams({ hashtag });
        url = `/api/v1/search-by-hashtag/?${params}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${feedType} data`);
      }
      return response.json();
    },
    enabled: !!feedType,
    refetchInterval: 60000, // 1 minute
    staleTime: 30000, // 30 seconds
    cacheTime: 180000, // 3 minutes
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    onError: (error) => {
      console.error(`Error fetching ${feedType} data:`, error);
      return [];
    }
  });
};

export { useFeedData };
export default useFeedData;
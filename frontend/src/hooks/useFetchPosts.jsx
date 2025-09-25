import { useQuery } from "@tanstack/react-query";
import { client } from "../api";
import { endpoints } from "../utils/endpoints";

export const useFetchPosts = ({ type, postId, comment }) => {
  let url;
  if (postId && type === "comments" && !comment) {
    url = `${endpoints.comments}?post=${postId}`;
  } else if (comment && type === "comments") {
    url = `${endpoints.comments}?parent=${comment}`;
  } else if (type === "post") {
    url = `${endpoints.post}`;
  }

  const fetchPosts = async () => {
    try {
      const res = await client.run("get", url, {}, true);
      // Ensure we return an array
      if (Array.isArray(res)) {
        return res;
      } else if (typeof res === 'string') {
        console.warn('API returned string instead of array:', res);
        return [];
      } else {
        console.warn('API returned unexpected data type:', typeof res, res);
        return [];
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  };

  return useQuery({
    queryKey: ["post", postId, comment],
    queryFn: fetchPosts,
    refetchInterval: 300000, // Refetch every 5 minutes to reduce API load
    refetchIntervalInBackground: false, // Don't refetch when tab is not active
    staleTime: 120000, // Consider data stale after 2 minutes
    cacheTime: 600000, // Keep in cache for 10 minutes
    retry: 2, // Retry twice on failure
    retryDelay: 3000, // Wait 3 seconds before retry
  });
};

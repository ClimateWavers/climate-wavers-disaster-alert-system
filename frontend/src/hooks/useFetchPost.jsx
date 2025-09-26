import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../utils/endpoints";
import { client } from "../api";

export const useFetchPost = ({ type, postId }) => {

  let url;
  if (postId && type === "post") {
    url = `${endpoints.post}${postId}/`;
  } else if (postId && type === "comments") {
    url = `${endpoints.comments}?post=${postId}`;
  }

  const fetchComments = async () => {
    if (!postId) {
      throw new Error("Post ID is required");
    }
    
    try {
      const res = await client.run("get", url, {}, true);
      return res;
    } catch (error) {
      if (error.response?.status === 404) {
        console.warn(`Post ${postId} not found`);
        // Return appropriate empty data based on type
        if (type === "post") {
          return null; // Return null for non-existent single post
        } else {
          return []; // Return empty array for non-existent comments
        }
      }
      throw error;
    }
  };

  return useQuery({
    queryKey: ["comments", postId],
    queryFn: fetchComments,
    enabled: !!postId, // Only run query if postId exists
    retry: false, // Don't retry on 404 errors
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};


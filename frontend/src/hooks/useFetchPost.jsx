import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../utils/endpoints";
import { client } from "../api";

export const useFetchPost = ({ type, postId }) => {

  let url;
  if (postId && type === "post") {
    url = `${endpoints.post}${postId}/`;
  } else if (postId && type === "comments") {
    url = `${endpoints.comments}${postId}/`;
  }

  const fetchComments = async () => {
    const res = await client.run("get", url, {}, true);
    return res;
  };

  return useQuery({
    queryKey: ["comments", postId],
    queryFn: fetchComments,
  });
};


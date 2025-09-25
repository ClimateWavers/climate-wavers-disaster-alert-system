import { useQuery } from "@tanstack/react-query";
import { client } from "../api";
import { endpoints } from "../utils/endpoints";
import { getAuthToken } from "../utils/factory";

export const useProfile = ({user_id}) => {
    const url = endpoints.profile
    const fetchProfile = async () => {
        console.log("Fetching profile for user_id:", user_id, "Type:", typeof user_id);
        console.log("URL:", url);
        console.log("Auth token:", getAuthToken());
        
        // Ensure user_id is an integer
        const userIdInt = parseInt(user_id);
        console.log("Converted user_id to integer:", userIdInt);
        
        const res = await client.run("post", url, {user_id: userIdInt}, true);
        console.log("Profile API Response:", res);
        console.log("Posts data:", res?.posts);
        console.log("Comments data:", res?.comments);
        console.log("Reposts data:", res?.repost);
        console.log("Bookmarks data:", res?.bookmarks);
        console.log("Reactions data:", res?.reactions);
        console.log("Polls data:", res?.polls);
        return res;
      };


return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
}

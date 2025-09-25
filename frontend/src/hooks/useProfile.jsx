import { useQuery } from "@tanstack/react-query";
import { client } from "../api";
import { endpoints } from "../utils/endpoints";
import { getAuthToken } from "../utils/factory";

export const useProfile = ({user_id}) => {
    const url = endpoints.profile
    const fetchProfile = async () => {
        console.log("Fetching profile for user_id:", user_id);
        console.log("URL:", url);
        console.log("Auth token:", getAuthToken());
        const res = await client.run("post", url, {user_id}, true);
        return res;
      };


return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
}

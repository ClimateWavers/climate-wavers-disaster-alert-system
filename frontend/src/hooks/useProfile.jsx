import { useQuery } from "@tanstack/react-query";
import { client } from "../api";
import { endpoints } from "../utils/endpoints";

export const useProfile = ({user_id}) => {
    const url = endpoints.profile
    const fetchProfile = async () => {
        const res = await client.run("post", url, {user_id}, true);
        return res;
      };


return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
}

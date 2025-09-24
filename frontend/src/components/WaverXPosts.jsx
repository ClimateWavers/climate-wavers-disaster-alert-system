import Posts from "./Posts";
import { usePostMutations } from "../hooks/usePostMutations";
import { useProfile } from "../hooks/useProfile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const WaverXPosts = () => {
  const waverxId = import.meta.env.VITE_APP_WAVERX_ID;
  const [activities, setActivities] = useState([]);
  const {
    isPending,
    error,
    isFetched,
    data: user,
  } = useProfile({
    user_id: waverxId,
  });

  useEffect(() => {
    if (isPending) {
      toast.dismiss();
      toast.info("Fetching WaverX Activities...", {
        autoClose: 200,
      });
    }
    if (isFetched) {
      setActivities(user.posts);
    }

    if (error) {
      toast.dismiss();
      toast.error("An error fetching waverx activities");
    }
  }, [isFetched, isPending, error, user]);

  const {
    likeMutation,
    unlikeMutation,
    repostMutation,
    unrepostMutation,
    saveMutation,
    unsaveMutation,
  } = usePostMutations();

  return (
    <div>
          <Posts
            posts={activities}
            type={"post"}
            postId={""}
            unlike={unlikeMutation}
            like={likeMutation}
            repost={repostMutation}
            unrepost={unrepostMutation}
            save={saveMutation}
            unsave={unsaveMutation}
          />
        </div>
  );
};

export default WaverXPosts;

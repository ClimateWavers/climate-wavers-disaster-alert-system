import Posts from "./Posts";
import { usePostMutations } from "../hooks/usePostMutations";
import { useProfile } from "../hooks/useProfile";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const WaverXPosts = () => {
  // Use the WaverX user ID we just created (ID: 5)
  const waverxId = import.meta.env.VITE_APP_WAVERX_ID || 5;
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
    if (isFetched && user) {
      // Handle the case where user might be undefined or posts might not exist
      setActivities(user.posts || []);
    }

    if (error) {
      toast.dismiss();
      console.error("WaverX Activities Error:", error);
      toast.error("Unable to fetch WaverX activities. The AI assistant may not be available yet.");
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
      {activities.length > 0 ? (
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
      ) : (
        <div className="p-6 text-center bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-500 text-base">WaverX is ready to assist!</div>
          <div className="text-gray-400 text-sm mt-2">The AI assistant will share insights and updates here</div>
          <div className="text-gray-300 text-xs mt-1">Check back later for WaverX activities</div>
        </div>
      )}
    </div>
  );
};

export default WaverXPosts;

import { useState, useEffect } from "react";
import { BsBriefcase } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { toast } from "react-toastify";
import Feed from "./Feed";
import { useParams, useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { endpoints } from "../utils/endpoints";
import { client } from "../api";
import { getUser } from "../utils/factory";

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState({});
  const [feed, setFeed] = useState({});
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(false);
  const me = getUser();

  const {
    error,
    isFetched,
    data: user,
  } = useProfile({
    user_id: userId,
  });

  const profileFeeds = [
    "post",
    "comments",
    "reposts",
    "bookmarks",
    "likes",
    "polls",
  ];

  useEffect(() => {
    if (isFetched) {
      setProfile(user.user);
      setIsFollow(user.user?.is_following)
      const feeds = {
        post: user.posts,
        comments: user.comments,
        reposts: user.repost,
        bookmarks: user.bookmarks,
        likes: user.reactions,
        polls: user.polls,
      };
      setFeed(feeds);
    }

    if (error) {
      toast.dismiss();
      toast.error("An error occurred while fetching profile");
    }
  }, [isFetched, error, user]);

  const handleProfilePictureClick = (event) => {
    event.stopPropagation();
    if (user?.user?.id === me.id) {
      navigate("/uploadphoto");
    }
  };

  const handleCoverPhotoClick = (e) => {
    e.preventDefault();
    if (user?.user?.id === me.id) {
      navigate("/uploadcover");
    }
  };

  const follow = async (userId) => {
    await client.run("post", endpoints?.follow, { following: userId }, true);
  };

  const unfollow = async (userId) => {
    await client.run("delete", `${endpoints?.follow}${userId}/`, {}, true);
  };
  const handleFollow = async (userId) => {
    if (!isFollow) {
      await follow(userId);
    } else {
      await unfollow(userId);
    }
  };

  return (
    <div className="text-2xl text-center px-2 pt-8  ">
      <div className="h-[35vh] lg:h-[40vh]">
        <div
          className={`h-[30vh] lg:h-[35vh] w-[100%] bg-cover bg-center relative  rounded-[20px] cursor-pointer`}
          style={{
            backgroundImage: `url(${
              profile?.cover ? `${profile.cover}` : "/environ.jpeg"
            })`,
          }}
          onClick={(e) => handleCoverPhotoClick(e)} // Click handler for cover photo
        >
          <img
            src={profile?.profile_picture}
            className="absolute bottom-0 left-0 w-28 ml-2 mb-2 z-10  rounded-full transform translate-y-1/2 cursor-pointer"
            alt="Profile"
            onClick={handleProfilePictureClick} // Click handler for profile picture
          />
        </div>
      </div>
      <div className="pb-4">
        <div className="flex justify-between">
        <div className="flex flex-col mt-3 px-2 md:px-0 ">
          <h2 className="text-center  md:text-2xl  font-semibold flex flex-row items-center  ">
            {profile?.first_name} {profile?.last_name}
          </h2>
          <h2 className=" text-center md:text-md text-sm font-semibold flex flex-row items-center text-gray-400 ">
            @{profile?.username}
          </h2>
        </div>
        {me.id !== profile?.id && (
        <button
          onClick={() => {
            setIsFollow(!isFollow);
            handleFollow(profile?.id);
          }}
          // style={followStyle}
          className={`bg-black text-sm  text-white font-semibold py-2 h-[35px] w-24 px-3 ml-2  rounded-2xl ${
            isFollow &&
            "bg-stone-100 outline outline-2 outline-stone-500 !text-slate-700 before:hover:content-['']  hover:bg-green-100 hover:outline hover:outline-3 hover:outline-black-500 hover:text-black-500 "
          } `}
        >
          {isFollow ? "Following" : "Follow"}
        </button>
      )}
      </div>
        <p className=" font-normal text-left ml-2 text-base my-2 ">
          {profile?.bio}
        </p>
        <div className="font-normal text-left text-xl white text-base my-4 flex flex-row items-center gap-5   ">
          <p className="flex flex-row items-center gap-1 ">
            <FiMapPin size={17} />
            {profile?.country}
          </p>
          <p className="flex flex-row items-center gap-1">
            <BsBriefcase size={17} />
            {profile?.profession ? profile.profession : "Climate Enthusiast"}
          </p>
        </div>
      </div>
      <Feed feeds={profileFeeds} feedData={feed} />
    </div>
  );
};

export default Profile;

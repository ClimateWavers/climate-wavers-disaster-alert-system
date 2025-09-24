import { useState } from "react";
import PropTypes from "prop-types";
import { endpoints } from "../utils/endpoints";
import { client } from "../api";
import { Link } from "react-router-dom";
import { getUser } from "../utils/factory";

const Accountcard = ({ user }) => {
  const [isFollow, setIsFollow] = useState(user?.is_following);
  const me = getUser();

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
    <div className="flex flex-row items-center px-3 py-1 justify-between ">
      <Link to={`/${user?.id}/profile`}>
        <div className="flex flex-row items-center self-center text-black ">
          <img
            src={user?.profile_picture}
            className="mr-2 rounded-full h-12"
            alt="Profile Pic"
          />{" "}
          <div className="text-lg font-bold flex flex-col">
            <h3>
              {user?.first_name} {user?.last_name}
            </h3>
            <p className="text-md text-left text-gray-500">@{user?.username}</p>
          </div>
        </div>
      </Link>
      {me.id !== user?.id && (
        <button
          onClick={() => {
            setIsFollow(!isFollow);
            handleFollow(user?.id);
          }}
          // style={followStyle}
          className={`bg-black text-sm  text-white font-semibold py-2 px-3 ml-2  rounded-2xl ${
            isFollow &&
            "bg-stone-100 outline outline-2 outline-stone-500 !text-slate-700 before:hover:content-['']  hover:bg-green-100 hover:outline hover:outline-3 hover:outline-black-500 hover:text-black-500 "
          } `}
        >
          {isFollow ? "Following" : "Follow"}
        </button>
      )}
    </div>
  );
};

Accountcard.propTypes = {
  user: PropTypes.object,
};

export default Accountcard;

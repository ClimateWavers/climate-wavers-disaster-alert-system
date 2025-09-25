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
    <div className="flex items-center justify-between">
      <Link to={`/app/${user?.id}/profile`} className="flex-1 min-w-0 group">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="relative">
            <img
              src={user?.profile_picture || "/avatar.png"}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-teal-200 transition-all duration-200 flex-shrink-0"
              alt="Profile Pic"
              onError={(e) => {
                e.target.src = "/avatar.png";
              }}
            />
            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-teal-600 transition-colors duration-200">
              {user?.first_name} {user?.last_name}
            </h3>
            <p className="text-sm text-gray-500 truncate">@{user?.username}</p>
          </div>
        </div>
      </Link>
      {me.id !== user?.id && (
        <button
          onClick={() => {
            setIsFollow(!isFollow);
            handleFollow(user?.id);
          }}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 flex-shrink-0 ${
            isFollow
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
              : "bg-teal-500 text-white hover:bg-teal-600 shadow-sm hover:shadow-md"
          }`}
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

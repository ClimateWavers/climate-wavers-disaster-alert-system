import { useState } from "react";
import PropTypes from "prop-types";
import Posts from "./Posts";
import { usePostMutations } from "../hooks/usePostMutations";
import { stripLastS } from "../utils/factory";

const Feed = ({ feeds, feedData }) => {
  const [feed, setFeed] = useState("post");

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
      <div className=" text-lg md:text-xl border-gray-200 rounded-md h-[50px] border-2 font-bold  ">
        <div className="text-black font-bold text-xl flex flex-row px-4 py-2 justify-between gap-x-4 h-[100%] text-base overflow-x-auto">
          {feeds?.map((pageFeed) => (
            <div
              key={pageFeed}
              className={`cursor-pointer capitalize ${
                feed === pageFeed
                  ? "border-b-4 text-capitalize border-[#008080]"
                  : null
              } `}
              onClick={() => {
                setFeed(pageFeed);
              }}
            >
              {pageFeed}
            </div>
          ))}
        </div>
      </div>
      {feedData[feed]
        ? feedData[feed].map((post) => (
            <div key={post.id}>
              <Posts
                posts={
                  feed === "post" || feed === "comments" ? [post] : [post[stripLastS(post?.content_type)]]
                }
                type={
                  feed === "post" || feed === "comments"
                    ? feed
                    : post.content_type
                }
                
                postId={feed !== "post" ? post?.post?.id : ""}
                unlike={unlikeMutation}
                like={likeMutation}
                repost={repostMutation}
                unrepost={unrepostMutation}
                save={saveMutation}
                unsave={unsaveMutation}
              />
            </div>
          ))
        : []}
    </div>
  );
};

Feed.propTypes = {
  feeds: PropTypes.array,
};

export default Feed;

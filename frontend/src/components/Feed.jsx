import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Posts from "./Posts";
import { usePostMutations } from "../hooks/usePostMutations";
import { stripLastS } from "../utils/factory";

const Feed = ({ feeds, feedData, activeFeed, setActiveFeed, isLoading, error }) => {
  const [feed, setFeed] = useState(activeFeed || "Trending");

  const {
    likeMutation,
    unlikeMutation,
    repostMutation,
    unrepostMutation,
    saveMutation,
    unsaveMutation,
  } = usePostMutations();

  // Sync local feed state with activeFeed prop
  useEffect(() => {
    if (activeFeed && activeFeed !== feed) {
      setFeed(activeFeed);
    }
  }, [activeFeed, feed]);

  return (
    <div className="w-full">
      <div className="text-lg md:text-xl border-gray-200 rounded-md h-[50px] border-2 font-bold">
        <div className="text-black font-bold text-xl flex flex-row px-2 sm:px-4 py-2 justify-between gap-x-2 sm:gap-x-4 h-[100%] text-sm sm:text-base overflow-x-auto">
          {feeds?.map((pageFeed) => (
            <div
              key={pageFeed}
              className={`cursor-pointer capitalize ${
                feed === pageFeed
                  ? "border-b-4 text-capitalize border-[#2F4F4F]"
                  : null
              } `}
              onClick={() => {
                setFeed(pageFeed);
                if (setActiveFeed) {
                  setActiveFeed(pageFeed);
                }
              }}
            >
              {pageFeed}
            </div>
          ))}
        </div>
      </div>
      {/* Loading State */}
      {isLoading && (
        <div className="p-6 sm:p-8 text-center bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-500 text-base sm:text-lg">Loading {feed} content...</div>
          <div className="text-gray-400 text-sm mt-1">Please wait while we fetch the latest posts</div>
          <div className="mt-3 flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#2F4F4F]"></div>
          </div>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="p-6 sm:p-8 text-center bg-white rounded-lg shadow-sm border border-red-200">
          <div className="text-red-500 text-base sm:text-lg">Failed to load {feed} content</div>
          <div className="text-red-400 text-sm mt-1">Please try refreshing the page</div>
        </div>
      )}
      
      {/* Content based on feed type */}
      {!isLoading && !error && feedData && (
        <div className="mt-4">
          {feed === "Trending" ? (
            // For trending, show trending hashtags in a clean layout
            <div className="p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 font-medium">Real-time trending topics:</div>
              {Array.isArray(feedData) && feedData.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {feedData.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                        <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-[#2F4F4F] text-white text-xs font-bold rounded-full flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-800 text-sm sm:text-base truncate">#{item.hashtags}</span>
                      </div>
                      <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                        <span className="text-xs sm:text-sm text-gray-500">{item.count} posts</span>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <div className="text-gray-500 text-sm sm:text-base">No trending data available</div>
                  <div className="text-gray-400 text-xs sm:text-sm mt-1">Check back later for trending topics</div>
                </div>
              )}
            </div>
          ) : (
            // For other feeds, show posts
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {feedData?.latest_posts && feedData.latest_posts.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {feedData.latest_posts.map((post) => (
                    <div key={post.id} className="p-3 sm:p-4">
              <Posts
                        posts={[post]}
                        type="post"
                        postId=""
                unlike={unlikeMutation}
                like={likeMutation}
                repost={repostMutation}
                unrepost={unrepostMutation}
                save={saveMutation}
                unsave={unsaveMutation}
              />
            </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 sm:p-8 text-center">
                  <div className="text-gray-500 text-base sm:text-lg font-medium">No {feed} posts found</div>
                  <div className="text-gray-400 text-sm mt-2">Posts with #{feed} hashtag will appear here</div>
                  <div className="text-gray-300 text-xs mt-1">Create posts with the #{feed} hashtag to see them here</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Feed.propTypes = {
  feeds: PropTypes.array,
  feedData: PropTypes.any,
  activeFeed: PropTypes.string,
  setActiveFeed: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.any,
};

export default Feed;




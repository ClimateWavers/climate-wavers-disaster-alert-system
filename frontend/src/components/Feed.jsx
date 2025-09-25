import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Posts from "./Posts";
import ProfileContent from "./ProfileContent";
import { usePostMutations } from "../hooks/usePostMutations";
import { stripLastS } from "../utils/factory";

const Feed = ({ feeds, feedData, activeFeed, setActiveFeed, isLoading, error, trendingData, trendingLoading, trendingError }) => {
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
          {feed === "trending" || feed === "Trending" ? (
            // For trending, show trending hashtags in a clean layout
            <div className="p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 font-medium">Real-time trending topics:</div>
              {trendingLoading ? (
                <div className="space-y-2 sm:space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : trendingError ? (
                <div className="text-center py-6 sm:py-8">
                  <div className="text-red-500 text-sm sm:text-base">Failed to load trending topics</div>
                  <div className="text-gray-400 text-xs sm:text-sm mt-1">Please try again later</div>
                </div>
              ) : Array.isArray(trendingData) && trendingData.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {trendingData.slice(0, 5).map((item, index) => (
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
            // For profile feeds, show different content types
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {(() => {
                // Get the appropriate data based on feed type
                let contentData = [];
                let contentType = "post";
                
                switch (feed) {
                  case "post":
                    contentData = feedData?.post || [];
                    contentType = "post";
                    break;
          case "comments":
            contentData = feedData?.comments || [];
            contentType = "comment";
            console.log("Comments feed data:", { contentData, contentType, feedData });
            break;
                  case "reposts":
                    contentData = feedData?.reposts || [];
                    contentType = "repost";
                    break;
                  case "bookmarks":
                    contentData = feedData?.bookmarks || [];
                    contentType = "bookmark";
                    break;
                  case "likes":
                    contentData = feedData?.likes || [];
                    contentType = "reaction";
                    break;
                  case "polls":
                    contentData = feedData?.polls || [];
                    contentType = "poll";
                    break;
                  default:
                    contentData = feedData?.post || [];
                    contentType = "post";
                }
                
                console.log(`Rendering ${feed} feed:`, { contentData, contentType });
                
                if (contentData && contentData.length > 0) {
                  // Sort posts by creation date (newest first)
                  const sortedContent = [...contentData].sort((a, b) => {
                    const dateA = new Date(a.created_at || a.date_created || 0);
                    const dateB = new Date(b.created_at || b.date_created || 0);
                    return dateB - dateA; // Newest first
                  });

                  return (
                    <div className="grid gap-6 md:gap-8">
                      {sortedContent.map((item, index) => (
                        <div key={item.id || index} className="w-full">
                          <ProfileContent
                            content={item}
                            type={contentType}
                            onLike={likeMutation.mutate}
                            onUnlike={unlikeMutation.mutate}
                            onRepost={repostMutation.mutate}
                            onUnrepost={unrepostMutation.mutate}
                            onSave={saveMutation.mutate}
                            onUnsave={unsaveMutation.mutate}
                          />
                        </div>
                      ))}
                    </div>
                  );
                } else {
                  return (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                      <div className="mb-4">
                        {feed === "post" && "📝"}
                        {feed === "comments" && "💬"}
                        {feed === "reposts" && "🔄"}
                        {feed === "bookmarks" && "🔖"}
                        {feed === "likes" && "❤️"}
                        {feed === "polls" && "📊"}
                      </div>
                      <div className="text-gray-500 text-lg font-semibold mb-2">No {feed} found</div>
                      <div className="text-gray-400 text-sm">
                        {feed === "post" && "This user hasn't posted anything yet"}
                        {feed === "comments" && "This user hasn't commented on anything yet"}
                        {feed === "reposts" && "This user hasn't reposted anything yet"}
                        {feed === "bookmarks" && "This user hasn't bookmarked anything yet"}
                        {feed === "likes" && "This user hasn't liked anything yet"}
                        {feed === "polls" && "This user hasn't created any polls yet"}
                      </div>
                    </div>
                  );
                }
              })()}
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




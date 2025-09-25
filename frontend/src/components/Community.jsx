import Feed from "./Feed";
import Trending from "./Trending";
import { useFeedData } from "../hooks/useFeedData";
import { useTrending } from "../hooks/useTrending";
import { useState } from "react";

const Community = () => {
  const [activeFeed, setActiveFeed] = useState("Trending");

  const feeds = [
    "Trending",
    "Climate Action", 
    "Alerts",
    "Disasters"
  ];

  // Fetch data for the active feed
  const { data: feedData, isLoading, error } = useFeedData(activeFeed);
  
  // Fetch trending data separately for better integration
  const {
    data: trendingData,
    isLoading: trendingLoading,
    error: trendingError,
  } = useTrending();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Feed Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
              <div className="text-lg md:text-xl border-gray-200 rounded-md h-[50px] border-2 font-bold">
                <Feed 
                  feeds={feeds} 
                  feedData={feedData} 
                  activeFeed={activeFeed}
                  setActiveFeed={setActiveFeed}
                  isLoading={isLoading}
                  error={error}
                  trendingData={trendingData}
                  trendingLoading={trendingLoading}
                  trendingError={trendingError}
                />
              </div>
            </div>
            
            {/* All content is now handled by the Feed component */}
          </div>
          
          {/* Trending Sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="space-y-4">
              <Trending 
                trendingData={trendingData}
                isLoading={trendingLoading}
                error={trendingError}
              />
              {/* Add more sidebar content here if needed */}
            </div>
          </div>
          
          {/* Trending for Mobile - Below posts */}
          <div className="lg:hidden mt-4 sm:mt-6">
            <Trending 
              trendingData={trendingData}
              isLoading={trendingLoading}
              error={trendingError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;

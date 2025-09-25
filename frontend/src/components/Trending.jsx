import React from 'react';
import { useTrending } from '../hooks/useTrending';
import RealtimeIndicator from './RealtimeIndicator';

const Trending = () => {
  const { data: trendingData, isLoading, error, isFetching } = useTrending();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Trending</h3>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Trending</h3>
        <div className="text-red-500 text-sm">
          Failed to load trending topics
        </div>
      </div>
    );
  }

  const displayData = trendingData?.slice(0, 5) || [];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">Trending</h3>
        <RealtimeIndicator 
          isFetching={isFetching} 
          lastUpdate={new Date()}
        />
      </div>
      
      <div className="space-y-3">
        {displayData.length > 0 ? (
          displayData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    #{index + 1}
                  </span>
                  <span className="text-sm text-gray-700 font-medium">
                    {item.hashtags}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {item.count} posts
                </div>
              </div>
              <div className="text-xs text-gray-400">
                {item.count > 1 ? 'trending' : 'new'}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm text-center py-4">
            No trending topics yet
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Live trending</span>
          <span>Updates every 30s</span>
        </div>
      </div>
    </div>
  );
};

export default Trending;
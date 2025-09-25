import React from 'react';

const RealtimeIndicator = ({ isFetching, lastUpdated }) => {
  const getTimeAgo = (timestamp) => {
    if (!timestamp) return null;
    
    const now = new Date();
    const updated = new Date(timestamp);
    const diffInSeconds = Math.floor((now - updated) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m ago`;
    } else {
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    }
  };

  const timeAgo = getTimeAgo(lastUpdated);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        <div className={`w-2 h-2 rounded-full ${isFetching ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`}></div>
        <span className="text-xs text-gray-500">
          {isFetching ? 'Live updating...' : timeAgo ? `Live • ${timeAgo}` : 'Live'}
        </span>
      </div>
    </div>
  );
};

export default RealtimeIndicator;
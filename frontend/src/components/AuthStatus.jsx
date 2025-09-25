import React from 'react';
import { IoWarning } from 'react-icons/io5';

const AuthStatus = ({ isAuthenticated, onLogin }) => {
  if (isAuthenticated) {
    return null; // Don't show anything if authenticated
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
      <div className="flex items-center space-x-2">
        <IoWarning className="text-yellow-600 text-lg" />
        <div className="flex-1">
          <p className="text-sm text-yellow-800 font-medium">
            Login required for AI features
          </p>
          <p className="text-xs text-yellow-700 mt-1">
            Some features require authentication to work properly.
          </p>
        </div>
        {onLogin && (
          <button
            onClick={onLogin}
            className="text-xs bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthStatus;
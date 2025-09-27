import React, { useState, useEffect } from 'react';
import { IoLeaf, IoCheckmarkCircle } from 'react-icons/io5';
import { client } from '../api';
import { endpoints } from '../utils/endpoints';
import { getUser } from '../utils/factory';

const TreeBadge = ({ 
  hasPlantedTrees = false, 
  treesCount = 0, 
  size = 'medium',
  showCount = true,
  className = '',
  userId = null
}) => {
  const [currentTreesCount, setCurrentTreesCount] = useState(treesCount);
  const [currentHasPlanted, setCurrentHasPlanted] = useState(hasPlantedTrees);
  const [loading, setLoading] = useState(false);

  const fetchUserTrees = async () => {
    try {
      setLoading(true);
      const user = getUser();
      const targetUserId = userId || user?.id;
      
      if (!targetUserId) {
        console.log('No user ID available for fetching trees');
        return;
      }

      // Fetch user's tree donations from the database
      const response = await client.run('get', `${endpoints.treeProjectDonations}?donor=${targetUserId}`, null, true);
      
      if (response.results) {
        const totalTrees = response.results.reduce((sum, donation) => sum + (donation.trees_purchased || 0), 0);
        setCurrentTreesCount(totalTrees);
        setCurrentHasPlanted(totalTrees > 0);
        
        // Data is now managed by the database, no localStorage needed
        
        console.log(`Fetched ${totalTrees} trees for user ${targetUserId}`);
      }
    } catch (error) {
      console.error('Error fetching user trees:', error);
      // No fallback needed - data comes from database
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch trees from database on component mount
    fetchUserTrees();

    // Listen for user trees updated event (for real-time updates)
    const handleUserTreesUpdated = (event) => {
      const newTreesCount = event.detail.trees_planted;
      setCurrentTreesCount(newTreesCount);
      setCurrentHasPlanted(newTreesCount > 0);
    };

    window.addEventListener('userTreesUpdated', handleUserTreesUpdated);

    return () => {
      window.removeEventListener('userTreesUpdated', handleUserTreesUpdated);
    };
  }, [userId]);

  if (!currentHasPlanted) return null;

  const sizeClasses = {
    small: 'w-6 h-6 text-xs',
    medium: 'w-8 h-8 text-sm',
    large: 'w-12 h-12 text-lg'
  };

  const iconSizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-6 h-6'
  };

  return (
    <div className={`relative inline-flex items-center justify-center z-[9999] ${sizeClasses[size]} ${className}`}>
      {/* Badge Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg animate-pulse"></div>
      
      {/* Badge Content */}
      <div className="relative z-10 flex items-center justify-center">
        <IoLeaf className={`${iconSizes[size]} text-white`} />
      </div>
      
      {/* Tree Count Badge */}
      {showCount && currentTreesCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full min-w-[18px] h-[18px] flex items-center justify-center text-xs font-bold shadow-lg">
          {currentTreesCount}
        </div>
      )}
      
      {/* Verified Checkmark */}
      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 shadow-lg">
        <IoCheckmarkCircle className="w-3 h-3 text-white" />
      </div>
    </div>
  );
};

export default TreeBadge;

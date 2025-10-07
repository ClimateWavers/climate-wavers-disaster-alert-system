import React from 'react';
import { Link } from 'react-router-dom';

const RelatedCampaigns = ({ campaigns, disasterId }) => {
  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="text-center py-8">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No related campaigns</h3>
        <p className="mt-1 text-sm text-gray-500">No relief campaigns are currently associated with this disaster.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-100 text-green-800 border-green-200',
      'fundraising': 'bg-blue-100 text-blue-800 border-blue-200',
      'completed': 'bg-gray-100 text-gray-800 border-gray-200',
      'paused': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'cancelled': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Related Relief Campaigns</h3>
        <span className="text-sm text-gray-500">{campaigns.length} campaigns</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((campaign, index) => (
          <div key={campaign.id || index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            {/* Campaign Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {campaign.title || campaign.name || 'Relief Campaign'}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {campaign.description?.substring(0, 120) || 'No description available.'}
                  {campaign.description?.length > 120 && '...'}
                </p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(campaign.status)}`}>
                {campaign.status?.toUpperCase() || 'ACTIVE'}
              </span>
            </div>

            {/* Campaign Image */}
            {campaign.image && (
              <div className="mb-4">
                <img
                  src={campaign.image}
                  alt={campaign.title || 'Campaign image'}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Campaign Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">
                  {formatCurrency(campaign.amount_raised || campaign.raised || 0)}
                </div>
                <div className="text-xs text-gray-600">Raised</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900">
                  {formatCurrency(campaign.target_amount || campaign.goal || 0)}
                </div>
                <div className="text-xs text-gray-600">Goal</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>
                  {Math.round(((campaign.amount_raised || 0) / (campaign.target_amount || 1)) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(((campaign.amount_raised || 0) / (campaign.target_amount || 1)) * 100, 100)}%`
                  }}
                ></div>
              </div>
            </div>

            {/* Campaign Details */}
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              {campaign.organization && (
                <div>
                  <span className="font-medium">Organization:</span> {campaign.organization}
                </div>
              )}
              {campaign.location && (
                <div>
                  <span className="font-medium">Location:</span> {campaign.location}
                </div>
              )}
              <div>
                <span className="font-medium">Created:</span> {formatDate(campaign.created_at || campaign.start_date)}
              </div>
              {campaign.end_date && (
                <div>
                  <span className="font-medium">Ends:</span> {formatDate(campaign.end_date)}
                </div>
              )}
            </div>

            {/* Campaign Actions */}
            <div className="flex space-x-3">
              <Link
                to={`/campaigns/${campaign.id}`}
                className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                View Campaign
              </Link>
              <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedCampaigns;
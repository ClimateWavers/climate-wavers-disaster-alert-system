import React from 'react';

const DisasterStats = ({ statistics }) => {
  if (!statistics) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Disasters',
      value: statistics.total_disasters || 0,
      icon: '🌍',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      bgColor: 'bg-blue-500'
    },
    {
      title: 'Active Disasters',
      value: statistics.active_disasters || 0,
      icon: '🔄',
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      bgColor: 'bg-orange-500'
    },
    {
      title: 'Urgent Disasters',
      value: statistics.urgent_disasters || 0,
      icon: '🚨',
      color: 'bg-red-50 text-red-600 border-red-200',
      bgColor: 'bg-red-500'
    },
    {
      title: 'Verified Disasters',
      value: statistics.verified_disasters || 0,
      icon: '✅',
      color: 'bg-green-50 text-green-600 border-green-200',
      bgColor: 'bg-green-500'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Disaster Statistics</h2>
      
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg border border-gray-200">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center text-white text-xl`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Type */}
        {statistics.by_type && statistics.by_type.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">By Disaster Type</h3>
            <div className="space-y-3">
              {statistics.by_type.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {item.disaster_type.replace('_', ' ')}
                  </span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(item.count / Math.max(...statistics.by_type.map(t => t.count))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* By Severity */}
        {statistics.by_severity && statistics.by_severity.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">By Severity</h3>
            <div className="space-y-3">
              {statistics.by_severity.map((item, index) => {
                const severityColors = {
                  'low': 'bg-green-500',
                  'moderate': 'bg-yellow-500',
                  'high': 'bg-orange-500',
                  'severe': 'bg-red-500',
                  'extreme': 'bg-purple-500',
                  'catastrophic': 'bg-red-600'
                };
                return (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {item.severity}
                    </span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className={`h-2 rounded-full ${severityColors[item.severity] || 'bg-gray-500'}`}
                          style={{ width: `${(item.count / Math.max(...statistics.by_severity.map(s => s.count))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{item.count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* By Country */}
        {statistics.by_country && statistics.by_country.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">By Country</h3>
            <div className="space-y-3">
              {statistics.by_country.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {item.country}
                  </span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full" 
                        style={{ width: `${(item.count / Math.max(...statistics.by_country.map(c => c.count))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* By Status */}
        {statistics.by_status && statistics.by_status.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">By Status</h3>
            <div className="space-y-3">
              {statistics.by_status.map((item, index) => {
                const statusColors = {
                  'monitoring': 'bg-blue-500',
                  'alert': 'bg-yellow-500',
                  'warning': 'bg-orange-500',
                  'ongoing': 'bg-red-500',
                  'contained': 'bg-green-500',
                  'resolved': 'bg-gray-500',
                  'investigating': 'bg-purple-500'
                };
                return (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {item.status}
                    </span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className={`h-2 rounded-full ${statusColors[item.status] || 'bg-gray-500'}`}
                          style={{ width: `${(item.count / Math.max(...statistics.by_status.map(s => s.count))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{item.count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisasterStats;
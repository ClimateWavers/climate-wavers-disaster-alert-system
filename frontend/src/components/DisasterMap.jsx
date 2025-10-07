import React, { useState, useEffect } from 'react';

const DisasterMap = ({ disasters }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState(null);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getSeverityColor = (severity) => {
    const colors = {
      'low': '#10B981',
      'moderate': '#F59E0B',
      'high': '#F97316',
      'severe': '#EF4444',
      'extreme': '#8B5CF6',
      'catastrophic': '#DC2626'
    };
    return colors[severity] || '#6B7280';
  };

  const getSeveritySize = (severity) => {
    const sizes = {
      'low': 8,
      'moderate': 12,
      'high': 16,
      'severe': 20,
      'extreme': 24,
      'catastrophic': 28
    };
    return sizes[severity] || 10;
  };

  if (!disasters || disasters.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Disaster Map</h3>
        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">No disaster data available for mapping</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Disaster Map</h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {disasters.length} disasters shown
          </span>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Urgent</span>
          </div>
        </div>
      </div>

      {!mapLoaded ? (
        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Map Container */}
          <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-gray-200 relative overflow-hidden">
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>

            {/* Disaster Markers */}
            {disasters.map((disaster, index) => {
              // Generate random positions for demo (in real app, use actual lat/lng)
              const x = 20 + (index * 15) % 60;
              const y = 20 + (index * 23) % 60;
              const severity = disaster.severity || 'moderate';
              const isUrgent = disaster.is_urgent || false;
              const isActive = disaster.is_active || false;

              return (
                <div
                  key={disaster.id}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setSelectedDisaster(disaster)}
                >
                  {/* Marker */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold ${
                      isUrgent ? 'animate-pulse' : ''
                    }`}
                    style={{
                      backgroundColor: getSeverityColor(severity),
                      width: `${getSeveritySize(severity)}px`,
                      height: `${getSeveritySize(severity)}px`
                    }}
                  >
                    {isUrgent ? '!' : '●'}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-gray-900 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                      {disaster.title || `${disaster.disaster_type} in ${disaster.country}`}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              );
            })}

            {/* Map Legend */}
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Severity Legend</h4>
              <div className="space-y-2">
                {[
                  { severity: 'low', label: 'Low' },
                  { severity: 'moderate', label: 'Moderate' },
                  { severity: 'high', label: 'High' },
                  { severity: 'severe', label: 'Severe' },
                  { severity: 'extreme', label: 'Extreme' },
                  { severity: 'catastrophic', label: 'Catastrophic' }
                ].map((item) => (
                  <div key={item.severity} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getSeverityColor(item.severity) }}
                    ></div>
                    <span className="text-xs text-gray-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-4 left-4 flex space-x-2">
              <button className="bg-white rounded-lg shadow-lg p-2 border border-gray-200 hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="bg-white rounded-lg shadow-lg p-2 border border-gray-200 hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Selected Disaster Details */}
          {selectedDisaster && (
            <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {selectedDisaster.title || `${selectedDisaster.disaster_type} in ${selectedDisaster.country}`}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <span className="ml-2 font-medium capitalize">
                        {selectedDisaster.disaster_type?.replace('_', ' ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Severity:</span>
                      <span className="ml-2 font-medium capitalize">{selectedDisaster.severity}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <span className="ml-2 font-medium capitalize">{selectedDisaster.status}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Location:</span>
                      <span className="ml-2 font-medium">
                        {selectedDisaster.city && selectedDisaster.region && selectedDisaster.country
                          ? `${selectedDisaster.city}, ${selectedDisaster.region}, ${selectedDisaster.country}`
                          : selectedDisaster.region && selectedDisaster.country
                          ? `${selectedDisaster.region}, ${selectedDisaster.country}`
                          : selectedDisaster.country || 'Unknown'
                        }
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDisaster(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DisasterMap;
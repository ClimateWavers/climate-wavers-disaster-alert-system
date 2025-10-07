import React from 'react';

const DisasterFilters = ({ filters, onFilterChange }) => {
  const disasterTypes = [
    'earthquake', 'flood', 'wildfire', 'hurricane', 'tornado', 'drought',
    'tsunami', 'volcanic_eruption', 'landslide', 'heatwave', 'coldwave',
    'storm', 'cyclone', 'typhoon', 'blizzard', 'avalanche', 'pandemic',
    'industrial_accident', 'nuclear_accident', 'terrorist_attack',
    'civil_unrest', 'war', 'other'
  ];

  const severityLevels = [
    'low', 'moderate', 'high', 'severe', 'extreme', 'catastrophic'
  ];

  const statusOptions = [
    'monitoring', 'alert', 'warning', 'ongoing', 'contained', 'resolved', 'investigating'
  ];

  const countries = [
    'USA', 'China', 'India', 'Japan', 'Germany', 'UK', 'France', 'Italy',
    'Brazil', 'Canada', 'Australia', 'Russia', 'South Korea', 'Mexico',
    'Indonesia', 'Netherlands', 'Turkey', 'Saudi Arabia', 'Switzerland',
    'Taiwan', 'Belgium', 'Argentina', 'Ireland', 'Israel', 'Austria'
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      disaster_type: "",
      severity: "",
      status: "",
      country: "",
      is_verified: null,
      is_active: null,
      is_urgent: null,
      ordering: "-created_at"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Disaster Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Disaster Type
          </label>
          <select
            value={filters.disaster_type}
            onChange={(e) => handleFilterChange('disaster_type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">All Types</option>
            {disasterTypes.map((type) => (
              <option key={type} value={type}>
                {type.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Severity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Severity
          </label>
          <select
            value={filters.severity}
            onChange={(e) => handleFilterChange('severity', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">All Severities</option>
            {severityLevels.map((severity) => (
              <option key={severity} value={severity}>
                {severity.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">All Statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            value={filters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Boolean Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Verified */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Verification Status
          </label>
          <select
            value={filters.is_verified === null ? '' : filters.is_verified.toString()}
            onChange={(e) => handleFilterChange('is_verified', e.target.value === '' ? null : e.target.value === 'true')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">All</option>
            <option value="true">Verified Only</option>
            <option value="false">Unverified Only</option>
          </select>
        </div>

        {/* Active */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activity Status
          </label>
          <select
            value={filters.is_active === null ? '' : filters.is_active.toString()}
            onChange={(e) => handleFilterChange('is_active', e.target.value === '' ? null : e.target.value === 'true')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">All</option>
            <option value="true">Active Only</option>
            <option value="false">Inactive Only</option>
          </select>
        </div>

        {/* Urgent */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Urgency Level
          </label>
          <select
            value={filters.is_urgent === null ? '' : filters.is_urgent.toString()}
            onChange={(e) => handleFilterChange('is_urgent', e.target.value === '' ? null : e.target.value === 'true')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">All</option>
            <option value="true">Urgent Only</option>
            <option value="false">Non-Urgent Only</option>
          </select>
        </div>
      </div>

      {/* Sort Order */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={filters.ordering}
          onChange={(e) => handleFilterChange('ordering', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="-created_at">Newest First</option>
          <option value="created_at">Oldest First</option>
          <option value="-severity">Highest Severity</option>
          <option value="severity">Lowest Severity</option>
          <option value="-casualties">Most Casualties</option>
          <option value="casualties">Least Casualties</option>
          <option value="title">Title A-Z</option>
          <option value="-title">Title Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default DisasterFilters;
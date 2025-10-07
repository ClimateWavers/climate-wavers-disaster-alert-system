import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const DisasterForm = ({ onDisasterCreated, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    disaster_type: 'other',
    severity: 'moderate',
    status: 'monitoring',
    country: '',
    region: '',
    city: '',
    latitude: '',
    longitude: '',
    start_date: '',
    end_date: '',
    casualties: '',
    injured: '',
    missing: '',
    displaced: '',
    economic_damage: '',
    emergency_contact: '',
    emergency_phone: '',
    emergency_email: '',
    weather_conditions: '',
    temperature: '',
    wind_speed: '',
    humidity: '',
    precipitation: '',
    response_organizations: '',
    evacuation_centers: '',
    emergency_shelters: '',
    cover_image: '',
    official_source: '',
    official_website: '',
    is_verified: false
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const disasterTypes = [
    { value: 'earthquake', label: 'Earthquake' },
    { value: 'flood', label: 'Flood' },
    { value: 'wildfire', label: 'Wildfire' },
    { value: 'hurricane', label: 'Hurricane' },
    { value: 'tornado', label: 'Tornado' },
    { value: 'drought', label: 'Drought' },
    { value: 'tsunami', label: 'Tsunami' },
    { value: 'volcanic_eruption', label: 'Volcanic Eruption' },
    { value: 'landslide', label: 'Landslide' },
    { value: 'heatwave', label: 'Heatwave' },
    { value: 'coldwave', label: 'Coldwave' },
    { value: 'storm', label: 'Storm' },
    { value: 'cyclone', label: 'Cyclone' },
    { value: 'typhoon', label: 'Typhoon' },
    { value: 'blizzard', label: 'Blizzard' },
    { value: 'avalanche', label: 'Avalanche' },
    { value: 'pandemic', label: 'Pandemic' },
    { value: 'other', label: 'Other' }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'high', label: 'High' },
    { value: 'severe', label: 'Severe' },
    { value: 'extreme', label: 'Extreme' },
    { value: 'catastrophic', label: 'Catastrophic' }
  ];

  const statusOptions = [
    { value: 'monitoring', label: 'Monitoring' },
    { value: 'alert', label: 'Alert' },
    { value: 'warning', label: 'Warning' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'contained', label: 'Contained' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'investigating', label: 'Investigating' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    
    if (!formData.region.trim()) {
      newErrors.region = 'Region is required';
    }
    
    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required';
    }
    
    if (formData.latitude && (isNaN(formData.latitude) || formData.latitude < -90 || formData.latitude > 90)) {
      newErrors.latitude = 'Latitude must be between -90 and 90';
    }
    
    if (formData.longitude && (isNaN(formData.longitude) || formData.longitude < -180 || formData.longitude > 180)) {
      newErrors.longitude = 'Longitude must be between -180 and 180';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare data for submission
      const submitData = {
        ...formData,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        casualties: formData.casualties ? parseInt(formData.casualties) : null,
        injured: formData.injured ? parseInt(formData.injured) : null,
        missing: formData.missing ? parseInt(formData.missing) : null,
        displaced: formData.displaced ? parseInt(formData.displaced) : null,
        economic_damage: formData.economic_damage ? parseFloat(formData.economic_damage) : null,
        temperature: formData.temperature ? parseFloat(formData.temperature) : null,
        wind_speed: formData.wind_speed ? parseFloat(formData.wind_speed) : null,
        humidity: formData.humidity ? parseFloat(formData.humidity) : null,
        precipitation: formData.precipitation ? parseFloat(formData.precipitation) : null,
        response_organizations: formData.response_organizations ? 
          formData.response_organizations.split(',').map(org => org.trim()) : [],
        evacuation_centers: formData.evacuation_centers ? 
          formData.evacuation_centers.split(',').map(center => center.trim()) : [],
        emergency_shelters: formData.emergency_shelters ? 
          formData.emergency_shelters.split(',').map(shelter => shelter.trim()) : []
      };
      
      const response = await axios.post('/api/v1/disasters/', submitData);
      
      toast.success('Disaster created successfully!');
      onDisasterCreated(response.data);
      
    } catch (error) {
      console.error('Error creating disaster:', error);
      toast.error('Failed to create disaster. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Disaster Report</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disaster Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#067d83] focus:border-[#067d83] ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter disaster title..."
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disaster Type
            </label>
            <select
              name="disaster_type"
              value={formData.disaster_type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#067d83] focus:border-[#067d83]"
            >
              {disasterTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#067d83] focus:border-[#067d83] ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe the disaster in detail..."
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Location Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Location Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#067d83] focus:border-[#067d83] ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter country..."
              />
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region *
              </label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#067d83] focus:border-[#067d83] ${
                  errors.region ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter region/state..."
              />
              {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#067d83] focus:border-[#067d83]"
                placeholder="Enter city..."
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Latitude
              </label>
              <input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                step="any"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#067d83] focus:border-[#067d83] ${
                  errors.latitude ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 40.7128"
              />
              {errors.latitude && <p className="text-red-500 text-sm mt-1">{errors.latitude}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longitude
              </label>
              <input
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                step="any"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#067d83] focus:border-[#067d83] ${
                  errors.longitude ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., -74.0060"
              />
              {errors.longitude && <p className="text-red-500 text-sm mt-1">{errors.longitude}</p>}
            </div>
          </div>
        </div>

        {/* Impact Assessment */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Impact Assessment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Casualties
              </label>
              <input
                type="number"
                name="casualties"
                value={formData.casualties}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#067d83] focus:border-[#067d83]"
                placeholder="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Injured
              </label>
              <input
                type="number"
                name="injured"
                value={formData.injured}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#067d83] focus:border-[#067d83]"
                placeholder="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Missing
              </label>
              <input
                type="number"
                name="missing"
                value={formData.missing}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#067d83] focus:border-[#067d83]"
                placeholder="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Displaced
              </label>
              <input
                type="number"
                name="displaced"
                value={formData.displaced}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#067d83] focus:border-[#067d83]"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Emergency Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact
              </label>
              <input
                type="text"
                name="emergency_contact"
                value={formData.emergency_contact}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#067d83] focus:border-[#067d83]"
                placeholder="Emergency services contact..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Phone
              </label>
              <input
                type="tel"
                name="emergency_phone"
                value={formData.emergency_phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#067d83] focus:border-[#067d83]"
                placeholder="+1-800-555-0123"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Email
              </label>
              <input
                type="email"
                name="emergency_email"
                value={formData.emergency_email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#067d83] focus:border-[#067d83]"
                placeholder="emergency@example.com"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="border-t pt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#067d83] text-white rounded-lg hover:bg-[#055a5f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Disaster Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DisasterForm;

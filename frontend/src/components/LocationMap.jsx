import { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaCrosshairs, FaSearch, FaTimes } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';

const LocationMap = ({ 
  initialLat = null, 
  initialLng = null, 
  initialAddress = '',
  onLocationSelect,
  height = '400px',
  showSearch = true,
  showCurrentLocation = true
}) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: initialLat,
    lng: initialLng,
    address: initialAddress
  });
  
  const mapRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    // Dynamically import Leaflet
    import('leaflet').then((L) => {
      // Fix for default markers in Leaflet with Webpack
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      // Create map
      const mapInstance = L.map(mapRef.current).setView(
        [selectedLocation.lat || 8.7832, selectedLocation.lng || 20.5085], 
        6
      );

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance);

      // Add marker if initial coordinates exist
      if (selectedLocation.lat && selectedLocation.lng) {
        const initialMarker = L.marker([selectedLocation.lat, selectedLocation.lng])
          .addTo(mapInstance);
        setMarker(initialMarker);
      }

      // Add click event to map
      mapInstance.on('click', (e) => {
        const { lat, lng } = e.latlng;
        handleLocationClick(lat, lng, mapInstance);
      });

      setMap(mapInstance);
    });

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  // Handle location click
  const handleLocationClick = async (lat, lng, mapInstance = map) => {
    if (!mapInstance) return;

    // Remove existing marker
    if (marker) {
      mapInstance.removeLayer(marker);
    }

    // Add new marker
    const newMarker = L.marker([lat, lng]).addTo(mapInstance);
    setMarker(newMarker);

    // Get address from coordinates
    const addressData = await getAddressFromCoordinates(lat, lng);
    
    const locationData = {
      lat: parseFloat(lat.toFixed(6)),
      lng: parseFloat(lng.toFixed(6)),
      address: addressData.fullAddress,
      country: addressData.country,
      region: addressData.region,
      city: addressData.city
    };

    setSelectedLocation(locationData);
    onLocationSelect && onLocationSelect(locationData);
  };

  // Get address from coordinates using Nominatim
  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();
      
      if (data && data.display_name) {
        return {
          fullAddress: data.display_name,
          country: data.address?.country || '',
          region: data.address?.state || data.address?.region || data.address?.county || '',
          city: data.address?.city || data.address?.town || data.address?.village || data.address?.hamlet || ''
        };
      }
      return {
        fullAddress: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
        country: '',
        region: '',
        city: ''
      };
    } catch (error) {
      console.error('Error getting address:', error);
      return {
        fullAddress: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
        country: '',
        region: '',
        city: ''
      };
    }
  };

  // Search for location
  const searchLocation = async (query) => {
    if (!query.trim() || !map) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        
        // Move map to location
        map.setView([lat, lng], 12);
        
        // Add marker and get detailed address
        await handleLocationClick(lat, lng, map);
      }
    } catch (error) {
      console.error('Error searching location:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Search after 500ms delay
    if (query.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        searchLocation(query);
      }, 500);
    }
  };

  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        // Move map to current location
        map.setView([lat, lng], 15);
        
        // Add marker and get detailed address
        await handleLocationClick(lat, lng, map);
      },
      (error) => {
        console.error('Error getting current location:', error);
        alert('Unable to get your current location. Please try again.');
      }
    );
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="w-full">
      {/* Search and Controls */}
      {(showSearch || showCurrentLocation) && (
        <div className="mb-4 space-y-3">
          {showSearch && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for a location..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FaTimes className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
              {isSearching && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                </div>
              )}
            </div>
          )}

          {showCurrentLocation && (
            <button
              onClick={getCurrentLocation}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <FaCrosshairs className="mr-2" />
              Use Current Location
            </button>
          )}
        </div>
      )}

      {/* Map Container */}
      <div className="relative">
        <div
          ref={mapRef}
          style={{ height: height }}
          className="w-full rounded-lg border border-gray-300"
        />
        
        {/* Map Instructions */}
        <div className="absolute top-2 left-2 bg-white bg-opacity-90 px-3 py-2 rounded-md shadow-sm">
          <div className="flex items-center text-sm text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-green-600" />
            Click on the map to select location
          </div>
        </div>
      </div>

      {/* Selected Location Info */}
      {selectedLocation.lat && selectedLocation.lng && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">Selected Location</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-green-600" />
              <span className="text-gray-700">
                {selectedLocation.address || 'Address not available'}
              </span>
            </div>
            {(selectedLocation.country || selectedLocation.region || selectedLocation.city) && (
              <div className="text-gray-600">
                {selectedLocation.city && <span>{selectedLocation.city}</span>}
                {selectedLocation.region && <span>{selectedLocation.city ? ', ' : ''}{selectedLocation.region}</span>}
                {selectedLocation.country && <span>{selectedLocation.city || selectedLocation.region ? ', ' : ''}{selectedLocation.country}</span>}
              </div>
            )}
            <div className="text-gray-600">
              Coordinates: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMap;

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom disaster marker icons
const createDisasterIcon = (severity) => {
  const colors = {
    'CRITICAL': '#dc2626', // red-600
    'HIGH': '#ea580c',     // orange-600
    'MEDIUM': '#d97706',   // amber-600
    'LOW': '#16a34a'       // green-600
  };

  return L.divIcon({
    className: 'custom-disaster-marker',
    html: `
      <div style="
        width: 30px;
        height: 30px;
        background: ${colors[severity] || colors['LOW']};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        cursor: pointer;
        transition: transform 0.2s ease;
      ">
        ${severity === 'CRITICAL' ? '🚨' : severity === 'HIGH' ? '⚠️' : severity === 'MEDIUM' ? '⚡' : '📍'}
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });
};

const LeafletMap = ({ disasters, onDisasterClick }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [selectedDisaster, setSelectedDisaster] = useState(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [20, 0],
        zoom: 2,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true,
        touchZoom: true,
        boxZoom: true,
        keyboard: true
      });

      // Add tile layers
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);

      // Add satellite layer
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
        opacity: 0.7
      }).addTo(mapInstanceRef.current);
    }

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Add disaster markers
    disasters.forEach((disaster) => {
      const marker = L.marker([disaster.coordinates.lat, disaster.coordinates.lng], {
        icon: createDisasterIcon(disaster.severity)
      });

      // Create popup content
      const popupContent = `
        <div style="padding: 8px; min-width: 200px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background: ${
              disaster.severity === 'CRITICAL' ? '#dc2626' :
              disaster.severity === 'HIGH' ? '#ea580c' :
              disaster.severity === 'MEDIUM' ? '#d97706' : '#16a34a'
            }"></div>
            <span style="font-weight: bold; font-size: 14px;">${disaster.severity}</span>
          </div>
          <h3 style="font-weight: 600; font-size: 18px; margin-bottom: 4px;">${disaster.name}</h3>
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">${disaster.type}</p>
          <p style="font-size: 14px; color: #374151; margin-bottom: 8px;">${disaster.description}</p>
          <div style="font-size: 12px; color: #6b7280;">
            <p><strong>Location:</strong> ${disaster.location}</p>
            <p><strong>Coordinates:</strong> ${disaster.coordinates.lat.toFixed(4)}, ${disaster.coordinates.lng.toFixed(4)}</p>
            <p><strong>Last Updated:</strong> ${new Date(disaster.lastUpdated).toLocaleString()}</p>
          </div>
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
            <button onclick="window.dispatchEvent(new CustomEvent('disasterClick', {detail: ${JSON.stringify(disaster)}}))" 
                    style="width: 100%; background: #dc2626; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 500; border: none; cursor: pointer;">
              View Details
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.addTo(mapInstanceRef.current);
      markersRef.current.push(marker);

      // Add click handler
      marker.on('click', () => {
        setSelectedDisaster(disaster);
        onDisasterClick(disaster);
      });
    });

    // Fit bounds to show all disasters
    if (disasters.length > 0) {
      const group = new L.featureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }

    // Listen for custom disaster click events from popup buttons
    const handleDisasterClick = (event) => {
      setSelectedDisaster(event.detail);
      onDisasterClick(event.detail);
    };

    window.addEventListener('disasterClick', handleDisasterClick);

    return () => {
      window.removeEventListener('disasterClick', handleDisasterClick);
    };
  }, [disasters, onDisasterClick]);

  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] rounded-2xl shadow-2xl border border-blue-700 overflow-hidden">
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />

      {/* Map Controls Overlay */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 space-y-2 border border-gray-200 z-[1000]">
        <div className="text-gray-800 text-sm font-bold mb-2">MAP CONTROLS</div>
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Low</span>
          </div>
        </div>
      </div>

      {/* Emergency Alert Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm border border-red-200 z-[1000]">
        <div className="text-red-800 text-sm font-bold mb-2">🚨 EMERGENCY ALERTS</div>
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>Active Disasters:</strong> {disasters.length}</p>
          <p><strong>Critical:</strong> {disasters.filter(d => d.severity === 'CRITICAL').length}</p>
          <p><strong>High:</strong> {disasters.filter(d => d.severity === 'HIGH').length}</p>
          <p><strong>Medium:</strong> {disasters.filter(d => d.severity === 'MEDIUM').length}</p>
          <p><strong>Low:</strong> {disasters.filter(d => d.severity === 'LOW').length}</p>
        </div>
        <div className="mt-3 pt-2 border-t border-gray-200">
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-red-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-red-700 transition-colors"
          >
            🔄 Refresh Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;

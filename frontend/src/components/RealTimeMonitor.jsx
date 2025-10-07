import React, { useState, useEffect, useRef } from 'react';

const RealTimeMonitor = () => {
  const [disasters, setDisasters] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    // Connect to WebSocket
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/disaster-monitoring/`;
    
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'initial_data') {
        setDisasters(data.disasters || []);
        setAlerts(data.alerts || []);
        setLastUpdate(new Date(data.timestamp));
      } else if (data.type === 'new_disaster') {
        setDisasters(prev => [data.disaster, ...prev]);
        setLastUpdate(new Date(data.timestamp));
      } else if (data.type === 'new_alert') {
        setAlerts(prev => [data.alert, ...prev]);
        setLastUpdate(new Date(data.timestamp));
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        if (ws.current?.readyState === WebSocket.CLOSED) {
          window.location.reload();
        }
      }, 5000);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'text-green-600 bg-green-100',
      moderate: 'text-yellow-600 bg-yellow-100',
      high: 'text-orange-600 bg-orange-100',
      severe: 'text-red-600 bg-red-100',
      catastrophic: 'text-red-800 bg-red-300'
    };
    return colors[severity] || 'text-gray-600 bg-gray-100';
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) { // Less than 1 minute
      return 'Just now';
    } else if (diff < 3600000) { // Less than 1 hour
      return `${Math.floor(diff / 60000)} minutes ago`;
    } else if (diff < 86400000) { // Less than 1 day
      return `${Math.floor(diff / 3600000)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Real-Time Monitor</h2>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-600">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {lastUpdate && (
        <div className="mb-4 text-sm text-gray-500">
          Last update: {formatTime(lastUpdate)}
        </div>
      )}

      {/* Active Alerts */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Active Alerts</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-red-800">{alert.title}</h4>
                    <p className="text-sm text-red-600">{alert.message}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatTime(alert.created_at)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No active alerts</p>
          )}
        </div>
      </div>

      {/* Recent Disasters */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Recent Disasters</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {disasters.length > 0 ? (
            disasters.map((disaster) => (
              <div
                key={disaster.id}
                className="p-3 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{disaster.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(disaster.severity)}`}>
                        {disaster.severity}
                      </span>
                      <span className="text-sm text-gray-600">{disaster.country}</span>
                      {disaster.is_urgent && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                          URGENT
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatTime(disaster.created_at)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No recent disasters</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitor;





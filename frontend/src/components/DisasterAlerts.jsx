import React from 'react';

const DisasterAlerts = ({ alerts, disasterId }) => {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="text-center py-8">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No alerts available</h3>
        <p className="mt-1 text-sm text-gray-500">No active alerts for this disaster.</p>
      </div>
    );
  }

  const getAlertColor = (level) => {
    const colors = {
      'info': 'bg-blue-50 border-blue-200 text-blue-800',
      'warning': 'bg-yellow-50 border-yellow-200 text-yellow-800',
      'alert': 'bg-orange-50 border-orange-200 text-orange-800',
      'critical': 'bg-red-50 border-red-200 text-red-800',
      'emergency': 'bg-red-100 border-red-300 text-red-900'
    };
    return colors[level] || 'bg-gray-50 border-gray-200 text-gray-800';
  };

  const getAlertIcon = (level) => {
    const icons = {
      'info': 'ℹ️',
      'warning': '⚠️',
      'alert': '🚨',
      'critical': '🔴',
      'emergency': '🚨'
    };
    return icons[level] || '📢';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
        <span className="text-sm text-gray-500">{alerts.length} alerts</span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div 
            key={alert.id || index} 
            className={`border rounded-lg p-6 ${getAlertColor(alert.level || alert.severity)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <span className="text-2xl">{getAlertIcon(alert.level || alert.severity)}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-lg">
                    {alert.title || 'Alert'}
                  </h4>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white bg-opacity-50">
                    {alert.level?.toUpperCase() || alert.severity?.toUpperCase() || 'ALERT'}
                  </span>
                </div>
                
                <p className="text-sm mb-4 leading-relaxed">
                  {alert.message || alert.content || alert.description || 'No message available.'}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {formatDate(alert.created_at || alert.timestamp || alert.issued_at)}
                  </span>
                  {alert.source && (
                    <span className="text-opacity-75">
                      Source: {alert.source}
                    </span>
                  )}
                </div>

                {alert.actions && alert.actions.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-current border-opacity-20">
                    <h5 className="font-semibold mb-2">Recommended Actions:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {alert.actions.map((action, actionIndex) => (
                        <li key={actionIndex}>{action}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisasterAlerts;
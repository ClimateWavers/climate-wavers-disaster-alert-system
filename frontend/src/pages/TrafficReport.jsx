import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const TrafficReport = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');

  const trafficData = {
    totalUsers: 125000,
    activeUsers: 89000,
    alertsSent: 450000,
    disastersReported: 1200,
    countriesCovered: 45,
    responseTime: '2.3s'
  };

  const alertStats = [
    { type: 'Hurricane', count: 12500, percentage: 35 },
    { type: 'Earthquake', count: 8900, percentage: 25 },
    { type: 'Flood', count: 7200, percentage: 20 },
    { type: 'Wildfire', count: 5400, percentage: 15 },
    { type: 'Tornado', count: 1800, percentage: 5 }
  ];

  const regionStats = [
    { region: 'North America', users: 45000, alerts: 180000 },
    { region: 'Europe', users: 32000, alerts: 125000 },
    { region: 'Asia', users: 28000, alerts: 95000 },
    { region: 'South America', users: 15000, alerts: 35000 },
    { region: 'Africa', users: 5000, alerts: 15000 }
  ];

  const systemMetrics = [
    { metric: 'Uptime', value: '99.9%', status: 'excellent' },
    { metric: 'Alert Delivery Rate', value: '98.7%', status: 'excellent' },
    { metric: 'False Positive Rate', value: '2.1%', status: 'good' },
    { metric: 'Response Time', value: '2.3s', status: 'excellent' },
    { metric: 'Data Accuracy', value: '96.4%', status: 'excellent' }
  ];

  return (
    <>
      <Helmet>
        <title>Traffic Report - Disaster Alert System</title>
        <meta name="description" content="Traffic Report for the Disaster Alert System - View system usage statistics and performance metrics." />
      </Helmet>
      
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center">
                <img alt="logo" src="/logo.jpg" className="h-8 w-auto mr-3" />
                <span className="text-xl font-bold text-[#067d83]">Disaster Alert System</span>
              </Link>
              <Link 
                to="/" 
                className="bg-[#067d83] text-white px-4 py-2 rounded-lg hover:bg-[#055a5f] transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Traffic Report</h1>
            <p className="text-gray-600 mb-6">
              System usage statistics and performance metrics for the Disaster Alert System
            </p>
            
            {/* Period Selector */}
            <div className="flex space-x-4 mb-8">
              {['7days', '30days', '90days', '1year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedPeriod === period
                      ? 'bg-[#067d83] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {period === '7days' ? '7 Days' : 
                   period === '30days' ? '30 Days' :
                   period === '90days' ? '90 Days' : '1 Year'}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{trafficData.totalUsers.toLocaleString()}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-3xl font-bold text-gray-900">{trafficData.activeUsers.toLocaleString()}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Alerts Sent</p>
                  <p className="text-3xl font-bold text-gray-900">{trafficData.alertsSent.toLocaleString()}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zM4 5h6V1H4v4zM15 3h5l-5-5v5z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Disasters Reported</p>
                  <p className="text-3xl font-bold text-gray-900">{trafficData.disastersReported.toLocaleString()}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Countries Covered</p>
                  <p className="text-3xl font-bold text-gray-900">{trafficData.countriesCovered}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                  <p className="text-3xl font-bold text-gray-900">{trafficData.responseTime}</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Alert Types Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Alert Types Distribution</h3>
              <div className="space-y-4">
                {alertStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-[#067d83] rounded-full mr-3"></div>
                      <span className="text-gray-700">{stat.type}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-[#067d83] h-2 rounded-full" 
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{stat.count.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Regional Distribution</h3>
              <div className="space-y-4">
                {regionStats.map((region, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{region.region}</span>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{region.users.toLocaleString()} users</p>
                      <p className="text-sm text-gray-500">{region.alerts.toLocaleString()} alerts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Performance */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">System Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">{metric.metric}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      metric.status === 'excellent' ? 'bg-green-100 text-green-800' :
                      metric.status === 'good' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {metric.status}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Data Usage */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Data Usage Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-lg mb-4">
                  <svg className="w-8 h-8 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Data Processed</h4>
                <p className="text-3xl font-bold text-[#067d83] mb-1">2.4 TB</p>
                <p className="text-sm text-gray-600">Weather & disaster data</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-lg mb-4">
                  <svg className="w-8 h-8 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">API Calls</h4>
                <p className="text-3xl font-bold text-[#067d83] mb-1">15.2M</p>
                <p className="text-sm text-gray-600">Requests processed</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-lg mb-4">
                  <svg className="w-8 h-8 text-purple-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Processing Speed</h4>
                <p className="text-3xl font-bold text-[#067d83] mb-1">1.2M</p>
                <p className="text-sm text-gray-600">Data points/minute</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-6">
                  <img alt="logo" src="/logo.jpg" className="h-10 w-auto mr-4" />
                  <h3 className="text-3xl font-bold text-[#067d83]">Disaster Alert System</h3>
                </div>
                <p className="text-gray-300 mb-8 max-w-lg text-lg leading-relaxed">
                  Advanced AI-powered disaster alert system protecting communities worldwide through 
                  real-time monitoring, predictive analytics, and coordinated emergency response.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Information</h4>
                <ul className="space-y-2">
                  <li><Link to="/traffic-report" className="text-gray-300 hover:text-[#067d83] transition-colors">Traffic Report</Link></li>
                  <li><Link to="/transparency-report" className="text-gray-300 hover:text-[#067d83] transition-colors">Transparency Report</Link></li>
                  <li><Link to="/faq" className="text-gray-300 hover:text-[#067d83] transition-colors">FAQ</Link></li>
                  <li><Link to="/privacy-policy" className="text-gray-300 hover:text-[#067d83] transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-gray-300 hover:text-[#067d83] transition-colors">About Us</Link></li>
                  <li><Link to="/contact" className="text-gray-300 hover:text-[#067d83] transition-colors">Contact Us</Link></li>
                  <li><Link to="/consulting" className="text-gray-300 hover:text-[#067d83] transition-colors">Consulting</Link></li>
                  <li><Link to="/support" className="text-gray-300 hover:text-[#067d83] transition-colors">Support</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">
                  © 2024 Disaster Alert System. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default TrafficReport;




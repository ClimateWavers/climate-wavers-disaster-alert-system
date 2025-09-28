import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const TransparencyReport = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

  const transparencyData = {
    dataRequests: 1250,
    dataDeletions: 890,
    dataCorrections: 234,
    privacyComplaints: 12,
    securityIncidents: 0,
    systemUptime: 99.9
  };

  const dataCategories = [
    {
      category: 'Personal Information',
      collected: 'Name, email, phone, location',
      purpose: 'Alert delivery and emergency response',
      retention: 'Until account deletion',
      shared: 'Emergency services only'
    },
    {
      category: 'Location Data',
      collected: 'GPS coordinates, address',
      purpose: 'Geographic alert targeting',
      retention: '30 days maximum',
      shared: 'Anonymized for research'
    },
    {
      category: 'Disaster Reports',
      collected: 'Incident descriptions, photos',
      purpose: 'Community safety and verification',
      retention: '1 year for analysis',
      shared: 'Emergency services, research'
    },
    {
      category: 'Usage Analytics',
      collected: 'App interactions, alert responses',
      purpose: 'System improvement',
      retention: '6 months',
      shared: 'Internal analysis only'
    }
  ];

  const securityMeasures = [
    {
      measure: 'Data Encryption',
      status: 'Active',
      description: 'All data encrypted in transit and at rest using AES-256',
      lastUpdated: '2024-01-15'
    },
    {
      measure: 'Access Controls',
      status: 'Active',
      description: 'Multi-factor authentication and role-based access',
      lastUpdated: '2024-02-01'
    },
    {
      measure: 'Security Audits',
      status: 'Active',
      description: 'Quarterly third-party security assessments',
      lastUpdated: '2024-03-15'
    },
    {
      measure: 'Incident Response',
      status: 'Active',
      description: '24/7 security monitoring and response team',
      lastUpdated: '2024-01-01'
    }
  ];

  const complianceStatus = [
    { regulation: 'GDPR', status: 'Compliant', lastAudit: '2024-03-01' },
    { regulation: 'CCPA', status: 'Compliant', lastAudit: '2024-02-15' },
    { regulation: 'HIPAA', status: 'Compliant', lastAudit: '2024-01-20' },
    { regulation: 'SOC 2', status: 'Compliant', lastAudit: '2024-02-28' }
  ];

  return (
    <>
      <Helmet>
        <title>Transparency Report - Disaster Alert System</title>
        <meta name="description" content="Transparency Report for the Disaster Alert System - Learn about our data practices, security measures, and compliance." />
      </Helmet>
      
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center">
                <img alt="logo" src="/logo.jpg" className="h-8 w-auto mr-3" />
                <span className="text-xl font-bold text-[#2F4F4F]">Disaster Alert System</span>
              </Link>
              <Link 
                to="/" 
                className="bg-[#2F4F4F] text-white px-4 py-2 rounded-lg hover:bg-[#1e3a3a] transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Transparency Report</h1>
            <p className="text-gray-600 mb-6">
              Our commitment to transparency in data practices, security measures, and system operations
            </p>
            
            {/* Year Selector */}
            <div className="flex space-x-4 mb-8">
              {['2022', '2023', '2024'].map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedYear === year
                      ? 'bg-[#2F4F4F] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Data Requests</p>
                  <p className="text-3xl font-bold text-gray-900">{transparencyData.dataRequests.toLocaleString()}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Data Deletions</p>
                  <p className="text-3xl font-bold text-gray-900">{transparencyData.dataDeletions.toLocaleString()}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Data Corrections</p>
                  <p className="text-3xl font-bold text-gray-900">{transparencyData.dataCorrections.toLocaleString()}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Privacy Complaints</p>
                  <p className="text-3xl font-bold text-gray-900">{transparencyData.privacyComplaints}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Security Incidents</p>
                  <p className="text-3xl font-bold text-green-600">{transparencyData.securityIncidents}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">System Uptime</p>
                  <p className="text-3xl font-bold text-gray-900">{transparencyData.systemUptime}%</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Data Categories */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Data Collection and Usage</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Collected</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retention</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shared With</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dataCategories.map((category, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{category.collected}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{category.purpose}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{category.retention}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{category.shared}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Security Measures */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Security Measures</h3>
              <div className="space-y-4">
                {securityMeasures.map((measure, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{measure.measure}</h4>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        {measure.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{measure.description}</p>
                    <p className="text-sm text-gray-500">Last updated: {measure.lastUpdated}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Compliance Status</h3>
              <div className="space-y-4">
                {complianceStatus.map((compliance, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{compliance.regulation}</h4>
                      <p className="text-sm text-gray-500">Last audit: {compliance.lastAudit}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                      {compliance.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Privacy Rights */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Privacy Rights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-lg mb-4">
                  <svg className="w-8 h-8 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Access Your Data</h4>
                <p className="text-sm text-gray-600">Request a copy of all data we have about you</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-lg mb-4">
                  <svg className="w-8 h-8 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Correct Your Data</h4>
                <p className="text-sm text-gray-600">Update or correct inaccurate information</p>
              </div>

              <div className="text-center">
                <div className="bg-red-100 p-4 rounded-lg mb-4">
                  <svg className="w-8 h-8 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Delete Your Data</h4>
                <p className="text-sm text-gray-600">Request complete deletion of your data</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-lg mb-4">
                  <svg className="w-8 h-8 text-purple-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Data Portability</h4>
                <p className="text-sm text-gray-600">Export your data in a portable format</p>
              </div>

              <div className="text-center">
                <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                  <svg className="w-8 h-8 text-yellow-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Opt Out</h4>
                <p className="text-sm text-gray-600">Opt out of non-essential data processing</p>
              </div>

              <div className="text-center">
                <div className="bg-indigo-100 p-4 rounded-lg mb-4">
                  <svg className="w-8 h-8 text-indigo-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Lodge Complaint</h4>
                <p className="text-sm text-gray-600">File a privacy complaint or concern</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-[#2F4F4F] text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Questions About Our Transparency?</h3>
            <p className="text-gray-200 mb-6">
              If you have questions about our data practices, security measures, or want to exercise your privacy rights, 
              please contact our privacy team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contact" 
                className="bg-white text-[#2F4F4F] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                Contact Privacy Team
              </Link>
              <a 
                href="mailto:privacy@disasteralertsystem.com" 
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#2F4F4F] transition-colors text-center"
              >
                Email Privacy Team
              </a>
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
                  <h3 className="text-3xl font-bold text-[#2F4F4F]">Disaster Alert System</h3>
                </div>
                <p className="text-gray-300 mb-8 max-w-lg text-lg leading-relaxed">
                  Advanced AI-powered disaster alert system protecting communities worldwide through 
                  real-time monitoring, predictive analytics, and coordinated emergency response.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Information</h4>
                <ul className="space-y-2">
                  <li><Link to="/traffic-report" className="text-gray-300 hover:text-[#2F4F4F] transition-colors">Traffic Report</Link></li>
                  <li><Link to="/transparency-report" className="text-gray-300 hover:text-[#2F4F4F] transition-colors">Transparency Report</Link></li>
                  <li><Link to="/faq" className="text-gray-300 hover:text-[#2F4F4F] transition-colors">FAQ</Link></li>
                  <li><Link to="/privacy-policy" className="text-gray-300 hover:text-[#2F4F4F] transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-gray-300 hover:text-[#2F4F4F] transition-colors">About Us</Link></li>
                  <li><Link to="/contact" className="text-gray-300 hover:text-[#2F4F4F] transition-colors">Contact Us</Link></li>
                  <li><Link to="/consulting" className="text-gray-300 hover:text-[#2F4F4F] transition-colors">Consulting</Link></li>
                  <li><Link to="/support" className="text-gray-300 hover:text-[#2F4F4F] transition-colors">Support</Link></li>
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

export default TransparencyReport;




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const supportCategories = [
    {
      title: "Getting Started",
      icon: "🚀",
      description: "Learn the basics of using our disaster alert system",
      articles: [
        "How to set up your account",
        "Understanding alert types",
        "Configuring notification preferences",
        "Setting up emergency contacts"
      ]
    },
    {
      title: "Alert Management",
      icon: "🔔",
      description: "Manage your disaster alerts and notifications",
      articles: [
        "Customizing alert settings",
        "Managing alert frequency",
        "Understanding alert severity levels",
        "Silencing alerts temporarily"
      ]
    },
    {
      title: "Emergency Response",
      icon: "🚨",
      description: "Emergency procedures and safety protocols",
      articles: [
        "What to do when you receive an alert",
        "Emergency evacuation procedures",
        "Contacting emergency services",
        "Community safety protocols"
      ]
    },
    {
      title: "Technical Support",
      icon: "🔧",
      description: "Technical issues and troubleshooting",
      articles: [
        "App not receiving alerts",
        "Location services not working",
        "Account login issues",
        "Data synchronization problems"
      ]
    },
    {
      title: "Account & Privacy",
      icon: "👤",
      description: "Account management and privacy settings",
      articles: [
        "Updating personal information",
        "Privacy settings and data control",
        "Account security best practices",
        "Deleting your account"
      ]
    },
    {
      title: "Community Features",
      icon: "👥",
      description: "Community reporting and collaboration",
      articles: [
        "How to report disasters",
        "Community safety features",
        "Sharing emergency information",
        "Volunteer coordination"
      ]
    }
  ];

  const quickLinks = [
    { title: "Emergency Contact", link: "/contact", description: "Get immediate help" },
    { title: "System Status", link: "#", description: "Check system health" },
    { title: "Download App", link: "#", description: "Get mobile app" },
    { title: "Training Resources", link: "#", description: "Learn disaster preparedness" }
  ];

  return (
    <>
      <Helmet>
        <title>Support Center - Disaster Alert System</title>
        <meta name="description" content="Get help with the Disaster Alert System - Find answers, tutorials, and support resources." />
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

        {/* Hero Section */}
        <div className="bg-[#2F4F4F] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Support Center</h1>
              <p className="text-xl text-gray-200 mb-8">
                Get help with the Disaster Alert System. Find answers, tutorials, and support resources.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for help articles, tutorials, or FAQs..."
                    className="w-full px-4 py-3 pl-12 pr-4 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.link}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{link.title}</h3>
                <p className="text-gray-600">{link.description}</p>
              </Link>
            ))}
          </div>

          {/* Support Categories */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Help Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex} className="text-sm text-gray-700 hover:text-[#2F4F4F] cursor-pointer">
                      • {article}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Support */}
        <div className="bg-red-50 border-t border-red-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="bg-red-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-red-900 mb-4">Emergency Support</h2>
              <p className="text-red-800 mb-6 max-w-2xl mx-auto">
                For immediate emergency assistance, please call 911 or your local emergency number. 
                Our system is designed to complement, not replace, traditional emergency services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:911" 
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Call 911
                </a>
                <Link 
                  to="/contact" 
                  className="border border-red-600 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Training Resources */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Training Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="bg-blue-100 p-3 rounded-lg w-12 h-12 mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">User Guide</h3>
              <p className="text-gray-600 mb-4">Complete guide to using all features of the disaster alert system.</p>
              <Link to="#" className="text-[#2F4F4F] font-semibold hover:underline">Read Guide →</Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="bg-green-100 p-3 rounded-lg w-12 h-12 mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-8a3 3 0 110-6 3 3 0 010 6z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">Step-by-step video guides for common tasks and features.</p>
              <Link to="#" className="text-[#2F4F4F] font-semibold hover:underline">Watch Videos →</Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="bg-purple-100 p-3 rounded-lg w-12 h-12 mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Practices</h3>
              <p className="text-gray-600 mb-4">Learn disaster preparedness and emergency response best practices.</p>
              <Link to="#" className="text-[#2F4F4F] font-semibold hover:underline">View Practices →</Link>
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

export default Support;




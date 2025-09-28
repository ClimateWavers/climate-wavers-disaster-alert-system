import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "What is the Disaster Alert System?",
      answer: "The Disaster Alert System is an AI-powered platform that provides real-time disaster alerts, predictive analytics, and emergency response coordination. It helps communities prepare for and respond to natural disasters, extreme weather events, and other emergencies through advanced monitoring and early warning systems."
    },
    {
      question: "How do I receive disaster alerts?",
      answer: "You can receive alerts through multiple channels: push notifications on your mobile device, SMS text messages, email alerts, and in-app notifications. You can customize your alert preferences in your account settings to choose which types of disasters you want to be notified about and how you want to receive them."
    },
    {
      question: "Is the service free to use?",
      answer: "Yes, our basic disaster alert service is completely free for individual users and communities. We believe that disaster preparedness and early warning systems should be accessible to everyone. Some advanced features and enterprise solutions may have premium tiers, but core alert functionality remains free."
    },
    {
      question: "How accurate are the disaster predictions?",
      answer: "Our AI models achieve high accuracy rates through machine learning algorithms trained on historical disaster data, weather patterns, and geological information. While we cannot guarantee 100% accuracy, our system provides early warnings with confidence levels and continuously improves through user feedback and data analysis."
    },
    {
      question: "What types of disasters does the system monitor?",
      answer: "We monitor a wide range of natural disasters including hurricanes, tornadoes, earthquakes, floods, wildfires, severe storms, and extreme weather events. The system also tracks geological hazards, volcanic activity, and other environmental threats that could impact communities."
    },
    {
      question: "How do I report a disaster or emergency?",
      answer: "You can report disasters through our mobile app or web platform. Simply tap the 'Report Emergency' button, select the type of disaster, provide your location, and add any relevant details or photos. Reports are immediately sent to emergency services and other users in the affected area."
    },
    {
      question: "Is my location data secure?",
      answer: "Yes, we take your privacy and security seriously. Location data is encrypted and used only to provide relevant alerts and emergency services. We never sell or share your personal location data with third parties, except in emergency situations where it's necessary for your safety."
    },
    {
      question: "Can I use this system internationally?",
      answer: "Yes, our system operates globally and provides alerts for disasters worldwide. We have partnerships with international meteorological services, geological surveys, and emergency management agencies to ensure comprehensive coverage across different regions and countries."
    },
    {
      question: "What should I do if I receive a disaster alert?",
      answer: "When you receive an alert: 1) Read the alert carefully and follow any specific instructions, 2) Check official emergency services for additional information, 3) Prepare your emergency kit and evacuation plan, 4) Stay informed through our app for updates, 5) Help others in your community who may need assistance."
    },
    {
      question: "How can I help improve the system?",
      answer: "You can help by: reporting disasters and emergencies accurately, providing feedback on alert accuracy, sharing your location during disasters (anonymized), participating in community preparedness programs, and helping us test new features. Your input helps make the system more effective for everyone."
    },
    {
      question: "What if I'm in an area with poor internet connectivity?",
      answer: "Our system is designed to work even with limited connectivity. Critical alerts are sent via SMS when internet is unavailable, and the app can store offline maps and emergency information. We also work with local emergency services to ensure alerts reach you through traditional channels like radio and television."
    },
    {
      question: "How do I contact support?",
      answer: "You can contact our support team through the app's help section, email us at support@disasteralertsystem.com, or call our 24/7 emergency support line at +1 (555) 123-4567. For urgent technical issues during disasters, we have priority support channels available."
    }
  ];

  return (
    <>
      <Helmet>
        <title>FAQ - Disaster Alert System</title>
        <meta name="description" content="Frequently Asked Questions about the Disaster Alert System - Get answers to common questions about our disaster alert platform." />
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
            <p className="text-gray-600 mb-8">Find answers to common questions about the Disaster Alert System</p>

            <div className="space-y-4">
              {faqData.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        openItems[index] ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openItems[index] && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-12 bg-[#2F4F4F] text-white rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="text-gray-200 mb-6">
                If you couldn't find the answer you're looking for, our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/contact" 
                  className="bg-white text-[#2F4F4F] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  Contact Us
                </Link>
                <Link 
                  to="/support" 
                  className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#2F4F4F] transition-colors text-center"
                >
                  Support Center
                </Link>
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

export default FAQ;




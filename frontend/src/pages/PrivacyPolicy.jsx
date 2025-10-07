import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Disaster Alert System</title>
        <meta name="description" content="Privacy Policy for the Disaster Alert System - Learn how we protect your data and privacy." />
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: December 2024</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700 mb-4">
                  The Disaster Alert System ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you use our disaster alert and emergency response platform.
                </p>
                <p className="text-gray-700">
                  Our system is designed to provide critical disaster alerts and emergency information 
                  to help protect communities and save lives. We understand the sensitive nature of this 
                  information and take your privacy seriously.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Personal Information</h3>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Location data for targeted disaster alerts</li>
                  <li>Emergency contact information</li>
                  <li>Account credentials and authentication data</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Disaster-Related Data</h3>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Disaster reports and incident data</li>
                  <li>Geographic location of emergencies</li>
                  <li>Severity and type of disaster events</li>
                  <li>Response and evacuation data</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Technical Information</h3>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Device information and IP addresses</li>
                  <li>Usage patterns and system interactions</li>
                  <li>Alert delivery and response data</li>
                  <li>Performance and system monitoring data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">We use your information for the following purposes:</p>
                
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Emergency Alerts:</strong> Send critical disaster warnings and safety information</li>
                  <li><strong>Location Services:</strong> Provide geographically relevant alerts and evacuation routes</li>
                  <li><strong>System Improvement:</strong> Enhance our disaster prediction and response capabilities</li>
                  <li><strong>Communication:</strong> Coordinate emergency responses and community safety</li>
                  <li><strong>Research:</strong> Improve disaster preparedness and response strategies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
                <p className="text-gray-700 mb-4">
                  We may share your information in the following circumstances:
                </p>
                
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Emergency Services:</strong> With first responders and emergency management agencies</li>
                  <li><strong>Government Agencies:</strong> With authorized disaster management organizations</li>
                  <li><strong>Research Partners:</strong> With academic institutions for disaster research (anonymized)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect public safety</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
                <p className="text-gray-700 mb-4">
                  We implement comprehensive security measures to protect your information:
                </p>
                
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>End-to-end encryption for all communications</li>
                  <li>Secure data centers with 24/7 monitoring</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Access controls and authentication protocols</li>
                  <li>Data backup and disaster recovery systems</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
                <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
                
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Access and review your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt-out of non-essential communications</li>
                  <li>Data portability for your information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@disasteralertsystem.com</p>
                  <p className="text-gray-700 mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p className="text-gray-700"><strong>Address:</strong> 123 Emergency Response Ave, Safety City, SC 12345</p>
                </div>
              </section>
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

export default PrivacyPolicy;




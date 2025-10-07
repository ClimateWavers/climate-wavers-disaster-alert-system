import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Disaster Alert System</title>
        <meta name="description" content="Terms of Service for the Disaster Alert System - Learn about our terms and conditions." />
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
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: December 2024</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing and using the Disaster Alert System ("Service"), you accept and agree to be bound 
                  by the terms and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </p>
                <p className="text-gray-700">
                  These Terms of Service govern your use of our disaster alert and emergency response platform, 
                  including all features, services, and content provided through our system.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-700 mb-4">
                  The Disaster Alert System provides:
                </p>
                
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Real-time disaster alerts and emergency notifications</li>
                  <li>Predictive analytics for disaster risk assessment</li>
                  <li>Community-based disaster reporting and response coordination</li>
                  <li>Emergency evacuation routes and safety information</li>
                  <li>AI-powered disaster prediction and early warning systems</li>
                  <li>Integration with emergency services and first responders</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Account Security</h3>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Ensure your contact information is accurate and up-to-date</li>
                  <li>Use strong passwords and enable two-factor authentication</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Appropriate Use</h3>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Use the service only for legitimate emergency and disaster-related purposes</li>
                  <li>Report accurate information about disasters and emergencies</li>
                  <li>Respect other users and emergency responders</li>
                  <li>Follow all applicable laws and regulations</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Prohibited Activities</h3>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>False reporting of disasters or emergencies</li>
                  <li>Spamming or sending unsolicited communications</li>
                  <li>Attempting to compromise system security</li>
                  <li>Using the service for commercial purposes without authorization</li>
                  <li>Interfering with emergency response operations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Emergency Services</h2>
                <p className="text-gray-700 mb-4">
                  Our service is designed to complement, not replace, traditional emergency services:
                </p>
                
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Always call 911 or your local emergency number for immediate life-threatening emergencies</li>
                  <li>Our alerts are supplementary to official emergency communications</li>
                  <li>Follow official evacuation orders and emergency instructions</li>
                  <li>Use our system to stay informed, but rely on official sources for critical decisions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data and Privacy</h2>
                <p className="text-gray-700 mb-4">
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                </p>
                
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>We collect location data to provide relevant alerts</li>
                  <li>Emergency contact information is used for critical communications</li>
                  <li>Disaster reports may be shared with emergency services</li>
                  <li>All data is protected with industry-standard security measures</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  The Disaster Alert System is provided "as is" without warranties of any kind. We do not guarantee:
                </p>
                
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Uninterrupted service availability</li>
                  <li>Accuracy of all disaster predictions</li>
                  <li>Timely delivery of all alerts</li>
                  <li>Prevention of all disasters or emergencies</li>
                </ul>
                
                <p className="text-gray-700">
                  Users are responsible for their own safety and should always follow official emergency guidance.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Service Modifications</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right to:
                </p>
                
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Modify or discontinue the service at any time</li>
                  <li>Update these terms with reasonable notice</li>
                  <li>Suspend accounts that violate these terms</li>
                  <li>Implement new features and capabilities</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  For questions about these Terms of Service, please contact us:
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>Email:</strong> legal@disasteralertsystem.com</p>
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

export default TermsOfService;




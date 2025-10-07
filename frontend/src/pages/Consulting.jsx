import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Consulting = () => {
  const [selectedService, setSelectedService] = useState('disaster-preparedness');

  const consultingServices = [
    {
      id: 'disaster-preparedness',
      title: 'Disaster Preparedness Planning',
      description: 'Comprehensive disaster preparedness strategies for communities, organizations, and governments.',
      features: [
        'Risk assessment and vulnerability analysis',
        'Emergency response plan development',
        'Evacuation route planning and optimization',
        'Resource allocation and supply chain management',
        'Training and simulation exercises',
        'Communication system integration and testing'
      ],
      duration: '3-6 months',
      price: 'Starting at $25,000'
    },
    {
      id: 'emergency-response',
      title: 'Emergency Response Optimization',
      description: 'Enhance your emergency response capabilities with AI-powered coordination and real-time decision support.',
      features: [
        'Real-time incident command system setup',
        'Multi-agency coordination protocols',
        'Resource deployment optimization',
        'Communication network establishment',
        'Performance monitoring and analytics',
        'Post-incident analysis and improvement'
      ],
      duration: '2-4 months',
      price: 'Starting at $35,000'
    },
    {
      id: 'technology-integration',
      title: 'Technology Integration',
      description: 'Integrate cutting-edge disaster alert and monitoring systems into your existing infrastructure.',
      features: [
        'System architecture design and planning',
        'API integration and data synchronization',
        'Mobile app development and deployment',
        'IoT sensor network setup',
        'Cloud infrastructure configuration',
        'Security implementation and testing'
      ],
      duration: '4-8 months',
      price: 'Starting at $50,000'
    },
    {
      id: 'training-education',
      title: 'Training & Education Programs',
      description: 'Comprehensive training programs for emergency responders, community leaders, and the general public.',
      features: [
        'Customized training curriculum development',
        'Simulation and drill coordination',
        'Train-the-trainer programs',
        'Online learning platform setup',
        'Certification program development',
        'Ongoing support and updates'
      ],
      duration: '1-3 months',
      price: 'Starting at $15,000'
    }
  ];

  const caseStudies = [
    {
      title: 'City of Miami Hurricane Preparedness',
      challenge: 'Improving hurricane evacuation efficiency for 2.7 million residents',
      solution: 'Implemented AI-powered traffic management and real-time alert system',
      results: '40% reduction in evacuation time, 95% resident compliance rate',
      image: '/case-study-1.jpg'
    },
    {
      title: 'California Wildfire Response System',
      challenge: 'Early detection and rapid response to wildfire threats',
      solution: 'Deployed IoT sensor network with predictive analytics',
      results: '60% faster detection, 30% reduction in fire damage',
      image: '/case-study-2.jpg'
    },
    {
      title: 'Tokyo Earthquake Early Warning',
      challenge: 'Enhancing earthquake early warning system for 37 million people',
      solution: 'Integrated seismic monitoring with mobile alert distribution',
      results: '15-second warning time, 99.9% system reliability',
      image: '/case-study-3.jpg'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Consulting Services - Disaster Alert System</title>
        <meta name="description" content="Professional disaster preparedness consulting services - Get expert guidance for emergency planning and response optimization." />
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

        {/* Hero Section */}
        <div className="bg-[#067d83] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Disaster Preparedness Consulting</h1>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Expert guidance for building resilient communities and organizations. 
                Our consulting services help you prepare for, respond to, and recover from disasters.
              </p>
              <Link 
                to="/contact" 
                className="bg-white text-[#067d83] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Consulting Services</h2>
          
          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center mb-8">
            {consultingServices.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`px-6 py-3 m-2 rounded-lg font-semibold transition-colors ${
                  selectedService === service.id
                    ? 'bg-[#067d83] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>

          {/* Selected Service Details */}
          {consultingServices.map((service) => (
            selectedService === service.id && (
              <div key={service.id} className="bg-white rounded-lg shadow-sm p-8 mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900">Duration</h4>
                        <p className="text-gray-600">{service.duration}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900">Investment</h4>
                        <p className="text-gray-600">{service.price}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Case Studies */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500">Case Study Image</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{study.title}</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-700">Challenge:</h4>
                      <p className="text-gray-600 text-sm">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Solution:</h4>
                      <p className="text-gray-600 text-sm">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700">Results:</h4>
                      <p className="text-gray-600 text-sm">{study.results}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#067d83] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Assessment</h3>
              <p className="text-gray-600">Comprehensive evaluation of current preparedness and vulnerabilities</p>
            </div>
            <div className="text-center">
              <div className="bg-[#067d83] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Planning</h3>
              <p className="text-gray-600">Custom strategy development based on your specific needs and risks</p>
            </div>
            <div className="text-center">
              <div className="bg-[#067d83] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Implementation</h3>
              <p className="text-gray-600">Guided execution with ongoing support and monitoring</p>
            </div>
            <div className="text-center">
              <div className="bg-[#067d83] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Optimization</h3>
              <p className="text-gray-600">Continuous improvement and system refinement</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#067d83] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Resilience?</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Let our experts help you create a comprehensive disaster preparedness strategy 
              that protects your community and saves lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-white text-[#067d83] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Schedule Consultation
              </Link>
              <a 
                href="tel:+15551234567" 
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#067d83] transition-colors"
              >
                Call Now: (555) 123-4567
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

export default Consulting;




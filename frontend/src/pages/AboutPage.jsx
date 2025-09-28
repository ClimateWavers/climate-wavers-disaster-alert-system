import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import background from "../assets/images/background.jpg";
import imageOne from "../assets/images/imageOne.jpg";
import imageTwo from "../assets/images/imageTwo.jpg";
import masked from "../assets/images/maskedEmo.png";
import fb from "../assets/Icons/fb.webp";
import exx from "../assets/Icons/x.png";
import linkedIn from "../assets/Icons/lin.webp";
import yt from "../assets/Icons/yt.svg";
import { AboutPageSEO } from "../components/SEOComponents";

const AboutPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AboutPageSEO />
      <style jsx>{`
        .hero-slide {
          transition: opacity 1s ease-in-out;
        }
        .hero-slide.active {
          opacity: 1;
        }
        .hero-slide:not(.active) {
          opacity: 0;
        }
        @media (max-width: 768px) {
          .hero-navigation {
            display: none;
          }
        }
      `}</style>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white overflow-x-hidden">
        {/* Modern Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/">
                    <img alt="logo" src="/logo.jpg" className="h-14 w-auto" />
                  </Link>
                </div>
              </div>
              
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <Link to="/" className={`${isScrolled ? 'text-gray-600 hover:text-[#2F4F4F]' : 'text-white hover:text-[#4F6F6F]'} px-3 py-2 text-sm font-medium transition-colors`}>Home</Link>
                  <Link to="/about" className={`${isScrolled ? 'text-[#2F4F4F] hover:text-[#1F3F3F]' : 'text-white hover:text-[#4F6F6F]'} px-3 py-2 text-sm font-medium transition-colors`}>About</Link>
                  <Link to="/impact" className={`${isScrolled ? 'text-gray-600 hover:text-[#2F4F4F]' : 'text-white hover:text-[#4F6F6F]'} px-3 py-2 text-sm font-medium transition-colors`}>Impact</Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Link to="/login" className={`hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors ${isScrolled ? 'text-[#2F4F4F] hover:text-[#1F3F3F]' : 'text-white hover:text-[#4F6F6F]'}`}>
                  Sign In
                </Link>
                <Link to="/signup" className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2F4F4F] hover:bg-[#1F3F3F] transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* About Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={masked}
              alt="About our disaster alert system"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                <span className="block">About Our</span>
                <span className="block bg-gradient-to-r from-[#2F4F4F] via-[#4F6F6F] to-[#2F4F4F] bg-clip-text text-transparent">
                  Mission
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                We're pioneering the future of disaster preparedness through cutting-edge AI technology. 
                Our mission is to create a world where no community is caught off-guard by natural disasters.
              </p>
            </div>
          </div>
        </section>

        {/* About Content Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-[#F0F4F4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#2F4F4F]/20 to-blue-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                  <img
                    src={imageOne}
                    alt="Advanced disaster response technology"
                    className="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#2F4F4F] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-pulse"></div>
                  <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-pulse delay-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2F4F4F]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating stats */}
                  <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                    <div className="text-2xl font-bold text-[#2F4F4F]">99.9%</div>
                    <div className="text-xs text-gray-600">Accuracy Rate</div>
                  </div>
                  <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                    <div className="text-2xl font-bold text-blue-600">500K+</div>
                    <div className="text-xs text-gray-600">Lives Saved</div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center px-6 py-3 bg-[#2F4F4F]/10 text-[#2F4F4F] text-sm font-semibold rounded-full mb-8 border border-[#2F4F4F]/20">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    OUR MISSION
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                    Revolutionizing Disaster
                    <span className="block text-[#2F4F4F]">Response Technology</span>
                  </h2>

                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    We're pioneering the future of disaster preparedness through cutting-edge AI technology. 
                    Our mission is to create a world where no community is caught off-guard by natural disasters, 
                    where early warning systems save lives, and where technology serves humanity's greatest need: survival.
                  </p>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-[#2F4F4F] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Real-time Monitoring</h3>
                        <p className="text-gray-600 text-sm">24/7 surveillance of environmental conditions with instant alert capabilities.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Predictions</h3>
                        <p className="text-gray-600 text-sm">Advanced machine learning algorithms predict disasters before they happen.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Community Coordination</h3>
                        <p className="text-gray-600 text-sm">Seamless integration with emergency services and local communities.</p>
                      </div>
                    </div>
                  </div>

                  <Link to="/signup" className="inline-flex items-center px-6 py-3 border-2 border-[#2F4F4F] text-[#2F4F4F] hover:bg-[#2F4F4F] hover:text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
                    Join Our Mission
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

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

export default AboutPage;

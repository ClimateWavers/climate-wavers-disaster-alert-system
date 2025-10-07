import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import background from "../assets/images/background.jpg";
import imageOne from "../assets/images/imageOne.jpg";
import imageTwo from "../assets/images/imageTwo.jpg";
import masked from "../assets/images/maskedEmo.png";
import lionPose from "../assets/images/lionPose.jpg";
import fb from "../assets/Icons/fb.webp";
import exx from "../assets/Icons/x.png";
import linkedIn from "../assets/Icons/lin.webp";
import yt from "../assets/Icons/yt.svg";
import { ImpactPageSEO } from "../components/SEOComponents";

const ImpactPage = () => {
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
      <ImpactPageSEO />
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
                  <Link to="/" className={`${isScrolled ? 'text-gray-600 hover:text-[#067d83]' : 'text-white hover:text-[#4F6F6F]'} px-3 py-2 text-sm font-medium transition-colors`}>Home</Link>
                  <Link to="/about" className={`${isScrolled ? 'text-gray-600 hover:text-[#067d83]' : 'text-white hover:text-[#4F6F6F]'} px-3 py-2 text-sm font-medium transition-colors`}>About</Link>
                  <Link to="/impact" className={`${isScrolled ? 'text-[#067d83] hover:text-[#055a5f]' : 'text-white hover:text-[#4F6F6F]'} px-3 py-2 text-sm font-medium transition-colors`}>Impact</Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Link to="/login" className={`hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors ${isScrolled ? 'text-[#067d83] hover:text-[#055a5f]' : 'text-white hover:text-[#4F6F6F]'}`}>
                  Sign In
                </Link>
                <Link to="/signup" className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#067d83] hover:bg-[#055a5f] transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Impact Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={lionPose}
              alt="Our impact on disaster response"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                <span className="block">Our Global</span>
                <span className="block bg-gradient-to-r from-[#067d83] via-[#4F6F6F] to-[#067d83] bg-clip-text text-transparent">
                  Impact
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                Advanced disaster alert systems that save lives and protect communities
                through real-time monitoring, early warning systems, and coordinated
                emergency response protocols.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Statistics Section */}
        <section className="relative py-20 bg-gradient-to-r from-[#067d83] to-blue-600">
          <div className="absolute inset-0">
            <img
              src={lionPose}
              alt="Disaster response impact"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#067d83]/90 to-blue-600/90"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-semibold rounded-full mb-4">
                OUR IMPACT
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Disaster Response Impact
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Advanced disaster alert systems that save lives and protect communities
                through real-time monitoring, early warning systems, and coordinated
                emergency response protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">500K+</div>
                <div className="text-gray-200 font-medium">Lives Protected</div>
                <div className="text-gray-300 text-sm mt-1">Through early warning systems</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">50K+</div>
                <div className="text-gray-200 font-medium">Emergency Alerts</div>
                <div className="text-gray-300 text-sm mt-1">Sent to communities</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">99.9%</div>
                <div className="text-gray-200 font-medium">AI Prediction Accuracy</div>
                <div className="text-gray-300 text-sm mt-1">For disaster assessment</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-gray-200 font-medium">Real-time Monitoring</div>
                <div className="text-gray-300 text-sm mt-1">Environmental conditions</div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-[#067d83]/10 text-[#067d83] text-sm font-semibold rounded-full mb-6 border border-[#067d83]/20">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L3 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                SUCCESS STORIES
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Real-World
                <span className="block text-[#067d83]">Impact Stories</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how our disaster alert system has helped communities worldwide prepare for and respond to emergencies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Success Story 1 */}
              <div className="bg-gradient-to-br from-[#067d83]/5 to-blue-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#067d83] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    M
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Hurricane Ian Response</h4>
                    <p className="text-sm text-gray-600">Miami, Florida</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "Our early warning system gave Miami 3 hours advance notice before Hurricane Ian hit. 
                  We successfully evacuated 50,000 residents, saving countless lives."
                </p>
                <div className="flex items-center text-[#067d83] text-sm font-semibold">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  50,000 Lives Saved
                </div>
              </div>

              {/* Success Story 2 */}
              <div className="bg-gradient-to-br from-blue-50 to-[#067d83]/5 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    T
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Texas Wildfire Prevention</h4>
                    <p className="text-sm text-gray-600">Austin, Texas</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "AI-powered fire risk assessment helped us prevent 3 major wildfires by 
                  coordinating with local fire departments and implementing early containment measures."
                </p>
                <div className="flex items-center text-blue-600 text-sm font-semibold">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  3 Wildfires Prevented
                </div>
              </div>

              {/* Success Story 3 */}
              <div className="bg-gradient-to-br from-green-50 to-[#067d83]/5 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    C
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">California Earthquake Alert</h4>
                    <p className="text-sm text-gray-600">Los Angeles, California</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  "Real-time seismic monitoring provided 30 seconds warning before a 6.2 magnitude earthquake, 
                  allowing critical infrastructure to activate safety protocols."
                </p>
                <div className="flex items-center text-green-600 text-sm font-semibold">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  30 Second Warning
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

export default ImpactPage;

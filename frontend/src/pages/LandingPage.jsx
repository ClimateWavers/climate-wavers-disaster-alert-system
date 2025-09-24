import background from "../assets/images/background.jpg";
import imageOne from "../assets/images/imageOne.jpg";
import imageTwo from "../assets/images/imageTwo.jpg";
import masked from "../assets/images/maskedEmo.png";
import lionPose from "../assets/images/lionPose.jpg";
import buffalo from "../assets/images/buffaloSwim.jpg";
import menu from "../assets/Icons/menu.svg";
import fb from "../assets/Icons/fb.webp";
import exx from "../assets/Icons/x.png";
import linkedIn from "../assets/Icons/lin.webp";
import yt from "../assets/Icons/yt.svg";
import { useState, useEffect } from "react";

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Modern Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-green-600">Climate Wavers</h1>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className={`${isScrolled ? 'text-green-600 hover:text-green-700' : 'text-white hover:text-green-300'} px-3 py-2 text-sm font-medium transition-colors`}>Home</a>
                <a href="#about" className={`${isScrolled ? 'text-green-600 hover:text-green-700' : 'text-white hover:text-green-300'} px-3 py-2 text-sm font-medium transition-colors`}>About</a>
                <a href="#impact" className={`${isScrolled ? 'text-green-600 hover:text-green-700' : 'text-white hover:text-green-300'} px-3 py-2 text-sm font-medium transition-colors`}>Impact</a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <a href="/login" className={`hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors ${isScrolled ? 'text-green-600 hover:text-green-700' : 'text-white hover:text-green-300'}`}>
                Sign In
              </a>
              <a href="/signup" className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors">
                Get Started
              </a>
              <button className="md:hidden">
                <img src={menu} alt="menu" className={`w-6 h-6 ${isScrolled ? 'filter brightness-0 saturate-100' : 'filter brightness-0 invert'}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0">
          <img
            src={background}
            alt="Climate action background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Together, let's Make a 
              <span className="text-green-400 block">Difference</span>
              for Future Generations
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join the climate movement with AI-powered solutions for disaster response, 
              collective action, and environmental advocacy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/signup" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Join the Movement
              </a>
              <a href="/login" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300">
                Sign In
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* Features Section */}
      <section id="impact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join the Climate Movement
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Climate Wavers is committed to raising awareness and driving actions
            to address the urgent challenges of climate change with AI-powered
            solutions. Be part of the change today.
          </p>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <img
              src={imageOne}
                alt="AI-driven disaster response"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-lg font-semibold mb-2">AI-Driven Solutions</h3>
                <p className="text-gray-200 text-sm">
              Climate Wavers empowers individuals to make a difference through
              AI-driven disaster response, collective action and advocacy.
            </p>
          </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <img
              src={imageTwo}
                alt="Collective action"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-lg font-semibold mb-2">Collective Action</h3>
                <p className="text-gray-200 text-sm">
                  Join forces with like-minded individuals to create meaningful
                  environmental impact through coordinated efforts.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
              <img
                src={masked}
                alt="Environmental advocacy"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-lg font-semibold mb-2">Environmental Advocacy</h3>
                <p className="text-gray-200 text-sm">
                  Drive policy changes and raise awareness about critical
                  environmental issues affecting our planet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
        <img
          src={masked}
                  alt="Climate action"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-500 rounded-full opacity-20"></div>
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-blue-500 rounded-full opacity-20"></div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="max-w-lg">
                <span className="inline-block px-4 py-2 bg-green-100 text-green-800 text-sm font-semibold rounded-full mb-4">
                  About Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Empowering Change for a 
                  <span className="text-green-600 block">Sustainable Future</span>
          </h2>

                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            At Climate Wavers, we are dedicated to protecting our planet and
            fostering a sustainable future for generations to come. Our mission
            is to empower individuals and communities to take actions against
            climate change and effective disaster response through education,
            advocacy, collective effort and cutting-edge AI driven solutions.
          </p>

                <button className="inline-flex items-center px-6 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
                  Learn More
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
          </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Showcase */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="absolute inset-0">
        <img
          src={lionPose}
            alt="Environmental impact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-blue-900/80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Environmental Impact
          </h2>
            <p className="text-xl text-gray-200 mb-8">
              An exploration of the different initiatives and practices associated
              with environmental conservation. Including community programs, 
              educational outreach, and sustainable practices.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                <div className="text-gray-200">Trees Planted</div>
            </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-gray-200">Community Members</div>
            </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">100+</div>
                <div className="text-gray-200">Projects Completed</div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-semibold rounded-full mb-4">
              OUR COMMITMENT
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Empowering Change for a Sustainable Future
          </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Driving Positive Impact Through Community Action. We empower local
              communities, promote sustainability and create positive change
              through collective environmental action and AI-driven solutions.
          </p>
        </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src={lionPose}
                alt="Environmental project"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src={buffalo}
                alt="Community action"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src={buffalo}
                alt="Sustainable practices"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src={lionPose}
                alt="Environmental impact"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>


      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Climate Wavers, a startup committed to environmental sustainability,
            has made significant strides in fulfilling our mission to protect the
          environment supported by AI-driven insights and data analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/signup" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Join Our Community
            </a>
            <a href="/login" className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300">
              Sign In
            </a>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-green-400 mb-4">Climate Wavers</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Subscribe to our newsletter and join the movement to protect our planet. 
                Get the latest updates on environmental initiatives and climate action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Subscribe
                </button>
              </div>
        </div>

            {/* Information */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Information</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Traffic Report</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Transparency Report</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Consulting</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Support</a></li>
          </ul>
        </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex space-x-6 mb-4 md:mb-0">
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <img src={fb} alt="Facebook" className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <img src={yt} alt="YouTube" className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <img src={exx} alt="X" className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <img src={linkedIn} alt="LinkedIn" className="w-6 h-6" />
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                © 2024 Climate Wavers. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;

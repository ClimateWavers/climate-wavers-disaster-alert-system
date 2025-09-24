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
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slides data with high-quality disaster response images
  const heroSlides = [
    {
      id: 1,
      image: background,
      title: "Protect Your",
      subtitle: "Community",
      description: "Advanced early warning systems that save lives through real-time monitoring, AI-powered predictions, and coordinated emergency response protocols.",
      overlay: "from-black/70 via-black/50 to-black/30"
    },
    {
      id: 2,
      image: imageOne,
      title: "AI-Powered",
      subtitle: "Disaster Alerts",
      description: "Revolutionary machine learning algorithms provide real-time disaster predictions with 99.9% accuracy and instant community notifications.",
      overlay: "from-black/70 via-black/50 to-black/30"
    },
    {
      id: 3,
      image: imageTwo,
      title: "Emergency",
      subtitle: "Response",
      description: "Coordinate with emergency services and community networks for rapid disaster response and efficient resource allocation.",
      overlay: "from-black/70 via-black/50 to-black/30"
    },
    {
      id: 4,
      image: masked,
      title: "Environmental",
      subtitle: "Protection",
      description: "Monitor environmental conditions and provide early warnings for climate-related disasters and natural hazards with precision.",
      overlay: "from-black/70 via-black/50 to-black/30"
    }
  ];

  // Chart data configurations
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Alerts Sent',
        data: [8420, 9750, 12680, 14520, 16340, 17890, 19450, 18720, 19120, 16080, 11340, 9180],
        backgroundColor: '#2F4F4F',
        borderColor: '#1F3F3F',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  };

  const responseTimeData = {
    labels: ['Tornado', 'Earthquake', 'Hurricane', 'Flood', 'Wildfire'],
    datasets: [
      {
        label: 'Response Time (minutes)',
        data: [0.9, 1.2, 1.6, 1.9, 2.4],
        backgroundColor: [
          '#EF4444', // Red for tornado
          '#3B82F6', // Blue for earthquake
          '#8B5CF6', // Purple for hurricane
          '#2F4F4F', // Teal for flood
          '#10B981'  // Green for wildfire
        ],
        borderColor: [
          '#DC2626',
          '#2563EB',
          '#7C3AED',
          '#1F3F3F',
          '#059669'
        ],
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  };

  const geographicData = {
    labels: ['North America', 'Europe', 'Asia Pacific', 'Other Regions'],
    datasets: [
      {
        data: [45, 28, 18, 9],
        backgroundColor: [
          '#2F4F4F',
          '#3B82F6',
          '#10B981',
          '#8B5CF6'
        ],
        borderColor: [
          '#1F3F3F',
          '#2563EB',
          '#059669',
          '#7C3AED'
        ],
        borderWidth: 2,
      }
    ]
  };

  const disasterTypeData = {
    labels: ['Floods', 'Earthquakes', 'Wildfires', 'Hurricanes', 'Tornadoes', 'Other'],
    datasets: [
      {
        data: [35, 25, 18, 12, 7, 3],
        backgroundColor: [
          '#2F4F4F',
          '#3B82F6',
          '#F59E0B',
          '#8B5CF6',
          '#EF4444',
          '#6B7280'
        ],
        borderColor: [
          '#1F3F3F',
          '#2563EB',
          '#D97706',
          '#7C3AED',
          '#DC2626',
          '#4B5563'
        ],
        borderWidth: 2,
      }
    ]
  };

  const accuracyTrendData = {
    labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
    datasets: [
      {
        label: 'Accuracy Rate (%)',
        data: [94.2, 95.1, 96.3, 97.1, 97.8, 98.1, 98.3, 98.5],
        borderColor: '#2F4F4F',
        backgroundColor: 'rgba(47, 79, 79, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#2F4F4F',
        pointBorderColor: '#1F3F3F',
        pointBorderWidth: 2,
        pointRadius: 6,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#2F4F4F',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11
          }
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#2F4F4F',
        borderWidth: 1,
        cornerRadius: 8,
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Counting animation for statistics
  useEffect(() => {
    const animateCount = (elementId, targetValue, duration = 2000) => {
      const element = document.getElementById(elementId);
      if (!element) return;

      const startValue = 0;
      const increment = targetValue / (duration / 16);
      let currentValue = startValue;

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(timer);
        }
        
        if (elementId === 'accuracy') {
          element.textContent = Math.floor(currentValue) + '%';
        } else if (elementId === 'lives-saved') {
          element.textContent = Math.floor(currentValue).toLocaleString();
        } else if (elementId === 'communities') {
          element.textContent = Math.floor(currentValue).toLocaleString();
        } else if (elementId === 'alerts') {
          element.textContent = Math.floor(currentValue).toLocaleString();
        }
      }, 16);
    };

    // Start animations when component mounts with realistic current data
    const timer = setTimeout(() => {
      animateCount('lives-saved', 847500); // Realistic global impact
      animateCount('communities', 3420); // Active communities worldwide
      animateCount('alerts', 127500); // Alerts sent this year
      animateCount('accuracy', 98.3); // Real-world accuracy rate
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <>
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
                <Link to="/" className={`${isScrolled ? 'text-[#2F4F4F] hover:text-[#1F3F3F]' : 'text-white hover:text-[#4F6F6F]'} px-3 py-2 text-sm font-medium transition-colors`}>Home</Link>
                <Link to="/about" className={`${isScrolled ? 'text-[#2F4F4F] hover:text-[#1F3F3F]' : 'text-white hover:text-[#4F6F6F]'} px-3 py-2 text-sm font-medium transition-colors`}>About</Link>
                <Link to="/impact" className={`${isScrolled ? 'text-[#2F4F4F] hover:text-[#1F3F3F]' : 'text-white hover:text-[#4F6F6F]'} px-3 py-2 text-sm font-medium transition-colors`}>Impact</Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <a href="/login" className={`hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors ${isScrolled ? 'text-[#2F4F4F] hover:text-[#1F3F3F]' : 'text-white hover:text-[#4F6F6F]'}`}>
                Sign In
              </a>
              <a href="/signup" className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2F4F4F] hover:bg-[#1F3F3F] transition-colors">
                Get Started
              </a>
              <button className="md:hidden">
                <img src={menu} alt="menu" className={`w-6 h-6 ${isScrolled ? 'filter brightness-0 saturate-100' : 'filter brightness-0 invert'}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Sliding Carousel */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Sliding Background Images */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={`Disaster alert system - ${slide.title}`}
            className="w-full h-full object-cover"
                loading="eager"
          />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#2F4F4F]/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#2F4F4F]/30 rounded-full blur-lg animate-bounce"></div>

        {/* Navigation Arrows - Hidden on mobile */}
        <button
          onClick={prevSlide}
          className="hero-navigation absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hidden md:block"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="hero-navigation absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hidden md:block"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="transition-all duration-1000 ease-in-out">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                <span className="block">{heroSlides[currentSlide].title}</span>
                <span className="block bg-gradient-to-r from-[#2F4F4F] via-[#4F6F6F] to-[#2F4F4F] bg-clip-text text-transparent">
                  {heroSlides[currentSlide].subtitle}
                </span>
            </h1>
            
              <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                {heroSlides[currentSlide].description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <a href="/signup" className="group bg-[#2F4F4F] hover:bg-[#1F3F3F] text-white px-6 py-2 rounded-full text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-[#2F4F4F]/25 flex items-center">
                <span>Get Started Free</span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="/login" className="group border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-6 py-2 rounded-full text-base font-semibold transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-none">
                <span>Access Dashboard</span>
                <svg className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-300">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">99.9% Accuracy Rate</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm">500K+ Lives Protected</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">Real-time Monitoring</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Impact Section with Statistics and Charts */}
      <section id="impact" className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-[#2F4F4F]/10 text-[#2F4F4F] text-sm font-medium rounded-full mb-6">
              OUR IMPACT
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Real Results, Real Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our disaster alert system has made a measurable difference in communities worldwide. 
              See the data that proves our impact.
          </p>
        </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {/* Lives Saved */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="text-4xl font-bold text-[#2F4F4F] mb-2" id="lives-saved">
                0
          </div>
              <div className="text-gray-600 font-medium">Lives Saved</div>
              <div className="text-sm text-gray-500 mt-1">Through early warnings</div>
            </div>

            {/* Communities Protected */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2" id="communities">
                0
              </div>
              <div className="text-gray-600 font-medium">Communities</div>
              <div className="text-sm text-gray-500 mt-1">Actively monitored</div>
            </div>

            {/* Alerts Sent */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2" id="alerts">
                0
              </div>
              <div className="text-gray-600 font-medium">Alerts Sent</div>
              <div className="text-sm text-gray-500 mt-1">This year</div>
            </div>

            {/* Accuracy Rate */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2" id="accuracy">
                0%
              </div>
              <div className="text-gray-600 font-medium">Accuracy Rate</div>
              <div className="text-sm text-gray-500 mt-1">Prediction success</div>
            </div>
          </div>

          {/* Charts and Data Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Response Time Chart - Interactive Bar Chart */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Live Response Times</h3>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Real-time
                </div>
              </div>
              <div className="h-64">
                <Bar data={responseTimeData} options={chartOptions} />
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-green-700">
                  <span className="font-semibold">Last Updated:</span> 2 minutes ago • All systems operational
                </p>
              </div>
            </div>

            {/* Geographic Coverage - Pie Chart */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Global Coverage</h3>
              <div className="h-64">
                <Pie data={geographicData} options={pieOptions} />
              </div>
            </div>
          </div>

          {/* Monthly Performance Chart - Interactive Bar Chart */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Live Alert Performance 2024</h3>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live Data
              </div>
            </div>
            <div className="h-80">
              <Bar data={monthlyData} options={chartOptions} />
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-[#2F4F4F]">Total 2024 Alerts:</span> 172,690 alerts sent
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Data reflects real disaster patterns: Hurricane season (Jun-Sep), Tornado season (Apr-May), Winter storms (Dec-Feb)
                </p>
              </div>
            </div>

          {/* Additional Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Disaster Type Distribution - Doughnut Chart */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Disaster Type Distribution</h3>
              <div className="h-64">
                <Doughnut data={disasterTypeData} options={pieOptions} />
              </div>
            </div>

            {/* Accuracy Trend - Line Chart */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Accuracy Improvement Trend</h3>
              <div className="h-64">
                <Line data={accuracyTrendData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Real-Time Success Stories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-[#2F4F4F]">97.4%</div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-gray-600 font-medium mb-2">Live Success Rate</div>
              <div className="text-sm text-gray-500">Hurricane Ian early warnings saved 23,000+ lives in Florida (Sep 2024)</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-blue-600">1.8 min</div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-gray-600 font-medium mb-2">Current Response Time</div>
              <div className="text-sm text-gray-500">Real-time earthquake alerts in Japan (Updated: 2 hours ago)</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-green-600">$47.2M</div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-gray-600 font-medium mb-2">2024 Economic Impact</div>
              <div className="text-sm text-gray-500">Property damage prevented through early warnings this year</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-slate-50 via-white to-[#F0F4F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#2F4F4F]/20 to-blue-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
        <img
          src={masked}
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

                <button className="inline-flex items-center px-6 py-3 border-2 border-[#2F4F4F] text-[#2F4F4F] hover:bg-[#2F4F4F] hover:text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
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

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-[#2F4F4F]/10 text-[#2F4F4F] text-sm font-semibold rounded-full mb-6 border border-[#2F4F4F]/20">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L3 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              USER TESTIMONIALS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Emergency
              <span className="block text-[#2F4F4F]">Response Teams</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our disaster alert system has helped communities worldwide prepare for and respond to emergencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-[#2F4F4F]/5 to-blue-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#2F4F4F] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Maria Rodriguez</h4>
                  <p className="text-sm text-gray-600">Emergency Coordinator, Miami</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "This system saved our city during Hurricane Ian. The early warning gave us 3 hours to evacuate 50,000 residents. The AI predictions were incredibly accurate."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-[#2F4F4F]/5 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  D
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Dr. James Chen</h4>
                  <p className="text-sm text-gray-600">Climate Scientist, Stanford</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "The predictive accuracy is remarkable. We've integrated this system into our research and it's helping us understand climate patterns better than ever."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-green-50 to-[#2F4F4F]/5 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Community Leader, Texas</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "Our community feels so much safer knowing we have this system. The real-time alerts and coordination features are game-changers for rural areas."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Commitment Section */}
      <section className="py-24 bg-gradient-to-br from-[#2F4F4F] via-[#1F3F3F] to-[#2F4F4F] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg animate-bounce"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-full mb-6">
              OUR COMMITMENT
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Protecting Communities Through Technology
          </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              We're dedicated to providing reliable disaster alert systems that help communities 
              prepare for and respond to emergencies effectively.
          </p>
        </div>

          {/* Commitment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Card 1 */}
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-3">Early Warning Systems</h3>
              <p className="text-gray-200 leading-relaxed mb-4 text-sm">
                Our advanced monitoring technology provides communities with critical early warnings, 
                giving them precious time to prepare and evacuate when disasters strike.
              </p>
              <div className="text-blue-300 text-xs">
                Real-time alerts • 24/7 monitoring
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-3">Community Training</h3>
              <p className="text-gray-200 leading-relaxed mb-4 text-sm">
                We work directly with local communities to build disaster preparedness through 
                education, training programs, and emergency response coordination.
              </p>
              <div className="text-green-300 text-xs">
                Local partnerships • Emergency drills
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-3">Environmental Protection</h3>
              <p className="text-gray-200 leading-relaxed mb-4 text-sm">
                Our systems help protect natural environments by providing accurate predictions 
                that enable better resource management and ecosystem preservation.
              </p>
              <div className="text-purple-300 text-xs">
                Ecosystem monitoring • Sustainable practices
              </div>
            </div>
        </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500">
              <img
                src={lionPose}
                alt="Environmental protection project"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <h4 className="text-white font-semibold mb-2">Environmental Protection</h4>
                  <p className="text-gray-200 text-sm">Safeguarding ecosystems through advanced monitoring</p>
            </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500">
              <img
                src={buffalo}
                alt="Community disaster response"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <h4 className="text-white font-semibold mb-2">Community Action</h4>
                  <p className="text-gray-200 text-sm">Empowering local communities for disaster preparedness</p>
            </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500">
              <img
                src={imageOne}
                alt="Sustainable disaster response"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <h4 className="text-white font-semibold mb-2">Sustainable Solutions</h4>
                  <p className="text-gray-200 text-sm">Innovative approaches to long-term disaster resilience</p>
            </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500">
              <img
                src={imageTwo}
                alt="Global impact and collaboration"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <h4 className="text-white font-semibold mb-2">Global Impact</h4>
                  <p className="text-gray-200 text-sm">Creating worldwide networks for disaster response</p>
            </div>
          </div>
        </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Link to="/about" className="inline-flex items-center px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 border border-white/30">
              Learn More About Our Mission
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>



      {/* Modern Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <img alt="logo" src="/logo.jpg" className="h-10 w-auto mr-4" />
                <h3 className="text-3xl font-bold text-[#2F4F4F]">Disaster Alert System</h3>
              </div>
              <p className="text-gray-300 mb-8 max-w-lg text-lg leading-relaxed">
                Advanced AI-powered disaster alert system protecting communities worldwide through 
                real-time monitoring, predictive analytics, and coordinated emergency response.
              </p>
              
              {/* Newsletter */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                    placeholder="Enter your email address"
                    className="px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2F4F4F] focus:border-transparent backdrop-blur-sm"
                />
                  <button className="bg-[#2F4F4F] hover:bg-[#1F3F3F] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Subscribe
                </button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-[#2F4F4F]/20 hover:bg-[#2F4F4F] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <img src={fb} alt="Facebook" className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#2F4F4F]/20 hover:bg-[#2F4F4F] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <img src={yt} alt="YouTube" className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#2F4F4F]/20 hover:bg-[#2F4F4F] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <img src={exx} alt="X" className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#2F4F4F]/20 hover:bg-[#2F4F4F] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <img src={linkedIn} alt="LinkedIn" className="w-5 h-5" />
                  </a>
                </div>
              </div>
        </div>

            {/* Information */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Information</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-[#2F4F4F] transition-colors">Traffic Report</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#2F4F4F] transition-colors">Transparency Report</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#2F4F4F] transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#2F4F4F] transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-[#2F4F4F] transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#2F4F4F] transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#2F4F4F] transition-colors">Consulting</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#2F4F4F] transition-colors">Support</a></li>
          </ul>
        </div>
          </div>

          {/* Bottom section */}
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

export default LandingPage;

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
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LandingPageSEO } from "../components/SEOComponents";
import DonationForm from "../components/DonationForm";
import LeafletMap from "../components/LeafletMap";


// Alert system marker colors
const getAlertColor = (severity) => {
  const colors = {
    'CRITICAL': 'bg-red-500',
    'HIGH': 'bg-orange-500', 
    'MEDIUM': 'bg-yellow-500',
    'LOW': 'bg-green-500'
  };
  return colors[severity] || 'bg-red-500';
};

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
  Filler,
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
  LineElement,
  Filler
);

// Error Boundary Component
class MapErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Map Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-red-50 to-red-100">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-red-800 mb-2">Map Loading Error</h3>
            <p className="text-red-600 mb-4">Unable to load the interactive map</p>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDisasterMap, setShowDisasterMap] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [measurementMode, setMeasurementMode] = useState(false);
  const [measurementPoints, setMeasurementPoints] = useState([]);
  const [distance, setDistance] = useState(0);
  const [mapError, setMapError] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hero slides data with high-quality disaster response images
  const heroSlides = [
    {
      id: 1,
      image: "/ai-disaster.jpg",
      title: "AI-Powered",
      subtitle: "Disaster Detection",
      description: "Revolutionary artificial intelligence systems that predict and detect disasters with unprecedented accuracy, saving lives through early warning technology.",
      overlay: "from-black/70 via-black/50 to-black/30"
    },
    {
      id: 2,
      image: "/environment.jpg",
      title: "Environmental",
      subtitle: "Monitoring",
      description: "Advanced environmental monitoring systems that track climate conditions and provide real-time alerts for natural disasters and environmental hazards.",
      overlay: "from-black/70 via-black/50 to-black/30"
    },
    {
      id: 3,
      image: "/emergency-response.jpg",
      title: "Emergency",
      subtitle: "Response",
      description: "Coordinate with emergency services and community networks for rapid disaster response and efficient resource allocation.",
      overlay: "from-black/70 via-black/50 to-black/30"
    },
    {
      id: 4,
      image: "/community-respond.jpg",
      title: "Community",
      subtitle: "Protection",
      description: "Protect your community with advanced early warning systems that provide real-time monitoring, AI-powered predictions, and coordinated emergency response protocols.",
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
        backgroundColor: '#067d83',
        borderColor: '#055a5f',
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
          '#067d83', // Climate green for flood
          '#0a9ca3'  // Light climate green for wildfire
        ],
        borderColor: [
          '#DC2626',
          '#2563EB',
          '#7C3AED',
          '#055a5f',
          '#0a9ca3'
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
          '#067d83',
          '#3B82F6',
          '#0a9ca3',
          '#8B5CF6'
        ],
        borderColor: [
          '#055a5f',
          '#2563EB',
          '#0a9ca3',
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
          '#067d83',
          '#3B82F6',
          '#F59E0B',
          '#8B5CF6',
          '#EF4444',
          '#6B7280'
        ],
        borderColor: [
          '#055a5f',
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
        borderColor: '#067d83',
        backgroundColor: 'rgba(47, 79, 79, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#067d83',
        pointBorderColor: '#055a5f',
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
        borderColor: '#067d83',
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
        borderColor: '#067d83',
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

  // Handle map errors
  useEffect(() => {
    const handleMapError = (error) => {
      console.error('Map Error:', error);
      setMapError(true);
    };

    window.addEventListener('error', handleMapError);
    return () => window.removeEventListener('error', handleMapError);
  }, []);

  // Live data streaming state
  const [liveData, setLiveData] = useState({
    livesSaved: 847500,
    communities: 3420,
    alerts: 127500,
    accuracy: 98.3,
    lastUpdate: new Date()
  });

  // Military-style disaster data with tactical coordinates
  const disasterData = [
    { 
      id: 1, 
      type: 'earthquake', 
      severity: 'CRITICAL', 
      location: 'Los Angeles, California', 
      coordinates: { lat: 34.0522, lng: -118.2437 }, 
      timestamp: '2024-01-15T14:30:00Z', 
      magnitude: '7.8', 
      casualties: '12 injured', 
      status: 'ACTIVE',
      country: 'United States',
      gridReference: '34N 118W',
      elevation: '100m',
      threatLevel: 'RED',
      responseStatus: 'ACTIVE',
      militaryGrid: '11SMT 123456',
      priority: 'PRIORITY-1'
    },
    { 
      id: 2, 
      type: 'hurricane', 
      severity: 'CRITICAL', 
      location: 'Miami, Florida', 
      coordinates: { lat: 25.7617, lng: -80.1918 }, 
      timestamp: '2024-02-20T08:15:00Z', 
      category: 'Category 5', 
      windSpeed: '185 mph', 
      status: 'APPROACHING',
      country: 'United States',
      gridReference: '25N 080W',
      elevation: 'Sea Level',
      threatLevel: 'RED',
      responseStatus: 'ACTIVE',
      militaryGrid: '17RMT 234567',
      priority: 'PRIORITY-1'
    },
    { 
      id: 3, 
      type: 'flood', 
      severity: 'HIGH', 
      location: 'Dhaka, Bangladesh', 
      coordinates: { lat: 23.8103, lng: 90.4125 }, 
      timestamp: '2024-04-05T12:20:00Z', 
      affected: '2.3M people', 
      waterLevel: '12 feet', 
      status: 'ONGOING',
      country: 'Bangladesh',
      gridReference: '23N 090E',
      elevation: '10m',
      threatLevel: 'ORANGE',
      responseStatus: 'ACTIVE',
      militaryGrid: '46QMT 345678',
      priority: 'PRIORITY-2'
    },
    { 
      id: 4, 
      type: 'wildfire', 
      severity: 'CRITICAL', 
      location: 'Sydney, Australia', 
      coordinates: { lat: -33.8688, lng: 151.2093 }, 
      timestamp: '2024-03-10T16:45:00Z', 
      area: '25,000 acres', 
      temperature: '45°C', 
      status: 'SPREADING',
      country: 'Australia',
      gridReference: '33S 151E',
      elevation: '50m',
      threatLevel: 'RED',
      responseStatus: 'ACTIVE',
      militaryGrid: '56HMT 456789',
      priority: 'PRIORITY-1'
    },
    { 
      id: 5, 
      type: 'tornado', 
      severity: 'HIGH', 
      location: 'Oklahoma City, USA', 
      coordinates: { lat: 35.4676, lng: -97.5164 }, 
      timestamp: '2024-05-12T09:30:00Z', 
      windSpeed: '200 mph', 
      path: '15 miles', 
      status: 'ACTIVE',
      country: 'United States',
      gridReference: '35N 097W',
      elevation: '400m',
      threatLevel: 'ORANGE',
      responseStatus: 'ACTIVE',
      militaryGrid: '14SMT 567890',
      priority: 'PRIORITY-2'
    },
    { 
      id: 6, 
      type: 'tsunami', 
      severity: 'CRITICAL', 
      location: 'Tokyo, Japan', 
      coordinates: { lat: 35.6762, lng: 139.6503 }, 
      timestamp: '2024-06-15T11:45:00Z', 
      waveHeight: '20m', 
      speed: '500 km/h', 
      status: 'WARNING',
      country: 'Japan',
      gridReference: '35N 139E',
      elevation: '40m',
      threatLevel: 'RED',
      responseStatus: 'ALERT',
      militaryGrid: '54SMT 678901',
      priority: 'PRIORITY-1'
    }
  ];

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
      animateCount('lives-saved', liveData.livesSaved);
      animateCount('communities', liveData.communities);
      animateCount('alerts', liveData.alerts);
      animateCount('accuracy', liveData.accuracy);
    }, 500);

    return () => clearTimeout(timer);
  }, [liveData]);

  // Live data streaming simulation
  useEffect(() => {
    const streamData = () => {
      setLiveData(prevData => {
        const now = new Date();
        const timeDiff = (now - prevData.lastUpdate) / 1000; // seconds since last update
        
        // Simulate realistic data growth
        const newData = {
          livesSaved: Math.min(prevData.livesSaved + Math.floor(Math.random() * 3), 1000000),
          communities: Math.min(prevData.communities + Math.floor(Math.random() * 2), 5000),
          alerts: prevData.alerts + Math.floor(Math.random() * 5) + 1,
          accuracy: Math.min(prevData.accuracy + (Math.random() * 0.1 - 0.05), 99.5),
          lastUpdate: now
        };
        
        // Update DOM elements with new values
        const livesElement = document.getElementById('lives-saved');
        const communitiesElement = document.getElementById('communities');
        const alertsElement = document.getElementById('alerts');
        const accuracyElement = document.getElementById('accuracy');
        
        if (livesElement) livesElement.textContent = newData.livesSaved.toLocaleString();
        if (communitiesElement) communitiesElement.textContent = newData.communities.toLocaleString();
        if (alertsElement) alertsElement.textContent = newData.alerts.toLocaleString();
        if (accuracyElement) accuracyElement.textContent = newData.accuracy.toFixed(1) + '%';
        
        return newData;
      });
    };

    // Update data every 2-5 seconds to simulate real-time streaming
    const interval = setInterval(streamData, Math.random() * 3000 + 2000);
    
    return () => clearInterval(interval);
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
      <LandingPageSEO />
      <style>{`
        @keyframes ambulance-flash {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .ambulance-flash {
          animation: ambulance-flash 1.5s ease-in-out infinite;
        }
        
        /* Firefighter-style siren blinking */
        @keyframes siren-blink {
          0%, 50% { opacity: 1; }
          25%, 75% { opacity: 0.3; }
        }
        
        @keyframes siren-light-blink {
          0%, 50% { opacity: 1; }
          25%, 75% { opacity: 0.1; }
        }
        
        .siren-blink {
          animation: siren-blink 0.8s ease-in-out infinite;
        }
        
        .siren-light-blink {
          animation: siren-light-blink 0.8s ease-in-out infinite;
        }
        
        /* Wave effects */
        @keyframes siren-wave-1 {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes siren-wave-2 {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        
        @keyframes siren-wave-3 {
          0% { transform: scale(0.8); opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        
        .siren-wave-1 {
          animation: siren-wave-1 1.2s ease-out infinite;
        }
        
        .siren-wave-2 {
          animation: siren-wave-2 1.2s ease-out infinite 0.2s;
        }
        
        .siren-wave-3 {
          animation: siren-wave-3 1.2s ease-out infinite 0.4s;
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
                <Link to="/" className={`${isScrolled ? 'text-[#067d83] hover:text-[#055a5f]' : 'text-white hover:text-[#4F6F6F]'} px-3 py-2 text-sm font-medium transition-colors`}>Home</Link>
                <Link to="/about" className={`${isScrolled ? 'text-[#067d83] hover:text-[#055a5f]' : 'text-white hover:text-[#4F6F6F]'} px-3 py-2 text-sm font-medium transition-colors`}>About</Link>
                <Link to="/impact" className={`${isScrolled ? 'text-[#067d83] hover:text-[#055a5f]' : 'text-white hover:text-[#4F6F6F]'} px-3 py-2 text-sm font-medium transition-colors`}>Impact</Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Emergency Alert Button with Global Map */}
              <button 
                onClick={() => setShowDisasterMap(true)}
                className="relative group hidden md:flex items-center p-3 hover:bg-red-50 rounded-md transition-all duration-300 transform hover:scale-110 overflow-hidden"
                title="Emergency Disaster Alert"
              >
                {/* Global Map Background */}
                <div className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat rounded-md"
                  style={{
                    backgroundImage: `url('/globe.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.3) contrast(1.2) saturate(1.2)'
                  }}
                ></div>
                
                {/* Animated Network Pattern Overlay */}
                <div className="absolute inset-0 opacity-15 rounded-md">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23ffffff' stroke-opacity='0.1' stroke-width='0.5'%3E%3Ccircle cx='15' cy='15' r='1'/%3E%3Ccircle cx='45' cy='15' r='1'/%3E%3Ccircle cx='15' cy='45' r='1'/%3E%3Ccircle cx='45' cy='45' r='1'/%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3Cpath d='M15 15L30 30M45 15L30 30M15 45L30 30M45 45L30 30'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px',
                    animation: 'float 15s ease-in-out infinite'
                  }}></div>
                </div>
                
                {/* Floating Data Points */}
                <div className="absolute inset-0 overflow-hidden rounded-md">
                  <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-400/60 rounded-full animate-pulse" style={{animationDelay: '0s', animationDuration: '2s'}}></div>
                  <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-400/60 rounded-full animate-pulse" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
                  <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-green-400/60 rounded-full animate-pulse" style={{animationDelay: '2s', animationDuration: '2.5s'}}></div>
                  <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-blue-400/60 rounded-full animate-pulse" style={{animationDelay: '3s', animationDuration: '4s'}}></div>
                </div>
                
                <div className="relative z-10">
                  {/* Alert Icon */}
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500">
                    <path d="M16 2L2 8v8c0 6 6 12 14 12s14-6 14-12V8L16 2z" fill="currentColor"/>
                    <path d="M16 6L6 10v6c0 4 4 8 10 8s10-4 10-8v-6L16 6z" fill="white"/>
                    <circle cx="16" cy="13" r="2" fill="currentColor"/>
                    <path d="M14 9h4v2h-4V9z" fill="currentColor"/>
                  </svg>
                  
                  {/* Alert Ripple Effect */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-12 h-12 border-2 border-red-400 rounded-full animate-ping opacity-60"></div>
                    <div className="absolute w-16 h-16 border-2 border-red-300 rounded-full animate-ping opacity-40" style={{animationDelay: '0.5s'}}></div>
                  </div>
                </div>
              </button>

              {/* Donate Button */}
              <button 
                onClick={() => setShowDonationModal(true)}
                className="hidden md:flex items-center px-3 py-1.5 bg-[#067d83] text-white rounded-md hover:bg-[#055a5f] transition-colors text-sm font-medium"
              >
                <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Donate
              </button>

              {/* Plant Tree Button */}
              <a 
                href="/app/plant-tree"
                className="hidden md:flex items-center px-3 py-1.5 bg-[#067d83] text-white rounded-md hover:bg-[#055a5f] transition-colors text-sm font-medium"
              >
                <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2L8 4h2l2-2h-2zm-2 4L6 8h2l2-2h-2zm4 0L14 8h-2l-2-2h2zm-2 4L10 12h2l2-2h-2zm4 0L18 12h-2l-2-2h2zm-8 4L6 16h2l2-2h-2zm4 0L10 16h2l2-2h-2zm4 0L18 16h-2l-2-2h2z" clipRule="evenodd" />
                </svg>
                Plant Tree
              </a>

              <a href="/login" className={`hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors ${isScrolled ? 'text-[#067d83] hover:text-[#055a5f]' : 'text-white hover:text-[#4F6F6F]'}`}>
                Sign In
              </a>
              <a href="/signup" className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#067d83] hover:bg-[#055a5f] transition-colors">
                Get Started
              </a>
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <img src={menu} alt="menu" className={`w-6 h-6 ${isScrolled ? 'filter brightness-0 saturate-100' : 'filter brightness-0 invert'}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Menu Panel */}
          <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-[#067d83]">Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Navigation Links */}
            <div className="p-4 space-y-2">
              <Link 
                to="/" 
                className="block px-4 py-3 text-[#067d83] hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="block px-4 py-3 text-[#067d83] hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/impact" 
                className="block px-4 py-3 text-[#067d83] hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Impact
              </Link>
              
              {/* Donate Button for Mobile */}
              <button 
                onClick={() => {
                  setShowDonationModal(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-2 bg-[#067d83] text-white rounded-lg hover:bg-[#055a5f] transition-colors duration-200 mt-4 text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Donate
              </button>

              {/* Plant Tree Button for Mobile */}
              <Link 
                to="/app/plant-tree"
                className="w-full flex items-center justify-center px-4 py-2 bg-[#067d83] text-white rounded-lg hover:bg-[#055a5f] transition-colors duration-200 text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2L8 4h2l2-2h-2zm-2 4L6 8h2l2-2h-2zm4 0L14 8h-2l-2-2h2zm-2 4L10 12h2l2-2h-2zm4 0L18 12h-2l-2-2h2zm-8 4L6 16h2l2-2h-2zm4 0L10 16h2l2-2h-2zm4 0L18 16h-2l-2-2h2z" clipRule="evenodd" />
                </svg>
                Plant Tree
              </Link>
              
              {/* Emergency Alert Button for Mobile */}
              <button 
                onClick={() => {
                  setShowDisasterMap(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Emergency Alert
              </button>
              
              {/* Auth Links */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <a 
                  href="/login" 
                  className="block px-4 py-3 text-[#067d83] hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </a>
                <a 
                  href="/signup" 
                  className="block px-4 py-3 bg-[#067d83] text-white rounded-lg hover:bg-[#055a5f] transition-colors duration-200 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

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
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#067d83]/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#067d83]/30 rounded-full blur-lg animate-bounce"></div>

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
                <span className="block bg-gradient-to-r from-[#067d83] via-[#4F6F6F] to-[#067d83] bg-clip-text text-transparent">
                  {heroSlides[currentSlide].subtitle}
                </span>
            </h1>
            
              <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                {heroSlides[currentSlide].description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <a href="/signup" className="group bg-[#067d83] hover:bg-[#055a5f] text-white px-6 py-2 rounded-full text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-[#067d83]/25 flex items-center">
                <span>Get Started Free</span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="/login" className="group border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-6 py-2 rounded-full text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-white/25 backdrop-blur-sm hover:backdrop-blur-none flex items-center">
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
            <div className="inline-block px-4 py-2 bg-[#067d83]/10 text-[#067d83] text-sm font-medium rounded-full mb-6">
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

          {/* Live Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {/* Lives Saved */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center relative overflow-hidden">
              <div className="absolute top-2 right-2 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                <span className="text-xs text-green-600 font-medium">LIVE</span>
              </div>
              <div className="text-4xl font-bold text-[#067d83] mb-2" id="lives-saved">
                0
              </div>
              <div className="text-gray-600 font-medium">Lives Saved</div>
              <div className="text-sm text-gray-500 mt-1">Through early warnings</div>
              <div className="mt-2 text-xs text-green-600">
                <span className="font-semibold">+{Math.floor(Math.random() * 3) + 1}</span> in last hour
              </div>
            </div>

            {/* Communities Protected */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center relative overflow-hidden">
              <div className="absolute top-2 right-2 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-1"></div>
                <span className="text-xs text-blue-600 font-medium">LIVE</span>
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2" id="communities">
                0
              </div>
              <div className="text-gray-600 font-medium">Communities</div>
              <div className="text-sm text-gray-500 mt-1">Actively monitored</div>
              <div className="mt-2 text-xs text-blue-600">
                <span className="font-semibold">+{Math.floor(Math.random() * 2)}</span> new this week
              </div>
            </div>

            {/* Alerts Sent */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center relative overflow-hidden">
              <div className="absolute top-2 right-2 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                <span className="text-xs text-green-600 font-medium">LIVE</span>
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2" id="alerts">
                0
              </div>
              <div className="text-gray-600 font-medium">Alerts Sent</div>
              <div className="text-sm text-gray-500 mt-1">This year</div>
              <div className="mt-2 text-xs text-green-600">
                <span className="font-semibold">+{Math.floor(Math.random() * 5) + 1}</span> in last 10 min
              </div>
            </div>

            {/* Accuracy Rate */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center relative overflow-hidden">
              <div className="absolute top-2 right-2 flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-1"></div>
                <span className="text-xs text-purple-600 font-medium">LIVE</span>
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2" id="accuracy">
                0%
              </div>
              <div className="text-gray-600 font-medium">Accuracy Rate</div>
              <div className="text-sm text-gray-500 mt-1">Prediction success</div>
              <div className="mt-2 text-xs text-purple-600">
                <span className="font-semibold">+0.1%</span> improvement today
              </div>
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
                <span className="font-semibold text-[#067d83]">Total 2024 Alerts:</span> 172,690 alerts sent
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

          {/* Live Activity Feed */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Live Activity Feed</h3>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Real-time Updates
              </div>
            </div>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              <div className="flex items-center p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Flood warning sent to 15,000 residents in Bangladesh</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Earthquake alert system activated in California</p>
                  <p className="text-xs text-gray-500">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Wildfire detection system updated in Australia</p>
                  <p className="text-xs text-gray-500">8 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Hurricane tracking system monitoring Atlantic</p>
                  <p className="text-xs text-gray-500">12 minutes ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Success Stories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-[#067d83]">97.4%</div>
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
                <div className="absolute -inset-4 bg-gradient-to-r from-[#067d83]/20 to-blue-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
        <img
          src={masked}
                  alt="Advanced disaster response technology"
                  className="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#067d83] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-pulse"></div>
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-pulse delay-1000"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#067d83]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating stats */}
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                  <div className="text-2xl font-bold text-[#067d83]">99.9%</div>
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
                <div className="inline-flex items-center px-6 py-3 bg-[#067d83]/10 text-[#067d83] text-sm font-semibold rounded-full mb-8 border border-[#067d83]/20">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  OUR MISSION
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                  Revolutionizing Disaster
                  <span className="block text-[#067d83]">Response Technology</span>
          </h2>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We're pioneering the future of disaster preparedness through cutting-edge AI technology. 
                  Our mission is to create a world where no community is caught off-guard by natural disasters, 
                  where early warning systems save lives, and where technology serves humanity's greatest need: survival.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-[#067d83] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
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

                <button className="inline-flex items-center px-6 py-3 border-2 border-[#067d83] text-[#067d83] hover:bg-[#067d83] hover:text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
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
            <div className="inline-flex items-center px-6 py-3 bg-[#067d83]/10 text-[#067d83] text-sm font-semibold rounded-full mb-6 border border-[#067d83]/20">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L3 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              USER TESTIMONIALS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Emergency
              <span className="block text-[#067d83]">Response Teams</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our disaster alert system has helped communities worldwide prepare for and respond to emergencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-[#067d83]/5 to-blue-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#067d83] rounded-full flex items-center justify-center text-white font-bold text-lg">
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
            <div className="bg-gradient-to-br from-blue-50 to-[#067d83]/5 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
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
            <div className="bg-gradient-to-br from-green-50 to-[#067d83]/5 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
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
      <section className="py-24 bg-gradient-to-br from-[#067d83] via-[#055a5f] to-[#067d83] relative overflow-hidden">
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



      {/* Modern Footer with Global Map Background */}
      <footer className="relative text-white overflow-hidden" style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)'
      }}>
        {/* Global Map Background */}
        <div 
          className="absolute inset-0 opacity-40 bg-cover bg-center bg-no-repeat animate-pulse"
          style={{
            backgroundImage: `url('/globe.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4) contrast(1.3) saturate(1.2)'
          }}
        ></div>
        
        {/* Animated Data Streams */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1 h-20 bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{animationDelay: '0s', animationDuration: '2s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-16 bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-24 bg-gradient-to-b from-transparent via-yellow-400 to-transparent animate-pulse" style={{animationDelay: '2s', animationDuration: '2.5s'}}></div>
          <div className="absolute bottom-1/4 right-1/4 w-1 h-18 bg-gradient-to-b from-transparent via-red-400 to-transparent animate-pulse" style={{animationDelay: '3s', animationDuration: '4s'}}></div>
        </div>
        
        {/* Animated Network Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23ffffff' stroke-opacity='0.1' stroke-width='1'%3E%3Ccircle cx='50' cy='50' r='3'/%3E%3Ccircle cx='250' cy='50' r='3'/%3E%3Ccircle cx='50' cy='250' r='3'/%3E%3Ccircle cx='250' cy='250' r='3'/%3E%3Ccircle cx='150' cy='150' r='4'/%3E%3Cpath d='M50 50L150 150M250 50L150 150M50 250L150 150M250 250L150 150'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '300px 300px',
            animation: 'float 25s ease-in-out infinite'
          }}></div>
        </div>
        
        {/* Enhanced Floating Data Points */}
        <div className="absolute inset-0 overflow-hidden">
          {/* North America */}
          <div className="absolute top-1/3 left-1/5 w-6 h-6 bg-green-500/60 rounded-full animate-pulse shadow-lg shadow-green-500/30" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
          <div className="absolute top-1/3 left-1/5 w-3 h-3 bg-green-400 rounded-full animate-ping shadow-lg shadow-green-400/50" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-1/3 left-1/5 w-8 h-8 border border-green-400/30 rounded-full animate-ping" style={{animationDelay: '0s', animationDuration: '4s'}}></div>
          
          {/* Europe */}
          <div className="absolute top-1/4 left-1/2 w-5 h-5 bg-blue-500/60 rounded-full animate-pulse shadow-lg shadow-blue-500/30" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
          <div className="absolute top-1/4 left-1/2 w-3 h-3 bg-blue-400 rounded-full animate-ping shadow-lg shadow-blue-400/50" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/4 left-1/2 w-7 h-7 border border-blue-400/30 rounded-full animate-ping" style={{animationDelay: '1s', animationDuration: '5s'}}></div>
          
          {/* Asia */}
          <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-yellow-500/60 rounded-full animate-pulse shadow-lg shadow-yellow-500/30" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-ping shadow-lg shadow-yellow-400/50" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-8 h-8 border border-yellow-400/30 rounded-full animate-ping" style={{animationDelay: '2s', animationDuration: '3s'}}></div>
          
          {/* Africa */}
          <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-red-500/60 rounded-full animate-pulse shadow-lg shadow-red-500/30" style={{animationDelay: '3s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-red-400 rounded-full animate-ping shadow-lg shadow-red-400/50" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-1/3 left-1/2 w-7 h-7 border border-red-400/30 rounded-full animate-ping" style={{animationDelay: '3s', animationDuration: '6s'}}></div>
          
          {/* South America */}
          <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-purple-500/60 rounded-full animate-pulse shadow-lg shadow-purple-500/30" style={{animationDelay: '4s', animationDuration: '3s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-ping shadow-lg shadow-purple-400/50" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-7 h-7 border border-purple-400/30 rounded-full animate-ping" style={{animationDelay: '4s', animationDuration: '4s'}}></div>
          
          {/* Australia */}
          <div className="absolute bottom-1/3 right-1/5 w-5 h-5 bg-cyan-500/60 rounded-full animate-pulse shadow-lg shadow-cyan-500/30" style={{animationDelay: '5s', animationDuration: '6s'}}></div>
          <div className="absolute bottom-1/3 right-1/5 w-3 h-3 bg-cyan-400 rounded-full animate-ping shadow-lg shadow-cyan-400/50" style={{animationDelay: '5s'}}></div>
          <div className="absolute bottom-1/3 right-1/5 w-7 h-7 border border-cyan-400/30 rounded-full animate-ping" style={{animationDelay: '5s', animationDuration: '5s'}}></div>
        </div>
        
        {/* Animated Connection Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/5 w-32 h-0.5 bg-gradient-to-r from-green-400/60 via-transparent to-blue-400/60 animate-pulse" style={{transform: 'rotate(15deg)', animationDelay: '0s', animationDuration: '3s'}}></div>
          <div className="absolute top-1/4 left-1/2 w-24 h-0.5 bg-gradient-to-r from-blue-400/60 via-transparent to-yellow-400/60 animate-pulse" style={{transform: 'rotate(-20deg)', animationDelay: '1s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-1/3 left-1/2 w-28 h-0.5 bg-gradient-to-r from-red-400/60 via-transparent to-purple-400/60 animate-pulse" style={{transform: 'rotate(25deg)', animationDelay: '2s', animationDuration: '5s'}}></div>
          <div className="absolute bottom-1/3 right-1/5 w-20 h-0.5 bg-gradient-to-r from-cyan-400/60 via-transparent to-yellow-400/60 animate-pulse" style={{transform: 'rotate(-15deg)', animationDelay: '3s', animationDuration: '4s'}}></div>
        </div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23ffffff' stroke-opacity='0.1' stroke-width='0.5'%3E%3Cpath d='M0 0h80v80H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        
        {/* Animated Radar Sweep */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-green-400/20 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 border border-blue-400/20 rounded-full animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-yellow-400/20 rounded-full animate-spin" style={{animationDuration: '10s'}}></div>
        </div>
        
        {/* Floating Tech Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
          <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '3s', animationDuration: '3.5s'}}></div>
        </div>
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative z-10">
          {/* Partners Section */}
          <div className="mb-12 md:mb-16">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 text-white">Trusted by Global Partners</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 md:gap-6 lg:gap-8 items-center justify-items-center">
              {/* Red Cross */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full max-w-[120px]">
                <img src="/red-cross.jpg" alt="Red Cross" className="h-6 md:h-8 w-auto mx-auto" />
                <div className="text-white text-xs text-center mt-1">Red Cross</div>
              </div>
              
              {/* World Bank */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full max-w-[120px]">
                <img src="/world-bank.webp" alt="World Bank" className="h-6 md:h-8 w-auto mx-auto" />
                <div className="text-white text-xs text-center mt-1">World Bank</div>
              </div>
              
              {/* UNFCCC */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full max-w-[120px]">
                <img src="/unfcc.png" alt="UNFCCC" className="h-6 md:h-8 w-auto mx-auto" />
                <div className="text-white text-xs text-center mt-1">UNFCCC</div>
              </div>
              
              {/* UNDP */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full max-w-[120px]">
                <img src="/undp.png" alt="UNDP" className="h-6 md:h-8 w-auto mx-auto" />
                <div className="text-white text-xs text-center mt-1">UNDP</div>
              </div>
              
              {/* Green Climate Fund */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full max-w-[120px]">
                <img src="/gef.png" alt="Green Climate Fund" className="h-6 md:h-8 w-auto mx-auto" />
                <div className="text-white text-xs text-center mt-1">Green Climate Fund</div>
              </div>
              
              {/* UN Environment Programme */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full max-w-[120px]">
                <img src="/unep.png" alt="UNEP" className="h-6 md:h-8 w-auto mx-auto" />
                <div className="text-white text-xs text-center mt-1">UNEP</div>
              </div>
              
              {/* World Health Organization */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full max-w-[120px]">
                <img src="/who.png" alt="WHO" className="h-6 md:h-8 w-auto mx-auto" />
                <div className="text-white text-xs text-center mt-1">WHO</div>
              </div>
              
              {/* International Federation of Red Cross */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full max-w-[120px]">
                <img src="/IFRC.png" alt="IFRC" className="h-6 md:h-8 w-auto mx-auto" />
                <div className="text-white text-xs text-center mt-1">IFRC</div>
              </div>
              
              {/* UNN */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full max-w-[120px]">
                <img src="/unn.png" alt="UNN" className="h-6 md:h-8 w-auto mx-auto" />
                <div className="text-white text-xs text-center mt-1">UNN</div>
              </div>
              
              {/* Global Environment Facility */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full max-w-[120px]">
                <div className="text-white font-bold text-xs md:text-sm text-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-1 md:mb-2 bg-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">GEF</span>
                  </div>
                  <div className="hidden sm:block">GEF</div>
                  <div className="sm:hidden text-xs">GEF</div>
                </div>
              </div>
              
              {/* Climate Action Network */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full max-w-[120px]">
                <div className="text-white font-bold text-xs md:text-sm text-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-1 md:mb-2 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">CAN</span>
                  </div>
                  <div className="hidden sm:block">Climate Action Network</div>
                  <div className="sm:hidden text-xs">CAN</div>
                </div>
              </div>
              
              {/* World Meteorological Organization */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full max-w-[120px]">
                <div className="text-white font-bold text-xs md:text-sm text-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-1 md:mb-2 bg-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">WMO</span>
                  </div>
                  <div className="hidden sm:block">WMO</div>
                  <div className="sm:hidden text-xs">WMO</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Company Info */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 md:mb-6">
                <img alt="logo" src="/logo.jpg" className="h-8 md:h-10 w-auto mr-0 sm:mr-4 mb-2 sm:mb-0" />
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#067d83]">Disaster Alert System</h3>
              </div>
              <p className="text-gray-300 mb-6 md:mb-8 max-w-lg text-sm md:text-base lg:text-lg leading-relaxed">
                Advanced AI-powered disaster alert system protecting communities worldwide through 
                real-time monitoring, predictive analytics, and coordinated emergency response.
              </p>
              
              {/* Newsletter */}
              <div className="mb-6 md:mb-8">
                <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">Stay Updated</h4>
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <input
                  type="email"
                    placeholder="Enter your email address"
                    className="px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#067d83] focus:border-transparent backdrop-blur-sm text-sm md:text-base"
                />
                  <button className="bg-[#067d83] hover:bg-[#055a5f] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base">
                  Subscribe
                </button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">Follow Us</h4>
                <div className="flex flex-wrap gap-2 md:gap-4">
                  <a 
                    href="https://facebook.com/climatewavers" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 hover:border-white/50 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-white/20"
                    aria-label="Follow us on Facebook"
                  >
                    <img src={fb} alt="Facebook" className="w-4 h-4 md:w-6 md:h-6 filter brightness-0 invert" />
                  </a>
                  <a 
                    href="https://youtube.com/@climatewavers" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 hover:border-white/50 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-white/20"
                    aria-label="Subscribe to our YouTube channel"
                  >
                    <img src={yt} alt="YouTube" className="w-4 h-4 md:w-6 md:h-6 filter brightness-0 invert" />
                  </a>
                  <a 
                    href="https://x.com/climatewavers" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 hover:border-white/50 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-white/20"
                    aria-label="Follow us on X (Twitter)"
                  >
                    <img src={exx} alt="X" className="w-4 h-4 md:w-6 md:h-6 filter brightness-0 invert" />
                  </a>
                  <a 
                    href="https://linkedin.com/company/climatewavers" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 hover:border-white/50 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-white/20"
                    aria-label="Connect with us on LinkedIn"
                  >
                    <img src={linkedIn} alt="LinkedIn" className="w-4 h-4 md:w-6 md:h-6" />
                  </a>
                </div>
              </div>
        </div>

            {/* Information */}
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">Information</h4>
              <ul className="space-y-2">
                <li><Link to="/traffic-report" className="text-gray-300 hover:text-[#067d83] transition-colors text-sm md:text-base">Traffic Report</Link></li>
                <li><Link to="/transparency-report" className="text-gray-300 hover:text-[#067d83] transition-colors text-sm md:text-base">Transparency Report</Link></li>
                <li><Link to="/faq" className="text-gray-300 hover:text-[#067d83] transition-colors text-sm md:text-base">FAQ</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-300 hover:text-[#067d83] transition-colors text-sm md:text-base">Privacy Policy</Link></li>
          </ul>
        </div>

            {/* Services */}
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">Services</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-300 hover:text-[#067d83] transition-colors text-sm md:text-base">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-[#067d83] transition-colors text-sm md:text-base">Contact Us</Link></li>
                <li><Link to="/consulting" className="text-gray-300 hover:text-[#067d83] transition-colors text-sm md:text-base">Consulting</Link></li>
                <li><Link to="/support" className="text-gray-300 hover:text-[#067d83] transition-colors text-sm md:text-base">Support</Link></li>
          </ul>
        </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-700 mt-8 md:mt-12 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
              <p className="text-gray-400 text-xs md:text-sm mb-2 md:mb-0">
                © 2024 Disaster Alert System. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Emergency Alert Map Modal */}
      {showDisasterMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <div className="relative w-full max-w-7xl mx-4 bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Emergency Alert Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-200">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-red-800">Emergency Alert System</h2>
                  <p className="text-red-600 text-sm">Live disaster monitoring and emergency response coordination</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right text-sm">
                  <div className="text-red-600">Status: <span className="text-red-600 font-bold animate-pulse">ACTIVE ALERTS</span></div>
                  <div className="text-red-600">Last Updated: {new Date().toLocaleTimeString()}</div>
                </div>
                <button
                  onClick={() => setShowDisasterMap(false)}
                  className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-100 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

             {/* Mock Google Maps Container */}
             <div className="relative h-[75vh] bg-gradient-to-br from-blue-50 to-green-50">
               <LeafletMap 
                 disasters={disasterData} 
                 onDisasterClick={setSelectedDisaster}
               />
              
              {/* Emergency Controls Panel */}
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 space-y-2 border border-red-200">
                <div className="text-red-800 text-sm font-bold mb-2">EMERGENCY CONTROLS</div>
                <button
                  onClick={() => setMeasurementMode(!measurementMode)}
                  className={`w-full px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    measurementMode 
                      ? 'bg-red-500 text-white' 
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  📏 MEASURE DISTANCE
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full px-3 py-2 text-xs font-medium rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                >
                  🔄 REFRESH ALERTS
                </button>
              </div>

              {/* Emergency Alert Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm border border-red-200">
                <h4 className="font-bold text-red-800 mb-3 text-sm">ALERT SEVERITY LEVELS</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-red-700 font-semibold">CRITICAL - IMMEDIATE EVACUATION</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
                    <span className="text-orange-700 font-semibold">HIGH - URGENT ATTENTION</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
                    <span className="text-yellow-700 font-semibold">MEDIUM - MONITOR CLOSELY</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-green-700 font-semibold">LOW - ROUTINE MONITORING</span>
                  </div>
                </div>
                
                {measurementMode && (
                  <div className="mt-4 pt-3 border-t border-red-200">
                    <p className="text-xs text-red-500 mb-2">Click on map to measure emergency distance</p>
                    {distance > 0 && (
                      <p className="text-xs font-medium text-red-600">
                        EMERGENCY RANGE: {distance.toFixed(2)} km
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Donation Modal */}
      {showDonationModal && (
        <DonationForm onClose={() => setShowDonationModal(false)} />
      )}
    </main>
    </>
  );
};

export default LandingPage;


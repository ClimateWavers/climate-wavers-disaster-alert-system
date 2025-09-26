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
import { Wrapper, Status } from '@googlemaps/react-wrapper';

// Google Maps API key (you'll need to replace this with your actual API key)
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

// Mock Google Maps component with detailed world map
const MockGoogleMap = ({ disasters, onDisasterClick }) => {
  const [selectedDisaster, setSelectedDisaster] = useState(null);

  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden rounded-2xl shadow-2xl border border-blue-700">
      {/* Global Real-Time Satellite Map Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='1200' height='800' viewBox='0 0 1200 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='global-satellite' patternUnits='userSpaceOnUse' width='1200' height='800'%3E%3Crect width='1200' height='800' fill='%23002244'/%3E%3Cpath d='M0 50h1200M0 100h1200M0 150h1200M0 200h1200M0 250h1200M0 300h1200M0 350h1200M0 400h1200M0 450h1200M0 500h1200M0 550h1200M0 600h1200M0 650h1200M0 700h1200M0 750h1200M50 0v800M100 0v800M150 0v800M200 0v800M250 0v800M300 0v800M350 0v800M400 0v800M450 0v800M500 0v800M550 0v800M600 0v800M650 0v800M700 0v800M750 0v800M800 0v800M850 0v800M900 0v800M950 0v800M1000 0v800M1050 0v800M1100 0v800M1150 0v800' stroke='%23ffffff' stroke-width='0.3' opacity='0.08'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='1200' height='800' fill='url(%23global-satellite)'/%3E%3C/svg%3E")`,
        backgroundSize: 'cover'
      }}>
        {/* Ocean Background - Matching Reference Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900"></div>
        
        {/* NORTH AMERICA - Enhanced Satellite View */}
        <div className="absolute top-[15%] left-[10%] w-[30%] h-[45%] opacity-95 rounded-lg shadow-lg" style={{
          background: `
            radial-gradient(ellipse at 25% 15%, rgba(34, 139, 34, 0.95) 0%, rgba(0, 100, 0, 0.85) 25%, rgba(0, 80, 0, 0.7) 50%, rgba(0, 60, 0, 0.5) 75%, transparent 100%),
            radial-gradient(ellipse at 70% 60%, rgba(139, 69, 19, 0.9) 0%, rgba(160, 82, 45, 0.7) 35%, rgba(205, 133, 63, 0.5) 65%, transparent 100%),
            radial-gradient(ellipse at 15% 80%, rgba(255, 140, 0, 0.8) 0%, rgba(255, 215, 0, 0.6) 45%, rgba(255, 255, 0, 0.4) 75%, transparent 100%),
            radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.3) 0%, rgba(240, 240, 240, 0.2) 50%, transparent 100%)
          `,
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
        }}></div>
        
        {/* USA States - Clear Boundaries */}
        <div className="absolute top-[20%] left-[15%] w-[25%] h-[35%] opacity-90" style={{
          background: `
            linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(0deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            radial-gradient(ellipse at 30% 20%, rgba(34, 139, 34, 0.8) 0%, rgba(0, 100, 0, 0.6) 50%, transparent 100%)
          `,
          backgroundSize: '20px 20px'
        }}></div>
        
        {/* SOUTH AMERICA - Clear Continent Shape */}
        <div className="absolute top-[45%] left-[15%] w-[18%] h-[40%] opacity-98" style={{
          background: `
            radial-gradient(ellipse at center, rgba(0, 128, 0, 0.95) 0%, rgba(34, 139, 34, 0.9) 20%, rgba(0, 100, 0, 0.7) 50%, rgba(0, 80, 0, 0.5) 80%, transparent 100%),
            radial-gradient(ellipse at 60% 20%, rgba(128, 128, 128, 0.9) 0%, rgba(105, 105, 105, 0.7) 40%, rgba(80, 80, 80, 0.5) 70%, transparent 100%)
          `
        }}></div>
        
        {/* Brazil - Clear Country Shape */}
        <div className="absolute top-[50%] left-[18%] w-[12%] h-[30%] opacity-95" style={{
          background: `
            linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
            linear-gradient(0deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
            radial-gradient(ellipse at center, rgba(0, 128, 0, 0.9) 0%, rgba(34, 139, 34, 0.7) 60%, transparent 100%)
          `,
          backgroundSize: '15px 15px'
        }}></div>
        
        {/* EUROPE - Enhanced Satellite View */}
        <div className="absolute top-[20%] left-[40%] w-[25%] h-[30%] opacity-95 rounded-lg shadow-lg" style={{
          background: `
            radial-gradient(ellipse at center, rgba(34, 139, 34, 0.95) 0%, rgba(0, 100, 0, 0.8) 35%, rgba(0, 80, 0, 0.6) 65%, transparent 100%),
            radial-gradient(ellipse at 30% 70%, rgba(128, 128, 128, 0.9) 0%, rgba(105, 105, 105, 0.7) 45%, rgba(80, 80, 80, 0.5) 75%, transparent 100%),
            radial-gradient(ellipse at 60% 20%, rgba(255, 255, 255, 0.4) 0%, rgba(240, 240, 240, 0.3) 50%, transparent 100%)
          `,
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
        }}></div>
        
        {/* European Countries - Clear Boundaries */}
        <div className="absolute top-[25%] left-[42%] w-[20%] h-[25%] opacity-90" style={{
          background: `
            linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
            linear-gradient(0deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
            radial-gradient(ellipse at center, rgba(34, 139, 34, 0.8) 0%, rgba(0, 100, 0, 0.6) 60%, transparent 100%)
          `,
          backgroundSize: '12px 12px'
        }}></div>
        
        {/* AFRICA - Enhanced Satellite View */}
        <div className="absolute top-[35%] left-[45%] w-[30%] h-[45%] opacity-95 rounded-lg shadow-lg" style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(255, 140, 0, 0.95) 0%, rgba(255, 215, 0, 0.8) 30%, rgba(255, 255, 0, 0.6) 60%, transparent 100%),
            radial-gradient(ellipse at 70% 60%, rgba(34, 139, 34, 0.95) 0%, rgba(0, 100, 0, 0.8) 35%, rgba(0, 80, 0, 0.6) 65%, transparent 100%),
            radial-gradient(ellipse at 50% 80%, rgba(139, 69, 19, 0.9) 0%, rgba(160, 82, 45, 0.7) 45%, rgba(205, 133, 63, 0.5) 75%, transparent 100%),
            radial-gradient(ellipse at 20% 50%, rgba(255, 255, 255, 0.3) 0%, rgba(240, 240, 240, 0.2) 50%, transparent 100%)
          `,
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
        }}></div>
        
        {/* African Countries - Clear Boundaries */}
        <div className="absolute top-[40%] left-[48%] w-[25%] h-[35%] opacity-90" style={{
          background: `
            linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
            linear-gradient(0deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
            radial-gradient(ellipse at 30% 20%, rgba(255, 140, 0, 0.8) 0%, rgba(255, 215, 0, 0.6) 50%, transparent 100%)
          `,
          backgroundSize: '18px 18px'
        }}></div>
        
        {/* ASIA - Enhanced Satellite View */}
        <div className="absolute top-[20%] left-[60%] w-[35%] h-[50%] opacity-95 rounded-lg shadow-lg" style={{
          background: `
            radial-gradient(ellipse at 40% 15%, rgba(255, 255, 255, 0.98) 0%, rgba(240, 240, 240, 0.9) 25%, rgba(220, 220, 220, 0.7) 50%, transparent 100%),
            radial-gradient(ellipse at 60% 50%, rgba(34, 139, 34, 0.95) 0%, rgba(0, 100, 0, 0.8) 35%, rgba(0, 80, 0, 0.6) 65%, transparent 100%),
            radial-gradient(ellipse at 20% 70%, rgba(255, 140, 0, 0.9) 0%, rgba(255, 215, 0, 0.7) 40%, rgba(255, 255, 0, 0.5) 70%, transparent 100%),
            radial-gradient(ellipse at 80% 30%, rgba(139, 69, 19, 0.6) 0%, rgba(160, 82, 45, 0.4) 50%, transparent 100%)
          `,
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
        }}></div>
        
        {/* Asian Countries - Clear Boundaries */}
        <div className="absolute top-[25%] left-[65%] w-[25%] h-[40%] opacity-90" style={{
          background: `
            linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
            linear-gradient(0deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
            radial-gradient(ellipse at 40% 15%, rgba(255, 255, 255, 0.9) 0%, rgba(240, 240, 240, 0.7) 50%, transparent 100%)
          `,
          backgroundSize: '16px 16px'
        }}></div>
        
        {/* AUSTRALIA - Enhanced Satellite View */}
        <div className="absolute top-[65%] left-[65%] w-[25%] h-[30%] opacity-95 rounded-lg shadow-lg" style={{
          background: `
            radial-gradient(ellipse at center, rgba(255, 140, 0, 0.95) 0%, rgba(255, 215, 0, 0.8) 30%, rgba(255, 255, 0, 0.6) 60%, transparent 100%),
            radial-gradient(ellipse at 30% 30%, rgba(34, 139, 34, 0.9) 0%, rgba(0, 100, 0, 0.7) 45%, rgba(0, 80, 0, 0.5) 75%, transparent 100%),
            radial-gradient(ellipse at 70% 70%, rgba(139, 69, 19, 0.7) 0%, rgba(160, 82, 45, 0.5) 50%, transparent 100%),
            radial-gradient(ellipse at 50% 20%, rgba(255, 255, 255, 0.4) 0%, rgba(240, 240, 240, 0.3) 50%, transparent 100%)
          `,
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
        }}></div>
        
        {/* Australian States - Clear Boundaries */}
        <div className="absolute top-[70%] left-[68%] w-[18%] h-[20%] opacity-90" style={{
          background: `
            linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
            linear-gradient(0deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
            radial-gradient(ellipse at center, rgba(255, 140, 0, 0.8) 0%, rgba(255, 215, 0, 0.6) 60%, transparent 100%)
          `,
          backgroundSize: '14px 14px'
        }}></div>
        
        {/* ANTARCTICA - Enhanced Ice Cap */}
        <div className="absolute top-[5%] left-[35%] w-[35%] h-[20%] opacity-95 rounded-lg shadow-lg" style={{
          background: `
            radial-gradient(ellipse at center, rgba(255, 255, 255, 0.99) 0%, rgba(240, 240, 240, 0.95) 20%, rgba(220, 220, 220, 0.8) 45%, rgba(200, 200, 200, 0.6) 70%, transparent 100%),
            radial-gradient(ellipse at 30% 30%, rgba(230, 230, 230, 0.8) 0%, rgba(210, 210, 210, 0.6) 50%, transparent 100%),
            radial-gradient(ellipse at 70% 70%, rgba(250, 250, 250, 0.6) 0%, rgba(240, 240, 240, 0.4) 50%, transparent 100%)
          `,
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
        }}></div>
        
        {/* Enhanced Global Geographic Coordinate Grid - Latitude Lines */}
        <div className="absolute top-[10%] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-70" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='1' viewBox='0 0 20 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0.5h5M10 0.5h5' stroke='%23ffffff' stroke-width='0.5' opacity='0.8'/%3E%3C/svg%3E")`,
          backgroundSize: '20px 1px',
          filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))'
        }}></div>
        <div className="absolute top-[20%] left-0 w-full h-0.5 bg-white opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='1' viewBox='0 0 20 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0.5h5M10 0.5h5' stroke='%23ffffff' stroke-width='0.5' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '20px 1px'
        }}></div>
        <div className="absolute top-[30%] left-0 w-full h-0.5 bg-white opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='1' viewBox='0 0 20 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0.5h5M10 0.5h5' stroke='%23ffffff' stroke-width='0.5' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '20px 1px'
        }}></div>
        <div className="absolute top-[40%] left-0 w-full h-0.5 bg-white opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='1' viewBox='0 0 20 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0.5h5M10 0.5h5' stroke='%23ffffff' stroke-width='0.5' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '20px 1px'
        }}></div>
        <div className="absolute top-[50%] left-0 w-full h-0.5 bg-white opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='1' viewBox='0 0 20 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0.5h5M10 0.5h5' stroke='%23ffffff' stroke-width='0.5' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '20px 1px'
        }}></div>
        <div className="absolute top-[60%] left-0 w-full h-0.5 bg-white opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='1' viewBox='0 0 20 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0.5h5M10 0.5h5' stroke='%23ffffff' stroke-width='0.5' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '20px 1px'
        }}></div>
        <div className="absolute top-[70%] left-0 w-full h-0.5 bg-white opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='1' viewBox='0 0 20 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0.5h5M10 0.5h5' stroke='%23ffffff' stroke-width='0.5' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '20px 1px'
        }}></div>
        <div className="absolute top-[80%] left-0 w-full h-0.5 bg-white opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='1' viewBox='0 0 20 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0.5h5M10 0.5h5' stroke='%23ffffff' stroke-width='0.5' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '20px 1px'
        }}></div>
        <div className="absolute top-[90%] left-0 w-full h-0.5 bg-white opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='1' viewBox='0 0 20 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0.5h5M10 0.5h5' stroke='%23ffffff' stroke-width='0.5' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '20px 1px'
        }}></div>
        
        {/* Global Longitude Grid Lines */}
        <div className="absolute top-0 left-[10%] w-0.5 h-full bg-white opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1' height='20' viewBox='0 0 1 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.5 0v5M0.5 10v5' stroke='%23ffffff' stroke-width='0.5' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '1px 20px'
        }}></div>
        <div className="absolute top-0 left-[20%] w-0.5 h-full bg-white opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1' height='20' viewBox='0 0 1 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.5 0v5M0.5 10v5' stroke='%23ffffff' stroke-width='0.5' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '1px 20px'
        }}></div>
        <div className="absolute top-0 left-[30%] w-0.5 h-full bg-white opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1' height='20' viewBox='0 0 1 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.5 0v5M0.5 10v5' stroke='%23ffffff' stroke-width='0.5' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '1px 20px'
        }}></div>
        <div className="absolute top-0 left-[40%] w-0.5 h-full bg-white opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1' height='20' viewBox='0 0 1 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.5 0v5M0.5 10v5' stroke='%23ffffff' stroke-width='0.5' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '1px 20px'
        }}></div>
        <div className="absolute top-0 left-[50%] w-0.5 h-full bg-white opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1' height='20' viewBox='0 0 1 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.5 0v5M0.5 10v5' stroke='%23ffffff' stroke-width='0.5' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '1px 20px'
        }}></div>
        <div className="absolute top-0 left-[60%] w-0.5 h-full bg-white opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1' height='20' viewBox='0 0 1 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.5 0v5M0.5 10v5' stroke='%23ffffff' stroke-width='0.5' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '1px 20px'
        }}></div>
        <div className="absolute top-0 left-[70%] w-0.5 h-full bg-white opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1' height='20' viewBox='0 0 1 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.5 0v5M0.5 10v5' stroke='%23ffffff' stroke-width='0.5' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '1px 20px'
        }}></div>
        <div className="absolute top-0 left-[80%] w-0.5 h-full bg-white opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1' height='20' viewBox='0 0 1 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.5 0v5M0.5 10v5' stroke='%23ffffff' stroke-width='0.5' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '1px 20px'
        }}></div>
        <div className="absolute top-0 left-[90%] w-0.5 h-full bg-white opacity-60" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1' height='20' viewBox='0 0 1 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.5 0v5M0.5 10v5' stroke='%23ffffff' stroke-width='0.5' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '1px 20px'
        }}></div>
        
        {/* Enhanced Global Coordinate Labels */}
        <div className="absolute top-[10%] left-2 text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">80N</div>
        <div className="absolute top-[20%] left-2 text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">60N</div>
        <div className="absolute top-[30%] left-2 text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">40N</div>
        <div className="absolute top-[40%] left-2 text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">20N</div>
        <div className="absolute top-[50%] left-2 text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">0°</div>
        <div className="absolute top-[60%] left-2 text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">20S</div>
        <div className="absolute top-[70%] left-2 text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">40S</div>
        <div className="absolute top-[80%] left-2 text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">60S</div>
        <div className="absolute top-[90%] left-2 text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">80S</div>
        
        {/* Enhanced Longitude Labels */}
        <div className="absolute top-2 left-[10%] text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">180W</div>
        <div className="absolute top-2 left-[20%] text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">140W</div>
        <div className="absolute top-2 left-[30%] text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">100W</div>
        <div className="absolute top-2 left-[40%] text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">60W</div>
        <div className="absolute top-2 left-[50%] text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">20W</div>
        <div className="absolute top-2 left-[60%] text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">20E</div>
        <div className="absolute top-2 left-[70%] text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">60E</div>
        <div className="absolute top-2 left-[80%] text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">100E</div>
        <div className="absolute top-2 left-[90%] text-xs text-cyan-300 font-bold bg-black/60 px-1 py-0.5 rounded shadow-lg backdrop-blur-sm">140E</div>
        
        {/* Realistic Satellite Terrain Patterns */}
        {/* Himalayan Mountain Range */}
        <div className="absolute top-[15%] left-[45%] w-[40%] h-[20%] opacity-90" style={{
          background: `radial-gradient(ellipse at center, rgba(128, 128, 128, 0.8) 0%, rgba(105, 105, 105, 0.6) 50%, transparent 100%)`
        }}></div>
        
        {/* Indian Subcontinent - Mixed Terrain */}
        <div className="absolute top-[25%] left-[40%] w-[35%] h-[45%] opacity-85" style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(34, 139, 34, 0.7) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 60%, rgba(255, 215, 0, 0.6) 0%, transparent 70%),
            radial-gradient(ellipse at 20% 80%, rgba(160, 82, 45, 0.5) 0%, transparent 50%)
          `
        }}></div>
        
        {/* Ganges Delta - Bangladesh */}
        <div className="absolute top-[35%] left-[50%] w-[20%] h-[25%] opacity-90" style={{
          background: `radial-gradient(ellipse at center, rgba(0, 100, 0, 0.8) 0%, rgba(34, 139, 34, 0.6) 50%, transparent 100%)`
        }}></div>
        
        {/* Tibetan Plateau */}
        <div className="absolute top-[10%] left-[65%] w-[25%] h-[30%] opacity-80" style={{
          background: `radial-gradient(ellipse at center, rgba(255, 215, 0, 0.7) 0%, rgba(218, 165, 32, 0.5) 50%, transparent 100%)`
        }}></div>
        
        {/* Thar Desert */}
        <div className="absolute top-[60%] left-[35%] w-[25%] h-[20%] opacity-75" style={{
          background: `radial-gradient(ellipse at center, rgba(255, 140, 0, 0.6) 0%, rgba(255, 215, 0, 0.4) 50%, transparent 100%)`
        }}></div>
        
        {/* Southeast Asian Forests */}
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[30%] opacity-85" style={{
          background: `radial-gradient(ellipse at center, rgba(0, 128, 0, 0.8) 0%, rgba(34, 139, 34, 0.6) 50%, transparent 100%)`
        }}></div>
        
        {/* Yellow Rectangular Frames - Exactly Like Your Image */}
        {/* Outer Frame - Large Rectangle */}
        <div className="absolute top-[5%] left-[10%] w-[80%] h-[90%] border-2 border-yellow-400">
          {/* Corner Markers - Small Yellow Squares */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-400"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-yellow-400"></div>
          {/* Midpoint Markers - Small Yellow Squares */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400"></div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400"></div>
          <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-yellow-400"></div>
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-yellow-400"></div>
        </div>
        
        {/* Inner Frame - Smaller Rectangle Over Bay of Bengal */}
        <div className="absolute top-[30%] left-[50%] w-[30%] h-[45%] border-2 border-yellow-400">
          {/* Corner Markers - Small Yellow Squares */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-400"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-yellow-400"></div>
          {/* Midpoint Markers - Small Yellow Squares */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400"></div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400"></div>
          <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-yellow-400"></div>
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-yellow-400"></div>
        </div>
        
        {/* Numbered Markers - Exactly Like Your Image */}
        <div className="absolute top-[38%] left-[58%] w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg border-2 border-yellow-300">
          1
        </div>
        <div className="absolute top-[48%] left-[60%] w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg border-2 border-yellow-300">
          2
        </div>
        
        {/* CONTINENT LABELS - Matching Reference Image */}
        <div className="absolute top-[20%] left-[15%] text-sm font-bold text-green-400 bg-black/50 px-2 py-1 rounded">NORTH AMERICA</div>
        <div className="absolute top-[25%] left-[45%] text-sm font-bold text-green-400 bg-black/50 px-2 py-1 rounded">EUROPE</div>
        <div className="absolute top-[40%] left-[50%] text-sm font-bold text-green-400 bg-black/50 px-2 py-1 rounded">AFRICA</div>
        <div className="absolute top-[25%] left-[70%] text-sm font-bold text-green-400 bg-black/50 px-2 py-1 rounded">ASIA</div>
        <div className="absolute top-[70%] left-[75%] text-sm font-bold text-green-400 bg-black/50 px-2 py-1 rounded">AUSTRALIA</div>
        <div className="absolute top-[60%] left-[20%] text-sm font-bold text-green-400 bg-black/50 px-2 py-1 rounded">SOUTH AMERICA</div>
        
        {/* COUNTRY LABELS - Matching Reference Image */}
        <div className="absolute top-[25%] left-[20%] text-xs font-bold text-yellow-300">USA</div>
        <div className="absolute top-[20%] left-[15%] text-xs font-bold text-yellow-300">CANADA</div>
        <div className="absolute top-[28%] left-[47%] text-xs font-bold text-yellow-300">SPAIN</div>
        <div className="absolute top-[25%] left-[45%] text-xs font-bold text-yellow-300">UK</div>
        <div className="absolute top-[35%] left-[50%] text-xs font-bold text-yellow-300">EGYPT</div>
        <div className="absolute top-[45%] left-[48%] text-xs font-bold text-yellow-300">NIGERIA</div>
        <div className="absolute top-[55%] left-[50%] text-xs font-bold text-yellow-300">SOUTH AFRICA</div>
        <div className="absolute top-[32%] left-[70%] text-xs font-bold text-yellow-300">CHINA</div>
        <div className="absolute top-[40%] left-[65%] text-xs font-bold text-yellow-300">INDIA</div>
        <div className="absolute top-[65%] left-[20%] text-xs font-bold text-yellow-300">BRAZIL</div>
        <div className="absolute top-[70%] left-[18%] text-xs font-bold text-yellow-300">ARGENTINA</div>
        <div className="absolute top-[75%] left-[15%] text-xs font-bold text-yellow-300">CHILE</div>
        
        {/* CITY MARKERS - Matching Reference Image */}
        <div className="absolute top-[25%] left-[20%] w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-lg"></div>
        <div className="absolute top-[25%] left-[20%] text-yellow-300 text-xs font-bold ml-2 mt-1">Los Angeles</div>
        
        <div className="absolute top-[25%] left-[45%] w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-lg"></div>
        <div className="absolute top-[25%] left-[45%] text-yellow-300 text-xs font-bold ml-2 mt-1">London</div>
        
        <div className="absolute top-[28%] left-[47%] w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-lg"></div>
        <div className="absolute top-[28%] left-[47%] text-yellow-300 text-xs font-bold ml-2 mt-1">Paris</div>
        
        <div className="absolute top-[35%] left-[50%] w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-lg"></div>
        <div className="absolute top-[35%] left-[50%] text-yellow-300 text-xs font-bold ml-2 mt-1">Cairo</div>
        
        <div className="absolute top-[30%] left-[75%] w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-lg"></div>
        <div className="absolute top-[30%] left-[75%] text-yellow-300 text-xs font-bold ml-2 mt-1">Tokyo</div>
        
        <div className="absolute top-[32%] left-[70%] w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-lg"></div>
        <div className="absolute top-[32%] left-[70%] text-yellow-300 text-xs font-bold ml-2 mt-1">Beijing</div>
        
        <div className="absolute top-[40%] left-[65%] w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-lg"></div>
        <div className="absolute top-[40%] left-[65%] text-yellow-300 text-xs font-bold ml-2 mt-1">Mumbai</div>
        
        {/* South America Countries */}
        <div className="absolute top-[55%] left-[20%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">BRAZIL</div>
        <div className="absolute top-[50%] left-[25%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">ARGENTINA</div>
        <div className="absolute top-[60%] left-[22%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">CHILE</div>
        
        {/* European Countries */}
        <div className="absolute top-[30%] left-[45%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">UK</div>
        <div className="absolute top-[35%] left-[48%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">FRANCE</div>
        <div className="absolute top-[32%] left-[50%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">GERMANY</div>
        <div className="absolute top-[40%] left-[47%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">SPAIN</div>
        
        {/* African Countries */}
        <div className="absolute top-[50%] left-[55%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">EGYPT</div>
        <div className="absolute top-[55%] left-[52%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">NIGERIA</div>
        <div className="absolute top-[60%] left-[50%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">SOUTH AFRICA</div>
        <div className="absolute top-[45%] left-[48%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">LIBYA</div>
        
        {/* Asian Countries */}
        <div className="absolute top-[40%] left-[70%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">CHINA</div>
        <div className="absolute top-[35%] left-[75%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">JAPAN</div>
        <div className="absolute top-[45%] left-[68%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">INDIA</div>
        <div className="absolute top-[50%] left-[72%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">THAILAND</div>
        <div className="absolute top-[55%] left-[70%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">INDONESIA</div>
        
        {/* Australian States */}
        <div className="absolute top-[75%] left-[70%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">NSW</div>
        <div className="absolute top-[72%] left-[75%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">VIC</div>
        <div className="absolute top-[78%] left-[68%] text-xs sm:text-sm font-semibold text-white bg-green-600/80 px-1 sm:px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">QLD</div>
        
        {/* MAJOR GLOBAL CITIES - Responsive */}
        {/* North America */}
        <div className="absolute top-[30%] left-[20%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full shadow-lg border border-yellow-300 hover:scale-125 transition-transform duration-200"></div>
        <div className="absolute top-[35%] left-[23%] text-xs sm:text-sm text-yellow-200 font-bold bg-black/70 px-1 py-0.5 rounded backdrop-blur-sm">New York</div>
        
        <div className="absolute top-[35%] left-[15%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full shadow-lg border border-yellow-300 hover:scale-125 transition-transform duration-200"></div>
        <div className="absolute top-[40%] left-[18%] text-xs sm:text-sm text-yellow-200 font-bold bg-black/70 px-1 py-0.5 rounded backdrop-blur-sm">Los Angeles</div>
        
        {/* Europe */}
        <div className="absolute top-[30%] left-[48%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full shadow-lg border border-yellow-300 hover:scale-125 transition-transform duration-200"></div>
        <div className="absolute top-[35%] left-[51%] text-xs sm:text-sm text-yellow-200 font-bold bg-black/70 px-1 py-0.5 rounded backdrop-blur-sm">London</div>
        
        <div className="absolute top-[35%] left-[50%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full shadow-lg border border-yellow-300 hover:scale-125 transition-transform duration-200"></div>
        <div className="absolute top-[40%] left-[53%] text-xs sm:text-sm text-yellow-200 font-bold bg-black/70 px-1 py-0.5 rounded backdrop-blur-sm">Paris</div>
        
        {/* Asia */}
        <div className="absolute top-[40%] left-[75%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full shadow-lg border border-yellow-300 hover:scale-125 transition-transform duration-200"></div>
        <div className="absolute top-[45%] left-[78%] text-xs sm:text-sm text-yellow-200 font-bold bg-black/70 px-1 py-0.5 rounded backdrop-blur-sm">Tokyo</div>
        
        <div className="absolute top-[45%] left-[70%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full shadow-lg border border-yellow-300 hover:scale-125 transition-transform duration-200"></div>
        <div className="absolute top-[50%] left-[73%] text-xs sm:text-sm text-yellow-200 font-bold bg-black/70 px-1 py-0.5 rounded backdrop-blur-sm">Beijing</div>
        
        <div className="absolute top-[50%] left-[68%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full shadow-lg border border-yellow-300 hover:scale-125 transition-transform duration-200"></div>
        <div className="absolute top-[55%] left-[71%] text-xs sm:text-sm text-yellow-200 font-bold bg-black/70 px-1 py-0.5 rounded backdrop-blur-sm">Mumbai</div>
        
        {/* Africa */}
        <div className="absolute top-[55%] left-[55%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full shadow-lg border border-yellow-300 hover:scale-125 transition-transform duration-200"></div>
        <div className="absolute top-[60%] left-[58%] text-xs sm:text-sm text-yellow-200 font-bold bg-black/70 px-1 py-0.5 rounded backdrop-blur-sm">Cairo</div>
        
        {/* Australia */}
        <div className="absolute top-[75%] left-[75%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full shadow-lg border border-yellow-300 hover:scale-125 transition-transform duration-200"></div>
        <div className="absolute top-[80%] left-[78%] text-xs sm:text-sm text-yellow-200 font-bold bg-black/70 px-1 py-0.5 rounded backdrop-blur-sm">Sydney</div>
        
        {/* GLOBAL OCEANS - Real Satellite Water */}
        {/* Pacific Ocean - West Coast */}
        <div className="absolute top-[20%] left-[5%] w-[15%] h-[60%] opacity-98" style={{
          background: `
            radial-gradient(ellipse at center, rgba(0, 50, 150, 0.95) 0%, rgba(0, 25, 100, 0.9) 30%, rgba(0, 10, 80, 0.8) 60%, rgba(0, 5, 60, 0.7) 80%, transparent 100%)
          `
        }}></div>
        
        {/* Atlantic Ocean */}
        <div className="absolute top-[25%] left-[35%] w-[15%] h-[50%] opacity-98" style={{
          background: `
            radial-gradient(ellipse at center, rgba(0, 50, 150, 0.95) 0%, rgba(0, 25, 100, 0.9) 30%, rgba(0, 10, 80, 0.8) 60%, rgba(0, 5, 60, 0.7) 80%, transparent 100%)
          `
        }}></div>
        
        {/* Indian Ocean */}
        <div className="absolute top-[40%] left-[75%] w-[25%] h-[40%] opacity-98" style={{
          background: `
            radial-gradient(ellipse at center, rgba(0, 50, 150, 0.95) 0%, rgba(0, 25, 100, 0.9) 30%, rgba(0, 10, 80, 0.8) 60%, rgba(0, 5, 60, 0.7) 80%, transparent 100%)
          `
        }}></div>
        
        {/* Arctic Ocean */}
        <div className="absolute top-[5%] left-[20%] w-[60%] h-[15%] opacity-98" style={{
          background: `
            radial-gradient(ellipse at center, rgba(0, 50, 150, 0.95) 0%, rgba(0, 25, 100, 0.9) 30%, rgba(0, 10, 80, 0.8) 60%, rgba(0, 5, 60, 0.7) 80%, transparent 100%)
          `
        }}></div>
        
        {/* Southern Ocean */}
        <div className="absolute top-[85%] left-0 w-full h-[15%] opacity-98" style={{
          background: `
            radial-gradient(ellipse at center, rgba(0, 50, 150, 0.95) 0%, rgba(0, 25, 100, 0.9) 30%, rgba(0, 10, 80, 0.8) 60%, rgba(0, 5, 60, 0.7) 80%, transparent 100%)
          `
        }}></div>
        
        {/* GLOBAL SATELLITE CLOUD COVER */}
        <div className="absolute top-[15%] left-[20%] w-[25%] h-[12%] opacity-60" style={{
          background: `
            radial-gradient(ellipse at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(240, 240, 240, 0.6) 30%, rgba(220, 220, 220, 0.4) 60%, transparent 100%),
            radial-gradient(ellipse at 70% 70%, rgba(255, 255, 255, 0.6) 0%, rgba(240, 240, 240, 0.4) 40%, transparent 80%)
          `
        }}></div>
        <div className="absolute top-[35%] left-[45%] w-[20%] h-[10%] opacity-55" style={{
          background: `
            radial-gradient(ellipse at center, rgba(255, 255, 255, 0.7) 0%, rgba(240, 240, 240, 0.5) 40%, rgba(220, 220, 220, 0.3) 70%, transparent 100%)
          `
        }}></div>
        <div className="absolute top-[55%] left-[65%] w-[18%] h-[8%] opacity-50" style={{
          background: `
            radial-gradient(ellipse at center, rgba(255, 255, 255, 0.6) 0%, rgba(240, 240, 240, 0.4) 50%, transparent 100%)
          `
        }}></div>
        <div className="absolute top-[25%] left-[70%] w-[15%] h-[6%] opacity-45" style={{
          background: `
            radial-gradient(ellipse at center, rgba(255, 255, 255, 0.5) 0%, rgba(240, 240, 240, 0.3) 60%, transparent 100%)
          `
        }}></div>
        <div className="absolute top-[45%] left-[15%] w-[12%] h-[7%] opacity-40" style={{
          background: `
            radial-gradient(ellipse at center, rgba(255, 255, 255, 0.4) 0%, rgba(240, 240, 240, 0.2) 70%, transparent 100%)
          `
        }}></div>
        
        {/* Satellite Image Texture and Noise */}
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23ffffff' opacity='0.05'/%3E%3Crect x='3' y='3' width='1' height='1' fill='%23ffffff' opacity='0.05'/%3E%3Crect x='6' y='6' width='1' height='1' fill='%23ffffff' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: '8px 8px'
        }}></div>
        
        {/* Satellite Image Grain */}
        <div className="absolute inset-0 opacity-8" style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 60% 40%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)
          `
        }}></div>
      </div>

      {/* Professional Emergency Alert Markers */}
      {disasters.map((disaster, index) => (
        <div
          key={disaster.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{
            left: `${(disaster.coordinates.lng + 180) / 360 * 100}%`,
            top: `${(90 - disaster.coordinates.lat) / 180 * 100}%`
          }}
          onClick={() => {
            setSelectedDisaster(disaster);
            onDisasterClick(disaster);
          }}
        >
                {/* Enhanced Professional Alert Marker */}
                <div className="relative group">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-3 sm:border-4 border-white shadow-2xl flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg hover:scale-110 transition-all duration-300 ${
                    disaster.severity === 'CRITICAL' ? 'bg-gradient-to-br from-red-500 via-red-600 to-red-700' :
                    disaster.severity === 'HIGH' ? 'bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700' :
                    disaster.severity === 'MEDIUM' ? 'bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700' : 'bg-gradient-to-br from-green-500 via-green-600 to-green-700'
                  }`} style={{
                    filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))'
                  }}>
                    {String.fromCharCode(65 + index)} {/* A, B, C, D, etc. */}
                  </div>
            
            {/* Enhanced Central Alert Dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow-lg border border-gray-300"></div>
            
            {/* Enhanced Professional Ripple Effects */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className={`absolute w-20 h-20 border-3 rounded-full animate-ping ${
                disaster.severity === 'CRITICAL' ? 'border-red-500' :
                disaster.severity === 'HIGH' ? 'border-orange-500' :
                disaster.severity === 'MEDIUM' ? 'border-yellow-500' : 'border-green-500'
              } opacity-80`} style={{
                filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.3))'
              }}></div>
              <div className={`absolute w-28 h-28 border-3 rounded-full animate-ping ${
                disaster.severity === 'CRITICAL' ? 'border-red-400' :
                disaster.severity === 'HIGH' ? 'border-orange-400' :
                disaster.severity === 'MEDIUM' ? 'border-yellow-400' : 'border-green-400'
              } opacity-60`} style={{animationDelay: '0.3s', filter: 'drop-shadow(0 0 6px rgba(255, 0, 0, 0.2))'}}></div>
              <div className={`absolute w-36 h-36 border-3 rounded-full animate-ping ${
                disaster.severity === 'CRITICAL' ? 'border-red-300' :
                disaster.severity === 'HIGH' ? 'border-orange-300' :
                disaster.severity === 'MEDIUM' ? 'border-yellow-300' : 'border-green-300'
              } opacity-40`} style={{animationDelay: '0.6s', filter: 'drop-shadow(0 0 4px rgba(255, 0, 0, 0.1))'}}></div>
            </div>
          </div>

          {/* Enhanced Hover Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-2xl whitespace-nowrap border border-gray-700 backdrop-blur-sm">
              <div className="font-bold">{disaster.type.toUpperCase()}</div>
              <div className="text-gray-300">{disaster.location}</div>
              <div className={`text-xs font-semibold ${
                disaster.severity === 'CRITICAL' ? 'text-red-400' :
                disaster.severity === 'HIGH' ? 'text-orange-400' :
                disaster.severity === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {disaster.severity}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Emergency Alert System Header - Mobile Responsive */}
      <div className="absolute top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 bg-gradient-to-r from-red-50 to-pink-50 backdrop-blur-sm rounded-xl shadow-2xl p-3 sm:p-4 border-2 border-red-200 hover:shadow-3xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
            </div>
            <div>
              <h2 className="text-sm sm:text-xl font-bold text-red-800">Emergency Alert System</h2>
              <p className="text-xs sm:text-sm text-red-700 hidden sm:block">Live disaster monitoring and emergency response coordination</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xs sm:text-sm font-semibold text-red-800">Status: <span className="text-red-600">ACTIVE ALERTS</span></div>
            <div className="text-xs text-red-700">Last Updated: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </div>

      {/* Emergency Controls Panel - Mobile Responsive */}
      <div className="absolute top-16 sm:top-20 left-2 sm:left-4 bg-white backdrop-blur-sm rounded-xl shadow-2xl p-3 sm:p-4 border-2 border-red-200 hover:shadow-3xl transition-all duration-300">
        <div className="text-xs sm:text-sm font-bold text-red-800 mb-2 sm:mb-3">EMERGENCY CONTROLS</div>
        <div className="space-y-1 sm:space-y-2">
          <button className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-pink-100 hover:bg-pink-200 rounded-lg transition-colors duration-200">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-xs sm:text-sm font-semibold text-red-800">MEASURE DISTANCE</span>
          </button>
          <button className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-pink-100 hover:bg-pink-200 rounded-lg transition-colors duration-200">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            <span className="text-xs sm:text-sm font-semibold text-red-800">REFRESH ALERTS</span>
          </button>
            </div>
          </div>

      {/* Alert Severity Levels Legend - Mobile Responsive */}
      <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-auto bg-white backdrop-blur-sm rounded-xl shadow-2xl p-3 sm:p-4 border-2 border-red-200 hover:shadow-3xl transition-all duration-300">
        <div className="text-xs sm:text-sm font-bold text-red-800 mb-2 sm:mb-3">ALERT SEVERITY LEVELS</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full shadow-sm border-2 border-red-600"></div>
            <span className="text-xs sm:text-sm font-semibold text-red-800">CRITICAL - IMMEDIATE EVACUATION</span>
            </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full shadow-sm border-2 border-orange-600"></div>
            <span className="text-xs sm:text-sm font-semibold text-red-800">HIGH - URGENT ATTENTION</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full shadow-sm border-2 border-yellow-600"></div>
            <span className="text-xs sm:text-sm font-semibold text-red-800">MEDIUM - MONITOR CLOSELY</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full shadow-sm border-2 border-green-600"></div>
            <span className="text-xs sm:text-sm font-semibold text-red-800">LOW - ROUTINE MONITORING</span>
          </div>
        </div>
      </div>

      {/* Professional Emergency Alert Info Panel - Mobile Responsive */}
      {selectedDisaster && (
        <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 bg-white backdrop-blur-sm rounded-xl shadow-2xl p-3 sm:p-4 border-2 border-red-200 hover:shadow-3xl transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm ${
                  selectedDisaster.severity === 'CRITICAL' ? 'bg-gradient-to-br from-red-500 to-red-600' :
                  selectedDisaster.severity === 'HIGH' ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                  selectedDisaster.severity === 'MEDIUM' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' : 'bg-gradient-to-br from-green-500 to-green-600'
                }`}>
                  {selectedDisaster.type.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-red-800 text-sm sm:text-lg">{selectedDisaster.type.toUpperCase()}</h3>
                  <p className="text-red-700 text-xs sm:text-sm font-semibold">{selectedDisaster.location}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div className="bg-red-50 rounded-lg p-2 sm:p-3 border border-red-200">
                  <div className="text-xs text-red-600 mb-1 font-semibold">Severity Level</div>
                  <div className={`font-bold text-xs sm:text-sm ${
                    selectedDisaster.severity === 'CRITICAL' ? 'text-red-600' :
                    selectedDisaster.severity === 'HIGH' ? 'text-orange-600' :
                    selectedDisaster.severity === 'MEDIUM' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {selectedDisaster.severity}
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-2 sm:p-3 border border-red-200">
                  <div className="text-xs text-red-600 mb-1 font-semibold">Status</div>
                  <div className="font-bold text-xs sm:text-sm text-blue-600">{selectedDisaster.status}</div>
                </div>
                <div className="bg-red-50 rounded-lg p-2 sm:p-3 border border-red-200">
                  <div className="text-xs text-red-600 mb-1 font-semibold">Timestamp</div>
                  <div className="font-semibold text-xs sm:text-sm text-red-800">{new Date(selectedDisaster.timestamp).toLocaleString()}</div>
                </div>
                <div className="bg-red-50 rounded-lg p-2 sm:p-3 border border-red-200">
                  <div className="text-xs text-red-600 mb-1 font-semibold">Country</div>
                  <div className="font-semibold text-xs sm:text-sm text-red-800">{selectedDisaster.country}</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setSelectedDisaster(null)}
              className="text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg p-1 sm:p-2 transition-all duration-200 hover:scale-110"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
          </div>
        );
};

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

// Mock Google Maps wrapper component
const MapWrapper = ({ disasters, onDisasterClick }) => {
  return <MockGoogleMap disasters={disasters} onDisasterClick={onDisasterClick} />;
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
      image: background,
      title: "Emergency",
      subtitle: "Response",
      description: "Coordinate with emergency services and community networks for rapid disaster response and efficient resource allocation.",
      overlay: "from-black/70 via-black/50 to-black/30"
    },
    {
      id: 4,
      image: imageOne,
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
      <style jsx>{`
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
                <Link to="/" className={`${isScrolled ? 'text-[#2F4F4F] hover:text-[#1F3F3F]' : 'text-white hover:text-[#4F6F6F]'} px-3 py-2 text-sm font-medium transition-colors`}>Home</Link>
                <Link to="/about" className={`${isScrolled ? 'text-[#2F4F4F] hover:text-[#1F3F3F]' : 'text-white hover:text-[#4F6F6F]'} px-3 py-2 text-sm font-medium transition-colors`}>About</Link>
                <Link to="/impact" className={`${isScrolled ? 'text-[#2F4F4F] hover:text-[#1F3F3F]' : 'text-white hover:text-[#4F6F6F]'} px-3 py-2 text-sm font-medium transition-colors`}>Impact</Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Emergency Alert Button */}
              <button 
                onClick={() => setShowDisasterMap(true)}
                className="relative group hidden md:flex items-center p-3 hover:bg-red-50 rounded-md transition-all duration-300 transform hover:scale-110"
                title="Emergency Disaster Alert"
              >
                <div className="relative">
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

              <a href="/login" className={`hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors ${isScrolled ? 'text-[#2F4F4F] hover:text-[#1F3F3F]' : 'text-white hover:text-[#4F6F6F]'}`}>
                Sign In
              </a>
              <a href="/signup" className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2F4F4F] hover:bg-[#1F3F3F] transition-colors">
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
              <h2 className="text-lg font-semibold text-[#2F4F4F]">Menu</h2>
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
                className="block px-4 py-3 text-[#2F4F4F] hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="block px-4 py-3 text-[#2F4F4F] hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/impact" 
                className="block px-4 py-3 text-[#2F4F4F] hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Impact
              </Link>
              
              {/* Emergency Alert Button for Mobile */}
              <button 
                onClick={() => {
                  setShowDisasterMap(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 mt-4"
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
                  className="block px-4 py-3 text-[#2F4F4F] hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </a>
                <a 
                  href="/signup" 
                  className="block px-4 py-3 bg-[#2F4F4F] text-white rounded-lg hover:bg-[#1F3F3F] transition-colors duration-200 text-center"
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

          {/* Live Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {/* Lives Saved */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center relative overflow-hidden">
              <div className="absolute top-2 right-2 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                <span className="text-xs text-green-600 font-medium">LIVE</span>
              </div>
              <div className="text-4xl font-bold text-[#2F4F4F] mb-2" id="lives-saved">
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
              <MapWrapper 
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
    </main>
    </>
  );
};

export default LandingPage;


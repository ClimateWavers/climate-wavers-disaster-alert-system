import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TreePayment from './TreePayment';
import TreeCertificate from './TreeCertificate';
import { FaTree, FaLeaf, FaSeedling, FaGlobe, FaHeart } from 'react-icons/fa';

const PlantTree = () => {
  const [selectedTree, setSelectedTree] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [userTrees, setUserTrees] = useState([]);
  const [totalTreesPlanted, setTotalTreesPlanted] = useState(0);
  const [userStats, setUserStats] = useState({
    treesPlanted: 0,
    co2Offset: 0,
    impactScore: 0
  });

  const treeTypes = [
    {
      id: 1,
      name: "Mangrove Tree",
      description: "Perfect for coastal areas, helps prevent erosion and absorbs CO2",
      price: 500,
      co2Absorption: 22, // kg per year
      image: "/tree-mangrove.png",
      benefits: ["Coastal protection", "High CO2 absorption", "Biodiversity support"],
      plantingLocation: "Coastal regions"
    },
    {
      id: 2,
      name: "Oak Tree",
      description: "Long-lived tree that provides excellent carbon storage",
      price: 800,
      co2Absorption: 48, // kg per year
      image: "/tree-oak.png",
      benefits: ["Long-term carbon storage", "Wildlife habitat", "Air purification"],
      plantingLocation: "Forest areas"
    },
    {
      id: 3,
      name: "Fruit Tree",
      description: "Provides food security while helping the environment",
      price: 300,
      co2Absorption: 15, // kg per year
      image: "/tree-fruit.png",
      benefits: ["Food production", "Community benefit", "Sustainable agriculture"],
      plantingLocation: "Community gardens"
    },
    {
      id: 4,
      name: "Pine Tree",
      description: "Fast-growing conifer ideal for reforestation projects",
      price: 400,
      co2Absorption: 30, // kg per year
      image: "/tree-pine.png",
      benefits: ["Fast growth", "Soil improvement", "Wind protection"],
      plantingLocation: "Mountain regions"
    }
  ];

  // Load user's tree data from localStorage
  useEffect(() => {
    const savedTrees = localStorage.getItem('userTrees');
    if (savedTrees) {
      const trees = JSON.parse(savedTrees);
      setUserTrees(trees);
      setTotalTreesPlanted(trees.length);
      
      // Calculate user stats
      const totalCo2 = trees.reduce((sum, tree) => sum + tree.co2Absorption, 0);
      const impactScore = trees.length * 10; // Simple scoring system
      
      setUserStats({
        treesPlanted: trees.length,
        co2Offset: totalCo2,
        impactScore: impactScore
      });
    }
  }, []);

  const handleTreePurchase = (treeData) => {
    setSelectedTree(treeData);
  };

  const handlePaymentSuccess = (treeData, paymentReference) => {
    const newTree = {
      ...treeData,
      id: Date.now(),
      purchaseDate: new Date().toISOString(),
      paymentReference,
      status: 'planted',
      location: treeData.plantingLocation
    };

    const updatedTrees = [...userTrees, newTree];
    setUserTrees(updatedTrees);
    setTotalTreesPlanted(updatedTrees.length);
    
    // Update localStorage
    localStorage.setItem('userTrees', JSON.stringify(updatedTrees));
    
    // Update stats
    const totalCo2 = updatedTrees.reduce((sum, tree) => sum + tree.co2Absorption, 0);
    const impactScore = updatedTrees.length * 10;
    
    setUserStats({
      treesPlanted: updatedTrees.length,
      co2Offset: totalCo2,
      impactScore: impactScore
    });

    setShowCertificate(true);
    setSelectedTree(null);
    toast.success(`🌱 Tree planted successfully! You've contributed to a greener planet.`);
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FaTree className="text-6xl text-green-600 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Plant a Tree
              </h1>
              <p className="text-xl text-gray-600">
                Make a lasting impact on our planet, one tree at a time
              </p>
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaTree className="text-3xl text-green-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">{userStats.treesPlanted}</h3>
            <p className="text-gray-600">Trees Planted</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaLeaf className="text-3xl text-blue-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">{userStats.co2Offset}kg</h3>
            <p className="text-gray-600">CO₂ Offset</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaHeart className="text-3xl text-red-600 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">{userStats.impactScore}</h3>
            <p className="text-gray-600">Impact Score</p>
          </div>
        </div>

        {/* Global Impact */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            🌍 Global Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Trees Planted Worldwide</h3>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  className="bg-green-600 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${getProgressPercentage(125000, 1000000)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">125,000 / 1,000,000 trees</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">CO₂ Offset This Month</h3>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${getProgressPercentage(2500, 5000)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">2,500kg / 5,000kg CO₂</p>
            </div>
          </div>
        </div>

        {showCertificate ? (
          <TreeCertificate 
            treeData={userTrees[userTrees.length - 1]}
            onClose={() => setShowCertificate(false)}
          />
        ) : selectedTree ? (
          <TreePayment 
            treeData={selectedTree}
            onSuccess={handlePaymentSuccess}
            onBack={() => setSelectedTree(null)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {treeTypes.map((tree) => (
              <div
                key={tree.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <FaTree className="text-6xl text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tree.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {tree.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaLeaf className="mr-2 text-green-600" />
                      <span>{tree.co2Absorption}kg CO₂/year</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaGlobe className="mr-2 text-blue-600" />
                      <span>{tree.plantingLocation}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Benefits:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {tree.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <FaSeedling className="mr-1 text-green-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      ₦{tree.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">per tree</span>
                  </div>
                  
                  <button
                    onClick={() => handleTreePurchase(tree)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-semibold"
                  >
                    Plant This Tree
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* My Trees Section */}
        {userTrees.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              🌱 My Trees
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userTrees.map((tree) => (
                <div key={tree.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{tree.name}</h3>
                    <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      {tree.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{tree.location}</p>
                  <p className="text-xs text-gray-500">
                    Planted: {new Date(tree.purchaseDate).toLocaleDateString()}
                  </p>
                  <div className="mt-2 flex items-center text-xs text-gray-600">
                    <FaLeaf className="mr-1 text-green-600" />
                    {tree.co2Absorption}kg CO₂/year
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default PlantTree;

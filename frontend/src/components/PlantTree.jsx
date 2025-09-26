import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TreePayment from './TreePayment';
import TreeCertificate from './TreeCertificate';
import { FaTree, FaLeaf, FaSeedling, FaGlobe, FaHeart, FaMapMarkerAlt, FaUsers, FaFilter } from 'react-icons/fa';
import { endpoints } from '../utils/endpoints';
import { getAuthToken } from '../utils/factory';

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
  
  // African Projects State
  const [africanProjects, setAfricanProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [filters, setFilters] = useState({
    country: '',
    project_type: '',
    search: ''
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
    
    // Fetch African projects
    fetchAfricanProjects();
  }, []);

  const fetchAfricanProjects = async () => {
    try {
      setLoadingProjects(true);
      const token = getAuthToken();
      
      const headers = {
        'Content-Type': 'application/json'
      };
      
      // Add authentication if available, but don't require it
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(endpoints.tree_projects_african, {
        headers
      });
      
      if (response.ok) {
        const data = await response.json();
        setAfricanProjects(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch African projects');
        setAfricanProjects([]);
      }
    } catch (error) {
      console.error('Error fetching African projects:', error);
      setAfricanProjects([]);
    } finally {
      setLoadingProjects(false);
    }
  };

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
          <div>
            {/* African Projects Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    🌍 African Tree Projects
                  </h2>
                  <p className="text-gray-600">
                    Support verified tree planting projects across Africa
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FaFilter className="text-gray-500" />
                    <select
                      value={filters.country}
                      onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">All Countries</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Ghana">Ghana</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Tanzania">Tanzania</option>
                      <option value="Uganda">Uganda</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={filters.project_type}
                      onChange={(e) => setFilters(prev => ({ ...prev, project_type: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">All Types</option>
                      <option value="reforestation">Reforestation</option>
                      <option value="urban_greening">Urban Greening</option>
                      <option value="agroforestry">Agroforestry</option>
                      <option value="mangrove_restoration">Mangrove Restoration</option>
                      <option value="community_garden">Community Garden</option>
                    </select>
                  </div>
                </div>
              </div>

              {loadingProjects ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.isArray(africanProjects) && africanProjects
                    .filter(project => {
                      if (filters.country && !project.country.toLowerCase().includes(filters.country.toLowerCase())) return false;
                      if (filters.project_type && project.project_type !== filters.project_type) return false;
                      if (filters.search && !project.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
                      return true;
                    })
                    .map((project) => (
                    <div
                      key={project.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      {project.cover_image_url && (
                        <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${project.cover_image_url})` }}>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {project.name}
                          </h3>
                          {project.is_verified && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <FaMapMarkerAlt className="mr-2 text-green-600" />
                          <span>{project.city}, {project.country}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <FaUsers className="mr-2 text-blue-600" />
                          <span>{project.organization_name}</span>
                        </div>
                        
                        <p className="text-gray-600 mb-4 text-sm">
                          {project.short_description || project.description.substring(0, 100) + '...'}
                        </p>
                        
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress: {project.trees_planted} / {project.target_trees} trees</span>
                            <span>{project.progress_percentage.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${project.progress_percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                         <div>
                           <span className="text-2xl font-bold text-green-600">
                             ${project.tree_price.toLocaleString()}
                           </span>
                           <span className="text-sm text-gray-500 ml-1">per tree</span>
                         </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              {project.co2_absorption_per_tree}kg CO₂/year
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedProject(project);
                              setShowProjectDetails(true);
                            }}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleTreePurchase({
                              ...project,
                              name: `${project.name} Tree`,
                              description: project.description,
                              price: project.tree_price,
                              co2Absorption: project.co2_absorption_per_tree,
                              benefits: ['Environmental impact', 'Community benefit', 'Verified project'],
                              plantingLocation: `${project.city}, ${project.country}`
                            })}
                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-semibold"
                          >
                            Plant Tree
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Traditional Tree Types Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🌱 General Tree Types
              </h2>
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
                         ${tree.price.toLocaleString()}
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
            </div>
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

        {/* Project Details Modal */}
        {showProjectDetails && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedProject.name}
                  </h2>
                  <button
                    onClick={() => {
                      setShowProjectDetails(false);
                      setSelectedProject(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Project Info */}
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Description</h3>
                      <p className="text-gray-700">{selectedProject.description}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Organization</h3>
                      <div className="flex items-center space-x-4">
                        {selectedProject.organization_logo_url && (
                          <img 
                            src={selectedProject.organization_logo_url} 
                            alt="Organization Logo" 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-gray-900">{selectedProject.organization_name}</p>
                          {selectedProject.organization_website && (
                            <a 
                              href={selectedProject.organization_website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Visit Website
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                      <div className="flex items-center text-gray-700">
                        <FaMapMarkerAlt className="mr-2 text-green-600" />
                        <span>{selectedProject.address || `${selectedProject.city}, ${selectedProject.region}, ${selectedProject.country}`}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Environmental Impact</h3>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-center">
                          <FaLeaf className="mr-2 text-green-600" />
                          <span>CO₂ Absorption: {selectedProject.co2_absorption_per_tree}kg per tree per year</span>
                        </div>
                        {selectedProject.biodiversity_impact && (
                          <p><strong>Biodiversity:</strong> {selectedProject.biodiversity_impact}</p>
                        )}
                        {selectedProject.soil_improvement && (
                          <p><strong>Soil Improvement:</strong> {selectedProject.soil_improvement}</p>
                        )}
                        {selectedProject.water_conservation && (
                          <p><strong>Water Conservation:</strong> {selectedProject.water_conservation}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div>
                    <div className="bg-green-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Progress</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Trees Planted</span>
                            <span>{selectedProject.trees_planted} / {selectedProject.target_trees}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-green-600 h-3 rounded-full"
                              style={{ width: `${selectedProject.progress_percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {selectedProject.progress_percentage.toFixed(1)}% Complete
                          </p>
                        </div>

                        {selectedProject.funding_goal && (
                          <div>
                       <div className="flex justify-between text-sm text-gray-600 mb-1">
                         <span>Funding</span>
                         <span>${selectedProject.funds_raised.toLocaleString()} / ${selectedProject.funding_goal.toLocaleString()}</span>
                       </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-blue-600 h-3 rounded-full"
                                style={{ width: `${selectedProject.funding_percentage}%` }}
                              ></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {selectedProject.funding_percentage.toFixed(1)}% Funded
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Timeline</h3>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between">
                          <span>Start Date:</span>
                          <span>{new Date(selectedProject.start_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expected Completion:</span>
                          <span>{new Date(selectedProject.expected_completion).toLocaleDateString()}</span>
                        </div>
                        {selectedProject.actual_completion && (
                          <div className="flex justify-between">
                            <span>Actual Completion:</span>
                            <span>{new Date(selectedProject.actual_completion).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tree Information</h3>
                      <div className="space-y-2 text-sm text-gray-700">
                       <div className="flex justify-between">
                         <span>Price per Tree:</span>
                         <span className="font-semibold">${selectedProject.tree_price.toLocaleString()}</span>
                       </div>
                        <div className="flex justify-between">
                          <span>Tree Species:</span>
                          <span>{selectedProject.tree_species?.join(', ') || 'Various'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Project Type:</span>
                          <span className="capitalize">{selectedProject.project_type.replace('_', ' ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-8 pt-6 border-t">
                  <button
                    onClick={() => {
                      setShowProjectDetails(false);
                      setSelectedProject(null);
                    }}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors font-semibold"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowProjectDetails(false);
                      setSelectedProject(null);
                      handleTreePurchase({
                        ...selectedProject,
                        name: `${selectedProject.name} Tree`,
                        description: selectedProject.description,
                        price: selectedProject.tree_price,
                        co2Absorption: selectedProject.co2_absorption_per_tree,
                        benefits: ['Environmental impact', 'Community benefit', 'Verified project'],
                        plantingLocation: `${selectedProject.city}, ${selectedProject.country}`
                      });
                    }}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-semibold"
                  >
                    Plant Tree in This Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default PlantTree;

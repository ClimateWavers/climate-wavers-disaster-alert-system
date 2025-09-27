import { useState, useEffect } from 'react';
import { FaTree, FaLeaf, FaSeedling, FaGlobe, FaHeart, FaMapMarkerAlt, FaUsers, FaShare, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { endpoints } from '../../utils/endpoints';

const PlantTree = () => {
  const [africanProjects, setAfricanProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  useEffect(() => {
    fetchAfricanProjects();
  }, []);

  const fetchAfricanProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(endpoints.treeProjects);
      if (response.ok) {
        const data = await response.json();
        setAfricanProjects(data.slice(0, 3)); // Show only 3 projects for onboarding
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <FaTree className="text-4xl text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Plant Trees & Make a Difference
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Join Climate Wavers' tree planting initiatives and help combat climate change. 
              Choose from verified projects around the world and track your environmental impact.
            </p>
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaGlobe className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Impact</h3>
            <p className="text-gray-600">
              Plant trees in verified projects worldwide and make a real environmental difference.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeart className="text-2xl text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Support</h3>
            <p className="text-gray-600">
              Support local communities and organizations working on reforestation projects.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-2xl text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Projects</h3>
            <p className="text-gray-600">
              All projects are verified and tracked to ensure your trees are actually planted.
            </p>
          </div>
        </div>

        {/* Sample Projects */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Featured Tree Planting Projects
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading projects...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {africanProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {project.image_url && (
                    <img 
                      src={project.image_url} 
                      alt={project.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                      <span className="text-sm">{project.city}, {project.country}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Trees Planted</span>
                        <span className="font-semibold text-green-600">{project.trees_planted || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">CO₂ Absorption</span>
                        <span className="font-semibold text-green-600">{project.co2_absorption_per_tree}kg/year</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setShowProjectDetails(true);
                      }}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      View Project Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choose Project</h3>
              <p className="text-sm text-gray-600">Select a tree planting project that resonates with you</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Plant Trees</h3>
              <p className="text-sm text-gray-600">Purchase and plant trees in your chosen project</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Track Impact</h3>
              <p className="text-sm text-gray-600">Monitor your environmental impact and tree growth</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Share Impact</h3>
              <p className="text-sm text-gray-600">Share your environmental impact with others</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Planting?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of Climate Wavers who are making a real difference in the fight against climate change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
              <FaTree className="mr-2" />
              Start Planting Trees
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center">
              <FaShare className="mr-2" />
              Share with Friends
            </button>
          </div>
        </div>

        {/* Project Details Modal */}
        {showProjectDetails && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h2>
                  <button
                    onClick={() => setShowProjectDetails(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ✕
                  </button>
                </div>
                
                {selectedProject.image_url && (
                  <img 
                    src={selectedProject.image_url} 
                    alt={selectedProject.name}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                )}
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="w-5 h-5 mr-2" />
                    <span>{selectedProject.city}, {selectedProject.country}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <FaUsers className="w-5 h-5 mr-2" />
                    <span>{selectedProject.organization_name}</span>
                  </div>
                  
                  <p className="text-gray-700">{selectedProject.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1">Trees Planted</h4>
                      <p className="text-2xl font-bold text-green-600">{selectedProject.trees_planted || 0}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-1">CO₂ Absorption</h4>
                      <p className="text-2xl font-bold text-blue-600">{selectedProject.co2_absorption_per_tree}kg/year</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantTree;


import { FaTree, FaLeaf, FaDownload, FaShare, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const TreeCertificate = ({ treeData, onClose }) => {
  const handleDownload = () => {
    // In a real implementation, you would generate a PDF certificate
    toast.success('Certificate download started!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'I planted a tree!',
        text: `I just planted a ${treeData.name} and contributed to a greener planet! 🌱`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`I just planted a ${treeData.name} and contributed to a greener planet! 🌱`);
      toast.success('Certificate link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Certificate Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200"
          >
            <FaTimes className="text-xl" />
          </button>
          
          <FaTree className="text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Tree Planting Certificate</h1>
          <p className="text-green-100">Certificate of Environmental Contribution</p>
        </div>

        {/* Certificate Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Congratulations! 🌱
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              You have successfully contributed to reforestation and climate action by planting a tree.
            </p>
          </div>

          {/* Tree Details */}
          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Tree Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Tree Type</p>
                <p className="font-semibold text-gray-900">{treeData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Planting Location</p>
                <p className="font-semibold text-gray-900">{treeData.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">CO₂ Absorption</p>
                <p className="font-semibold text-gray-900">{treeData.co2Absorption}kg per year</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Planting Date</p>
                <p className="font-semibold text-gray-900">
                  {new Date(treeData.purchaseDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Impact Statement */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Environmental Impact
            </h3>
            <p className="text-gray-700 mb-4">
              Your tree will absorb approximately <strong>{treeData.co2Absorption}kg of CO₂</strong> per year, 
              contributing to climate change mitigation and providing habitat for wildlife.
            </p>
            <div className="flex items-center text-green-700">
              <FaLeaf className="mr-2" />
              <span className="font-semibold">Thank you for making a difference!</span>
            </div>
          </div>

          {/* Certificate ID */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600">Certificate ID</p>
            <p className="font-mono text-lg text-gray-900">
              {treeData.paymentReference || `TREE-${Date.now()}`}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDownload}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-semibold flex items-center justify-center"
            >
              <FaDownload className="mr-2" />
              Download Certificate
            </button>
            <button
              onClick={handleShare}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
            >
              <FaShare className="mr-2" />
              Share Achievement
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              This certificate is digitally verified and stored on the Climate Wavers platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeCertificate;

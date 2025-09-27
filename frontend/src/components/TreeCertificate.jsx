import React, { useRef, useState } from 'react';
import { IoDownload, IoShare, IoClose, IoLeaf, IoCheckmarkCircle } from 'react-icons/io5';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const TreeCertificate = ({ 
  isOpen, 
  onClose, 
  certificateData, 
  onDownload, 
  onShare,
  isDownloaded = false 
}) => {
  const certificateRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (downloading) return;
    
    setDownloading(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      
      const imgWidth = 297; // A4 landscape width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Tree_Certificate_${certificateData?.certificateId || 'tree'}.pdf`);
      
      // Notify parent component that certificate was downloaded
      if (onDownload) {
        onDownload(certificateData?.certificateId);
      }
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Tree Planting Certificate',
        text: `I just planted a tree and received a certificate! 🌳`,
        url: window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`I just planted a tree and received a certificate! 🌳 ${window.location.href}`);
    }
    
    if (onShare) {
      onShare();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <IoLeaf className="w-8 h-8 text-green-600 mr-3" />
            Tree Planting Certificate
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Certificate Content */}
        <div className="p-6">
          <div 
            ref={certificateRef}
            className="bg-gradient-to-br from-green-50 to-blue-50 border-4 border-green-200 rounded-2xl p-8 shadow-lg"
            style={{ minHeight: '600px' }}
          >
            {/* Certificate Header */}
          <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <IoLeaf className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Tree Planting Certificate
              </h1>
              <p className="text-xl text-gray-600">
                Climate Action Achievement
            </p>
          </div>

            {/* Certificate Body */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Left Column - Tree Details */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <IoCheckmarkCircle className="w-6 h-6 text-green-600 mr-2" />
              Tree Details
            </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tree Type:</span>
                      <span className="font-semibold">{certificateData?.treeType || 'Community Tree'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CO₂ Absorption:</span>
                      <span className="font-semibold text-green-600">
                        {certificateData?.co2Absorption || '15.00'}kg per year
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-semibold">{certificateData?.location || 'Cape Town, South Africa'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Planting Date:</span>
                      <span className="font-semibold">{certificateData?.plantingDate || '9/27/2025'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-3">
                    Environmental Impact
                  </h4>
                  <p className="text-blue-800">
                    Your tree will absorb approximately <strong>{certificateData?.co2Absorption || '15.00'}kg of CO₂</strong> per year, 
                    contributing to climate change mitigation and providing habitat for wildlife.
                  </p>
                  <p className="text-blue-800 mt-2">
                    🌿 Thank you for making a difference!
                  </p>
                </div>
              </div>

              {/* Right Column - Certificate Info */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Certificate Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Certificate ID:</span>
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {certificateData?.certificateId || '1758951352343'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Issued To:</span>
                      <span className="font-semibold">{certificateData?.userName || 'Anonymous'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trees Planted:</span>
                      <span className="font-semibold text-green-600">
                        {certificateData?.treesPlanted || 1} tree{(certificateData?.treesPlanted || 1) > 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount Donated:</span>
                      <span className="font-semibold">
                        KSh {(certificateData?.amount || 258).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-semibold mb-3">
                    Founder's Message
                  </h4>
                  <p className="text-green-100 mb-4">
                    "Every tree planted is a step towards a sustainable future. 
                    Thank you for joining our mission to combat climate change."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg font-bold text-white">IK</span>
              </div>
              <div>
                      <p className="font-semibold">Kipkoech Ismael Kiprop</p>
                      <p className="text-green-100 text-sm">Founder, Climate Wavers</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>

            {/* Certificate Footer */}
            <div className="text-center border-t border-gray-200 pt-6">
              <p className="text-gray-600 text-sm">
                This certificate is digitally verified and stored on the Climate Wavers platform.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Issued on {new Date().toLocaleDateString()} • Climate Wavers Climate Action Platform
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {!isDownloaded && (
            <button
              onClick={handleDownload}
                disabled={downloading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {downloading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <IoDownload className="w-5 h-5 mr-2" />
              Download Certificate
                  </>
                )}
            </button>
            )}
            
            {isDownloaded && (
              <div className="flex-1 bg-gray-100 text-gray-600 font-semibold py-3 px-6 rounded-lg flex items-center justify-center">
                <IoCheckmarkCircle className="w-5 h-5 mr-2 text-green-600" />
                Certificate Downloaded
              </div>
            )}
            
            <button
              onClick={handleShare}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <IoShare className="w-5 h-5 mr-2" />
              Share Achievement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeCertificate;
import React, { useState, useEffect } from 'react';
import { IoLeaf, IoDownload, IoShare, IoCheckmarkCircle, IoTime, IoLocation } from 'react-icons/io5';
import TreeCertificate from '../components/TreeCertificate';
import { toast } from 'react-toastify';
import { getUser } from '../utils/factory';
import { client } from '../api';
import { endpoints } from '../utils/endpoints';

const MyCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [downloadedCertificates, setDownloadedCertificates] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const me = getUser();

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!me || !me.id) {
        setError('User not logged in.');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        // Fetch user's tree donations from the database
        const response = await client.run('get', `${endpoints.treeProjectDonations}?donor=${me.id}`, null, true);
        
        if (response.results) {
          const fetchedCertificates = response.results.map(donation => ({
            certificate_id: `CW${donation.payment_reference}${donation.id}`,
            tree_type: donation.project_name || 'Tree Planting',
            co2_absorption: donation.co2_absorption_per_tree || 0,
            location: `${donation.project_city || 'Unknown'}, ${donation.project_country || 'Unknown'}`,
            planting_date: new Date(donation.created_at).toLocaleDateString(),
            user_name: `${donation.donor_first_name || ''} ${donation.donor_last_name || ''}`.trim() || donation.donor_username || 'Anonymous',
            trees_planted: donation.trees_purchased || 0,
            amount: donation.amount || 0,
            is_downloaded: donation.is_downloaded || false
          }));
          setCertificates(fetchedCertificates);
        }
      } catch (err) {
        console.error('Error fetching certificates:', err);
        setError('Failed to load your certificates.');
        toast.error('Failed to load your certificates.');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [me]);

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setShowCertificate(true);
  };

  const handleDownloadCertificate = async (certificateId) => {
    try {
      // Update local state
      setDownloadedCertificates(prev => new Set([...prev, certificateId]));
      
      // Update certificate in the database
      await client.run('post', endpoints.markCertificateDownloaded, {
        certificate_id: certificateId,
        user_id: me.id
      }, true);
      
      // Update local certificates state
      setCertificates(prev => prev.map(cert => 
        cert.certificate_id === certificateId 
          ? { ...cert, is_downloaded: true } 
          : cert
      ));
      
      toast.success('Certificate marked as downloaded!');
    } catch (error) {
      console.error('Error marking certificate as downloaded:', error);
      toast.error('Failed to mark certificate as downloaded');
    }
  };

  const handleShareCertificate = () => {
    toast.success('Certificate shared! 🌳');
  };

  if (certificates.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <IoLeaf className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            No Certificates Yet
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Plant your first tree to receive a beautiful certificate!
          </p>
          <button
            onClick={() => window.location.href = '/app/plant-tree'}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Plant a Tree 🌳
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <IoLeaf className="w-10 h-10 text-green-600 mr-3" />
              My Tree Certificates
            </h1>
            <p className="text-lg text-gray-600">
              Your environmental impact certificates
            </p>
          </div>

          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate, index) => (
              <div
                key={certificate.certificate_id || index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Certificate Preview */}
                <div className="bg-gradient-to-br from-green-100 to-blue-100 p-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-200 rounded-full mb-4">
                      <IoLeaf className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Tree Planting Certificate
                    </h3>
                    <p className="text-sm text-gray-600">
                      Certificate #{certificate.certificate_id}
                    </p>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <IoLocation className="w-4 h-4 mr-2 text-green-600" />
                      <span className="text-sm">{certificate.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <IoTime className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-sm">{certificate.planting_date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <IoLeaf className="w-4 h-4 mr-2 text-green-600" />
                      <span className="text-sm">
                        {certificate.trees_planted} tree{certificate.trees_planted > 1 ? 's' : ''} planted
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleViewCertificate(certificate)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                      <IoCheckmarkCircle className="w-4 h-4 mr-2" />
                      View Certificate
                    </button>
                    
                    {downloadedCertificates.has(certificate.certificate_id) ? (
                      <div className="w-full bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg flex items-center justify-center">
                        <IoCheckmarkCircle className="w-4 h-4 mr-2 text-green-600" />
                        Downloaded
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDownloadCertificate(certificate.certificate_id)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                      >
                        <IoDownload className="w-4 h-4 mr-2" />
                        Download PDF
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Your Environmental Impact
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {certificates.length}
                </div>
                <div className="text-gray-600">Certificates Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {certificates.reduce((sum, cert) => sum + (cert.trees_planted || 1), 0)}
                </div>
                <div className="text-gray-600">Trees Planted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {certificates.reduce((sum, cert) => sum + (cert.co2_absorption || 15), 0)}kg
                </div>
                <div className="text-gray-600">CO₂ Absorbed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <TreeCertificate
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        certificateData={selectedCertificate}
        onDownload={handleDownloadCertificate}
        onShare={handleShareCertificate}
        isDownloaded={selectedCertificate ? downloadedCertificates.has(selectedCertificate.certificate_id) : false}
      />
    </div>
  );
};

export default MyCertificates;

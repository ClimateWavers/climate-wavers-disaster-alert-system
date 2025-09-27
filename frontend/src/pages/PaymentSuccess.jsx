import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  IoCheckmarkCircle, 
  IoLeaf, 
  IoHome, 
  IoArrowBack,
  IoTime,
  IoLocation
} from 'react-icons/io5';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get payment data from URL parameters
    const reference = searchParams.get('reference');
    const status = searchParams.get('status');
    const amount = searchParams.get('amount');
    const trees = searchParams.get('trees');

    if (reference && status === 'success') {
      setPaymentData({
        reference,
        amount: amount ? parseFloat(amount) : 0,
        trees: trees ? parseInt(trees) : 1
      });
      
      // Show success toast
      toast.success(`Payment successful! ${trees} tree(s) planted! 🌳`);
    }
    
    setLoading(false);
  }, [searchParams]);

  const handleGoHome = () => {
    navigate('/app');
  };

  const handleViewProjects = () => {
    navigate('/app/plant-tree');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Processing payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <IoCheckmarkCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Successful! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for contributing to climate action!
            </p>
          </div>

          {/* Payment Details */}
          {paymentData && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <IoLeaf className="w-5 h-5 text-green-600 mr-2" />
                Payment Details
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Reference:</span>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {paymentData.reference}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Trees Planted:</span>
                  <span className="font-semibold text-green-600">
                    {paymentData.trees} tree{paymentData.trees > 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">
                    KSh {paymentData.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Impact Message */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-white p-6 mb-8">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <IoLeaf className="w-6 h-6 mr-2" />
              Your Impact
            </h3>
            <p className="text-green-100 mb-4">
              By planting {paymentData?.trees || 1} tree{paymentData?.trees > 1 ? 's' : ''}, you're helping to:
            </p>
            <ul className="space-y-2 text-green-100">
              <li className="flex items-center">
                <IoCheckmarkCircle className="w-4 h-4 mr-2 text-green-200" />
                Absorb CO₂ from the atmosphere
              </li>
              <li className="flex items-center">
                <IoCheckmarkCircle className="w-4 h-4 mr-2 text-green-200" />
                Restore degraded ecosystems
              </li>
              <li className="flex items-center">
                <IoCheckmarkCircle className="w-4 h-4 mr-2 text-green-200" />
                Support local communities
              </li>
              <li className="flex items-center">
                <IoCheckmarkCircle className="w-4 h-4 mr-2 text-green-200" />
                Combat climate change
              </li>
            </ul>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <IoTime className="w-5 h-5 text-blue-600 mr-2" />
              What's Next?
            </h3>
            <div className="space-y-3 text-gray-600">
              <p>• You'll receive a confirmation email shortly</p>
              <p>• Your trees will be planted within 30 days</p>
              <p>• You'll get updates on your tree's growth</p>
              <p>• Track your environmental impact in your profile</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleGoHome}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <IoHome className="w-5 h-5 mr-2" />
              Go to Dashboard
            </button>
            
            <button
              onClick={handleViewProjects}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <IoLeaf className="w-5 h-5 mr-2" />
              Plant More Trees
            </button>
          </div>

          {/* Back Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-gray-700 flex items-center justify-center mx-auto"
            >
              <IoArrowBack className="w-4 h-4 mr-1" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

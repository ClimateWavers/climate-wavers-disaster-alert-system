import { useState } from 'react';
import { toast } from 'react-toastify';
import { usePaystackPayment } from 'react-paystack';
import { FaTree, FaLeaf, FaGlobe, FaArrowLeft } from 'react-icons/fa';

const TreePayment = ({ treeData, onSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [dedicationMessage, setDedicationMessage] = useState('');

  // Paystack configuration
  const config = {
    reference: (new Date()).getTime().toString(),
    email: email,
    amount: treeData.price * 100, // Convert to kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key_here',
  };

  const initializePayment = usePaystackPayment(config);

  const onPaymentSuccess = (reference) => {
    console.log('Payment successful:', reference);
    toast.success('🌱 Payment successful! Your tree will be planted soon.');
    
    const treeWithPayment = {
      ...treeData,
      paymentReference: reference,
      donorName: donorName || 'Anonymous',
      dedicationMessage: dedicationMessage || 'For a greener future'
    };
    
    onSuccess(treeWithPayment, reference);
  };

  const onPaymentClose = () => {
    console.log('Payment closed');
    toast.info('Payment cancelled');
  };

  const handlePayment = () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!donorName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    setLoading(true);
    initializePayment(onPaymentSuccess, onPaymentClose);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 text-[#2F4F4F] hover:text-[#1F3F3F] font-medium flex items-center"
      >
        <FaArrowLeft className="mr-2" />
        Back to Tree Selection
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Tree Info Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
          <div className="flex items-center mb-4">
            <FaTree className="text-4xl mr-4" />
            <div>
              <h2 className="text-2xl font-bold">{treeData.name}</h2>
              <p className="text-green-100">{treeData.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <FaLeaf className="mr-2" />
              <span>{treeData.co2Absorption}kg CO₂/year</span>
            </div>
            <div className="flex items-center">
              <FaGlobe className="mr-2" />
              <span>{treeData.plantingLocation}</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Complete Your Tree Planting
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dedication Message (Optional)
              </label>
              <textarea
                value={dedicationMessage}
                onChange={(e) => setDedicationMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Dedicate this tree to someone special or add a personal message"
                rows="3"
              />
            </div>

            {/* Tree Benefits Reminder */}
            <div className="bg-green-50 p-4 rounded-md">
              <h4 className="font-semibold text-green-800 mb-2">Your Tree Will:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                {treeData.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <FaLeaf className="mr-2 text-green-600" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Display */}
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">Total Amount:</span>
                <span className="text-2xl font-bold text-green-600">
                  ₦{treeData.price.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Includes tree planting, maintenance, and certificate
              </p>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
            >
              {loading ? 'Processing...' : `🌱 Plant Tree for ₦${treeData.price.toLocaleString()}`}
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Secure payment powered by Paystack • Your tree will be planted within 7 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreePayment;

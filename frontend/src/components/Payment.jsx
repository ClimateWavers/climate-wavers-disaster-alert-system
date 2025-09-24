import { useState } from 'react';
import { toast } from 'react-toastify';
import { usePaystackPayment } from 'react-paystack';

const Payment = ({ campaignId, campaignTitle, targetAmount }) => {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Paystack configuration
  const config = {
    reference: (new Date()).getTime().toString(),
    email: email,
    amount: parseInt(amount) * 100, // Convert to kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key_here',
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference) => {
    console.log('Payment successful:', reference);
    toast.success('Payment successful! Thank you for your donation.');
    setAmount('');
    setEmail('');
  };

  const onClose = () => {
    console.log('Payment closed');
    toast.info('Payment cancelled');
  };

  const handlePayment = () => {
    if (!amount || !email) {
      toast.error('Please fill in all fields');
      return;
    }

    if (parseInt(amount) < 100) {
      toast.error('Minimum donation amount is ₦100');
      return;
    }

    initializePayment(onSuccess, onClose);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Donate to {campaignTitle}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F4F4F]"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (NGN)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F4F4F]"
            placeholder="Enter amount"
            min="100"
            required
          />
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-600">
            <strong>Target Amount:</strong> ₦{targetAmount?.toLocaleString()}
          </p>
        </div>
        
        <button
          onClick={handlePayment}
          className="w-full bg-[#2F4F4F] text-white py-3 px-4 rounded-md hover:bg-[#1F3F3F] focus:outline-none focus:ring-2 focus:ring-[#2F4F4F]"
        >
          Donate Now
        </button>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Secure payment powered by Paystack
        </p>
      </div>
    </div>
  );
};

export default Payment;

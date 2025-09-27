import { useState, useEffect } from 'react';

export const useExchangeRate = (usdAmount) => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Use environment variable or fallback to hardcoded URL
        const apiUrl = import.meta.env.VITE_EXCHANGE_RATE_API_URL || 'test_url';
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.result === 'success') {
          const usdToKesRate = data.conversion_rates.KES;
          setExchangeRate(usdToKesRate);
          
          // Convert USD amount to KES
          if (usdAmount) {
            const converted = usdAmount * usdToKesRate;
            setConvertedAmount(converted);
            console.log(`Converted amount: $${usdAmount} = KSh${converted.toFixed(2)}`);
          }
          
          console.log(`Exchange rate: 1 USD = ${usdToKesRate} KES`);
        } else {
          throw new Error('Failed to fetch exchange rate');
        }
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        setError(error.message);
        
        // Fallback to approximate rate if API fails
        const fallbackRate = 150; // Approximate USD to KES rate
        setExchangeRate(fallbackRate);
        
        if (usdAmount) {
          const converted = usdAmount * fallbackRate;
          setConvertedAmount(converted);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, [usdAmount]);

  return {
    exchangeRate,
    convertedAmount,
    loading,
    error
  };
};

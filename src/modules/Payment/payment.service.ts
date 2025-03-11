/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from '../../app/config';

// Utility function to check if the environment is development
const isDevelopment = () => {
  return process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;
};

// Service to initialize payment
export const initPayment = async (totalAmount: number, tranId: string) => {
  const paymentData = {
    amount: totalAmount,
    transaction_id: tranId,
    success_url: process.env.SUCCESS_URL,  // Your success URL
    failed_url: process.env.FAILED_URL,    // Your failed URL
  };

  console.log('Payment Data:', paymentData);

  // Use mock service in development environment
  if (isDevelopment()) {
    console.log('Using mock payment service in development environment');
    
    // Simulate API response delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a mock payment URL that points to your success URL with query parameters
    const mockPaymentUrl = `${process.env.SUCCESS_URL}?transaction_id=${tranId}&mock=true`;
    console.log('Mock payment URL generated:', mockPaymentUrl);
    
    // Return the mock URL as part of an object
    return { paymentUrl: mockPaymentUrl };
  }

  // Production code - only runs in production
  try {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${config.zerocrypto_api_key}`,  // Add your ZeroCrypto API key
      },
      timeout: 30000  // Timeout after 30 seconds
    };

    // Make the API call to initialize the payment in production environment
    const response = await axios.post(
      config.payment_api as string,  // The API URL for ZeroCrypto payment service
      paymentData,                   // The data to send with the payment request
      axiosConfig                    // Config with authorization headers
    );
    
    // Check if the response from the payment gateway is successful
    if (response.data.status === 'success') {
      console.log("Payment URL: ", response.data.paymentUrl);

      // Return the payment URL received from the payment gateway
      return { paymentUrl: response.data.paymentUrl };
    } else {
      throw new Error('Payment initialization failed: ' + response.data.message);
    }
  } catch (error: any) {
    // Log the error if the API call fails
    console.error('Error during payment initialization:', 
      error.response?.data || error.message || 'Unknown error');
    throw new Error('Payment initialization failed');
  }
};

// Payment service that could be extended with other payment-related logic
export const paymentService = {
  async getAll() {
    return [{ message: 'Service logic here' }];
  },
};

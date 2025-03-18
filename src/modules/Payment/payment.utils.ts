import axios from 'axios';
import crypto from 'crypto';
import config from '../../app/config';
/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateTransactionId = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${timestamp}${randomString}`;
};

// const ZEROCRYPTOPAY_API_URL = 'https://zerocryptopay.com';
// const ZEROCRYPTOPAY_LOGIN = 'nalyssa6655@gmail.com';
// const ZEROCRYPTOPAY_TOKEN = 'nsgXVlOH6gAA16jDl8E8vb99zRk968W9y7w';
// const ZEROCRYPTOPAY_SECRET_KEY = 'ti6G7R1HhGDgsuKc1Hi7SR7eBQau69PfA67';

export const generateSignature = (amount: any, orderId: any, login: any) => {
  // const signString = `${amount}${ZEROCRYPTOPAY_SECRET_KEY}${orderId}${login}`;
  const signString = `${amount}${config.secret_key}${orderId}${login}`;
  return crypto.createHash('sha256').update(signString).digest('hex');
};

export const initZeroCryptoPayPayment = async (order: any) => {
  const { finalAmount, _id } = order;
  const orderId = _id.toString();
  const signature = generateSignature(
    finalAmount,
    orderId,
    config.login,
  );

  const payload = {
    // login: ZEROCRYPTOPAY_LOGIN,
    login: config.login,
    amount: finalAmount,
    // token: ZEROCRYPTOPAY_TOKEN,
    token: config.zerocrypto_token,
    order_id: orderId,
    signature: signature,
  };

  try {
    const response = await axios.post(
      `${config.api_key}/pay/newtrack`,
      payload,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    if (response.data.status) {
      return response.data.url_to_pay;
    } else {
      throw new Error(`ZeroCryptoPay Error: ${response.data.message}`);
    }
  } catch (error) {
    console.error('ZeroCryptoPay API Error:', error);
    throw error;
  }
};

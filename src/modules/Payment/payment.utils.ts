import axios from 'axios';
import crypto from 'crypto';
import config from '../../app/config';
/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateTransactionId = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${timestamp}${randomString}`;
};


export const generateSignature = (amount: any, orderId: any, login: any) => {
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
    login: config.login,
    amount: finalAmount,
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';

export interface IPayment {
  email: string;
  order: Types.ObjectId;
  status?: 'Pending' | 'Paid' | 'Failed';
  transactionId?: string;
  amount: number;
  gatewayResponse?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

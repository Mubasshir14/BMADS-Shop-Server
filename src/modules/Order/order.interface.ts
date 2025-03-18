import { Types, Document } from 'mongoose';

export interface IOrderProduct {
  product: Types.ObjectId;
  quantity: number;
  unitPrice: number;
}

export interface IOrder extends Document {
  products: IOrderProduct[];
  coupon?: Types.ObjectId | null;
  totalAmount: number;
  discount: number;
  finalAmount: number;
  email: string;
  orderId: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: 'Pending' | 'Processing' | 'Completed' | 'Cancelled' | 'Failed';
  paymentMethod?: 'Cash' | 'Card' | 'Online';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  // payment?: IPayment | null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Types } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Types.ObjectId;
  imageUrls: string[];
  isActive: boolean;
  ratingCount?: number;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
  reviews?: Record<string, any> | [];
  calculateOfferPrice(): Promise<number | null>;
}

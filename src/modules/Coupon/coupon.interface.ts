import { Document} from 'mongoose';

export interface ICoupon extends Document {
   code: string;
   // product: Types.ObjectId;
   discountType: 'Flat' | 'Percentage';
   discountValue: number;
   startDate: Date;
   endDate: Date;
   isActive: boolean;
   isDeleted: boolean;
}

import { ICoupon } from './coupon.interface';

export const calculateDiscount = (
   coupon: ICoupon,
   orderAmount: number
): number => {
   let discountAmount = 0;

   if (coupon.discountType === 'Percentage') {
      discountAmount = (coupon.discountValue / 100) * orderAmount;
   } else if (coupon.discountType === 'Flat') {
      discountAmount = coupon.discountValue;
   }

   return discountAmount;
};

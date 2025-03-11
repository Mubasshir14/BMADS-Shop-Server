import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import { ICoupon } from './coupon.interface';
import { Coupon } from './coupon.model';
import { calculateDiscount } from './coupon.utils';

const createCoupon = async (couponData: Partial<ICoupon>) => {
  const coupon = new Coupon({
    ...couponData,
  });
  return await coupon.save();
};

const getAllCoupon = async () => {
  const result = await Coupon.find();
  return result;
};

const getCouponByCode = async (orderAmount: number, couponCode: string) => {
  const currentDate = new Date();
  const coupon = await Coupon.findOne({ code: couponCode });
  if (!coupon) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Coupon not found.');
  }

  if (!coupon.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Coupon is inactive.');
  }

  if (coupon.endDate < currentDate) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Coupon has expired.');
  }

  if (coupon.startDate > currentDate) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Coupon has not started.');
  }

  const discountAmount = calculateDiscount(coupon, orderAmount);
  const discountedPrice = orderAmount - discountAmount;
  return { coupon, discountedPrice, discountAmount };
};

const deleteCoupon = async (couponId: string) => {
  const coupon = await Coupon.findById(couponId);

  if (!coupon) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Coupon not found.');
  }

  const result = await Coupon.findByIdAndDelete(couponId);
  return result;
};

export const CouponService = {
  createCoupon,
  getAllCoupon,
  getCouponByCode,
  deleteCoupon,
};

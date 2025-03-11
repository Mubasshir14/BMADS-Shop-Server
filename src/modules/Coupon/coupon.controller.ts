import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { CouponService } from './coupon.service';

const createCoupon: RequestHandler = catchAsync(async (req, res) => {
  const result = await CouponService.createCoupon(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Coupon created successfully',
    data: result,
  });
});

const getAllCoupon: RequestHandler = catchAsync(async (req, res) => {
  const result = await CouponService.getAllCoupon();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Coupon fetched successfully',
    data: result,
  });
});

const getCouponByCode: RequestHandler = catchAsync(async (req, res) => {
  const { couponCode } = req.params;
  const { orderAmount } = req.body;

  const result = await CouponService.getCouponByCode(orderAmount, couponCode);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Coupon fetched successfully',
    data: result,
  });
});

const deleteCoupon: RequestHandler = catchAsync(async (req, res) => {
  const { couponId } = req.params;
  const result = await CouponService.deleteCoupon(couponId);
  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    success: true,
    message: result,
  });
});

export const couponController = {
  createCoupon,
  getAllCoupon,
  getCouponByCode,
  deleteCoupon,
};

import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { OrderService } from './order.service';

const createOrder: RequestHandler = catchAsync(async (req, res) => {
  const result = await OrderService.createOrder(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Order created succesfully',
    data: result,
  });
});

const getAllOrders: RequestHandler = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrders();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrive succesfully',
    data: result,
  });
});

const changeOrderStatus: RequestHandler = catchAsync(async (req, res) => {
  const { status } = req.body;
  const result = await OrderService.changeOrderStatus(
    req.params.orderId,
    status,
);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order status changed succesfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  changeOrderStatus,
};

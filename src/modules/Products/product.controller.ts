import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../app/utils/sendResponse';
import { ProductService } from './product.service';
import catchAsync from '../../app/utils/catchAsync';
import { IJwtPayload } from '../Auth/auth.interface';

const createProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductService.createProduct(req.body, req.files);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getAllProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProducts();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Products are retrieved successfully',
    data: result,
  });
});

const getSingleProduct: RequestHandler = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductService.getSingleProduct(productId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const updateProduct: RequestHandler = catchAsync(async (req, res) => {
  const {
    user,
    body: payload,
    params: { productId },
  } = req;

  const result = await ProductService.updateProduct(
    productId,
    payload,
    req.files,
    user as IJwtPayload,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});


const deleteProduct: RequestHandler = catchAsync(async (req, res) => {
  const {
    user,
    params: { productId },
  } = req;

  const result = await ProductService.deleteProduct(
    productId,
    user as IJwtPayload,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};

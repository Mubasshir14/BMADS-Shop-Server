import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import { IJwtPayload } from '../Auth/auth.interface';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { CategoryService } from './category.service';

const createCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await CategoryService.createCategory(
    req.body,
    req.file,
    req.user as IJwtPayload,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category created succesfully',
    data: result,
  });
});

const getAllCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await CategoryService.getAllCategory();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'category are retrieved succesfully',

    data: result,
  });
});

const getSingleCategory: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryService.getSingleCategory(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'category are retrieved succesfully',

    data: result,
  });
});

const updateCategory: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryService.updateCategoryIntoDB(
    id,
    req.body,
    req.file,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'category is updated succesfully',
    data: result,
  });
});

const deleteCategory: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryService.deleteCategoryIntoDB(
    id,
    req.user as IJwtPayload,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category is deleted successfully',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  getSingleCategory,
};

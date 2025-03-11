/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import { IJwtPayload } from '../Auth/auth.interface';
import { ICategory } from './category.interface';
import { Category } from './category.model';
import { UserRole } from '../User/user.interface';
import { Product } from '../Products/product.model';

const createCategory = async (
  categoryData: Partial<ICategory>,
  icon: any,
  authUser: IJwtPayload,
) => {
  const category = new Category({
    ...categoryData,
    createdBy: authUser.userId,
    icon: icon?.path,
  });

  const result = await category.save();

  return result;
};

const getAllCategory = async () => {
  const result = await Category.find();

  return result;
};


const getSingleCategory = async ( categoryId: string,) => {
  const result = await Category.findById(categoryId);
  return result;
};

const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<ICategory>,
  file: any,
) => {
  const isCategoryExist = await Category.findById(id);
  if (!isCategoryExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not found!');
  }

  if (file && file.path) {
    payload.icon = file.path;
  }

  const result = await Category.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

const deleteCategoryIntoDB = async (id: string, authUser: IJwtPayload) => {
  const isBrandExist = await Category.findById(id);
  if (!isBrandExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not found!');
  }

  if (authUser.role === UserRole.USER) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You are not able to delete the Category!',
    );
  }

  const product = await Product.findOne({ category: id });
  if (product)
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You can not delete the Category. Because the Category is related to products.',
    );

  const deletedCategory = await Category.findByIdAndDelete(id);
  return deletedCategory;
};

export const CategoryService = {
  createCategory,
  getAllCategory,
  updateCategoryIntoDB,
  deleteCategoryIntoDB,
  getSingleCategory
};

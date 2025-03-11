/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import { IProduct } from './product.interface';
import { Category } from '../Category/category.model';
import { Product } from './product.model';
import User from '../User/user.model';
import { IJwtPayload } from '../Auth/auth.interface';

const createProduct = async (
  productData: Partial<IProduct>,
  productImages: any,
) => {
  const { images } = productImages;
  if (!images || images.length === 0) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Product images are required.');
  }

  productData.imageUrls = images.map((image: any) => image.path);

  const isCategoryExists = await Category.findById(productData.category);
  if (!isCategoryExists) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Category does not exist!');
  }

  if (!isCategoryExists.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Category is not active!');
  }

  const newProduct = new Product({
    ...productData,
  });

  const result = await newProduct.save();
  await result.populate('category');
  return result;
};

const getAllProducts = async () => {
  const result = await Product.find().populate('category');
  return result;
};

const getSingleProduct = async (productId: string) => {
  const product = await Product.findById(productId).populate('category');

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  if (!product.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Product is not active');
  }

  return product;
};

const updateProduct = async (
  productId: string,
  payload: Partial<IProduct>,
  productImages: any,
  authUser: IJwtPayload,
) => {
  const { images } = productImages;

  const user = await User.findById(authUser.userId);

  const product = await Product.findById(productId);

  if (!user?.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active');
  }

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product Not Found');
  }

  if (images && images.length > 0) {
    payload.imageUrls = images.map((image: any) => image.path);
  }

  return await Product.findByIdAndUpdate(productId, payload, { new: true });
};

const deleteProduct = async (productId: string, authUser: IJwtPayload) => {
  const user = await User.findById(authUser.userId);
  const product = await Product.findById(productId);

  if (!user?.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active');
  }

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product Not Found');
  }

  return await Product.findByIdAndDelete(productId);
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};

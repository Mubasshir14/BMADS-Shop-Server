import mongoose, { Types } from 'mongoose';
import { IOrder } from './order.interface';
import { Product } from '../Products/product.model';
import { Coupon } from '../Coupon/coupon.model';
import { Order } from './order.model';

import { Payment } from '../Payment/payment.model';
import { initZeroCryptoPayPayment } from '../Payment/payment.utils';


const createOrder = async (orderData:IOrder) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (orderData.products) {
      for (const productItem of orderData.products) {
        const product = await Product.findById(productItem.product).session(session);

        if (product) {
          if (!product.isActive) {
            throw new Error(`Product ${product.name} is inactive.`);
          }

          if (product.stock < productItem.quantity) {
            throw new Error(`Insufficient stock for product: ${product.name}`);
          }

          product.stock -= productItem.quantity;
          await product.save({ session });
        } else {
          throw new Error(`Product not found: ${productItem.product}`);
        }
      }
    }

    if (orderData.coupon) {
      const coupon = await Coupon.findOne({ code: orderData.coupon }).session(session);
      if (coupon) {
        const currentDate = new Date();

        if (currentDate < coupon.startDate) {
          throw new Error(`Coupon ${coupon.code} has not started yet.`);
        }

        if (currentDate > coupon.endDate) {
          throw new Error(`Coupon ${coupon.code} has expired.`);
        }

        orderData.coupon = coupon._id as Types.ObjectId;
      } else {
        throw new Error('Invalid coupon code.');
      }
    }


    const order = new Order({ ...orderData });
    const createdOrder = await order.save({ session });


    const payment = new Payment({
      order: createdOrder._id,
      method: orderData.paymentMethod,
      transactionId: (createdOrder._id as string).toString(),
      amount: createdOrder.finalAmount,
    });

    await payment.save({ session });

    let result;

    if (createdOrder.paymentMethod === 'Online') {
      const paymentUrl = await initZeroCryptoPayPayment(createdOrder);
      result = { paymentUrl };
    } else {
      result = createdOrder;
    }

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};


const getAllOrders = async () => {
  const result = await Order.find();
  return result;
};

const changeOrderStatus = async (orderId: string, status: string) => {
  const order = await Order.findOneAndUpdate(
    { _id: new Types.ObjectId(orderId) },
    { status },
    { new: true },
  );
  return order;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  changeOrderStatus,
};

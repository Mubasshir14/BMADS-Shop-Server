import mongoose, { Types } from 'mongoose';
import { IOrder } from './order.interface';
import { Product } from '../Products/product.model';
import { Coupon } from '../Coupon/coupon.model';
import { Order } from './order.model';
import { generateTransactionId } from '../Payment/payment.utils';
import { Payment } from '../Payment/payment.model';
import { initPayment } from '../Payment/payment.service';

const createOrder = async (orderData: Partial<IOrder>) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (orderData.products) {
      for (const productItem of orderData.products) {
        const product = await Product.findById(productItem.product).session(
          session,
        );

        if (product) {
          if (product.isActive === false) {
            throw new Error(`Product ${product?.name} is inactive.`);
          }

          if (product.stock < productItem.quantity) {
            throw new Error(`Insufficient stock for product: ${product.name}`);
          }
          // Decrement the product stock
          product.stock -= productItem.quantity;
          await product.save({ session });
        } else {
          throw new Error(`Product not found: ${productItem.product}`);
        }
      }
    }

    // Handle coupon and update orderData
    if (orderData.coupon) {
      const coupon = await Coupon.findOne({ code: orderData.coupon }).session(
        session,
      );
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

    const order = new Order({
      ...orderData,
    });

    const createdOrder = await order.save({ session });

    const transactionId = generateTransactionId();

    const payment = new Payment({
      order: createdOrder._id,
      method: orderData.paymentMethod,
      transactionId,
      amount: createdOrder.finalAmount,
      email: orderData.email,
    });

    await payment.save({ session });

    let result;

    if (createdOrder.paymentMethod === 'Online') {
      result = await initPayment(createdOrder.finalAmount, transactionId);
      result = { paymentUrl: result.paymentUrl }; // Assuming the response contains a `paymentUrl`
    } else {
      result = order;
    }

    await session.commitTransaction();
    session.endSession();

    return { success: true, message: 'Order placed successfully', data: result };
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};




//* wITHOUT PAYMENT
// const createOrder = async (orderData: Partial<IOrder>) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     if (orderData.products) {
//       for (const productItem of orderData.products) {
//         const product = await Product.findById(productItem.product).session(
//           session,
//         );

//         if (product) {
//           if (product.isActive === false) {
//             throw new Error(`Product ${product?.name} is inactive.`);
//           }

//           if (product.stock < productItem.quantity) {
//             throw new Error(`Insufficient stock for product: ${product.name}`);
//           }
//           // Decrement the product stock
//           product.stock -= productItem.quantity;
//           await product.save({ session });
//         } else {
//           throw new Error(`Product not found: ${productItem.product}`);
//         }
//       }
//     }

//     // Handle coupon and update orderData
//     if (orderData.coupon) {
//       const coupon = await Coupon.findOne({ code: orderData.coupon }).session(
//         session,
//       );
//       if (coupon) {
//         const currentDate = new Date();

//         if (currentDate < coupon.startDate) {
//           throw new Error(`Coupon ${coupon.code} has not started yet.`);
//         }

//         if (currentDate > coupon.endDate) {
//           throw new Error(`Coupon ${coupon.code} has expired.`);
//         }

//         orderData.coupon = coupon._id as Types.ObjectId;
//       } else {
//         throw new Error('Invalid coupon code.');
//       }
//     }

//     const order = new Order({
//       ...orderData,
//     });

//     const createdOrder = await order.save({ session });
//     // await createdOrder.populate('user products.product');

//     // const transactionId = generateTransactionId();

//     // const payment = new Payment({
//     //   user: authUser.userId,
//     //   shop: createdOrder.shop,
//     //   order: createdOrder._id,
//     //   method: orderData.paymentMethod,
//     //   transactionId,
//     //   amount: createdOrder.finalAmount,
//     // });

//     // await payment.save({ session });

//     // let result;

//     // if (createdOrder.paymentMethod == 'Online') {
//     //   result = await sslService.initPayment({
//     //     total_amount: createdOrder.finalAmount,
//     //     tran_id: transactionId,
//     //   });
//     //   result = { paymentUrl: result };
//     // } else {
//     //   result = order;
//     // }

//     await session.commitTransaction();
//     session.endSession();

//     return createdOrder;
//   } catch (error) {
//     console.log(error);
//     await session.abortTransaction();
//     session.endSession();
//     throw error;
//   }
// };

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

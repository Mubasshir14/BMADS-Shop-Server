/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable prefer-const */
import { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';
import { Product } from '../Products/product.model';
import { Coupon } from '../Coupon/coupon.model';

const orderSchema = new Schema<IOrder>(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        unitPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    coupon: {
      type: Schema.Types.ObjectId,
      ref: 'Coupon',
      default: null,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    finalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    email: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Delivered", "Cancelled", "Failed"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      default: "Online",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    // paymentMethod: {
    //   type: String,
    //   enum: ['COD', 'Online'],
    //   default: 'Online',
    // },
    // paymentStatus: {
    //   type: String,
    //   enum: ['Pending', 'Paid', 'Failed'],
    //   default: 'Pending',
    // },
  },
  {
    timestamps: true,
  },
);

// orderSchema.pre('validate', async function (next) {
//   const order = this;
//   // Step 1: Initialize total amount
//   let totalAmount = 0;
//   let finalDiscount = 0;
//   // Step 2: Calculate total amount for products
//   for (let item of order.products) {
//     const product = await Product.findById(item.product);

//     if (!product) {
//       return next(new Error(`Product not found!.`));
//     }

//     const offerPrice = (await product?.calculateOfferPrice()) || 0;
//     let productPrice = product.price;
//     if (offerPrice) productPrice = Number(offerPrice);
//     item.unitPrice = productPrice;
//     const price = productPrice * item.quantity;
//     console.log(price);
//     totalAmount += price;
//   }

//   if (order.coupon) {
//     const couponDetails = await Coupon.findById(order.coupon);

//     if (couponDetails && couponDetails.isActive) {
//       if (totalAmount >= couponDetails.minOrderAmount) {
//         if (couponDetails.discountType === 'Percentage') {
//           finalDiscount = Math.min(
//             (couponDetails.discountValue / 100) * totalAmount,
//             couponDetails.maxDiscountAmount
//               ? couponDetails.maxDiscountAmount
//               : Infinity,
//           );
//         } else if (couponDetails.discountType === 'Flat') {
//           finalDiscount = Math.min(couponDetails.discountValue, totalAmount);
//         }
//       }
//     }
//   }

//   order.totalAmount = totalAmount;
//   order.discount = finalDiscount;
//   order.finalAmount = totalAmount - finalDiscount;

//   next();
// });

orderSchema.pre('validate', async function (next) {
  const order = this;
  // Step 1: Initialize total amount
  let totalAmount = 0;
  let finalDiscount = 0;

  // Step 2: Calculate total amount for products
  for (let item of order.products) {
    const product = await Product.findById(item.product);

    if (!product) {
      return next(new Error(`Product not found!.`));
    }

    const offerPrice = (await product?.calculateOfferPrice()) || 0;
    let productPrice = product.price;
    if (offerPrice) productPrice = Number(offerPrice);
    item.unitPrice = productPrice;
    const price = productPrice * item.quantity;
    totalAmount += price;
  }

  if (order.coupon) {
    const couponDetails = await Coupon.findById(order.coupon);

    if (couponDetails && couponDetails.isActive) {
      if (couponDetails.discountType === 'Percentage') {
        finalDiscount = (couponDetails.discountValue / 100) * totalAmount;
      } else if (couponDetails.discountType === 'Flat') {
        finalDiscount = Math.min(couponDetails.discountValue, totalAmount);
      }
    }
  }

  order.totalAmount = totalAmount;
  order.discount = finalDiscount;
  order.finalAmount = totalAmount - finalDiscount;

  next();
});
export const Order = model<IOrder>('Order', orderSchema);

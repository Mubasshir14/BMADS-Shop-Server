import { Schema, model } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      // unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0,
    },
    stock: {
      type: Number,
      required: [true, 'Product stock is required'],
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    imageUrls: {
      type: [String],
      required: [true, 'Product images are required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

// Generate slug before saving
productSchema.pre<IProduct>('validate', function (next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
  next();
});

// Check if product with same name exists before saving
productSchema.pre<IProduct>('save', async function (next) {
  // const existingProduct = await Product.findOne({ name: this.name });
  // if (existingProduct) {
  //   throw new Error('Product with this name already exists');
  // }
  next();
});

productSchema.methods.calculateOfferPrice = function () {
  return this.price - (this.price * this.discount) / 100;
};

export const Product = model<IProduct>('Product', productSchema);

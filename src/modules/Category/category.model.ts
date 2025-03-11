import { Schema, model, Document, Types } from 'mongoose';
import { ICategory } from './category.interface';

interface ICategoryDocument extends Document, ICategory {}

const categorySchema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.pre<ICategoryDocument>('validate', async function (next) {
  try {
    const existingCategory = await this.model('Category').findOne({
      name: this.name,
    });

    if (
      existingCategory &&
      existingCategory._id.toString() !==
        (this._id as Types.ObjectId).toString()
    ) {
      return next(new Error('This category name already exists.'));
    }

    next();
  } catch (error) {
    next(error instanceof Error ? error : new Error(String(error)));
  }
});

export const Category = model<ICategoryDocument>('Category', categorySchema);

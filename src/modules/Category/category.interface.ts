export interface ICategory extends Document {
  name: string;
  description?: string;
  isActive: boolean;
  icon: string;
  createdAt?: Date;
  updatedAt?: Date;
}

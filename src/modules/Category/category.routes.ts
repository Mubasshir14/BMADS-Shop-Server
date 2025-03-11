import { Router } from 'express';
import { CategoryController } from './category.controller';
import { categoryValidation } from './category.validation';
import { UserRole } from '../User/user.interface';
import { multerUpload } from '../../app/utils/multer.config';
import { parseBody } from '../../app/middlewares/bodyParse';
import validateRequest from '../../app/middlewares/validateRequest';
import auth from '../../app/middlewares/auth';

const router = Router();

router.get('/', CategoryController.getAllCategory);
router.get('/:id', CategoryController.getSingleCategory);

router.post(
  '/',
  auth(UserRole.ADMIN),
  multerUpload.single('icon'),
  parseBody,
  validateRequest(categoryValidation.createCategoryValidationSchema),
  CategoryController.createCategory,
);

router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  multerUpload.single('icon'),
  parseBody,
  validateRequest(categoryValidation.updateCategoryValidationSchema),
  CategoryController.updateCategory,
);

router.delete('/:id', auth(UserRole.ADMIN), CategoryController.deleteCategory);

export const CategoryRoutes = router;

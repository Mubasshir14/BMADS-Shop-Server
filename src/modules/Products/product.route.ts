import { Router } from 'express';
import { productValidation } from './product.validation';
import { ProductController } from './product.controller';
import { UserRole } from '../User/user.interface';
import auth from '../../app/middlewares/auth';
import { multerUpload } from '../../app/utils/multer.config';
import { parseBody } from '../../app/middlewares/bodyParse';
import validateRequest from '../../app/middlewares/validateRequest';

const router = Router();

router.get('/', ProductController.getAllProduct);
router.get('/:productId', ProductController.getSingleProduct);
router.post(
  '/',
  auth(UserRole.ADMIN),
  multerUpload.fields([{ name: 'images' }]),
  parseBody,
  validateRequest(productValidation.createProductValidationSchema),
  ProductController.createProduct,
);
router.patch(
  '/:productId',
  auth(UserRole.ADMIN),
  multerUpload.fields([{ name: 'images' }]),
  parseBody,
  ProductController.updateProduct,
);
router.delete(
  '/:productId',
  auth(UserRole.ADMIN),
  ProductController.deleteProduct,
);

export const ProductRoutes = router;

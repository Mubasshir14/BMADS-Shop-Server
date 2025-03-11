import { Router } from 'express';
import { UserRole } from '../User/user.interface';
import auth from '../../app/middlewares/auth';
import { couponController } from './coupon.controller';

const router = Router();

router.post('/', auth(UserRole.ADMIN), couponController.createCoupon);

router.get('/', couponController.getAllCoupon);

router.post('/:couponCode', couponController.getCouponByCode);

router.delete(
  '/:couponId',
  auth(UserRole.ADMIN),
  couponController.deleteCoupon,
);

export const CouponRoutes = router;

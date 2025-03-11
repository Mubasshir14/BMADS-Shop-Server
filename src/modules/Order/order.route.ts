import { Router } from 'express';
import { OrderController } from './order.controller';
import { UserRole } from '../User/user.interface';
import auth from '../../app/middlewares/auth';

const router = Router();

router.get('/', auth(UserRole.ADMIN), OrderController.getAllOrders);

router.post('/', OrderController.createOrder);

router.patch(
  '/:orderId',
  auth(UserRole.ADMIN),
  OrderController.changeOrderStatus,
);

export const OrderRoutes = router;

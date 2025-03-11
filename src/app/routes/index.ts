import { Router } from 'express';
import { AuthRoutes } from '../../modules/Auth/auth.route';
import { UserRoutes } from '../../modules/User/user.route';
import { ReviewRoutes } from '../../modules/Review/review.route';
import { ProductRoutes } from '../../modules/Products/product.route';
import { CategoryRoutes } from '../../modules/Category/category.routes';
import { CouponRoutes } from '../../modules/Coupon/coupon.route';
import { OrderRoutes } from '../../modules/Order/order.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/coupon',
    route: CouponRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

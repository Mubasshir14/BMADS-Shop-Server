import express from 'express';
import { ReviewController } from './review.controller';
const router = express.Router();

router.post('/', ReviewController.createReview);
router.get('/', ReviewController.getReview);
router.get('/food', ReviewController.getProductReview);
router.get('/:id', ReviewController.getProductReview);

export const ReviewRoutes = router;

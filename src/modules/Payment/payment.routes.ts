import { Router } from 'express';
import { createPayment, getPaymentStatus, paymentController, verifyPayment } from './payment.controller';

const router = Router();


router.get('/', paymentController.getAll);
router.post("/new", createPayment);
router.post("/status", getPaymentStatus);
router.post("/verify", verifyPayment);

export default router;


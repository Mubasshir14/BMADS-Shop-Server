/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { paymentService } from './payment.service';
const Zerocryptopay = require("./Zerocryptopay");

export const paymentController = {
  async getAll(req: Request, res: Response) {
    const data = await paymentService.getAll();
    res.json(data);
  },
};

export const createPayment = async (req: Request, res: Response) => {
  try {
    const response = await Zerocryptopay.newPay(req.body);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPaymentStatus = async (req: Request, res: Response) => {
  try {
    const response = await Zerocryptopay.getStatus(req.body);
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const response = await Zerocryptopay.verifyPayment(
      req.body.dataConfig,
      req.body.params,
    );
    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: 'Server error' });
  }
};

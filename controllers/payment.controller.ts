import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY!, { apiVersion: '2023-08-16' });

export const createPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    stripe.paymentIntents.create(
      {
        amount: req.body.amount * 100,
        currency: "gbp",
        payment_method_types: ["card"],
      },
      function (err: Error, paymentIntent: Stripe.PaymentIntent) {
        if (err) {
          res.status(500).json({ error: { status: 500, info: err.message } });
        } else {
          res.status(201).json({ paymentIntent });
        }
      } as Stripe.RequestOptions
    );
  } catch(err) {
    next(err);
  }
}
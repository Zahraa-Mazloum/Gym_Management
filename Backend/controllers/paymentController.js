import Payment from '../models/paymentModel.js';
import asyncHandler from 'express-async-handler';


export const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find().populate('membership');
  res.json(payments);
});


export const getPaymentById = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id).populate('membership');
  if (payment) {
    res.json(payment);
  } else {
    res.status(404);
    throw new Error('Payment not found');
  }
});


export const createPayment = asyncHandler(async (req, res) => {
  const { amount, membership } = req.body;

  const payment = await Payment.create({
    amount,
    membership,
  });

  if (payment) {
    res.status(201).json(payment);
  } else {
    res.status(400);
    throw new Error('Invalid payment data');
  }
});


export const updatePayment = asyncHandler(async (req, res) => {
  const { amount, membership } = req.body;

  const payment = await Payment.findById(req.params.id);

  if (payment) {
    payment.amount = amount || payment.amount;
    payment.membership = membership || payment.membership;

    const updatedPayment = await payment.save();

    res.json(updatedPayment);
  } else {
    res.status(404);
    throw new Error('Payment not found');
  }
});


export const deletePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (payment) {
    await payment.remove();
    res.json({ message: 'Payment removed' });
  } else {
    res.status(404);
    throw new Error('Payment not found');
  }
});

const paymentRoutes = { getPayments, getPaymentById, createPayment, updatePayment, deletePayment };
export default paymentRoutes;

import Payment from '../models/paymentModel.js';
import asyncHandler from 'express-async-handler';
import Dollar from '../models/dollarRate.js';
import Debt from '../models/debtModel.js';
import Member from '../models/memberModel.js';
import Membership from '../models/membershipModel.js';

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
  const { amount, member, notes } = req.body;

  const latestDollarRate = await Dollar.findOne().sort({ _id: -1 });
  if (!latestDollarRate) {
    res.status(404);
    throw new Error('Dollar rate not found');
  }
  const memberData = await Member.findById(member);
  const memberName = `${memberData.first_name} ${memberData.middle_name} ${memberData.last_name}`;

  const priceLbp = amount * latestDollarRate.dollarRate;

  const payment = await Payment.create({
    amount,
    member:memberName,
    notes,
    priceLbp,
  
  });

  if (!payment) {
    res.status(400);
    throw new Error('Invalid payment data');
  }

  // Check if the member has a debt
  const existingDebt = await Debt.findOne({ member });
  if (existingDebt) {
    // Reduce the paid amount from the debt
    existingDebt.amount -= amount;
    existingDebt.notes.push(notes);
    existingDebt.notes = existingDebt.notes.join(" ");
    if (existingDebt.amount <= 0) {
      // Delete the debt if the amount becomes zero or negative
      await existingDebt.deleteOne();
        } else {
      await existingDebt.save();
    }
  }
  res.status(201).json(payment);
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



export const deletePayment = asyncHandler(async (req, response) => {
  try{
      await Payment.deleteOne({_id: req.params.id});
      response.status(201).json("Payment deleted Successfully");
  } catch (error){
      response.status(409).json({ message: error.message});     
  }
})
const paymentRoutes = { getPayments, getPaymentById, createPayment, updatePayment, deletePayment };
export default paymentRoutes;

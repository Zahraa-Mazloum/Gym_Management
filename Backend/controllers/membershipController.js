import Membership from '../models/membershipModel.js';
import asyncHandler from 'express-async-handler';
import Debt from '../models/debtModel.js';
import Payment from '../models/paymentModel.js';
import Income from '../models/incomeModel.js';
import Member from'../models/memberModel.js';
import Program from '../models/programModel.js';
import Dollar from '../models/dollarRate.js'

export const getMemberships = asyncHandler(async (req, res) => {
  try {
    const memberships = await Membership.find().populate('member program');
    res.status(200).json(memberships);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


export const addMembership = asyncHandler(async (req, res) => {
  try {
    const { member, program, paid } = req.body;

    if (!member || !program || !paid) {
      res.status(400);
      throw new Error('Please enter all fields');
    }

    const memberData = await Member.findById(member);
    const memberName = `${memberData.first_name} ${memberData.middle_name} ${memberData.last_name}`;

    const programData = await Program.findById(program);
    const programName = programData.name;
    const programAmount = programData.price;

    const dollar = await Dollar.findOne();
    const dollarRate = dollar.dollarRate;

    const priceLbp = dollarRate * programAmount;

    const membership = await Membership.create({
      amount: programAmount,
      member,
      program,
      rate: dollar._id,
      paid,
      priceLbp,
      end_date: new Date().setMonth(new Date().getMonth() + 1),
    });

    if (paid < programAmount) {
      const existingDebt = await Debt.findOne({ member: memberData._id });

      if (existingDebt) {
        existingDebt.amount += programAmount - paid;
        existingDebt.notes.push(programName);
        existingDebt.notes = existingDebt.notes.join(" ");
        await existingDebt.save();
      } else {
        const newDebt = await Debt.create({
          amount: programAmount - paid,
          member,
          notes: [programName].join(" "),
        });
      }
    }
    const priceLbpPayment=paid*dollarRate

    const payment = await Payment.create({
      amount: paid,
      member:memberName,
      membership: membership._id,
      notes: programName,
      priceLbp:priceLbpPayment,
    });

    const descriptionIncome = `Payment from ${memberName}`;

    const income = await Income.create({
      description:descriptionIncome,
      amount: paid,
      rate: dollar._id,
      priceLbp: priceLbpPayment,
    });


    res.status(201).json({ membership, payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




export const getMembershipById = asyncHandler(async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id).populate('member program');
    if (membership) {
      res.status(200).json(membership);
    } else {
      res.status(404);
      throw new Error('Membership not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


export const updateMembership = asyncHandler(async (req, res) => {
  try {
    const { amount, member, program, paid } = req.body;
    const updatedMembership = await Membership.findByIdAndUpdate(
      req.params.id,
      { amount, member, program,paid },
      { new: true }
    );
    res.json(updatedMembership);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export const deleteMembership = asyncHandler(async (req, response) => {
  try{
      await Membership.deleteOne({_id: req.params.id});
      response.status(201).json("Membership deleted Successfully");
  } catch (error){
      response.status(409).json({ message: error.message});     
  }
})

const membershipRoutes = {getMemberships,addMembership,getMembershipById,updateMembership,deleteMembership};

export default membershipRoutes;

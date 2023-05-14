import Membership from '../models/membershipModel.js';
import asyncHandler from 'express-async-handler';

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
    const { start_day, amount, member, program } = req.body;

    if (!start_day || !amount || !member || !program) {
      res.status(400);
      throw new Error('Please enter all fields');
    }

    const membership = await Membership.create({
      start_day,
      amount,
      member,
      program,
    });

    if (membership) {
      res.status(201).json({
        membership,
      });
    } else {
      res.status(400);
      throw new Error('Invalid membership data');
    }
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
    const { start_day, amount, member, program } = req.body;
    const updatedMembership = await Membership.findByIdAndUpdate(
      req.params.id,
      { start_day, amount, member, program },
      { new: true }
    );

    if (!updatedMembership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    res.json(updatedMembership);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export const deleteMembership = asyncHandler(async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (membership) {
      await membership.remove();
      res.status(201).json('Membership deleted successfully');
    } else {
      res.status(404);
      throw new Error('Membership not found');
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

const membershipRoutes = {getMemberships,addMembership,getMembershipById,updateMembership,deleteMembership};

export default membershipRoutes;

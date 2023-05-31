import Dollar from '../models/dollarRate.js';
import asyncHandler from 'express-async-handler';
import Program from '../models/programModel.js';

export const createDollarRate =asyncHandler(async (req, res) => {
  const { description, dollarRate } = req.body;

  try {
    const newDollar = new Dollar({
      description,
      dollarRate,
    });
    const savedDollar = await newDollar.save();
    res.status(201).json(savedDollar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const getAllDollarRates = asyncHandler(async (req, res) => {
  try {
    const dollarRates = await Dollar.find();
    res.json(dollarRates);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const updateDollarRate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { description, dollarRate } = req.body;

  try {
    const updatedDollar = await Dollar.findByIdAndUpdate(
      id,
      { description, dollarRate },
      { new: true }
    );

    if (!updatedDollar) {
      return res.status(404).json({ message: 'Dollar rate not found' });
    }

    // Update the price lbp  in all existing programs
    const programs = await Program.find();
    for (const program of programs) {
      program.priceLbp = program.price * dollarRate;
      await program.save();
    }

    res.json(updatedDollar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
export const getDollarById = asyncHandler(async (req, res) => {
  try {
    const dollar = await Dollar.findById(req.params.id);
    if (dollar) {
      res.status(200).json(dollar);
    } else {
      res.status(404);
      throw new Error('Dollar not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const deleteDollarRate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDollar = await Dollar.findByIdAndRemove(id);
    if (!deletedDollar) {
      return res.status(404).json({ message: 'Dollar rate not found' });
    }
    res.json({ message: 'Dollar rate deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const dollarRoutes = { getAllDollarRates, getDollarById,createDollarRate, updateDollarRate, deleteDollarRate}
export default dollarRoutes      
import  Program from '../models/programModel.js';
import asyncHandler from 'express-async-handler';
import DollarRates from '../models/dollarRate.js';

export const getPrograms = asyncHandler(async (req, response) => {
    try{
        const programs = await Program.find().populate('coach');
        response.status(200).json(programs);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})


export const addProgram = asyncHandler(async (req, res) => {
  try {
    const { coach, name, day, time, category, price } = req.body;

    if (!name || !day || !time || !category || !price) {
      res.status(400);
      throw new Error('Please enter all fields');
    }

    const latestDollarRate = await DollarRates.findOne().sort({ _id: -1 });

    if (!latestDollarRate) {
      res.status(404);
      throw new Error('Dollar rate not found');
    }

    const priceLbp = price * latestDollarRate.dollarRate;

    const program = await Program.create({
      coach,
      name, 
      day,
      time,
      category,
      price,
      priceLbp
    });

    res.status(201).json({
      program
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  
export const getProgramById =asyncHandler(async (req, response) => {
    try{
        const program = await Program.findById(id).populate('coach');
        response.status(200).json(program);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})
import Dollar from '../models/dollarRate.js';

export const editProgram = asyncHandler(async (req, res) => {
  const { name, day, time, category, price } = req.body;

  if (!Array.isArray(time)) {
    return res.status(400).json({ message: 'Invalid time value' });
  }

  const timeString = time.join(', ');
  const priceNumber = parseFloat(price);

  if (isNaN(priceNumber)) {
    return res.status(400).json({ message: 'Invalid price value' });
  }

  try {
    const dollarRate = await DollarRates.findOne(); 

    if (!dollarRate) {
      res.status(400);
      throw new Error('No dollar rate found');
    }

    const priceLbp = priceNumber * dollarRate.dollarRate; // Calculate the new price in LBP

    const updatedProgram = await Program.findByIdAndUpdate(
      req.params.id,
      { name, day, time: timeString, category, price: priceNumber, priceLbp },
      { new: true }
    ).exec();

    if (!updatedProgram) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.json(updatedProgram);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



export const deleteProgram= asyncHandler(async (req, response) => {
    try{
        await Program.deleteOne({_id: req.params.id});
        response.status(201).json("Program deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
})

const programRoutes = { getPrograms, addProgram, editProgram, deleteProgram,getProgramById}
export default programRoutes  
import Income from '../models/incomeModel.js';
import asyncHandler from 'express-async-handler';
import Dollar from '../models/dollarRate.js';


export const getIncomes = asyncHandler(async (req, response) => {
    try{
        const expenses = await Income.find();
        response.status(200).json(expenses);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})

export const addIncome = asyncHandler(async (req, res) => {
    try {
      const { description, amount } = req.body;

      const dollar = await Dollar.findOne();
      const dollarRate = dollar.dollarRate;
      const priceLbp=amount*dollarRate

      if (!description || !amount) {
        res.status(400);
        throw new Error('Please enter all fields');
      }
  
      const income = await Income.create({
        description,
        amount,
        priceLbp:priceLbp,        
      });
  
      if (income) {
        res.status(201).json({
            income,
        });
      } else {
        res.status(400);
        throw new Error('invalid income data');
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
export const getIncomeById =asyncHandler(async (req, response) => {
    try{
        const income = await Income.findById(req.params.id);
        response.status(200).json(income);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})

export const editIncome = asyncHandler(async (req, res) => {
  try {
    const { description, amount } = req.body;

    const dollar = await Dollar.findOne();
    const dollarRate = dollar.dollarRate;

    const priceLbp = amount * dollarRate;

    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      { description, amount, priceLbp },
      { new: true }
    );

    res.json(updatedIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export const deleteIncome = asyncHandler(async (req, response) => {
    try{
        await Income.deleteOne({_id: req.params.id});
        response.status(201).json("Income  deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
})

const incomeRoutes = { getIncomes , getIncomeById, addIncome, editIncome , deleteIncome }
export default incomeRoutes      
import Income from '../models/incomeModel.js';
import asyncHandler from 'express-async-handler';


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
  
      if (!description || !amount) {
        res.status(400);
        throw new Error('Please enter all fields');
      }
  
      const income = await Income.create({
        description,
        amount,
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

export const editIncome  =asyncHandler(async (req, response) => {
    let income = req.body;

    const editIncome = new Income (income);
    try{
        await Income.updateOne({_id: req.params.id}, editIncome);
        response.status(201).json(editIncome);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}
)

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
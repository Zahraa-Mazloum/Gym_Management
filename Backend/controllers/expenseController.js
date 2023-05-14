import Expense from '../models/expenseModel.js';
import asyncHandler from 'express-async-handler';


export const getExpenses = asyncHandler(async (req, response) => {
    try{
        const expenses = await Expense.find();
        response.status(200).json(expenses);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})

export const addExpense = asyncHandler(async (req, res) => {
    try {
      const { description, amount } = req.body;
  
      if (!description || !amount) {
        res.status(400);
        throw new Error('Please enter all fields');
      }
  
      const expense = await Expense.create({
        description,
        amount,
      });
  
      if (expense) {
        res.status(201).json({
            expense,
        });
      } else {
        res.status(400);
        throw new Error('invalid expense data');
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
export const getExpenseById =asyncHandler(async (req, response) => {
    try{
        const expense = await Expense.findById(req.params.id);
        response.status(200).json(expense);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})

export const editExpense =asyncHandler(async (req, response) => {
    let expense = req.body;

    const editExpense = new Expense(expense);
    try{
        await Expense.updateOne({_id: req.params.id}, editExpense);
        response.status(201).json(editExpense);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}
)

export const deleteExpense = asyncHandler(async (req, response) => {
    try{
        await Expense.deleteOne({_id: req.params.id});
        response.status(201).json("Expense deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
})

const expenseRoutes = { getExpenses, getExpenseById, addExpense, editExpense, deleteExpense}
export default expenseRoutes      
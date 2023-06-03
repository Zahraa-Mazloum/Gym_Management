import Income from '../models/incomeModel.js';
import asyncHandler from 'express-async-handler';
import Dollar from '../models/dollarRate.js';
import Expense from '../models/expenseModel.js';


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



export const getProfit =asyncHandler(async (req, res) => {
  try {
    const currentMonth = new Date().getMonth() + 1;
    const incomeByMonth = await Income.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' }, 
          totalIncome: { $sum: '$amount' }
        }
      }
    ]);
    const currentMonthIncome = incomeByMonth.find(income => income._id === currentMonth);
    const expensesByMonth = await Expense.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' },
          totalExpense: { $sum: '$amount' } 
        }
      }
    ]);
    const currentMonthExpense = expensesByMonth.find(expense => expense._id === currentMonth);
    const profit = (currentMonthIncome ? currentMonthIncome.totalIncome : 0) - (currentMonthExpense ? currentMonthExpense.totalExpense : 0);

    res.json({ profit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const totalIncome = asyncHandler( async (req, res) => {
  try {
    const currentMonth = new Date().getMonth() + 1;
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;

    const currentMonthIncome = await Income.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$createdAt' }, currentMonth]
          }
        }
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: '$amount' }
        }
      }
    ]);

    const previousMonthIncome = await Income.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$createdAt' }, previousMonth]
          }
        }
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: '$amount' }
        }
      }
    ]);

    const currentMonthTotalIncome = currentMonthIncome.length > 0 ? currentMonthIncome[0].totalIncome : 0;
    const previousMonthTotalIncome = previousMonthIncome.length > 0 ? previousMonthIncome[0].totalIncome : 0;

    const incomes = currentMonthTotalIncome - previousMonthTotalIncome;

    res.json({ 
      currentMonthTotalIncome,
      previousMonthTotalIncome,
      incomes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

///


export const expenses=asyncHandler(async (req, res) => {
  try {
    const currentMonth = new Date().getMonth() + 1;
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;

 
    const currentMonthExpense = await Expense.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$createdAt' }, currentMonth]
          }
        }
      },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: '$amount' }
        }
      }
    ]);

    const previousMonthExpense = await Expense.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: '$createdAt' }, previousMonth]
          }
        }
      },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: '$amount' }
        }
      }
    ]);

    const currentMonthTotalExpense = currentMonthExpense.length > 0 ? currentMonthExpense[0].totalExpense : 0;
    const previousMonthTotalExpense = previousMonthExpense.length > 0 ? previousMonthExpense[0].totalExpense : 0;
    const expenses = currentMonthTotalExpense - previousMonthTotalExpense;

    // const percentageChange = ((currentMonthTotalExpense - previousMonthTotalExpense) / Math.abs(previousMonthTotalExpense)) * 100;

    res.json({ 
      currentMonthTotalExpense,
      previousMonthTotalExpense,
      expenses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



const incomeRoutes = { getIncomes , getIncomeById, addIncome, editIncome , deleteIncome ,getProfit,totalIncome,expenses}
export default incomeRoutes      
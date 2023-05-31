import Salary from '../models/salaryModel.js';
import Expense from '../models/expenseModel.js';
import asyncHandler from 'express-async-handler';
import Coach from '../models/coachModel.js';

export const getSalaries = asyncHandler(async (req, res) => {
  try {
    const salaries = await Salary.find().populate('coach', 'first_name last_name');
    res.status(200).json(salaries);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const addSalary = asyncHandler(async (req, res) => {
  try {
    const { amount, coach } = req.body;
    if (!amount || !coach) {
      res.status(400);
      throw new Error('Please enter all fields');
    }

    const salary = await Salary.create({
      amount,
      coach,
    });

    // Create a new expense related to the salary
    const coachData = await Coach.findById(coach);
    const description = `Salary for ${coachData.first_name} ${coachData.last_name}`;

    const expense = await Expense.create({
      salary: salary._id,
      amount,
      description,
    });

    if (salary && expense) {
      res.status(201).json({
        salary,
        expense,
      });
    } else {
      res.status(400);
      throw new Error('Invalid salary data');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const getSalaryById = asyncHandler(async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id).populate('coach', 'first_name last_name');
    res.status(200).json(salary);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const editSalary = asyncHandler(async (req, res) => {
  const { amount, coach } = req.body;

  try {
    const updatedSalary = await Salary.findByIdAndUpdate(
      req.params.id,
      { amount, coach },
      { new: true }
    );
    if (!updatedSalary) {
      return res.status(404).json({ message: 'Salary not found' });
    }

    // Retrieve the related expense using the salary ID and update the amount
    const updatedExpense = await Expense.findOneAndUpdate(
      { salary: updatedSalary._id },
      { amount },
      { new: true }
    );

    res.json(updatedSalary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const deleteSalary = asyncHandler(async (req, res) => {
  try {
    const deletedSalary = await Salary.findByIdAndDelete(req.params.id);

    if (!deletedSalary) {
      return res.status(404).json({ message: 'Salary not found' });
    }

    // Find and delete the related expense using the salary ID
    await Expense.findOneAndDelete({ salary: deletedSalary._id });

    res.status(201).json({ message: 'Salary deleted successfully' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

export const deleteSalaries = asyncHandler(async (req, res) => {
  const ids = req.params.ids.split(",");
  try {
    const result = await Salary.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount > 0) {
      res.status(200).json({ success: true, message: 'Salaries have been removed' });
    } else {
      res.status(404).json({ message: 'No Salary found with the provided IDs' });
    }
  } catch (error) {
    console.error('Error deleting Salaries:', error);
    res.status(500).json({ message: 'An error occurred while deleting Salaries' });
  }
});

const salaryRoutes = {
  getSalaries,
  addSalary,
  editSalary,
  deleteSalary,
  getSalaryById,
};

export default salaryRoutes;

import express from 'express';
import {getExpenses, getExpenseById, addExpense, editExpense, deleteExpense} from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';


export const router = express.Router()
router.use(protect);


router.get('/getExpenses',getExpenses)
router.get('/getExpenseById/:id',getExpenseById)
router.post('/addExpense',addExpense)
router.put('/editExpense/:id',editExpense)
router.delete('/deleteExpense/:id',deleteExpense)

export default router;



import express from 'express';
import { getIncomes , getIncomeById, addIncome, editIncome , deleteIncome } from '../controllers/incomeController.js';
import { protect } from '../middleware/authMiddleware.js';


export const router = express.Router()
// router.use(protect);


router.get('/getIncomes',getIncomes)
router.get('/getIncomeById/:id',getIncomeById)
router.post('/addIncome',addIncome)
router.put('/editIncome/:id',editIncome)
router.delete('/deleteIncome/:id',deleteIncome)

export default router;



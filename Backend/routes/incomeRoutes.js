import express from 'express';
import { getIncomes , getIncomeById, addIncome, editIncome , deleteIncome ,getProfit,totalIncome,expenses} from '../controllers/incomeController.js';
import { protect } from '../middleware/authMiddleware.js';


export const router = express.Router()
// router.use(protect);


router.get('/getIncomes',getIncomes)
router.get('/getIncomeById/:id',getIncomeById)
router.post('/addIncome',addIncome)
router.put('/editIncome/:id',editIncome)
router.delete('/deleteIncome/:id',deleteIncome)
router.get('/getProfit',getProfit)
router.get('/totalIncome',totalIncome)
router.get('/expenses',expenses)

export default router;



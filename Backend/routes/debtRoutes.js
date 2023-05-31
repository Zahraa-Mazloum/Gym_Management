import express from 'express';
import {getDebts,getDebtById, addDebt,editDebt,deleteDebt} from '../controllers/debtController.js';
import { protect } from '../middleware/authMiddleware.js';


export const router = express.Router()
// router.use(protect);


router.get('/getDebts',getDebts)
router.get('/getDebtById/:id',getDebtById)
router.post('/addDebt',addDebt)
router.put('/editDebt/:id',editDebt)
router.delete('/deleteDebt/:id',deleteDebt)

export default router;


 
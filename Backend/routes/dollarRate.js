import express from 'express';
import { getAllDollarRates, createDollarRate, updateDollarRate, deleteDollarRate,getDollarById} from '../controllers/dollarController.js';
import { protect } from '../middleware/authMiddleware.js';


export const router = express.Router()
// router.use(protect);


router.get('/getAllDollarRates',getAllDollarRates)
router.get('/getDollarById/:id',getDollarById)
router.post('/createDollarRate',createDollarRate)
router.put('/updateDollarRate/:id',updateDollarRate)
router.delete('/deleteDebt/:id',deleteDollarRate)

export default router;


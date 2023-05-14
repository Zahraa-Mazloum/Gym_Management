import express from 'express';
import   { getPayments, getPaymentById, createPayment, updatePayment, deletePayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';


export const router = express.Router()
router.use(protect);


router.get('/getPayments',getPayments)
router.get('/getPaymentById/:id',getPaymentById)
router.post('/createPayment',createPayment)
router.put('/updatePayment/:id',updatePayment)
router.delete('/deletePayment/:id',deletePayment)

export default router;


 
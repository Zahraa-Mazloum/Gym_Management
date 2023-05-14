import express from 'express';
import  { getSalaries, addSalary, editSalary, deleteSalary,getSalaryById}from '../controllers/salaryController.js';
import { protect } from '../middleware/authMiddleware.js';


export const router = express.Router()
router.use(protect);


router.get('/getSalaries',getSalaries)
router.get('/getSalaryById/:id',getSalaryById)
router.post('/addSalary',addSalary)
router.put('/editSalary/:id',editSalary)
router.delete('/deleteSalary/:id',deleteSalary)

export default router;


 
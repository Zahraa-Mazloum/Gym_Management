import express from 'express';
import   { getPrograms, addProgram, editProgram, deleteProgram,getProgramById}from '../controllers/programController.js';
import { protect } from '../middleware/authMiddleware.js';


export const router = express.Router()
// router.use(protect);


router.get('/getPrograms',getPrograms)
router.get('/getProgramById/:id',getProgramById)
router.post('/addProgram',addProgram)
router.put('/editProgram/:id',editProgram)
router.delete('/deleteProgram/:id',deleteProgram)

export default router;


 
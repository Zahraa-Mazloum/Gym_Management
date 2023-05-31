import express from 'express';
import {getAttendances,addAttendance,getAttendanceById,updateAttendance,deleteAttendance}from '../controllers/attendaceController.js';
import { protect } from '../middleware/authMiddleware.js';


export const router = express.Router()
// router.use(protect);


router.get('/getAttendances',getAttendances)
router.get('/getAttendanceById/:id',getAttendanceById)
router.post('/addAttendance',addAttendance)
router.put('/updateAttendance/:id',updateAttendance)
router.delete('/deleteAttendance/:id',deleteAttendance)

export default router;


 
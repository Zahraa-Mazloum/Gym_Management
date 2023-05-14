import express from 'express';
import {getCoaches,getCoachById, addCoach,editcoach,deletecoach} from '../controllers/coachController.js';
import { protect } from '../middleware/authMiddleware.js';


export const router = express.Router()
router.use(protect);


router.get('/getCoaches',getCoaches)
router.get('/getCoachById/:id',getCoachById)
router.post('/addCoach',addCoach)
router.put('/editCoach/:id',editcoach)
router.delete('/deleteCoach/:id',deletecoach)

export default router;



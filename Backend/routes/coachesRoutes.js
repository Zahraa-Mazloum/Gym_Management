import express from 'express';
import {getCoaches,getCoachById, addCoach,editCoach,deletecoach,deleteCoaches} from '../controllers/coachController.js';
import { protect } from '../middleware/authMiddleware.js';


export const router = express.Router()
// router.use(protect);


router.get('/getCoaches',getCoaches)
router.get('/getCoachById/:id',getCoachById)
router.post('/addCoach',addCoach)
router.put('/editCoach/:id',editCoach)
router.delete('/deleteCoach/:id',deletecoach)
router.delete('/deleteCoaches/:ids',deleteCoaches)

export default router;



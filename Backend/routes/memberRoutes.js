import express from 'express';
import {getMembers,getMemberById, addMember,editMember,deleteMember,getMemberLocations} from '../controllers/memberController.js';
import { protect } from '../middleware/authMiddleware.js';


export const router = express.Router()
// router.use(protect);


router.get('/getMembers',getMembers)
router.get('/getMemberById/:id',getMemberById)
router.post('/addMember',addMember)
router.put('/editMember/:id',editMember)
router.delete('/deleteMember/:id',deleteMember)
router.get('/getMemberLocations', getMemberLocations)


export default router;



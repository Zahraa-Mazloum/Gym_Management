import express from 'express';
import   {getMemberships,addMembership,getMembershipById,updateMembership,deleteMembership} from '../controllers/membershipController.js';
import { protect } from '../middleware/authMiddleware.js';


export const router = express.Router()
router.use(protect);


router.get('/getMemberships',getMemberships)
router.get('/getMembershipById/:id',getMembershipById)
router.post('/addMembership',addMembership)
router.put('/updateMembership/:id',updateMembership)
router.delete('/deleteMembership/:id',deleteMembership)

export default router;


 
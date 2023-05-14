import express from 'express';
import { getSupplements , getSupplementById, addSupplement, editSupplement , deleteSupplement} from '../controllers/supplementController.js';
import { protect } from '../middleware/authMiddleware.js';


export const router = express.Router()
router.use(protect);


router.get('/getSupplements',getSupplements)
router.get('/getSupplementById/:id',getSupplementById)
router.post('/addSupplement',addSupplement)
router.put('/editSupplement/:id',editSupplement)
router.delete('/deleteSupplement/:id',deleteSupplement)

export default router;



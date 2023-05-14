import express from 'express';
import multer from 'multer';
import { getSupplements, getSupplementById, addSupplement, editSupplement, deleteSupplement } from '../controllers/supplementController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else { 
    cb(new Error('File type must be jpeg or png'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  },
  fileFilter: fileFilter
});



router.use(protect);

router.get('/getSupplements',getSupplements)
router.get('/getSupplementById/:id',getSupplementById)
router.post('/addSupplement',upload.single('image'),addSupplement)
router.put('/editSupplement/:id',upload.single('image'),editSupplement)
router.delete('/deleteSupplement/:id',deleteSupplement)

export default router;



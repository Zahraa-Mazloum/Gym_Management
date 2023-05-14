import Supplement from "../models/supplementModel.js";
import asyncHandler from "express-async-handler";
import multer from "multer";

// Set up Multer storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export const getSupplements = asyncHandler(async (req, response) => {
  try {
    const supplement = await Supplement.find();
    response.status(200).json(supplement);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

export const addSupplement = asyncHandler(async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
      res.status(400);
      throw new Error("Please enter all fields");
    }

    const supplement = new Supplement({
      name,
      description,
      price,
      image: req.file.filename,
    });

    const createdSupplement = await supplement.save();

    if (createdSupplement) {
      res.status(201).json(createdSupplement);
    } else {
      res.status(400);
      throw new Error("Invalid supplement data");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const getSupplementById = asyncHandler(async (req, response) => {
  try {
    const supplement = await Supplement.findById(req.params.id);
    response.status(200).json(supplement);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

export const editSupplement = asyncHandler(async (req, response) => {
  let supplement = req.body;

  const editSupplement = new Supplement(supplement);
  try {
    await Supplement.updateOne({ _id: req.params.id }, editSupplement);
    response.status(201).json(editSupplement);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
});

export const deleteSupplement = asyncHandler(async (req, response) => {
  try {
    await Supplement.deleteOne({ _id: req.params.id });
    response.status(201).json("Supplement deleted Successfully");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
});

const supplementRoutes = {
  getSupplements,
  getSupplementById,
  addSupplement,
  editSupplement,
  deleteSupplement,
};
export default supplementRoutes;

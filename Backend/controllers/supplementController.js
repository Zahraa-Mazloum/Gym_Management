import Supplement from '../models/supplementModel.js';
import asyncHandler from 'express-async-handler';


export const getSupplements = asyncHandler(async (req, response) => {
    try{
        const supplement = await Supplement.find();
        response.status(200).json(supplement);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})

export const addSupplement = asyncHandler(async (req, res) => {
    try {
      const { description, amount } = req.body;
  
      if (!description || !amount) {
        res.status(400);
        throw new Error('Please enter all fields');
      }
  
      const supplement = await Supplement.create({
        description,
        amount,
      });
  
      if (supplement) {
        res.status(201).json({
            supplement,
        });
      } else {
        res.status(400);
        throw new Error('invalid supplement data');
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
export const getSupplementById =asyncHandler(async (req, response) => {
    try{
        const supplement = await Supplement.findById(req.params.id);
        response.status(200).json(supplement);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})

export const editSupplement=asyncHandler(async (req, response) => {
    let supplement = req.body;

    const editSupplement = new Supplement (supplement);
    try{
        await Supplement.updateOne({_id: req.params.id}, editSupplement);
        response.status(201).json(editSupplement);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}
)

export const deleteSupplement = asyncHandler(async (req, response) => {
    try{
        await Supplement.deleteOne({_id: req.params.id});
        response.status(201).json("Supplement  deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
})

const supplementRoutes = { getSupplements , getSupplementById, addSupplement, editSupplement , deleteSupplement}
export default supplementRoutes      
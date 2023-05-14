import Debt from '../models/debtModel.js';
import asyncHandler from 'express-async-handler';
import Member from '../models/memberModel.js';

export const getDebts = asyncHandler(async (req, response) => {
    try{
        const debts = await Debt.find().populate('member');
        response.status(200).json(debts);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})

export const addDebt = asyncHandler(async (req, res) => {
    try {
        const { amount, notes, member } = req.body;  
      if (!amount || !notes || !member) {
        res.status(400);
        throw new Error('Please enter all fields');
      }
  
      const debt = await Debt.create({
        amount,
        notes,
        member,
        
      });
  
      if (debt) {
        res.status(201).json({
          debt,
        });
      } else {
        res.status(400);
        throw new Error('invalid debt data');
      } 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
// Get a debt by id
export const getDebtById =asyncHandler(async (req, response) => {
    try{
        const debt = await Debt.findById(id).populate('member');
        response.status(200).json(debt);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})
export const editDebt =  asyncHandler(async (req,res)=>{
    const { amount, notes, member } = req.body;
  
    try {
      const updatedDebt = await Debt.findByIdAndUpdate(
        req.params.id,
        { amount, notes, member },
        { new: true }
      );
      if (!updatedDebt) {
        return res.status(404).json({ message: 'Debt not found' });
      }
      res.json(updatedDebt);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
)


export const deleteDebt = asyncHandler(async (req, response) => {
    try{
        await Debt.deleteOne({_id: req.params.id});
        response.status(201).json("Debt deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
})

const debtRoutes = { getDebts, addDebt, addDebt, editDebt, deleteDebt }
export default debtRoutes  
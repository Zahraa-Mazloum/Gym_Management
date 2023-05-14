import  Salary from '../models/salaryModel.js';
import asyncHandler from 'express-async-handler';

export const getSalaries = asyncHandler(async (req, response) => {
    try{
        const salaries = await Salary.find().populate('coach');
        response.status(200).json(salaries);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})

export const addSalary= asyncHandler(async (req, res) => {
    try {
        const { amount, coach } = req.body;  
      if (!amount  || !coach) {
        res.status(400);
        throw new Error('Please enter all fields');
      }
  
      const salary = await Salary.create({
        amount,
        coach,
        
      });
  
      if (salary) {
        res.status(201).json({
            salary,
        });
      } else {
        res.status(400);
        throw new Error('invalid salary data');
      } 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
export const getSalaryById =asyncHandler(async (req, response) => {
    try{
        const salary = await Salary.findById(id).populate('coach');
        response.status(200).json(salary);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})
export const editSalary =  asyncHandler(async (req,res)=>{
    const { amount, coach } = req.body;
  
    try {
      const updatedSalary= await Salary.findByIdAndUpdate(
        req.params.id,
        { amount, coach },
        { new: true }
      );
      if (!updatedSalary) {
        return res.status(404).json({ message: 'Salary not found' });
      }
      res.json(updatedSalary);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
)


export const deleteSalary = asyncHandler(async (req, response) => {
    try{
        await Salary.deleteOne({_id: req.params.id});
        response.status(201).json("Salary deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
})

const salaryRoutes = { getSalaries, addSalary, editSalary, deleteSalary,getSalaryById}
export default salaryRoutes  
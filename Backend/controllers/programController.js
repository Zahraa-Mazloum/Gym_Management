import  Program from '../models/programModel.js';
import asyncHandler from 'express-async-handler';

export const getPrograms = asyncHandler(async (req, response) => {
    try{
        const programs = await Program.find().populate('coach');
        response.status(200).json(programs);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})

export const addProgram= asyncHandler(async (req, res) => {
    try {
        const { name, day,time,category } = req.body;  
      if (!name  || !day|| !time || !category ){
        res.status(400);
        throw new Error('Please enter all fields');
      }
  
      const program = await Program.create({
        name,
        day,
time,
category        
      });
  
      if (program) {
        res.status(201).json({
            program,
        });
      } else {
        res.status(400);
        throw new Error('invalid program data');
      } 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
export const getProgramById =asyncHandler(async (req, response) => {
    try{
        const program = await Program.findById(id).populate('coach');
        response.status(200).json(program);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})
export const editProgram =  asyncHandler(async (req,res)=>{
    const {name,day,time,category} = req.body;
  
    try {
      const updatedProgram = await Program.findByIdAndUpdate(
        req.params.id,
        {name,day,time,category},
        { new: true }
      );
      if (!updatedProgram) {
        return res.status(404).json({ message: 'Program not found' });
      }
      res.json(updatedProgram);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
)


export const deleteProgram= asyncHandler(async (req, response) => {
    try{
        await Program.deleteOne({_id: req.params.id});
        response.status(201).json("Program deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
})

const programRoutes = { getPrograms, addProgram, editProgram, deleteProgram,getProgramById}
export default programRoutes  
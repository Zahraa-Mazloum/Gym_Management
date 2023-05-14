import Coach from '../models/coachModel.js';
import asyncHandler from 'express-async-handler';

// Get all coaches
export const getCoaches = asyncHandler(async (req, response) => {
    try{
        const coaches = await Coach.find();
        response.status(200).json(coaches);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})

// create new coach
export const addCoach = asyncHandler(async (req, res) => {
    try {
      const { first_name, middle_name, last_name, phone } = req.body;
  
      if (!first_name || !middle_name || !last_name || !phone) {
        res.status(400);
        throw new Error('Please enter all fields');
      }
  
      const coach = await Coach.create({
        first_name,
        middle_name,
        last_name,
        phone,
      });
  
      if (coach) {
        res.status(201).json({
          coach,
        });
      } else {
        res.status(400);
        throw new Error('invalid coach data');
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
// Get a coach by id
export const getCoachById =asyncHandler(async (req, response) => {
    try{
        const coach = await Coach.findById(req.params.id);
        response.status(200).json(coach);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})

export const editcoach =asyncHandler(async (req, response) => {
    let coach = req.body;

    const editcoach = new Coach(coach);
    try{
        await Coach.updateOne({_id: req.params.id}, editcoach);
        response.status(201).json(editcoach);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}
)

export const deletecoach = asyncHandler(async (req, response) => {
    try{
        await Coach.deleteOne({_id: req.params.id});
        response.status(201).json("coach deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
})

const coachRoutes = { getCoaches, getCoachById, addCoach, editcoach, deletecoach }
export default coachRoutes  
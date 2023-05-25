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

export const editCoach = asyncHandler(async (req, response) => {
  const coachId = req.params.id;
  const { first_name, middle_name, last_name, phone } = req.body;

  try {
    const coach = await Coach.findById(coachId);
    if (coach) {
      if (first_name) {
        coach.first_name = first_name;
      }
      if (middle_name) {
        coach.middle_name = middle_name;
      }
      if (last_name) {
        coach.last_name = last_name;
      }
      if (phone) {
        coach.phone = phone;
      }

      const updatedCoach = await coach.save();
      response.status(200).json(updatedCoach);
    } else {
      response.status(404);
      throw new Error('Coach not found');
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});


export const deletecoach = asyncHandler(async (req, response) => {
    try{
        await Coach.deleteOne({_id: req.params.id});
        response.status(201).json("coach deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
})
export const deleteCoaches = asyncHandler(async (req, res) => {
  const ids = req.params.ids.split(",")
  try {
    const result = await Coach.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount > 0) {
      res.status(200).json({ success:true,message: 'Coaches have been removed' });
    } else {
      res.status(404).json({ message: 'No Coach found with the provided IDs' });
    }
  } catch (error) {
    console.error('Error deleting Coaches:', error);
    res.status(500).json({ message: 'An error occurred while deleting Coaches' });
  }
});

const coachRoutes = { getCoaches, getCoachById, addCoach, editCoach, deletecoach ,deleteCoaches }
export default coachRoutes  
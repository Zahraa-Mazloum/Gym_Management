import Member from '../models/memberModel.js';
import asyncHandler from 'express-async-handler';

// Get all members
export const getMembers = asyncHandler(async (req, response) => {
    try{
        const members = await Member.find();
        response.status(200).json(members);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})

// create new member
export const addMember = asyncHandler(async (req, res) => {
    try {
      const {first_name, middle_name, last_name, phone,gender,dob,address,bloodTypes,emergecnyPhone,isArmy} = req.body;
  
      if (!first_name || !middle_name || !last_name || !phone || !gender || !address || !isArmy ) {
        res.status(400);
        throw new Error('Please enter all fields');
      }
  
      const member = await Member.create({
        first_name, 
        middle_name,
        last_name,
        phone,
        gender,
        dob,
        address,
        bloodTypes,
        emergecnyPhone,
        isArmy
      });
  
      if (member) {
        res.status(201).json({
          member,
        });
      } else {
        res.status(400);
        throw new Error('invalid member data');
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
// Get a member by id
export const getMemberById =asyncHandler(async (req, response) => {
    try{
        const member = await Member.findById(req.params.id);
        response.status(200).json(member);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})

export const editMember =asyncHandler(async (req, response) => {
    let member = req.body;

    const editmember = new Member(member);
    try{
        await Member.updateOne({_id: req.params.id}, editmember);
        response.status(201).json(editmember);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}
)

export const deleteMember = asyncHandler(async (req, response) => {
    try{
        await Member.deleteOne({_id: req.params.id});
        response.status(201).json("Member deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
})

const memberRoutes = { getMembers, getMemberById, addMember, editMember, deleteMember }
export default memberRoutes  
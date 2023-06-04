import Member from '../models/memberModel.js';
import asyncHandler from 'express-async-handler';
import Membership from '../models/membershipModel.js'

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
      const {first_name, middle_name, last_name, phone,gender,date,address,emergencyPhone,army} = req.body;
  
      if (!first_name || !middle_name || !last_name || !phone  || !address  ) {
        res.status(400);
        throw new Error('Please enter all fields');
      }
  
      const member = await Member.create({
        first_name, 
        middle_name,
        last_name,
        phone,
        gender,
        date,
        address,
        // bloodTypes,
        emergencyPhone,
        army,
        status: 'inactive', 
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

export const editMember = asyncHandler(async (req, res) => {
  try {
    const member = req.body;
    const updatedMember = await Member.findByIdAndUpdate(req.params.id, member, {
      new: true
    });

    if (updatedMember) {
      res.status(200).json(updatedMember);
    } else {
      res.status(404).json({ message: 'Member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export const getMemberLocations = async (req, res) => {
  try {
    const result = await Member.aggregate([
      {
        $group: {
          _id: "$address", 
          count: { $sum: 1 } 
        }
      },
      {
        $project: {
          _id: 0, 
          location: "$_id", 
          count: 1 
        }
      }
    ]).exec();

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteMember = asyncHandler(async (req, response) => {
    try{
        await Member.deleteOne({_id: req.params.id});
        response.status(201).json("Member deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
})

// export const updateMemberActiveStatus = async (req, res) => {
//   try {
//     const members = await Member.find();

//     for (const member of members) {
//       const latestMembership = await Membership.findOne({ member: member._id }).sort({ end_date: -1 });

//       if (latestMembership) {
//         const currentDate = new Date();
//         const latestEndDate = new Date(latestMembership.end_date);

//         member.active = latestEndDate > currentDate;
//       } else {
//         member.active = false;
//       }

//       await member.save();
//     }

//     res.status(200).json({ message: 'Member active status updated successfully' });
//   } catch (error) {
//     console.error('Failed to update member active status:', error);
//     res.status(500).json({ message: 'Failed to update member active status' });
//   }
// };

const memberRoutes = { getMembers, getMemberById, addMember, editMember, deleteMember ,getMemberLocations}
export default memberRoutes  
import Attendance from '../models/attendanceModel.js';
import asyncHandler from 'express-async-handler';


export const getAttendances = asyncHandler(async (req, res) => {
  const attendances = await Attendance.find().populate('member').populate('program');
  res.json(attendances);
});

export const addAttendance = asyncHandler(async (req, res) => {
  const { present, member, program } = req.body;
  const attendance = new Attendance({
    present,
    member,
    program
  });
  const createdAttendance = await attendance.save();
  res.status(201).json(createdAttendance);
});


export const getAttendanceById = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findById(req.params.id).populate('member').populate('program');
  if (attendance) {
    res.json(attendance);
  } else {
    res.status(404);
    throw new Error('Attendance not found');
  }
});


export const updateAttendance = asyncHandler(async (req, res) => {
  const { present, member, program } = req.body;
  const attendance = await Attendance.findById(req.params.id);
  if (attendance) {
    attendance.present = present || attendance.present;
    attendance.member = member || attendance.member;
    attendance.program = program || attendance.program;

    const updatedAttendance = await attendance.save();
    res.json(updatedAttendance);
  } else {
    res.status(404);
    throw new Error('Attendance not found');
  }
});


export const deleteAttendance = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findById(req.params.id);
  if (attendance) {
    await attendance.remove();
    res.json({ message: 'Attendance removed' });
  } else {
    res.status(404);
    throw new Error('Attendance not found');
  }
});

const attendanceRoutes = {getAttendances,addAttendance,getAttendanceById,updateAttendance,deleteAttendance};

export default attendanceRoutes;

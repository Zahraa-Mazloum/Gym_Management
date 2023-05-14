import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const attendanceSchema = new Schema({

 
 
    present:{
        type:Boolean,

    },
 
  member:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
  },
  program:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
  },
}, 
{ timestamps:true 

},{
  collection: 'attendances',


});

const Attendance = model('Attendance', attendanceSchema);

export default Attendance;
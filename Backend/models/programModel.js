import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const programSchema = new Schema({

    name:{
        type:String,
        required:[true,'Please add the name'],
        trim:true
    },
    day:{
        type:String,
        trim:true
    },
    time:{
        type:String,
        trim:true
    },
    category:{
        type:String,
        trim:true
    },
  coach:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach',
  },
}, 
{ timestamps:true 

},{
  collection: 'programs',


});

const Program = model('Program', programSchema);

export default Program;
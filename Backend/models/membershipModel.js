import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const membershipSchema = new Schema({

    start_day:{
        type:Date,
        
    },
 
    amount:{
        type:Number,

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
  collection: 'memberships',


});

const Membership = model('Membership', membershipSchema);

export default Membership;
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const debtSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  notes:[{
    type:String
  }],
  member:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
  },

}, 
{ timestamps:true 

},{
  collection: 'Debts',


});

const Debt = model('Debt', debtSchema);

export default Debt;
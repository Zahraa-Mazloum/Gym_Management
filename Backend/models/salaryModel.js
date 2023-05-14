import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const salarySchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },

  coach:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach',
  },
}, 
{ timestamps:true 

},{
  collection: 'salaries',


});

const Salary = model('Salary', salarySchema);

export default Salary;
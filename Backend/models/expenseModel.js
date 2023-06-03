import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({

description:{
        type:String,
        required:[true,'Please add the description'],
        trim:true
    },
    
 
amount:{
type:Number,
required:[true,'Please add the amount'],

},
salary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Salary',
  },
  priceLbp:{
    type:Number
}
},

{ timestamps:true 

},{
collection:"expenses",

}
);




const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
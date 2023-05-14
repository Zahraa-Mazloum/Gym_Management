import mongoose from "mongoose";

const incomeSchema = mongoose.Schema({

description:{
        type:String,
        required:[true,'Please add the description'],
        trim:true
    },
    
 
amount:{
type:Number,
required:[true,'Please add the amount'],

},

},

{ timestamps:true 

},{
collection:"incomes",

}
);




const Income = mongoose.model('Income', incomeSchema);

export default Income;
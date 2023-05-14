import mongoose from "mongoose";

const supplementSchema = mongoose.Schema({

name:{
        type:String,
        required:[true,'Please add the name'],
        trim:true
    },
    
description:{
        type:String,
        required:[true,'Please add the description'],
        trim:true
    },
    
 
price:{
type:Number,
required:[true,'Please add the amount'],

},
image:{
    type:String
}
},

{ timestamps:true 

},{
collection:"supplements",

}
);




const Supplement = mongoose.model('Supplement', supplementSchema);

export default Supplement;
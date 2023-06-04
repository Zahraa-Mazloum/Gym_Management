import mongoose from "mongoose";

const memberSchema = mongoose.Schema({

first_name:{
        type:String,
        required:[true,'Please add a first_name'],
        trim:true
    },
    
middle_name:{
        type:String,
        required:[true,'Please add a last_name'],
        trim:true
    },
     
last_name:{
    type:String,
    required:[true,'Please add a last_name'],
    trim:true
},


phone:{
type:String,
required:[true,'Please add a phone'],
trim:true
},

gender:{
    type:String,
    // required:[true,'Please add an gender'],
    trim:true,
},
date:{
    type:String,
},
address:{
    type:String,
    required:[true,'Please add an address'],
trim:true
},
active: {
    type: Boolean,
    default: false,
  },
// bloodTypes:{
//     type:String,
//     // required:[true,'Please add a blood type'],
//     trim:true
//     },
emergencyPhone:{
        type:String,
        // required:[true,'Please add a phone'],
        trim:true
        },
            
        army:{
    type:String,
},
//filled automatically
// status:{
// type:Boolean, 
// }


},

{ timestamps:true 

},{
collection:"Members",

}

);




const Member = mongoose.model('Member', memberSchema);
export default Member;
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
    required:[true,'Please add an gender'],
    trim:true,
},
dob:{
    type:Date,
},
address:{
    type:String,
    required:[true,'Please add an address'],
trim:true
},

bloodTypes:{
    type:String,
    required:[true,'Please add a blood type'],
    trim:true
    },
emergecnyPhone:{
        type:String,
        required:[true,'Please add a phone'],
        trim:true
        },
            
isArmy:{
    type:Boolean,
},
//filled automatically
status:{
type:Boolean, 
}


},

{ timestamps:true 

},{ timestamps:true 

},{
collection:"Members",

}
);




const Member = mongoose.model('Member', memberSchema);
export default Member;